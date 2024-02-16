import { Document, Packer, Paragraph, TextRun } from "docx";

export const downloadWord = (audioFile, editableText) => {
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
    });
};