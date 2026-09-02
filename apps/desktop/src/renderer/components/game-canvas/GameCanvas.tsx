import React, { useEffect, useRef } from 'react';
import { PixiGameRenderer } from '@game/renderer';
import styles from './GameCanvas.module.css';

const GameCanvas: React.FC = () => {
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

  return <div ref={containerRef} className={styles.game_canvas} />;
};

export default React.memo(GameCanvas);
