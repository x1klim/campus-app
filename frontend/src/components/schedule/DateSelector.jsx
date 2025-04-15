import DateButton from './DateButton';
import styles from './DateSelector.module.css';

const DateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
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

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={styles.container}>
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
            isToday={isToday(date)}
            onClick={onDateSelect}
          />
        ))
      ) : (
        <div className={styles.loadingDates}>...</div>
      )}
    </div>
  );
};

export default DateSelector;
