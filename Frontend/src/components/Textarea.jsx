export const Textarea = ({editableText, handleTextChange, setText, setAudioFile}) => {

    const handleClearText = () => {
        setText(null);
        setAudioFile(null);
    };

    return (
        <div className="mb-3" style={{ color: 'white' }}>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Transcribed Text:</label>
            <textarea 
                className="form-control" 
                id="ControlTextarea1" 
                rows="3"
                value={editableText}
                onChange={handleTextChange}
                style={{ marginTop: '20px' }}
            />
            <button className='btn btn-sm btn-danger mt-4' onClick={handleClearText}>X</button>
        </div>
    )
}
