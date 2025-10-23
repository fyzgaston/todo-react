import { memo, useContext } from 'react'
import { TasksContext } from '@/entities/todo'
import RouterLink from '@/shared/ui/RouterLink'
import { highlightCaseInsensitive } from '@/shared/utils/highlight'
import Delete from '@/shared/assets/icons/icon-delete.svg?react'
import More from '@/shared/assets/icons/icon-more.svg?react'
import { ModalContext } from '@/entities/todo/model/ModalContext'
import styles from './TodoItem.module.scss'

const TodoItem = (props) => {
  const {
    className = '',
    id,
    title,
    isDone,
  } = props

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
    searchQuery,
  } = useContext(TasksContext)

  const {
    openEdit
  } = useContext(ModalContext)

  const highlightedTitle = highlightCaseInsensitive(title, searchQuery)

  const handleClick = () => {
    openEdit({id, title})
  }

  return (
    <li className={`
      ${styles.todoItem}
      ${className}
      ${disappearingTaskId === id ? styles.isDisappearing : ''}
      ${appearingTaskId === id ? styles.isAppearing : ''}
    `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({target}) => {
          toggleTaskComplete(id, target.checked)
        }}
      />
      <label
        className={`${styles.label} visually-hidden`}
        htmlFor={id}
      >
        {title}
      </label>
      <RouterLink className={styles.link} to={`tasks/${id}`} aria-label="Страница подробнее о задаче">
        <span className={styles.linklabel} dangerouslySetInnerHTML={{ __html: highlightedTitle }}></span>
      </RouterLink>
      <div className={styles.buttons}>
        <button
          className={styles.moreButton}
          aria-label="Подробнее"
          title="Подробнее"
          onClick={handleClick}
        >
          <More width={22} height={22} />
        </button>
        <button
          className={styles.deleteButton}
          aria-label="Удалить"
          title="Удалить"
          onClick={() => deleteTask(id)}
        >
          <Delete width={22} height={22} />
        </button>
      </div>
    </li>

  )
}

export default memo(TodoItem)