import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Shovel } from "lucide-react";

interface IslandGameProps {
  onDig: (x: number, y: number) => void;
}

export function IslandGame({ onDig }: IslandGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create character (pixel-art style cube with textures)
    const characterGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.2);
    const textureLoader = new THREE.TextureLoader();
    
    // Create a simple pixel-art style texture (you can replace this with actual sprite textures)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw a simple pixel-art character
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = '#FF6B6B';
      ctx.fillRect(4, 4, 24, 24);
      ctx.fillStyle = '#4ECDC4';
      ctx.fillRect(8, 8, 8, 8);
      ctx.fillRect(16, 8, 8, 8);
    }
    
    const characterTexture = new THREE.CanvasTexture(canvas);
    characterTexture.magFilter = THREE.NearestFilter;
    const characterMaterial = new THREE.MeshBasicMaterial({ map: characterTexture });
    const character = new THREE.Mesh(characterGeometry, characterMaterial);
    scene.add(character);

    // Ground with grid texture
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const gridCanvas = document.createElement('canvas');
    gridCanvas.width = 512;
    gridCanvas.height = 512;
    const gridCtx = gridCanvas.getContext('2d');
    if (gridCtx) {
      gridCtx.fillStyle = '#90EE90';
      gridCtx.fillRect(0, 0, 512, 512);
      gridCtx.strokeStyle = '#ffffff';
      gridCtx.lineWidth = 2;
      for (let i = 0; i <= 10; i++) {
        const pos = (i / 10) * 512;
        gridCtx.beginPath();
        gridCtx.moveTo(pos, 0);
        gridCtx.lineTo(pos, 512);
        gridCtx.stroke();
        gridCtx.beginPath();
        gridCtx.moveTo(0, pos);
        gridCtx.lineTo(512, pos);
        gridCtx.stroke();
      }
    }
    
    const groundTexture = new THREE.CanvasTexture(gridCanvas);
    const groundMaterial = new THREE.MeshBasicMaterial({ 
      map: groundTexture,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);

    // Animation loop with smooth movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update character position based on active direction
      const moveSpeed = 0.05;
      if (activeDirection === 'up' && position.y > -4.5) {
        setPosition(prev => ({ ...prev, y: prev.y - moveSpeed }));
        character.position.z = position.y - moveSpeed;
      }
      if (activeDirection === 'down' && position.y < 4.5) {
        setPosition(prev => ({ ...prev, y: prev.y + moveSpeed }));
        character.position.z = position.y + moveSpeed;
      }
      if (activeDirection === 'left' && position.x > -4.5) {
        setPosition(prev => ({ ...prev, x: prev.x - moveSpeed }));
        character.position.x = position.x - moveSpeed;
      }
      if (activeDirection === 'right' && position.x < 4.5) {
        setPosition(prev => ({ ...prev, x: prev.x + moveSpeed }));
        character.position.x = position.x + moveSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [position, activeDirection]);

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
      
      {/* D-pad style controls */}
      <div className="absolute bottom-20 left-8 w-32 h-32 grid grid-cols-3 gap-1">
        <div /> {/* Empty cell */}
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 dark:bg-black/80"
          onMouseDown={() => setActiveDirection('up')}
          onMouseUp={() => setActiveDirection(null)}
          onMouseLeave={() => setActiveDirection(null)}
          onTouchStart={() => setActiveDirection('up')}
          onTouchEnd={() => setActiveDirection(null)}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <div /> {/* Empty cell */}
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 dark:bg-black/80"
          onMouseDown={() => setActiveDirection('left')}
          onMouseUp={() => setActiveDirection(null)}
          onMouseLeave={() => setActiveDirection(null)}
          onTouchStart={() => setActiveDirection('left')}
          onTouchEnd={() => setActiveDirection(null)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div /> {/* Empty cell */}
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 dark:bg-black/80"
          onMouseDown={() => setActiveDirection('right')}
          onMouseUp={() => setActiveDirection(null)}
          onMouseLeave={() => setActiveDirection(null)}
          onTouchStart={() => setActiveDirection('right')}
          onTouchEnd={() => setActiveDirection(null)}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div /> {/* Empty cell */}
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 dark:bg-black/80"
          onMouseDown={() => setActiveDirection('down')}
          onMouseUp={() => setActiveDirection(null)}
          onMouseLeave={() => setActiveDirection(null)}
          onTouchStart={() => setActiveDirection('down')}
          onTouchEnd={() => setActiveDirection(null)}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <div /> {/* Empty cell */}
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