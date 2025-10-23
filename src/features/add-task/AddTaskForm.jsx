import Field from '@/shared/ui/Field'
import Button from '@/shared/ui/Button'
import { useContext, useState, useEffect, useRef } from 'react'
import { TasksContext } from '@/entities/todo'

const AddTaskForm = (props) => {
  const { styles } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const inputRef = useRef(null)

  const {
    addTask,
  } = useContext(TasksContext);

  const [error, setError] = useState('');

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = (event) => {
    event.preventDefault()

    if (!isNewTaskTitleEmpty) {
      addTask(
        clearNewTaskTitle,
        () => {setNewTaskTitle('')}
      )
    }
  }

  const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'Задача не может быть пустой' : '')
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label='Название задачи'
        id='new-task'
        ref={inputRef}
        error={error}
        value={newTaskTitle}
        onInput={onInput}
      />
      <Button
        type='submit'
        isDisabled={isNewTaskTitleEmpty}
      >
        Добавить
      </Button>
    </form>
  )
}

export default AddTaskForm