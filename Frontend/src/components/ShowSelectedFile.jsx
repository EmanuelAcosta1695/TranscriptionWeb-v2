import React, { useState } from 'react';
import { DeleteSelectedFileButton } from './DeleteSelectedFileButton';
import { Dropdown } from './Dropdown';
import { Textarea } from './Textarea';
import { fetchAudioToText } from '../helpers/fetchAudioToText';
import { downloadWord } from '../helpers/downloadWord';
import { downloadText } from '../helpers/downloadText';
import { downloadPdf } from '../helpers/downloadPdf';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileDownload, faFileWord, faFilePdf } from '@fortawesome/free-solid-svg-icons';

export const ShowSelectedFile = ({ clearFileAndNotification, audioFile, setAudioFile }) => {
    const [language, setLanguage] = useState('');
    const [text, setText] = useState(null);
    const [editableText, setEditableText] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleConvert = async () => {
        setIsLoading(true);

        try {
            const { data } = await fetchAudioToText(audioFile, language);
            console.log('Texto convertido:', data);
            setText(data.texto_transcrito);
            setEditableText(data.texto_transcrito); // Inicializa el texto editable con el texto convertido
            setIsLoading(false);
        } catch (error) {
            console.error('Error al convertir audio a texto:', error);
        }
    };

    const handleLanguageChange = selectedLanguage => {
        setLanguage(selectedLanguage);
    };

    const handleTextChange = event => {
        setEditableText(event.target.value); // Actualiza el texto editable cuando cambia
    };
    

    return (
        <div className="drop-zone">
            {isLoading ? 
                <div className="spinner-border text-light" style={{width: '3rem', height: '3rem'}} role="status">
                    <span className="sr-only"></span>
                </div>
                : 
                !text ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                            <p style={{ marginBottom: '5px', textDecoration: 'underline' }}>Selected audio file:</p>
                            <p style={{ marginBottom: '10px' }}>{audioFile.name}</p>
                            <DeleteSelectedFileButton clearFileAndNotification={clearFileAndNotification} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', marginTop: '5%' }}>
                            <p style={{ marginBottom: '10px' }}>What language is the file in?</p>
                            <Dropdown onLanguageChange={handleLanguageChange} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', marginTop: '6%' }}>
                            <p style={{ marginBottom: '3%' }}>Do you want to transcribe the selected audio?</p>
                            <button className='btn btn-success' onClick={handleConvert} disabled={!language}>Convertir</button>
                        </div>
                    </>
                ) : (
                    <>
                        <Textarea 
                            editableText={editableText} 
                            handleTextChange={handleTextChange}
                            setText={setText}
                            setAudioFile={setAudioFile}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button className='btn btn-primary m-1' onClick={() => downloadText((audioFile, editableText))}>
                                {/* <FontAwesomeIcon icon={faFileDownload} /> Download Text */}
                                Download Text
                            </button>
                            <button className='btn btn-primary m-1' onClick={() => downloadWord(audioFile, editableText)}>
                                {/* <FontAwesomeIcon icon={faFileWord} /> Download Word */}
                                Download Word
                            </button>
                            <button className='btn btn-primary m-1' onClick={downloadPdf}>
                                {/* <FontAwesomeIcon icon={faFilePdf} /> Download PDF */}
                                Download PDF
                            </button>
                        </div>
                    </>
                    )
            }
        </div>
    );
};

