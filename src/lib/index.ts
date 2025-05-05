export interface Position {
    text: string;
    subtitle: string|undefined;

    latitude: number;
    longitude: number;


    range: number;

    quizType: unknown;
}

// 45.998939, 8.740104
export const positions: Position[] = [
    {
        text: "Obiettivo: Raggiungi cologno centro...",
        subtitle: "Questo testo è un esempio di sottotitolo possiamo cambiare il testo in qualsiasi momento",
        latitude: 45.998939,
        longitude: 8.740104,
        range: 100,
        quizType: "none"
    }
]