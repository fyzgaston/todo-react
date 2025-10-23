import Field from '@/shared/ui/Field'
import Button from '@/shared/ui/Button'
import {useContext, useMemo, useState, useEffect} from 'react'
import {ModalContext} from '@/entities/todo/model/ModalContext'
import {TasksContext} from '@/entities/todo';

const EditTaskForm = (props) => {
  const {
    taskId,
    initialValue = '',
    styles,
  } = props

  const {
    closeEdit,
  } = useContext(ModalContext)

  const {
    editTask,
    toggleTaskComplete,
    tasks,
  } = useContext(TasksContext)

  const task = useMemo(() => {
    return tasks?.find(t => String(t.id) === String(taskId)) || null
  }, [tasks, taskId])

  const [value, setValue] = useState(initialValue)
  const [checked, setChecked] = useState(task ? task.isDone : false)
  const [error, setError] = useState('');

  const clearNewTaskTitle = value.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0
  const nothingChanged = (checked === task.isDone) && (clearNewTaskTitle === task.title)

  useEffect(() => {
    if (task) {
      setValue(task.title)
      setChecked(task.isDone)
    }
  }, [task])

  const onSubmit = (event) => {
    event.preventDefault()

    if (!isNewTaskTitleEmpty) {
      editTask(taskId, clearNewTaskTitle)

      closeEdit()
      toggleTaskComplete(taskId, checked)
    }
  }

  const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setValue(value)
    setError(hasOnlySpaces ? 'Задача не может быть пустой' : '')
  }

  const handleClose = () => {
    closeEdit()
  }

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
    >
      <div className={styles.inner}>
        <Field
          label='Новое название'
          id='new-task-title'
          value={value}
          error={error}
          onInput={onInput}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className={styles.status}>
          <label
            className={styles.label}
            htmlFor={task.id}
          >
            Статус задачи:
          </label>
          <input
            className={styles.checkbox}
            id={taskId}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          variant='secondary'
          type='button'
          onClick={handleClose}
        >
          Закрыть
        </Button>
        <Button
          variant='primary'
          type='submit'
          isDisabled={nothingChanged || isNewTaskTitleEmpty}
        >
          Изменить
        </Button>
      </div>
    </form>
  )
}

export default EditTaskForm