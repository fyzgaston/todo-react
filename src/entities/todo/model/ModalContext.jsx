import {createContext, useMemo} from 'react'
import useModal from '@/entities/todo/model/useModal';

export const ModalContext = createContext({})

export const ModalProvider = (props) => {
  const { children } = props

  const {
    isEditOpen,
    setIsEditOpen,
    editingTask,
    setEditingTask,
    openEdit,
    closeEdit,
  } = useModal()

  const value = useMemo(() => ({
    isEditOpen,
    setIsEditOpen,
    editingTask,
    setEditingTask,
    openEdit,
    closeEdit,
  }), [
    isEditOpen,
    setIsEditOpen,
    editingTask,
    setEditingTask,
    openEdit,
    closeEdit,
  ])

  return (
    <ModalContext.Provider
      value={value}
    >
      {children}
    </ModalContext.Provider>
  )
}