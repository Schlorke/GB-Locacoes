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
      <div className="text-gray-400 text-lg">{`${Math.round(progress)} %`}</div>
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
  // Preload GLB/GLTF models
  useEffect(() => {
    useGLTF.preload(url)
  }, [url])

  // Usar frameloop dinâmico: "always" apenas quando autoRotate está ativo, senão "demand"
  const frameloopMode = autoRotate ? 'always' : 'demand'

  return (
    <div style={{ width, height }} className="relative group">
      {/* Background Lights - Luzes de fundo sutis e animadas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl z-0">
        {/* Luz superior direita - GRANDE */}
        <div className="animate-very-slow-pulse absolute -right-40 -top-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-500/15 blur-3xl" />

        {/* Luz inferior esquerda - GRANDE */}
        <div className="animate-very-slow-pulse absolute -bottom-40 -left-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-orange-500/15 to-orange-400/20 blur-3xl" />

        {/* Luz central - MUITO GRANDE */}
        <div className="animate-very-slow-pulse absolute left-1/2 top-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-orange-300/15 to-orange-400/12 blur-3xl" />
      </div>

      {/* Wrapper com blur transparente e efeitos de glassmorphism */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5 border border-white/10 shadow-2xl">
        {/* Gradiente sutil sempre visível */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/3 via-transparent to-orange-400/3" />

        {/* Reflexo sutil no hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-orange-500/5 via-transparent opacity-0 transition-all duration-[600ms] ease-in-out group-hover:opacity-100" />

        {/* Elementos de iluminação decorativos nos cantos */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-orange-300/20 to-orange-400/15 blur-xl animate-slow-pulse transition-all ease-in-out will-change-transform group-hover:scale-150 opacity-60" />
        <div
          className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-gradient-to-br from-orange-400/15 to-orange-300/20 blur-xl animate-slow-pulse transition-all ease-in-out will-change-transform group-hover:scale-150 opacity-60"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Canvas 3D - Transparente para permitir blur do fundo */}
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
                onLoaded={onModelLoaded}
              />
            </Suspense>

            {environmentPreset !== 'none' && (
              <Suspense fallback={null}>
                <Environment
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
    </div>
  )
}

export default ModelViewer
