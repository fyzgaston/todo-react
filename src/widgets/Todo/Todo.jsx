import { useContext } from 'react'
import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'
import { TodoList } from '@/entities/todo'
import Button from '@/shared/ui/Button'
import { TasksContext } from '@/entities/todo'
import styles from './Todo.module.scss'

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext)

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>Список задач</h1>
      <AddTaskForm styles={styles}/>
      <SearchTaskForm styles={styles}/>
      <TodoInfo styles={styles}/>

      <Button
        variant='secondary'
        className={styles.firstIncompleteTaskButton}
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}
      >
        Показать первую незакрытую задачу
      </Button>
      <TodoList styles={styles}/>
    </div>
  )
}

export default Todo