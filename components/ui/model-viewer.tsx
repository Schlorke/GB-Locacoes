'use client'

import {
  Bounds,
  Center,
  Environment,
  Html,
  OrbitControls,
  useBounds,
  useGLTF,
  useProgress,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import type { RefObject } from 'react'
import {
  FC,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import * as THREE from 'three'

// ---
// Types and Constants
// ---

export interface ModelViewerProps {
  url: string
  width?: number | string
  height?: number | string
  defaultZoom?: number
  minZoomDistance?: number
  maxZoomDistance?: number
  enableManualRotation?: boolean
  enableManualZoom?: boolean
  ambientIntensity?: number
  keyLightIntensity?: number
  fillLightIntensity?: number
  rimLightIntensity?: number
  environmentPreset?:
    | 'city'
    | 'sunset'
    | 'night'
    | 'dawn'
    | 'studio'
    | 'apartment'
    | 'forest'
    | 'park'
    | 'none'
  autoRotate?: boolean
  autoRotateSpeed?: number
  onModelLoaded?: () => void
}

const deg2rad = (d: number) => (d * Math.PI) / 180

// ---
// Reusable Components
// ---

const Loader: FC = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-yellow-500 text-lg">{`${Math.round(progress)} %`}</div>
    </Html>
  )
}

// Component for handling GLTF/GLB models (otimizado)
const GltfContent: FC<{ url: string; onLoaded: () => void }> = ({
  url,
  onLoaded,
}) => {
  const { scene } = useGLTF(url)

  useLayoutEffect(() => {
    if (scene) {
      scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) {
          const mesh = o as THREE.Mesh
          // Desabilitar shadows para melhor performance
          mesh.castShadow = false
          mesh.receiveShadow = false

          // GLB já vem com texturas embutidas, apenas garantir que estão atualizadas
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat: THREE.Material) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.needsUpdate = true
                  if (mat.map) {
                    mat.map.needsUpdate = true
                    mat.map.colorSpace = THREE.SRGBColorSpace
                  }
                }
              })
            } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.needsUpdate = true
              if (mesh.material.map) {
                mesh.material.map.needsUpdate = true
                mesh.material.map.colorSpace = THREE.SRGBColorSpace
              }
            }
          }
        }
      })
      onLoaded()
    }
  }, [scene, onLoaded])

  return <primitive object={scene.clone()} />
}

