import styles from "./Loader.module.scss"
export default function Loader({ isLoading }) {
  return isLoading ? <i className={styles.loader} /> : null
}
