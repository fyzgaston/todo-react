import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import EditTaskForm from '@/features/edit-task/ui/EditTaskForm'

const EditDialog = (props) => {
  const {
    onClose,
    taskId,
    open,
    initialTitle,
    styles
  } = props

  const lastActiveRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    lastActiveRef.current = document.activeElement || null
    const prevEl = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevEl
    }
  },[])

  useEffect(() => {
    dialogRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  const node = (
    <div
      className={styles.dialog}
      role='dialog'
      aria-modal='true'
      aria-label='Редактировать задачу'
      tabIndex={-1}
      ref={dialogRef}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <h2 className={styles.title}>Изменить задачу</h2>
      <EditTaskForm
        styles={styles}
        taskId={taskId}
        initialValue={initialTitle}
      />
    </div>
  )

  return createPortal(node, document.body)
}

export default EditDialog