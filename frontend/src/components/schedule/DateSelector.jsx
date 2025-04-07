import { useRef } from 'react';
import styles from './DateSelector.module.css';

const DateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
  onPreviousWeek,
  onNextWeek,
}) => {
  const scrollRef = useRef(null);

  const formatDate = (date) => {
    return date
      .toLocaleDateString('en-US', { weekday: 'short' })
      .substring(0, 3);
  };

  const isDateSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getFormattedDay = (date) => {
    return date.getDate();
  };

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

  const getWeekType = () => {
    // Check if dates is undefined or empty
    if (!dates || dates.length === 0) {
      return '';
    }

    // Simple implementation that alternates weeks
    const weekNumber = Math.floor(
      (dates[0].getTime() - new Date('2024-01-01').getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
    return weekNumber % 2 === 0 ? 'A' : 'B';
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.weekInfo}>
        <span className={styles.weekPeriod}>{getWeekDisplay()}</span>
        {getWeekType() && (
          <span className={styles.weekType}>
            Week {getWeekType()}
          </span>
        )}
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
                <button
                  key={index}
                  className={`${styles.dateButton} ${
                    isDateSelected(date) ? styles.selected : ''
                  }`}
                  onClick={() => onDateSelect(date)}
                >
                  <span className={styles.dayName}>
                    {formatDate(date)}
                  </span>
                  <span className={styles.dayNumber}>
                    {getFormattedDay(date)}
                  </span>
                </button>
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
