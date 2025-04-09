import i18n from '../i18n/config';

/**
 * Formats time slot messages based on context and language
 * @param {Object} timeSlot - Time slot object with id, name, english_name, start_time
 * @param {string} context - Context for the message (lateStart, todayStart)
 */
export const formatTimeSlotMessage = (
  timeSlot,
  context = 'lateStart'
) => {
  const { t } = i18n;
  const language = i18n.language;

  if (timeSlot.id <= 5) {
    if (language === 'en') {
      const slotName =
        timeSlot.english_name || `Period ${timeSlot.id}`;
      const formattedTime = formatTimeForDisplay(timeSlot.start_time);

      return t(`timeSlots.${context}.en`, {
        slotName,
        slotNumber: timeSlot.id,
        startTime: formattedTime,
      });
    } else if (language === 'ru') {
      return t(`timeSlots.${context}.ru`, {
        slotName: t(
          `timeSlots.forms.${timeSlot.id}.${getGrammaticalForm(
            context
          )}`
        ),
        startTime: formatTimeForDisplay(timeSlot.start_time),
      });
    }
  }

  return t(`timeSlots.custom.${context}`, {
    startTime: formatTimeForDisplay(timeSlot.start_time),
  });
};

/**
 * Determines which grammatical form to use based on context
 */
const getGrammaticalForm = (context) => {
  switch (context) {
    case 'todayStart':
    case 'lateStart':
      return 'dative';
    default:
      return 'nominative';
  }
};

/**
 * Formats time for display based on locale
 */
const formatTimeForDisplay = (timeString) => {
  if (!timeString) return '';

  try {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: i18n.language === 'en',
    });
  } catch (e) {
    console.error('Error formatting time:', e);
    return timeString;
  }
};
