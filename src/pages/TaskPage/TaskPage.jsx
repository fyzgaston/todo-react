import {useContext, useMemo} from 'react'
import Button from '@/shared/ui/Button'
import {ModalContext} from '@/entities/todo/model/ModalContext'
import {TasksContext} from '@/entities/todo'
import styles from './TaskPage.module.scss'

const TaskPage = (props) => {
  const { params } = props
  const taskId = params.id

  const {tasks} = useContext(TasksContext)
  const {openEdit} = useContext(ModalContext)

  const isLoading = tasks === null

  const task = useMemo(() => {
     return tasks?.find(t => String(t.id) === String(taskId)) || null
  }, [tasks, taskId])

  const hasError = !isLoading && !task

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (hasError) {
    return (
      <div className={styles.error}>
        <div>Task not found :(</div>
        <Button onClick={() => history.back()}>Назад</Button>
      </div>
    )
  }

  const handleClick = () => {
    openEdit({ id: task.id, title: task.title })
  }

  return (
    <div>
      <div className={styles.task}>
        <div className={styles.info}>
          <h1 className={styles.title}>{task.title}</h1>
          <p>{task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}</p>
        </div>
        <div className={styles.buttons}>
          <Button
            variant='secondary'
            type='button'
            onClick={() => window.history.back()}
          >
            Назад
          </Button>
          <Button
            variant='primary'
            type='button'
            onClick={handleClick}
          >
            Изменить
          </Button>
        </div>
      </div>

    </div>
  )
}

export default TaskPage