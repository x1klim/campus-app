import { useSchedule } from '../contexts/ScheduleContext';
import styles from './GroupSelector.module.css';

export const GroupSelector = () => {
  const {
    selectedGroup,
    setSelectedGroup,
    selectedSubgroup,
    setSelectedSubgroup,
  } = useSchedule();

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label htmlFor="group" className={styles.label}>
          Group
        </label>
        <select
          id="group"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className={styles.select}
        >
          <option value="iuk2-61b">ИУК2-61Б</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="subgroup" className={styles.label}>
          Subgroup
        </label>
        <select
          id="subgroup"
          value={selectedSubgroup}
          onChange={(e) => setSelectedSubgroup(e.target.value)}
          className={styles.select}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
    </div>
  );
};
