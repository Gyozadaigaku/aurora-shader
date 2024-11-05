import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import * as THREE from "three";
import { View } from "@react-three/drei";
import useScreenSize from "../stuff/useScreenSize";
import EmergeMaterial from "../stuff/EmergeMaterial";

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

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    // damping: 20,
    // stiffness: 100,
    duration: 1000,
    delay: 100,
  });

  useEffect(() => {
    if (isIntersecting) {
      setTimeout(() => {
        progress.set(1);
      }, 500); // 0.5秒の遅延
    } else {
      progress.set(0);
    }
  }, [isIntersecting, progress]);

  useEffect(() => {
    new THREE.TextureLoader().loadAsync(url).then((data) => {
      setTextureSize([data.source.data.width, data.source.data.height]);
      setTexture(data);
    });
  }, [url]);

  useEffect(() => {
    if (refMesh) {
      refMesh.material.uType = type;
    }
  }, [type, refMesh]);

  useEffect(() => {
    if (refMesh) {
      const material = new EmergeMaterial({
        uTime: 0,
        uFillColor: new THREE.Color("#403fb7"),
        transparent: true,
        uTexture: texture,
        uPixels: PIXELS,
        uTextureSize: new THREE.Vector2(textureSize[0], textureSize[1]),
        uElementSize: new THREE.Vector2(elementSize[0], elementSize[1]),
      });
      refMesh.material = material;
    }
  }, [refMesh, texture, textureSize, elementSize]);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (refMesh?.material) {
        timeRef.current += 0.016; // Approximately 60 FPS
        refMesh.material.uTime = timeRef.current;
        refMesh.material.uProgress = smoothProgress.get();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [refMesh, smoothProgress]);

  useEffect(() => {
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
      <motion.mesh ref={setRefMesh}>
        <meshStandardMaterial />
        <planeGeometry args={[1, 1]} />
      </motion.mesh>
    </View>
  );
}
