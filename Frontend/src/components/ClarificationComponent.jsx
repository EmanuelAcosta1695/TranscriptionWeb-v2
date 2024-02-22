import React from 'react'

export const ClarificationComponent = () => {
  return (
    <>
        <div className='box'>
            <ul>
                <li style={{ marginBottom: '10px' }}>Only audio files without background noise and with good pronunciation will be perfectly transcribed.</li>
                <li style={{ marginBottom: '10px' }}>Supported extensions are: <br />.wav, .aiff, .aif, .flac, .mp3</li>
            </ul>
        </div>
    </>
  )
}
