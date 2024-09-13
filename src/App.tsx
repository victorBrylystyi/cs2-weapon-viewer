
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useState, useTransition } from 'react';
import { Experience } from './components/Experience';
import { useControls } from 'leva';
import { Presets } from './helpers/types';
import { useSnapshot } from 'valtio';
import { store } from './store';

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
    </>

  );
}


