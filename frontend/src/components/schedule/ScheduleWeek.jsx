import { useSchedule } from '../../contexts/ScheduleContext';
import { getCurrentWeekType } from '../../utils/scheduleUtils';
import { ScheduleDay } from './ScheduleDay';
import styles from './ScheduleWeek.module.css';

export const ScheduleWeek = () => {
  const { schedule, loading, error, getClassesForDay } =
    useSchedule();
  const currentWeekType = getCurrentWeekType();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading schedule: {error}</p>
      </div>
    );
  }

  if (!schedule) {
    return null;
  }

  // Get all weekdays that have classes (1-6 for Monday-Saturday)
  const weekdays = [1, 2, 3, 4, 5, 6];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Week {currentWeekType.toUpperCase()}
        </h2>
      </div>

      <div className={styles.grid}>
        {weekdays.map((weekday) => (
          <ScheduleDay
            key={weekday}
            weekday={weekday}
            classes={getClassesForDay(weekday, currentWeekType)}
          />
        ))}
      </div>
    </div>
  );
};
