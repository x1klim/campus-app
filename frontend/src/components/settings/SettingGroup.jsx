import styles from './SettingGroup.module.css';

const SettingGroup = ({ name, children }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default SettingGroup;
