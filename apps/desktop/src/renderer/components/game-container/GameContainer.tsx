import React, { useEffect, useRef } from 'react';
import { PixiGameRenderer } from '@game/renderer';
import { gameStore } from '@app/renderer/store';
import styles from './GameContainer.module.css';

const GameCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const renderer = new PixiGameRenderer(gameStore);
    void renderer.initialize(containerRef.current);

    return () => {
      renderer.destroy();
    };
  }, []);

  return <div ref={containerRef} className={styles.gameContainer} />;
};

export default React.memo(GameCanvas);
