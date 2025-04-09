import styles from './SettingToggle.module.css';

const SettingToggle = ({
  value,
  onChange,
  label,
  description = '',
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leading} onClick={onChange}>
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
      <Switch value={value} onChange={onChange} />
    </div>
  );
};

const Switch = ({ value, onChange }) => {
  return (
    <button
      className={`${styles.toggle} ${value ? styles.active : ''}`}
      onClick={onChange}
    >
      <div className={styles.knob} />
    </button>
  );
};

export default SettingToggle;
