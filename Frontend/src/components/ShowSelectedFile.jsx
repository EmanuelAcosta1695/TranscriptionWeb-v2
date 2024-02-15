import React, { useState } from 'react';
import { DeleteSelectedFileButton } from './DeleteSelectedFileButton';
import { Dropdown } from './Dropdown';
import { fetchAudioToText } from '../helpers/fetchAudioToText';
import { Textarea } from './Textarea';
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from 'jspdf';
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

    const handleDownloadText = () => {
        const element = document.createElement("a");
    
        // Longitud máxima de caracteres por línea
        const maxLengthPerLine = 80;
    
        // Divide el texto en líneas de la longitud deseada
        let lines = [];
        for (let i = 0; i < editableText.length; i += maxLengthPerLine) {
            lines.push(editableText.substring(i, i + maxLengthPerLine));
        }
    
        // Une las líneas con saltos de línea
        const formattedText = lines.join('\n');
    
        const file = new Blob([formattedText], { type: 'text/plain' });
    
        // Verifica si el nombre del archivo termina en ".mp3"
        let fileName = audioFile.name;
        if (fileName.endsWith('.mp3')) {
            // Si termina en ".mp3", quita la extensión del nombre del archivo
            fileName = fileName.slice(0, -4);
        }
    
        // Asigna el nombre modificado al atributo "download" del elemento "a"
        element.href = URL.createObjectURL(file);
        element.download = fileName + '.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };
    

    const handleDownloadWord = () => {
        const doc = new Document({
            sections: [
                {
                    properties: {
                        title: audioFile.name,
                        author: 'TranscriptionWeb',
                        created: new Date(),
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(editableText),
                            ],
                        }),
                    ],
                },
            ],
        });
    
        Packer.toBlob(doc).then(blob => {
            // Crear un enlace de descarga
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);

            // Verifica si el nombre del archivo termina en ".mp3"
            let fileName = audioFile.name;
            if (fileName.endsWith('.mp3')) {
                // Si termina en ".mp3", quita la extensión del nombre del archivo
                fileName = fileName.slice(0, -4);
            }

            downloadLink.download = fileName + '.docx';

            // Agregar el enlace al documento y hacer clic en él para descargar el archivo
            document.body.appendChild(downloadLink);
            downloadLink.click();
    
            // Limpiar el enlace después de la descarga
            document.body.removeChild(downloadLink);
        });
    };

    // Función para descargar como archivo PDF
    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
    
        // Definir el tamaño y tipo de letra
        pdf.setFontSize(12);
        pdf.setFont('times', 'normal'); // Cambia 'times' y 'normal' según la fuente y el estilo que desees
    
        // Dividir el texto en líneas cada 60 caracteres (puedes ajustar este valor según tus necesidades)
        const lines = editableText.match(/.{1,110}/g);
    
        // Agregar cada línea al PDF con un salto de línea y aplicar formato
        lines.forEach((line, index) => {
            pdf.text(line, 10, 10 + index * 10); // Ajusta las coordenadas según tu diseño
        });
    
        // Verifica si el nombre del archivo termina en ".mp3"
        let fileName = audioFile.name;
        if (fileName.endsWith('.mp3')) {
            // Si termina en ".mp3", quita la extensión del nombre del archivo
            fileName = fileName.slice(0, -4);
        }
    
        // Guardar el PDF
        pdf.save(fileName + '.pdf');
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
                            <button className='btn btn-primary m-1' onClick={handleDownloadText}>
                                {/* <FontAwesomeIcon icon={faFileDownload} /> Download Text */}
                                Download Text
                            </button>
                            <button className='btn btn-primary m-1' onClick={handleDownloadWord}>
                                {/* <FontAwesomeIcon icon={faFileWord} /> Download Word */}
                                Download Word
                            </button>
                            <button className='btn btn-primary m-1' onClick={handleDownloadPDF}>
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

