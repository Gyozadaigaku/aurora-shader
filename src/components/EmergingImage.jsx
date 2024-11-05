import EmergeMaterial from "../stuff/EmergeMaterial";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect } from "react";
import * as THREE from "three";
import useScreenSize from "../stuff/useScreenSize";
import { View } from "@react-three/drei";

const PIXELS = [
  1, 1.5, 2, 2.5, 3, 1, 1.5, 2, 2.5, 3, 3.5, 4, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5,
  6, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 20, 100,
].map((v) => v / 100);

export default function EmergingImage({ type, url, ...props }) {
  const [refMesh, setRefMesh] = useState(null);
  const [texture, setTexture] = useState(null);
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [elementSize, setElementSize] = useState([0, 0]);
  const ref = useRef();
  const screenSize = useScreenSize();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const timeRef = useRef(0);

  useEffect(() => {
    new THREE.TextureLoader().loadAsync(url).then((data) => {
      setTextureSize([data.source.data.width, data.source.data.height]);
      setTexture(data);
    });
  }, [url]);

  useEffect(() => {
    if (refMesh) {
      refMesh.material.uProgress = 0;
      refMesh.material.uType = type;
    }
  }, [type, refMesh]);

  useGSAP(() => {
    if (refMesh?.material) {
      gsap.to(refMesh.material, {
        uProgress: isIntersecting ? 1 : 0,
        duration: 1.5,
        ease: "none",
      });
    }
  }, [isIntersecting, type, refMesh]);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (refMesh?.material) {
        timeRef.current += 0.016; // Approximately 60 FPS
        refMesh.material.uTime = timeRef.current;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [refMesh]);

  useLayoutEffect(() => {
    if (refMesh) {
      let bounds = ref.current.getBoundingClientRect();
      setElementSize([bounds.width, bounds.height]);
      refMesh?.scale.set(bounds.width, bounds.height, 1);
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      });
      observer.observe(ref.current);
    }
  }, [refMesh]);

  useEffect(() => {
    let bounds = ref.current.getBoundingClientRect();
    setElementSize([bounds.width, bounds.height]);
    refMesh?.scale.set(bounds.width, bounds.height, 1);
  }, [screenSize, refMesh]);

  return (
    <View {...props} ref={ref}>
      <mesh ref={setRefMesh}>
        <emergeMaterial
          uTime={0}
          uFillColor={new THREE.Color("#403fb7")}
          transparent={true}
          uTexture={texture}
          uPixels={PIXELS}
          uTextureSize={new THREE.Vector2(textureSize[0], textureSize[1])}
          uElementSize={new THREE.Vector2(elementSize[0], elementSize[1])}
        />
        <planeGeometry args={[1, 1]} />
      </mesh>
    </View>
  );
}
