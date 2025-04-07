import { getWeekdayName } from '../../utils/scheduleUtils';
import { ScheduleClass } from './ScheduleClass';
import styles from './ScheduleDay.module.css';

export const ScheduleDay = ({ weekday, classes }) => {
  const weekdayName = getWeekdayName(weekday);

  return (
    <div className={styles.dayCard}>
      <h2 className={styles.dayTitle}>{weekdayName}</h2>
      {classes.length === 0 ? (
        <p className={styles.emptyState}>No classes scheduled</p>
      ) : (
        <div className={styles.classesList}>
          {classes.map((class_) => (
            <ScheduleClass key={class_.id} class_={class_} />
          ))}
        </div>
      )}
    </div>
  );
};
