import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { Shovel } from "lucide-react";

interface IslandGameProps {
  onDig: (x: number, y: number) => void;
}

export function IslandGame({ onDig }: IslandGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Grid
    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Character
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const material = new THREE.MeshBasicMaterial({ color: 0xff9900 });
    const character = new THREE.Mesh(geometry, material);
    scene.add(character);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x90EE90,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update character position based on joystick
      if (isDragging) {
        const newX = position.x + joystickPosition.x * 0.1;
        const newY = position.y + joystickPosition.y * 0.1;
        
        // Clamp position to grid
        if (newX >= -4.5 && newX <= 4.5) {
          setPosition(prev => ({ ...prev, x: newX }));
          character.position.x = newX;
        }
        if (newY >= -4.5 && newY <= 4.5) {
          setPosition(prev => ({ ...prev, y: newY }));
          character.position.z = newY;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [position, joystickPosition, isDragging]);

  const handleJoystickStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setJoystickPosition({ x: 0, y: 0 });
  };

  const handleJoystickMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    
    setJoystickPosition({ x, y });
  };

  const handleJoystickEnd = () => {
    setIsDragging(false);
    setJoystickPosition({ x: 0, y: 0 });
  };

  const handleDig = () => {
    const gridX = Math.round(position.x);
    const gridY = Math.round(position.y);
    onDig(gridX, gridY);
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div 
        ref={containerRef} 
        className="w-full h-full"
      />
      
      {/* Virtual joystick */}
      <div 
        className="absolute bottom-20 left-8 w-32 h-32 bg-black/20 rounded-full cursor-pointer"
        onMouseDown={handleJoystickStart}
        onMouseMove={handleJoystickMove}
        onMouseUp={handleJoystickEnd}
        onMouseLeave={handleJoystickEnd}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
      >
        <div 
          className="absolute w-16 h-16 bg-white/30 rounded-full"
          style={{
            left: `${50 + joystickPosition.x * 25}%`,
            top: `${50 - joystickPosition.y * 25}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Dig button */}
      <Button
        className="absolute bottom-20 right-8 w-16 h-16 rounded-full"
        onClick={handleDig}
      >
        <Shovel className="w-8 h-8" />
      </Button>
    </div>
  );
}