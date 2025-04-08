import { useRef } from 'react';
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
  const scrollRef = useRef(null);

  // Calculate month and year display for current week
  const getWeekDisplay = () => {
    // Check if dates is undefined or empty
    if (!dates || dates.length === 0) {
      return 'Loading...';
    }

    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];

    if (firstDate.getMonth() === lastDate.getMonth()) {
      return firstDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    }

    return `${firstDate.toLocaleDateString('en-US', {
      month: 'short',
    })} - ${lastDate.toLocaleDateString('en-US', {
      month: 'short',
    })} ${firstDate.getFullYear()}`;
  };

  const hasClasses = (date) => {
    return datesWithClasses.some(
      (d) =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.weekInfo}>
        <span className={styles.weekPeriod}>{getWeekDisplay()}</span>
      </div>

      <div className={styles.container}>
        <button
          className={styles.navButton}
          onClick={onPreviousWeek}
          aria-label="Previous week"
        >
          <svg
            className={styles.navIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className={styles.datesContainer} ref={scrollRef}>
          <div className={styles.datesScroller}>
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
              <div className={styles.loadingDates}>
                Loading dates...
              </div>
            )}
          </div>
        </div>

        <button
          className={styles.navButton}
          onClick={onNextWeek}
          aria-label="Next week"
        >
          <svg
            className={styles.navIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
