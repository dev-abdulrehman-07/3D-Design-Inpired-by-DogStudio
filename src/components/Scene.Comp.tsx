import { useAnimations,useGLTF,useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MaterialUniforms = {
    uMatcap1: { value: THREE.Texture };
    uMatcap2: { value: THREE.Texture };
    uProgress: { value: number };
};

function Scene() {
    const model = useGLTF("/models/dog.drc.glb");

    const material = useRef<MaterialUniforms | null>(null);

    const dogModel = useRef<THREE.Group>(null);

    useThree(({ camera, gl }) => {
        camera.position.z = 0.7;

        gl.toneMapping = THREE.ReinhardToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
    });

    // Animations
    const { actions } = useAnimations(
        model.animations,
        model.scene
    );

    useEffect(() => {
        actions["Take 001"]?.play();

        return () => {
            actions["Take 001"]?.stop();
        };
    }, [actions]);

    // Dog normal map
    const normalMap = useTexture("/dog_normals.jpg");

    normalMap.flipY = false;
    normalMap.colorSpace = THREE.NoColorSpace;

    // Branch textures
    const [branchMap, branchNormalMap] = useTexture([
        "/branches_diffuse.jpeg",
        "/branches_normals.jpeg",
    ]);

    branchMap.flipY = true;
    branchMap.colorSpace = THREE.SRGBColorSpace;

    branchNormalMap.flipY = true;
    branchNormalMap.colorSpace = THREE.NoColorSpace;

    // Matcap textures
    const matcaps = useTexture([
        "/matcap/mat-1.png",
        "/matcap/mat-2.png",
        "/matcap/mat-3.png",
        "/matcap/mat-4.png",
        "/matcap/mat-5.png",
        "/matcap/mat-6.png",
        "/matcap/mat-7.png",
        "/matcap/mat-8.png",
        "/matcap/mat-9.png",
        "/matcap/mat-10.png",
        "/matcap/mat-11.png",
        "/matcap/mat-12.png",
        "/matcap/mat-13.png",
        "/matcap/mat-14.png",
        "/matcap/mat-15.png",
        "/matcap/mat-16.png",
        "/matcap/mat-17.png",
        "/matcap/mat-18.png",
        "/matcap/mat-19.png",
        "/matcap/mat-20.png",
    ]);

    matcaps.forEach((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
    });

    const [
        
        mat2,
        mat8,
        mat9,
        mat10,
        mat12,
        mat13,
        mat17,
        mat19,
        
    ] = matcaps;

    // Shader uniforms
    const uniforms = useMemo<MaterialUniforms>(
        () => ({
            uMatcap1: { value: mat17 },
            uMatcap2: { value: mat2 },
            uProgress: { value: 1 },
        }),
        [mat17, mat2]
    );

    material.current = uniforms;

    // Custom dog material
    const dogMaterial = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            normalMap,
            matcap: mat2,
        });

        mat.onBeforeCompile = (shader) => {
            shader.uniforms.uMatcapTexture1 =
                uniforms.uMatcap1;

            shader.uniforms.uMatcapTexture2 =
                uniforms.uMatcap2;

            shader.uniforms.uProgress =
                uniforms.uProgress;

            shader.fragmentShader = shader.fragmentShader.replace(
                "void main() {",
                `
                uniform sampler2D uMatcapTexture1;
                uniform sampler2D uMatcapTexture2;
                uniform float uProgress;

                void main() {
                `
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                "vec4 matcapColor = texture2D( matcap, uv );",
                `
                vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
                vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);

                float transitionFactor = 0.2;

                float progress = smoothstep(
                    uProgress - transitionFactor,
                    uProgress,
                    (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5
                );

                vec4 matcapColor = mix(
                    matcapColor2,
                    matcapColor1,
                    progress
                );
                `
            );
        };

        return mat;
    }, [normalMap, mat2, uniforms]);

    // Branch material
    const branchMaterial = useMemo(
        () =>
            new THREE.MeshMatcapMaterial({
                normalMap: branchNormalMap,
                map: branchMap,
            }),
        [branchNormalMap, branchMap]
    );

    useEffect(() => {
        model.scene.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;

            child.material = child.name.includes("DOG")
                ? dogMaterial
                : branchMaterial;
        });

        return () => {
            dogMaterial.dispose();
            branchMaterial.dispose();
        };
    }, [model.scene, dogMaterial, branchMaterial]);

    // Scroll animation
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-3",
                start: "top top",
                end: "bottom bottom",
                
                scrub: true,
            },
        });

        tl.to(dogModel.current!.position, {
            z: "-=0.75",
            y: "+=0.1",
        })
            .to(dogModel.current!.rotation, {
                x: `+=${Math.PI / 15}`,
            })
            .to(
                dogModel.current!.rotation,
                {
                    y: `-=${Math.PI}`,
                },
                "third"
            )
            .to(
                dogModel.current!.position,
                {
                    x: "-=0.5",
                    z: "+=0.650",
                    y: "-=0.05",
                },
                "third"
            );
    });

    // Matcap transition
    const changeMatcap = (
        texture: THREE.Texture
    ) => {
        if (!material.current) return;

        const uniforms = material.current;

        gsap.killTweensOf(uniforms.uProgress);

        uniforms.uMatcap1.value = texture;

        gsap.to(uniforms.uProgress, {
            value: 0,
            duration: 0.3,

            onComplete: () => {
                uniforms.uMatcap2.value =
                    uniforms.uMatcap1.value;

                uniforms.uProgress.value = 1;
            },
        });
    };

    // Hover events
    useEffect(() => {
        const hoverTextures: Record<string, THREE.Texture> = {
            tomorrowland: mat19,
            "navy-pier": mat8,
            "msi-chicago": mat9,
            phone: mat12,
            kikk: mat10,
            kennedy: mat8,
            opera: mat13,
        };

        const listeners: Array<{
            element: Element;
            enter: () => void;
            leave: () => void;
        }> = [];

        Object.entries(hoverTextures).forEach(
            ([id, texture]) => {
                const element = document.querySelector(
                    `.title[img-title="${id}"]`
                );

                if (!element) return;

                const enter = () => changeMatcap(texture);
                const leave = () => changeMatcap(mat2);

                element.addEventListener("mouseenter", enter);
                element.addEventListener("mouseleave", leave);

                listeners.push({
                    element,
                    enter,
                    leave,
                });
            }
        );

        return () => {
            listeners.forEach(({ element, enter, leave }) => {
                element.removeEventListener("mouseenter", enter);
                element.removeEventListener("mouseleave", leave);
            });
        };
    }, [mat2, mat8, mat9, mat10, mat12, mat13, mat19]);

    return (
        <>
            <primitive
                ref={dogModel}
                object={model.scene}
                position={[0.1, -0.6, -0.3]}
                rotation={[0, Math.PI / 4, 0]}
            />

            <directionalLight
                intensity={5}
                position={[0, 5, 5]}
                color="white"
            />
        </>
    );
}

export default Scene;

useGLTF.preload("/models/dog.drc.glb");
