import React from 'react';
import { GameContainer, OpenPauseModalButton } from '@app/renderer/components';

const GameScreen: React.FC = () => {
  return (
    <>
      <GameContainer />
      <OpenPauseModalButton />
    </>
  );
};

export default React.memo(GameScreen);
