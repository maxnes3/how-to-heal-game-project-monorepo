import React from 'react';
import { GameContainer, OpenMenuModalButton } from '@app/renderer/components';

const GameScreen = () => {
  return (
    <>
      <GameContainer />
      <OpenMenuModalButton />
    </>
  );
};

export default React.memo(GameScreen);
