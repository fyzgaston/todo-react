import styles from './Field.module.scss'

const Field = (props) => {
  const {
    classNames = '',
    id,
    label,
    type = 'text',
    onInput,
    value,
    ref,
    error,
  } = props

  const maxLength = value.length === 40

  return (
    <div className={`${styles.field} ${classNames}`}>
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ''}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
        ref={ref}
        maxLength={40}
      />
      {error && (
        <span className={styles.error} title={error}>{error}</span>
      )}
      {maxLength && (
        <span className={styles.error}>Максимальная длина 40 символов</span>
      )}
    </div>
  )
}

export default Field;