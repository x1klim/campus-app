import { useSchedule } from '../contexts/ScheduleContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
import styles from './SettingsView.module.css';
import Header from '../components/navigation/Header';
import SettingGroup from '../components/settings/SettingGroup';
import SettingSelect from '../components/settings/SettingSelect';

const SettingsView = () => {
  const {
    selectedGroup,
    setSelectedGroup,
    selectedSubgroup,
    setSelectedSubgroup,
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
    <>
      <Header title={t('navigation.settings')} />
      <div className={styles.container}>
        <SettingGroup name={t('settings.general.title')}>
          <SettingSelect
            label={t('settings.general.group')}
            value={selectedGroup}
            onChange={handleGroupChange}
            options={[{ value: 'iuk2-61b', label: 'ИУК2-61Б' }]}
          />
          <SettingSelect
            label={t('settings.general.subgroup')}
            value={selectedSubgroup}
            onChange={handleSubgroupChange}
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
            ]}
          />
        </SettingGroup>
        <SettingGroup name={t('settings.appearance.title')}>
          <SettingSelect
            label={t('settings.appearance.language')}
            value={i18n.language}
            onChange={handleLanguageChange}
            options={[
              { value: 'ru', label: '🇷🇺' },
              { value: 'en', label: '🇺🇸' },
            ]}
          />
        </SettingGroup>
      </div>
    </>
  );
};

export default SettingsView;
