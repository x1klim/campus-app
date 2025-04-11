import DateButton from './DateButton';
import styles from './DateSelector.module.css';

const DateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
  onPreviousWeek,
  onNextWeek,
  datesWithClasses = [],
}) => {
  const hasClasses = (date) => {
    return datesWithClasses.some(
      (d) =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.chevronButton}
        onClick={onPreviousWeek}
      >
        􀆉
      </button>
      {dates && dates.length > 0 ? (
        dates.map((date, index) => (
          <DateButton
            key={index}
            date={date}
            isSelected={
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear()
            }
            hasClasses={hasClasses(date)}
            onClick={onDateSelect}
          />
        ))
      ) : (
        <div className={styles.loadingDates}>Loading dates...</div>
      )}
      <button className={styles.chevronButton} onClick={onNextWeek}>
        􀆊
      </button>
    </div>
  );
};

export default DateSelector;
