import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

const ScheduleContext = createContext();

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error(
      'useSchedule must be used within a ScheduleProvider'
    );
  }
  return context;
};

export const ScheduleProvider = ({ children }) => {
  // Core schedule state
  const [schedule, setSchedule] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(() => {
    return localStorage.getItem('selectedGroup') || 'iuk2-61b';
  });
  const [selectedSubgroup, setSelectedSubgroup] = useState(() => {
    return localStorage.getItem('selectedSubgroup') || '1';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cache for requested schedules by group
  const [scheduleCache, setScheduleCache] = useState({});

  // Cache for week dates to improve performance
  const [weekDatesCache, setWeekDatesCache] = useState({});

  // Date/Week handling
  const getCurrentWeekType = useCallback(() => {
    // Simple implementation that alternates weeks based on current date
    // In a real app, this would be based on the academic calendar
    const weekNumber = Math.floor(
      (new Date().getTime() - new Date('2024-01-01').getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
    return weekNumber % 2 === 0 ? 'a' : 'b';
  }, []);

  // Generate an array of dates for a given week offset from the current week
  const getCurrentWeekDates = useCallback(
    (weekOffset = 0) => {
      const key = `week_${weekOffset}`;

      // Check if we already have these dates calculated and cached
      if (weekDatesCache[key]) {
        return weekDatesCache[key];
      }

      const today = new Date();
      const currentDay = today.getDay() || 7; // Convert Sunday (0) to 7
      const firstDayOfWeek = new Date(today);

      // Adjust to the first day of the week (Monday)
      firstDayOfWeek.setDate(
        today.getDate() - currentDay + 1 + weekOffset * 7
      );

      // Generate an array of 7 days starting from Monday
      const dates = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + i);
        return day;
      });

      // We need to update the cache asynchronously to avoid the setState during render issue
      setTimeout(() => {
        setWeekDatesCache((prev) => ({
          ...prev,
          [key]: dates,
        }));
      }, 0);

      return dates;
    },
    [weekDatesCache]
  );

  // Determine if a date is in week A or B
  const getWeekTypeForDate = useCallback((date) => {
    const weekNumber = Math.floor(
      (date.getTime() - new Date('2024-01-01').getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
    return weekNumber % 2 === 0 ? 'a' : 'b';
  }, []);

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('selectedGroup', selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem('selectedSubgroup', selectedSubgroup);
  }, [selectedSubgroup]);

  // Fetch schedule with caching
  const fetchSchedule = useCallback(
    async (group = selectedGroup) => {
      // Check if we already have this schedule in the cache
      if (scheduleCache[group]) {
        setSchedule(scheduleCache[group]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/v1/schedule/${group}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch schedule for ${group}`);
        }

        const data = await response.json();

        // Update cache and current schedule
        setScheduleCache((prev) => ({
          ...prev,
          [group]: data,
        }));

        setSchedule(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedGroup, scheduleCache]
  );

  // Fetch schedule when selected group changes
  useEffect(() => {
    fetchSchedule();
  }, [selectedGroup, fetchSchedule]);

  // Calculate numeric weekday (1-7 for Monday-Sunday) from a date
  const getWeekdayNumber = useCallback((date) => {
    const day = date.getDay();
    return day === 0 ? 7 : day; // Convert Sunday (0) to 7
  }, []);

  // Get classes for a specific date
  const getClassesForDate = useCallback(
    (date) => {
      if (!schedule) return [];

      const weekday = getWeekdayNumber(date);
      const weekType = getWeekTypeForDate(date);

      const day = schedule.days.find((d) => d.weekday === weekday);
      if (!day) return [];

      return day.classes.filter((class_) => {
        // Filter by week type
        if (
          class_.week_type !== 'weekly' &&
          class_.week_type !== weekType
        ) {
          return false;
        }

        // Filter by subgroup
        if (
          class_.subgroup &&
          class_.subgroup !== parseInt(selectedSubgroup)
        ) {
          return false;
        }

        return true;
      });
    },
    [schedule, selectedSubgroup, getWeekdayNumber, getWeekTypeForDate]
  );

  // For compatibility with older components
  const getClassesForDay = useCallback(
    (weekday, weekType) => {
      if (!schedule) return [];

      const day = schedule.days.find((d) => d.weekday === weekday);
      if (!day) return [];

      return day.classes.filter((class_) => {
        // Filter by week type
        if (
          class_.week_type !== 'weekly' &&
          class_.week_type !== weekType
        ) {
          return false;
        }

        // Filter by subgroup
        if (
          class_.subgroup &&
          class_.subgroup !== parseInt(selectedSubgroup)
        ) {
          return false;
        }

        return true;
      });
    },
    [schedule, selectedSubgroup]
  );

  // Expose the API for components
  const value = useMemo(
    () => ({
      // Core state
      schedule,
      loading,
      error,
      selectedGroup,
      setSelectedGroup,
      selectedSubgroup,
      setSelectedSubgroup,

      // Date/Week management
      getCurrentWeekType,
      getCurrentWeekDates,
      getWeekTypeForDate,

      // Data access
      getClassesForDate,
      getClassesForDay,

      // Actions
      refetchSchedule: fetchSchedule,
    }),
    [
      schedule,
      loading,
      error,
      selectedGroup,
      setSelectedGroup,
      selectedSubgroup,
      setSelectedSubgroup,
      getCurrentWeekType,
      getCurrentWeekDates,
      getWeekTypeForDate,
      getClassesForDate,
      getClassesForDay,
      fetchSchedule,
    ]
  );

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
