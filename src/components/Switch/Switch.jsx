import styles from "./Switch.module.scss"
export default function Switch(props) {
  return (
    <div className={`${styles.switch} ${props.checked && styles.checked}`}>
      <span>Imperial</span>
      <label htmlFor="unit_switcher">
        <span />
      </label>
      <input
        {...props}
        id="unit_switcher"
        type="checkbox"
      />
      <span>Metric</span>
    </div>
  )
}
