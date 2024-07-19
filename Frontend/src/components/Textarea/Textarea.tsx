import { TextareaProps } from './TextareaType'
import messages from '../../utils/messages.json'

export const Textarea = ({
  editableText,
  handleTextChange,
  setText,
  setAudioFile,
}: TextareaProps) => {
  const handleClearText = () => {
    setText('')
    setAudioFile(null)
  }

  return (
    <div className="mb-3" style={{ color: 'white' }}>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        {messages['transcribed-text']}
      </label>
      <textarea
        className="form-control"
        id="ControlTextarea1"
        rows={3}
        value={editableText}
        onChange={handleTextChange}
        style={{ marginTop: '20px' }}
      />
      <button className="btn btn-sm btn-danger mt-4" onClick={handleClearText}>
        X
      </button>
    </div>
  )
}
