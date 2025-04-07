import { useSchedule } from '../contexts/ScheduleContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
import styles from './SettingsView.module.css';

const SettingsView = () => {
  const {
    selectedGroup,
    setSelectedGroup,
    selectedSubgroup,
    setSelectedSubgroup,
    schedule,
    loading,
  } = useSchedule();
  const { t } = useTranslation();

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleSubgroupChange = (e) => {
    setSelectedSubgroup(e.target.value);
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('navigation.settings')}</h1>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>
          {t('settings.schedulePreferences')}
        </h2>

        <div className={styles.formGroup}>
          <label htmlFor="group" className={styles.label}>
            {t('settings.group')}
          </label>
          <select
            id="group"
            value={selectedGroup}
            onChange={handleGroupChange}
            className={styles.select}
            disabled={loading}
          >
            <option value="iuk2-61b">ИУК2-61Б</option>
          </select>
          <p className={styles.formHelp}>{t('settings.groupHelp')}</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subgroup" className={styles.label}>
            {t('settings.subgroup')}
          </label>
          <select
            id="subgroup"
            value={selectedSubgroup}
            onChange={handleSubgroupChange}
            className={styles.select}
            disabled={loading}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <p className={styles.formHelp}>
            {t('settings.subgroupHelp')}
          </p>
        </div>

        {schedule && (
          <div className={styles.selectedGroupInfo}>
            <h3 className={styles.groupName}>
              {schedule.group.name}
            </h3>
            <p className={styles.groupDetails}>
              {t('settings.showingScheduleFor')} {selectedSubgroup}
            </p>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>
          {t('settings.languagePreferences')}
        </h2>

        <div className={styles.formGroup}>
          <label htmlFor="language" className={styles.label}>
            {t('settings.language')}
          </label>
          <select
            id="language"
            value={i18n.language}
            onChange={handleLanguageChange}
            className={styles.select}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
          <p className={styles.formHelp}>
            {t('settings.languageHelp')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
