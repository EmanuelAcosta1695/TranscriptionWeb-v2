import jsPDF from 'jspdf';

export const downloadPdf = () => {
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