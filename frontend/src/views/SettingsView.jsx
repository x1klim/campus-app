import { useSchedule } from '../contexts/ScheduleContext';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
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
import { toggleBetaFeature } from '../utils/betaFeatures';

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

  // Beta features secret toggle
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    // Reset click count after 3 seconds of inactivity
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  const handleBetaClick = () => {
    // Clear any existing timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // Increment click count
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // If we reach 10 clicks, disable beta features
    if (newCount >= 10) {
      // Disable the hideTodayTab beta feature
      toggleBetaFeature('hideTodayTab', false);
      setClickCount(0);

      // Optional: Show a brief notification or feedback
      alert('Beta features disabled! Today tab is now available.');

      // Reload to apply changes
      window.location.reload();
    } else {
      // Set a timer to reset click count after 3 seconds of inactivity
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };
  // End of beta features secret toggle

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
        <span
          className={styles.copyright}
          onClick={handleBetaClick}
          style={{ cursor: 'pointer' }}
        >
          // campus_beta
        </span>
      </div>
    </>
  );
};

export default SettingsView;
