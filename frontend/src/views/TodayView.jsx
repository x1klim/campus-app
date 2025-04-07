import { useSchedule } from '../contexts/ScheduleContext';
import DaySchedule from '../components/schedule/DaySchedule';
import styles from './TodayView.module.css';

const TodayView = () => {
  const { getCurrentWeekType } = useSchedule();
  const today = new Date();
  const weekType = getCurrentWeekType();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Today's Schedule</h1>
      <div className={styles.weekTypeIndicator}>
        <span className={styles.weekTypeLabel}>
          Week {weekType.toUpperCase()}
        </span>
      </div>
      <DaySchedule date={today} />
    </div>
  );
};

export default TodayView;
