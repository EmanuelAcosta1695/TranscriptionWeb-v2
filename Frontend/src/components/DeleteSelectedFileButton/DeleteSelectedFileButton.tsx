import { deleteSelectedFileButtonProps } from './DeleteSelectedFileButtonType'

export const DeleteSelectedFileButton = ({
  clearFileAndNotification,
}: deleteSelectedFileButtonProps) => {
  return (
    <button
      className="btn btn-sm btn-danger"
      onClick={clearFileAndNotification}
    >
      X
    </button>
  )
}