const ModelWrapper: FC<{
  modelRef: RefObject<THREE.Group>
  autoRotate?: boolean
  autoRotateSpeed?: number
}> = ({ modelRef, autoRotate, autoRotateSpeed }) => {
  const bounds = useBounds()
  const hasFitted = useRef(false)

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += (autoRotateSpeed || 1) * delta
    }
  })

  useEffect(() => {
    // Ajustar câmera apenas uma vez após carregar
    if (!hasFitted.current) {
      const timer = setTimeout(() => {
        bounds.refresh().fit()
        hasFitted.current = true
      }, 200)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [bounds])

  return null
}

// Componente Environment com fallback para proxy local
// Tenta usar preset normalmente, se falhar (429), usa proxy local com cache
const EnvironmentWithProxy: FC<{
  preset:
    | 'city'
    | 'sunset'
    | 'night'
    | 'dawn'
    | 'studio'
    | 'apartment'
    | 'forest'
    | 'park'
}> = ({ preset }) => {
  const [useProxy, setUseProxy] = useState(false)

  // Mapeamento de presets para caminhos HDR no drei-assets
  const presetToPath: Record<string, string> = {
    forest: 'hdri/forest_slope_1k.hdr',
    studio: 'hdri/studio_small_03_1k.hdr',
    city: 'hdri/city.hdr',
    sunset: 'hdri/sunset.hdr',
    night: 'hdri/night.hdr',
    dawn: 'hdri/dawn.hdr',
    apartment: 'hdri/apartment.hdr',
    park: 'hdri/park.hdr',
  }

  useEffect(() => {
    // Listener para detectar erro 429
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes('429') ||
        event.message?.includes('drei-assets') ||
        event.error?.message?.includes('429')
      ) {
        setUseProxy(true)
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // Se usar proxy, carregar via API route local (com cache)
  if (useProxy && presetToPath[preset]) {
    return <Environment files={`/api/drei-proxy/${presetToPath[preset]}`} />
  }

  // Tentar preset normal primeiro
  return <Environment preset={preset} />
}

const SceneContent: FC<{
  url: string
  autoRotate?: boolean
  autoRotateSpeed?: number
  onLoaded?: () => void
}> = ({ url, autoRotate, autoRotateSpeed, onLoaded }) => {
  const modelRef = useRef<THREE.Group>(null!)
  const [modelLoaded, setModelLoaded] = useState(false)

  // Reset quando URL mudar
  useEffect(() => {
    setModelLoaded(false)
  }, [url])

  const onLoadedHandler = () => {
    setModelLoaded(true)
    onLoaded?.()
  }

  return (
    <Bounds fit clip observe margin={1.2}>
      <Center>
        <group ref={modelRef}>
          <GltfContent url={url} onLoaded={onLoadedHandler} />
        </group>
      </Center>
      {modelLoaded && (
        <ModelWrapper
          modelRef={modelRef}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      )}
    </Bounds>
  )
}

// ---
// Main Viewer Component
// ---

const ModelViewer: FC<ModelViewerProps> = ({
  url,
  width = '100%',
  height = '100%',
  defaultZoom = 2,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableManualRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.3,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.8,
  environmentPreset = 'forest',
  autoRotate = false,
  autoRotateSpeed = 0.35,
  onModelLoaded,
}) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false)

  // Preload GLB/GLTF models
  useEffect(() => {
    useGLTF.preload(url)
    setIsModelLoaded(false) // Reset quando URL mudar
  }, [url])

  // Handler para quando o modelo carregar
  const handleModelLoaded = () => {
    setIsModelLoaded(true)
    onModelLoaded?.()
  }

  // Usar frameloop dinâmico: "always" apenas quando autoRotate está ativo, senão "demand"
  const frameloopMode = autoRotate ? 'always' : 'demand'

  return (
    <div style={{ width, height }} className="relative group">
      {/* ========================================
          CORREÇÃO APLICADA: OVERFLOW-HIDDEN REMOVIDO
          ========================================

          ANTES: overflow-hidden
          DEPOIS: overflow-visible

          Isso permite que elementos posicionados fora
          deste container (como os badges no hero.tsx)
          sejam visíveis e não cortados.
      */}

      {/* Background Lights - Luzes de fundo sutis e animadas */}
      <div className="pointer-events-none absolute inset-0 overflow-visible rounded-2xl z-0">
        {/* Luz superior direita - GRANDE */}
        <div className="animate-very-slow-pulse absolute -right-40 -top-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-black/20 to-black/15 blur-3xl" />

        {/* Luz inferior esquerda - GRANDE */}
        <div className="animate-very-slow-pulse absolute -bottom-40 -left-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-black/15 to-black/20 blur-3xl" />

        {/* Luz central - MUITO GRANDE */}
        <div className="animate-very-slow-pulse absolute left-1/2 top-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-black/15 to-black/12 blur-3xl" />
      </div>

      {/* Elementos de iluminação decorativos nos cantos */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-black/20 to-black/15 blur-xl animate-slow-pulse transition-all ease-in-out will-change-transform group-hover:scale-150 opacity-60 z-0" />
      <div
        className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-gradient-to-br from-black/15 to-black/20 blur-xl animate-slow-pulse transition-all ease-in-out will-change-transform group-hover:scale-150 opacity-60 z-0"
        style={{ animationDelay: '1.5s' }}
      />

      {/* Glassmorphism Background - Aparece gradualmente quando modelo carrega */}
      <AnimatePresence>
        {isModelLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1], // ease-out cubic
            }}
            className="absolute inset-0 rounded-2xl overflow-visible pointer-events-none z-[5]"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(128, 128, 128, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(128, 128, 128, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, rgba(128, 128, 128, 0.06) 0%, rgba(128, 128, 128, 0.03) 100%)
              `,
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(128, 128, 128, 0.18)',
              boxShadow: `
                inset 0 1px 0 0 rgba(128, 128, 128, 0.25),
                inset 0 -1px 0 0 rgba(128, 128, 128, 0.12),
                0 8px 32px 0 rgba(0, 0, 0, 0.12)
              `,
            }}
          >
            {/* Noise Texture Layer - Textura granular sutil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: 'easeOut',
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.02) 0px,
                    transparent 0.5px,
                    transparent 1px,
                    rgba(0, 0, 0, 0.02) 1.5px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0.02) 0px,
                    transparent 0.5px,
                    transparent 1px,
                    rgba(0, 0, 0, 0.02) 1.5px
                  )
                `,
                mixBlendMode: 'overlay',
                backgroundSize: '2px 2px',
              }}
            />
            {/* Condensation effect - Efeito de condensação sutil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: 'easeOut',
              }}
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 25% 35%, rgba(128, 128, 128, 0.15) 0%, transparent 35%),
                  radial-gradient(circle at 75% 55%, rgba(128, 128, 128, 0.12) 0%, transparent 30%),
                  radial-gradient(circle at 50% 75%, rgba(128, 128, 128, 0.1) 0%, transparent 25%)
                `,
                mixBlendMode: 'soft-light',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas 3D */}
      <div className="relative z-10 w-full h-full">
        <Canvas
          shadows={false}
          camera={{
            fov: 50,
            position: [0, 0, defaultZoom],
            near: 0.01,
            far: 1000,
          }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
            preserveDrawingBuffer: false,
          }}
          frameloop={frameloopMode}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0) // Transparent background
          }}
        >
          <Suspense fallback={<Loader />}>
            <SceneContent
              url={url}
              autoRotate={autoRotate}
              autoRotateSpeed={deg2rad(autoRotateSpeed)}
              onLoaded={handleModelLoaded}
            />
          </Suspense>

          {environmentPreset !== 'none' && (
            <Suspense fallback={null}>
              <EnvironmentWithProxy
                preset={
                  environmentPreset as
                    | 'city'
                    | 'sunset'
                    | 'night'
                    | 'dawn'
                    | 'studio'
                    | 'apartment'
                    | 'forest'
                    | 'park'
                }
              />
            </Suspense>
          )}

          <ambientLight intensity={ambientIntensity} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={keyLightIntensity}
            castShadow={false}
          />
          <directionalLight
            position={[-5, 2, 5]}
            intensity={fillLightIntensity}
          />
          <directionalLight
            position={[0, 4, -5]}
            intensity={rimLightIntensity}
          />

          <OrbitControls
            makeDefault
            enablePan={false}
            enableRotate={enableManualRotation}
            enableZoom={enableManualZoom}
            minDistance={minZoomDistance}
            maxDistance={maxZoomDistance}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </Canvas>
      </div>
    </div>
  )
}

export default ModelViewer
