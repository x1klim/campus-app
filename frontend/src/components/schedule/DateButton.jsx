import { formatWeekday } from '../../utils/scheduleUtils';
import styles from './DateButton.module.css';

const DateButton = ({ date, isSelected, hasClasses, onClick }) => {
  const handleClick = () => {
    onClick(date);
  };

  return (
    <button
      className={`${styles.dateButton} ${
        isSelected ? styles.selected : ''
      } ${!hasClasses ? styles.noClasses : ''}`}
      onClick={handleClick}
    >
      <span className={styles.dayName}>{formatWeekday(date)}</span>
      <div className={styles.dayNumber}>
        <div className={styles.dot} />
        <span>{date.getDate()}</span>
      </div>
    </button>
  );
};

export default DateButton;
