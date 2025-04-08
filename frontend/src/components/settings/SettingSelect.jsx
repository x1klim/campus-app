import styles from './SettingSelect.module.css';

const SettingSelect = ({ value, onChange, options, label }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectContainer}>
        <select
          id={label}
          className={styles.select}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.arrow}>􀆊</div>
      </div>
    </div>
  );
};
export default SettingSelect;
