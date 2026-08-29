import { useEffect, useRef } from 'react';
import { PixiGameRenderer } from '@game/renderer';

const GameCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const renderer = new PixiGameRenderer();

    void renderer.initialize(containerRef.current);

    return () => {
      renderer.destroy();
    };
  }, []);

  return <div ref={containerRef} className="game-container" />;
};

export default GameCanvas;
