import { useNavigate } from 'react-router';
import { Button, Panel, Text } from '@app/renderer/components';

const MainScreen = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/game');
  };

  return (
    <Panel>
      <Text>Меню</Text>
      <Button onClick={handlePlayClick}>
        <Text>Играть</Text>
      </Button>
    </Panel>
  );
};

export default MainScreen;
