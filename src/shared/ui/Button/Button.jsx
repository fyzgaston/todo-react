import classNames from 'classnames'
import styles from './Button.module.scss'

const Button = (props) => {
  const {
    variant = 'primary',
    type= 'button',
    children,
    isDisabled,
    onClick,
  } = props

  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button