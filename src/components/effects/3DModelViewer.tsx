
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ModelViewerProps {
  className?: string;
}

const ModelViewer = ({ className }: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.background.convertSRGBToLinear();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    
    // Make background transparent
    renderer.setClearColor(0x000000, 0);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create cloud particle system
    const cloudParticles: THREE.Mesh[] = [];
    const loader = new THREE.TextureLoader();
    
    const cloudGeo = new THREE.PlaneGeometry(500, 500);
    
    // Use a simple white circle texture for cloud particles
    const cloudMaterial = new THREE.MeshLambertMaterial({
      color: 0x0ea5e9,
      opacity: 0.2,
      transparent: true,
    });
    
    // Create several cloud particles
    for (let p = 0; p < 25; p++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      cloud.rotation.x = Math.random() * 2 * Math.PI;
      cloud.rotation.y = Math.random() * 2 * Math.PI;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.1 + Math.random() * 0.2;
      cloud.scale.set(0.1 + Math.random() * 0.2, 0.1 + Math.random() * 0.2, 1);
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
    
    // Create a 3D text geometry for "DEVOPS"
    const fontLoader = new THREE.FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
      function (font) {
        const textGeometry = new THREE.TextGeometry("DEVOPS", {
          font: font,
          size: 0.8,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });
        
        textGeometry.computeBoundingBox();
        if (textGeometry.boundingBox) {
          const centerOffset = -0.5 * (
            textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x
          );
          const textMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0ea5e9,
            specular: 0x0ea5e9,
            shininess: 50
          });
          const text = new THREE.Mesh(textGeometry, textMaterial);
          text.position.x = centerOffset;
          text.position.y = -0.5;
          text.position.z = 0;
          scene.add(text);
        }
      }
    );
    
    // Add interactive rotating cloud mesh
    const cloudGeometry = new THREE.IcosahedronGeometry(2, 1);
    const cloudMesh = new THREE.Mesh(
      cloudGeometry,
      new THREE.MeshPhongMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );
    scene.add(cloudMesh);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Handle mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      frame += 0.01;
      
      // Rotate cloud particles
      cloudParticles.forEach(cloud => {
        cloud.rotation.z += 0.001;
      });
      
      // Rotate cloud mesh with smooth damping
      cloudMesh.rotation.x += (targetRotationX - cloudMesh.rotation.x) * 0.05;
      cloudMesh.rotation.y += (targetRotationY - cloudMesh.rotation.y) * 0.05;
      cloudMesh.rotation.z += 0.005;
      
      // Pulse effect
      const pulseScale = 1 + Math.sin(frame) * 0.05;
      cloudMesh.scale.set(pulseScale, pulseScale, pulseScale);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      
      // Dispose of resources
      cloudParticles.forEach(cloud => {
        cloud.geometry.dispose();
        (cloud.material as THREE.Material).dispose();
      });
      
      cloudMesh.geometry.dispose();
      (cloudMesh.material as THREE.Material).dispose();
      
      scene.clear();
    };
  }, []);
  
  return (
    <div ref={containerRef} className={className || "w-full h-full"} />
  );
};

export default ModelViewer;
