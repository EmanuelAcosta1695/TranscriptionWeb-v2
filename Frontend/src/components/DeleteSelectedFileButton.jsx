export const DeleteSelectedFileButton = ({clearFileAndNotification}) => {
  return (
    <button className='btn btn-sm btn-danger' onClick={clearFileAndNotification}>X</button>
  )
}
