import {ModalContext} from '@/entities/todo/model/ModalContext'
import {useContext} from 'react'
import EditDialog from '@/features/edit-task/ui/EditDialog'
import classNames from 'classnames'
import styles from './EditDialogHost.module.scss'

const EditDialogHost = () => {
  const {
    isEditOpen,
    editingTask,
    closeEdit,
  } = useContext(ModalContext)

  if (!isEditOpen || !editingTask) return null

  const handleClose = () => {
    closeEdit()
  }

  return (
    <>
      {isEditOpen && (
        <>
          <div
            className={classNames(styles.bg, {[styles.isOpen]: isEditOpen})}
            onMouseDown={closeEdit}
          ></div>

          <EditDialog
            styles={styles}
            open={isEditOpen}
            onClose={handleClose}
            taskId={editingTask?.id}
            initialTitle={editingTask?.title || ''}
          />
        </>
      )}
    </>
  )
}

export default EditDialogHost