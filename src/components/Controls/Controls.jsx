import Switch from "../Switch/Switch"
import styles from "./Controls.module.scss"
export default function Controls({
  info,
  isSearchOpen,
  setIsSearchOpen,
  isMetricUnit,
  setIsMetricUnit,
  onSearch,
  geolocate
}) {
  const hasData = !!Object.keys(info).length

  return (
    <>
      {hasData && (
        <section className={styles.container}>
          {!isSearchOpen && (
            <div className={styles.controls}>
              <div className={styles.button_group}>
                <i
                  className={styles.search_icon}
                  onClick={() => setIsSearchOpen(prev => !prev)}
                />
                <i
                  className={styles.location_icon}
                  onClick={() => geolocate()}
                />
              </div>
              <Switch
                onChange={e => setIsMetricUnit(e.target.checked)}
                checked={isMetricUnit}
              />
            </div>
          )}
          {isSearchOpen && (
            <input
              className={styles.search}
              type="text"
              onKeyUp={onSearch}
              placeholder="Search by City Name"
            />
          )}
        </section>
      )}
    </>
  )
}
