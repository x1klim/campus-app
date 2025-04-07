import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const Schedule = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('title');
  }, [t]);

  return (
    <div className={styles.container}>
      <p>Schedule</p>
    </div>
  );
};

export default Schedule;
