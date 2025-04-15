import { formatWeekday } from '../../utils/scheduleUtils';
import styles from './DateButton.module.css';

const DateButton = ({
  date,
  isSelected,
  hasClasses,
  isToday = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick(date);
  };

  const buttonClasses = [
    styles.dateButton,
    isSelected ? styles.selected : '',
    !hasClasses ? styles.noClasses : '',
    isToday && !isSelected ? styles.today : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className={styles.dayName}>{formatWeekday(date)}</span>
      <div className={styles.dayNumber}>
        <div className={styles.dot} />
        <span>{date.getDate()}</span>
      </div>
    </button>
  );
};

export default DateButton;
