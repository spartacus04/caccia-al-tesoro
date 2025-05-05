export interface Position {
    text: string;
    subtitle: string|undefined;

    latitude: number;
    longitude: number;


    range: number;

    quizType: CodeTrial;
}

export interface CodeTrial {
    type: "quiz";
    text: string;
    subtitle: string|undefined;
    answer: string;
}

// 45.998939, 8.740104
export const positions: Position[] = [
    {
        text: "Obiettivo: Raggiungi cologno centro...",
        subtitle: "Questo testo è un esempio di sottotitolo possiamo cambiare il testo in qualsiasi momento",
        latitude: 45.5278889,
        longitude: 9.283388888888888,
        range: 100,
        quizType: {
            type: "quiz",
            text: "In quale stazione di Cologno sei?",
            subtitle: "Questo testo è un esempio di sottotitolo bla bla bla",
            answer: "Centro"
        }
    }
]