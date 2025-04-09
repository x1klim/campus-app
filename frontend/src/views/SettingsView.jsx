import { useSchedule } from '../contexts/ScheduleContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18n from '../i18n/config';
import styles from './SettingsView.module.css';
import Header from '../components/navigation/Header';
import SettingGroup from '../components/settings/SettingGroup';
import SettingSelect from '../components/settings/SettingSelect';
import SettingToggle from '../components/settings/SettingToggle';
import {
  getUseShortSubjectNames,
  setUseShortSubjectNames,
} from '../utils/scheduleUtils';

const SettingsView = () => {
  const {
    selectedGroup,
    setSelectedGroup,
    selectedSubgroup,
    setSelectedSubgroup,
  } = useSchedule();
  const { t } = useTranslation();
  const [useShortSubjectNames, setUseShortNames] = useState(
    getUseShortSubjectNames()
  );

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleSubgroupChange = (e) => {
    setSelectedSubgroup(e.target.value);
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleToggleShortNames = () => {
    const newValue = !useShortSubjectNames;
    setUseShortNames(newValue);
    setUseShortSubjectNames(newValue);
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
          {i18n.language === 'ru' && (
            <SettingToggle
              label={t('settings.appearance.useShortSubjectNames')}
              description={t(
                'settings.appearance.useShortSubjectNamesDescription'
              )}
              value={useShortSubjectNames}
              onChange={handleToggleShortNames}
            />
          )}
        </SettingGroup>
      </div>
    </>
  );
};

export default SettingsView;
