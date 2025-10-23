import Router from './routing/Router'
import TasksPage from '@/pages/TasksPage'
import TaskPage from '@/pages/TaskPage'
import './styles'
import EditDialogHost from '@/features/edit-task/'
import {TasksProvider} from '@/entities/todo'
import {ModalProvider} from '@/entities/todo/model/ModalContext'
import NotFoundPage from '@/pages/NotFoundPage';

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <NotFoundPage />
  }

  return (
    <>
      <TasksProvider>
        <ModalProvider>
          <Router routes={routes} />
          <EditDialogHost />
        </ModalProvider>
      </TasksProvider>
    </>
  )
}

export default App
