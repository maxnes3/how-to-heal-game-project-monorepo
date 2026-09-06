import { useTranslation } from 'react-i18next';
import { Article } from '../../article';
import { Button } from '../../button';
import { Text } from '../../text';

interface Props {
  onBackClick?: VoidFunction;
}

const SettingsArticle: React.FC<Props> = ({ onBackClick }) => {
  const { t } = useTranslation('ui');

  const handleSaveSettingsClick = () => {};

  return (
    <Article>
      <Button onClick={onBackClick}>
        <Text>{t('settings.back')}</Text>
      </Button>
      <Button type="submit" onClick={handleSaveSettingsClick}>
        <Text>{t('settings.save')}</Text>
      </Button>
    </Article>
  );
};

export default SettingsArticle;
