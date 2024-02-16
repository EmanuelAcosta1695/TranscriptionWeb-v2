
export const downloadText = () => {
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