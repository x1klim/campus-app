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
      <span className={styles.dayNumber}>{date.getDate()}</span>
    </button>
  );
};

export default DateButton;
