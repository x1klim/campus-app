import { useSchedule } from '../contexts/ScheduleContext';
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

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleSubgroupChange = (e) => {
    setSelectedSubgroup(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Schedule Preferences</h2>

        <div className={styles.formGroup}>
          <label htmlFor="group" className={styles.label}>
            Group
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
          <p className={styles.formHelp}>
            Select your academic group
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subgroup" className={styles.label}>
            Subgroup
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
            Select your subgroup for labs and exercises
          </p>
        </div>

        {schedule && (
          <div className={styles.selectedGroupInfo}>
            <h3 className={styles.groupName}>
              {schedule.group.name}
            </h3>
            <p className={styles.groupDetails}>
              Showing schedule for subgroup {selectedSubgroup}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsView;
