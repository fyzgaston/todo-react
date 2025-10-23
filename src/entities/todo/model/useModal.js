import {useCallback, useState} from 'react'

const useModal = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const openEdit = useCallback(({ id, title }) => {
    setEditingTask({ id, title });
    setIsEditOpen(true);
  }, [])

  const closeEdit = useCallback(() => {
      setIsEditOpen(false)
      setEditingTask(null)
  }, [])

  return {
    isEditOpen,
    setIsEditOpen,
    editingTask,
    setEditingTask,
    openEdit,
    closeEdit,
  }
}

export default useModal