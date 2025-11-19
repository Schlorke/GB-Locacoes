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

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

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
    <div style={{ width, height }} className="relative">
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
        }}
        frameloop={frameloopMode}
        dpr={[1, 2]}
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
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={enableManualRotation}
          enableZoom={enableManualZoom}
          minDistance={minZoomDistance}
          maxDistance={maxZoomDistance}
          autoRotate={isTouch ? false : autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>
    </div>
  )
}

export default ModelViewer
