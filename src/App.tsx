
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useState, useTransition } from 'react';
import { Experience } from './components/Experience';
import { useControls } from 'leva';
import { Presets } from './helpers/types';
import { useSnapshot } from 'valtio';
import { store } from './store';

const Overlay = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '20px', fontFamily: 'Meslo', lineHeight: '1.6em', whiteSpace: 'pre' }}>
        {/* &gt; Counter Strike 2 weapon viewer 
        <br /> */}
        &gt; Click on spheres to change the view 
        <br />
        &gt; Click on weapon parts to change the depth of field target 
      </div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '14px' }}>14/09/2024</div>
    </div>
  )
};

export const App = () => {

  const orbitEnabled = !useSnapshot(store).damping;

  const [preset, setPreset] = useState<Presets>('sunset');
  const [, startTransition] = useTransition();

  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset as Presets,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      onChange: (value: Presets) => startTransition(() => setPreset(value))
    }
  });

  return (
    <>
      <Canvas camera={{position:[0,0,100]}}>
        <OrbitControls makeDefault enableRotate={orbitEnabled} enableZoom={orbitEnabled}/>
        <Environment background preset={preset} backgroundBlurriness={blur} />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Overlay />
    </>

  );
}


