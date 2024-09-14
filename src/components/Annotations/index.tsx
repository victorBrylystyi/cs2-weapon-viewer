import { Sphere } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useCallback } from "react";
import { Vector3 } from "three";
import { damp3 } from 'maath/easing';
import { Annotation } from "../../helpers/types";
import { useSnapshot } from "valtio";
import { selectAnnotation, setDampingMode, store } from "../../store";

type PropsType = {
    weapon: string
}

const _v3 = new Vector3();

export const Annotations = (props: PropsType) => {

    const { weapon } = props;

    const config = useSnapshot(store).config[weapon];
    const damping = useSnapshot(store).damping;
    const currConfig = useSnapshot(store).selectedAnnotation;


    // const [currConfig, setCurrConfig] = useState<Annotation | null>(null)

    const clickHandle = useCallback((e: ThreeEvent<MouseEvent>) => {

        const conf = config.find(conf => conf.title === e.eventObject.name) as Annotation;
        selectAnnotation(conf.title);
        // setCurrConfig(conf);

    }, [config]);

    useFrame(({camera}, delta) => {
        if (currConfig) {
            const {position} = config.find(conf => conf.title === currConfig) as Annotation;
            const flag1 = damp3(camera.position, _v3.fromArray(position), 0.4, delta);

            if (!damping) setDampingMode(true);
            
            if (!flag1) {
                // setCurrConfig(null);
                selectAnnotation(null);
                // console.log(controls);
                setDampingMode(false);
            }
        }

    })

    return (
       <>
        {config.map(weaponConf => 
            <Sphere 
                args={[1.5, 64, 64]}
                key={weaponConf.title}
                position={weaponConf.position}
                onClick={clickHandle}
                name={weaponConf.title}
                visible={!currConfig || !(currConfig && ((config.find(conf => conf.title === currConfig) as Annotation).title === weaponConf.title))}
            >
                <meshStandardMaterial 
                    color={'blue'}
                    metalness={0.8}
                    roughness={0.3}
                />
                {/* <Html distanceFactor={5}>
                    <div>
                        {weaponConf.title}
                    </div>
                </Html> */}
            </Sphere> 
        )}
       </>
    )

}
