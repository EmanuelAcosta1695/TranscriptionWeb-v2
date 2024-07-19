import React from 'react'
import messages from '../../utils/messages.json'
import allowedExtensions from '../../utils/allowedExtensions.json'

export const ClarificationComponent = () => {
  return (
    <>
      <div className="box">
        <ul>
          <li style={{ marginBottom: '10px' }}>{messages.warning}</li>
          <li style={{ marginBottom: '10px' }}>
            {messages['suported-extensions']}
            <br />
            {allowedExtensions['allowed-extensions']}
          </li>
        </ul>
      </div>
    </>
  )
}
