const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, // Legge l'input dall'utente tramite il terminale
    output: process.stdout // Stampa gli output sulla console
});

// Funzione che si occupa di ricevere una risposta valida
function richiediNumero(messaggio, min, max) {
    return new Promise((resolve, reject) => {
        rl.question(messaggio, (numero) => {
            numero = parseInt(numero);
            if (isNaN(numero) || numero < min || numero > max) {
                console.log("Input non valido. Inserisci un numero valido.");
                resolve(richiediNumero(messaggio, min, max));
            } else {
                resolve(numero);
            }
        });
    });
}

// Funzione che si occupa di selezionare gli esercizi
function selezionaEserciziCasuali(eserciziPieni, nEsercizi, eserciziScelti) {
    const eserciziSelezionati = new Set(); // Utilizziamo un Set per garantire che non ci siano doppioni

    while (eserciziSelezionati.size < nEsercizi) {
        const indiceCasuale = Math.floor(Math.random() * eserciziPieni.length);
        const esercizioCasuale = eserciziPieni[indiceCasuale];
        eserciziSelezionati.add(esercizioCasuale);
    }

    eserciziSelezionati.forEach((esercizio) => {
        eserciziScelti.push(esercizio);
    });
}

// Funzione che si occupa di generare il numero di ripitizioni
function generaNumeroCasualePari(min, max) {
    const minPari = Math.ceil(min / 2) * 2; // Arrotondiamo verso l'alto il minimo al numero pari più vicino
    const maxPari = Math.floor(max / 2) * 2; // Arrotondiamo verso il basso il massimo al numero pari più vicino
    return Math.floor(Math.random() * ((maxPari - minPari) / 2 + 1)) * 2 + minPari; // Generiamo un numero casuale tra i numeri pari disponibili
}

// Funzione che stampa "nomeEsercizio Nserie x Nripitizioni"
function stampaEsercizioConSerie(esercizio, seriePerEsercizio) {
    const serie = generaNumeroCasualePari(6, 12);
    console.log(`${esercizio} ${seriePerEsercizio}x${serie}`);
}

// Funzione che stampa "Giorno: Riposo o gruppi muscolari"
function stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit) {
    let x = 0;
    for (let i = 0; i < giorniSettimana.length; i++) {
        if (giorniSplit[i] !== "Riposo") {
            x = x + 1;
        }
        console.log(
            giorniSettimana[i] +
            ": " +
            (giorniSplit[i] !== "Riposo" ? "Giorno " + x + ")" : "") +
            giorniSplit[i]
        );
    }
}

async function main() {
    // Gestisce l'intensità dell'allenamento
    const pesiCorpoLibero = await richiediNumero("Pesi o corpo libero?\n" +
        "1) Pesi\n" +
        "2) Corpo libero\n", 1, 2);

    // Gestisce l'intensità dell'allenamento
    const tipoAllenamento = (pesiCorpoLibero === 1) ? "Pesi" : "Corpo libero";
    let obiettivoString = "";
    if (tipoAllenamento === "Pesi") {
        const obiettivo = await richiediNumero("Qual è il tuo obiettivo specifico?\n" +
            "1) ipertrofia\n" +
            "2) forza\n" +
            "3) entrambi\n", 1, 3);
        if (obiettivo === 1) {
            obiettivoString = "ipertrofia";
        } else if (obiettivo === 2) {
            obiettivoString = "forza";
        } else {
            obiettivoString = "ipertrofia e forza";
        }
    }

    // Gestisce l'intensità dell'allenamento
    let intensitaString = "";
    let seriePerGruppoSettimanale;
    let seriePerEsercizio = 4;
    let nEsercizi;
    const intensita = await richiediNumero("Come ti consideri\n" +
        "1) principiante\n" +
        "2) intermedio\n" +
        "3) avanzato\n", 1, 3);
    if (intensita === 1) {
        intensitaString = "principiante";
        seriePerGruppoSettimanale = 15;
        seriePerEsercizio = 3;
    } else if (intensita === 2) {
        intensitaString = "intermedio";
        seriePerGruppoSettimanale = 20;
    } else {
        intensitaString = "avanzato";
        seriePerGruppoSettimanale = 24;
    }
    nEsercizi = (seriePerGruppoSettimanale / seriePerEsercizio) + 2;

    // Gestisce il sesso dell'utente
    const genere = await richiediNumero("Scheda indicata per una donna o un uomo?\n" +
        "1) donna\n" +
        "2) uomo\n", 1, 2);
    const genereString = (genere === 1) ? "donna" : "uomo";

    // Gestisce quello che concerne il cardio
    const perditaGrasso = await richiediNumero("Punti alla perdita di grasso?\n" +
        "1) Si\n" +
        "2) No\n", 1, 2);
    const perditaGrassoString = (perditaGrasso === 1) ? "Si" : "No";

    // Gestisce quello che concerne il numero di allenamenti
    const frequenzaAllenamento = await richiediNumero("Quante volte a settimana vorresti allenarti?\n", 1, 6);
    const frequenzaAllenamentoString = String(frequenzaAllenamento);

    // Gestisce il gruppo muscolare più sviluppato
    const areaPiuSviluppata = await richiediNumero(`Inserisci il tuo gruppo muscolare più sviluppato:\n` +
        "1) Polpacci\n" +
        "2) Petto\n" +
        "3) Spalle\n" +
        "4) Schiena\n" +
        "5) Addome\n" +
        "6) Bicipite\n" +
        "7) Tricipite\n" +
        "8) Gambe\n", 1, 8);
    let areaPiuSviluppataString = "";
    switch (areaPiuSviluppata) {
        case 1:
            areaPiuSviluppataString = "Polpacci";
            break;
        case 2:
            areaPiuSviluppataString = "Petto";
            break;
        case 3:
            areaPiuSviluppataString = "Spalle";
            break;
        case 4:
            areaPiuSviluppataString = "Schiena";
            break;
        case 5:
            areaPiuSviluppataString = "Addome";
            break;
        case 6:
            areaPiuSviluppataString = "Bicipite";
            break;
        case 7:
            areaPiuSviluppataString = "Tricipite";
            break;
        case 8:
            areaPiuSviluppataString = "Gambe";
            break;
    }

    // Gestisce il/i gruppo/i muscolare/i meno sviluppato/i
    const gruppiMenoSviluppati = [];
    let primoGruppoMenoSviluppatoString = "";

    do {
        const primoGruppoMenoSviluppato = await richiediNumero(
            "Inserisci il tuo primo gruppo muscolare meno sviluppato:\n" +
            "1) Polpacci\n" +
            "2) Petto\n" +
            "3) Spalle\n" +
            "4) Schiena\n" +
            "5) Addome\n" +
            "6) Bicipite\n" +
            "7) Tricipite\n" +
            "8) Gambe\n",
            1,
            8
        );
        switch (primoGruppoMenoSviluppato) {
            case 1:
                primoGruppoMenoSviluppatoString = "Polpacci";
                break;
            case 2:
                primoGruppoMenoSviluppatoString = "Petto";
                break;
            case 3:
                primoGruppoMenoSviluppatoString = "Spalle";
                break;
            case 4:
                primoGruppoMenoSviluppatoString = "Schiena";
                break;
            case 5:
                primoGruppoMenoSviluppatoString = "Addome";
                break;
            case 6:
                primoGruppoMenoSviluppatoString = "Bicipite";
                break;
            case 7:
                primoGruppoMenoSviluppatoString = "Tricipite";
                break;
            case 8:
                primoGruppoMenoSviluppatoString = "Gambe";
                break;
        }
        if (primoGruppoMenoSviluppatoString === areaPiuSviluppataString) {
            console.log(
                `Il gruppo muscolare ${primoGruppoMenoSviluppatoString} è già stato selezionato precedentemente. Seleziona un valore diverso.`
            );
        } else {
            gruppiMenoSviluppati.push(primoGruppoMenoSviluppatoString);
            break; // Esci dal ciclo "do-while" una volta che il primo gruppo muscolare è stato selezionato correttamente
        }
    } while (true);
    const sceltaSecondoGruppo = await richiediNumero(
        "Vuoi inserire un secondo gruppo muscolare meno sviluppato? (Scelta 1 per sì, 0 per no):\n",
        0,
        1
    );
    if (sceltaSecondoGruppo === 1) {
        do {
            const secondoGruppoMenoSviluppato = await richiediNumero(
                "Inserisci il tuo secondo gruppo muscolare meno sviluppato:\n" +
                "1) Polpacci\n" +
                "2) Petto\n" +
                "3) Spalle\n" +
                "4) Schiena\n" +
                "5) Addome\n" +
                "6) Bicipite\n" +
                "7) Tricipite\n" +
                "8) Gambe\n",
                1,
                8
            );
            let secondoGruppoMenoSviluppatoString = "";
            switch (secondoGruppoMenoSviluppato) {
                case 1:
                    secondoGruppoMenoSviluppatoString = "Polpacci";
                    break;
                case 2:
                    secondoGruppoMenoSviluppatoString = "Petto";
                    break;
                case 3:
                    secondoGruppoMenoSviluppatoString = "Spalle";
                    break;
                case 4:
                    secondoGruppoMenoSviluppatoString = "Schiena";
                    break;
                case 5:
                    secondoGruppoMenoSviluppatoString = "Addome";
                    break;
                case 6:
                    secondoGruppoMenoSviluppatoString = "Bicipite";
                    break;
                case 7:
                    secondoGruppoMenoSviluppatoString = "Tricipite";
                    break;
                case 8:
                    secondoGruppoMenoSviluppatoString = "Gambe";
                    break;
            }
            if (primoGruppoMenoSviluppatoString === secondoGruppoMenoSviluppatoString || secondoGruppoMenoSviluppatoString === areaPiuSviluppataString) {
                console.log(
                    `Il gruppo muscolare ${secondoGruppoMenoSviluppatoString} è già stato selezionato precedentemente. Seleziona un valore diverso.`
                );
            } else {
                gruppiMenoSviluppati.push(secondoGruppoMenoSviluppatoString);
                break; // Esci dal ciclo "do-while" una volta che il primo gruppo muscolare è stato selezionato correttamente
            }
        } while (true);
    }

    // Restituisce tutte le opzioni precedentemente selezionate
    let risultato = "Hai selezionato le seguenti opzioni:\n" +
        "Tipo di allenamento: " + tipoAllenamento + "\n" +
        (tipoAllenamento === "Pesi" ? "Obiettivo: " + obiettivoString + "\n" : "") +
        "Intensità: " + intensitaString + "\n" +
        "Genere: " + genereString + "\n" +
        "Perdita di grasso: " + perditaGrassoString + "\n" +
        "Frequenza allenamento: " + frequenzaAllenamentoString + " volte alla settimana\n" +
        "Gruppo muscolare più sviluppato: " + areaPiuSviluppataString;
    console.log(risultato);
    console.log("Gruppi muscolari deboli: " + (gruppiMenoSviluppati.length > 1 ? gruppiMenoSviluppati.join(", ") : gruppiMenoSviluppati[0]));

    // Vettori con esercizi per ogni gruppo muscolare. Pesi, Ipertrofia.
    const eserciziPesiIpertrofiaPolpacci = [
        "Squat con bilanciere",
        "Affondi con bilanciere",
        "Glute bridge con bilanciere",
        "Kickback con cavigliere",
        "Hip thrust con bilanciere",
        "Glute ham raise",
        "Step-up con bilanciere",
        "Abduction machine",
        "Deadlift rumeno con bilanciere",
        "Leg press"
    ];
    const eserciziPesiIpertrofiaPetto = [
        "Panca piana con bilanciere",
        "Panca inclinata con bilanciere",
        "Panca declinata con bilanciere",
        "Croci su panca piana con manubri",
        "Fly su macchina pec deck",
        "Push-up",
        "Dips sulle parallele",
        "Pressa inclinata con manubri",
        "Cable crossover",
        "Push-up con piedi elevati su fitball"
    ];
    const eserciziPesiIpertrofiaSpalle = [
        "Stampa militare con bilanciere",
        "Alzate laterali con manubri",
        "Alzate frontali con bilanciere",
        "Alzate posteriori con manubri",
        "Arnold press",
        "Shoulder press con manubri",
        "Rematore verticale con bilanciere",
        "Face pull con cavo",
        "Reverse fly su macchina posterior deltoid",
        "Clean and press con bilanciere"
    ];
    const eserciziPesiIpertrofiaSchiena = [
        "Trazioni alla sbarra",
        "Rematore con bilanciere",
        "Rematore con manubrio",
        "Pull-down al cavo",
        "Lat machine",
        "Good morning con bilanciere",
        "Hyperextension",
        "Deadlift con bilanciere",
        "Pulldown inverso",
        "Chin-up"
    ];
    const eserciziPesiIpertrofiaAddome = [
        "Crunch",
        "Plank",
        "Russian twist con palla medica",
        "Leg raises",
        "Mountain climbers",
        "Sit-up con declino",
        "Plank laterale",
        "Ab roller",
        "Cable crunch",
        "Bicycle crunch"
    ];
    const eserciziPesiIpertrofiaBicipite = [
        "Curl con bilanciere",
        "Curl con manubri",
        "Preacher curl con bilanciere",
        "Hammer curl con manubri",
        "Concentration curl",
        "Curl con cavo",
        "Drag curl",
        "Spider curl",
        "Reverse curl",
        "EZ bar curl"
    ];
    const eserciziPesiIpertrofiaTricipite = [
        "French press con bilanciere",
        "Dip su panca",
        "Dip alle parallele",
        "Tricep pushdown con cavo",
        "Tricep extension con manubrio",
        "Skull crusher con bilanciere",
        "Kickback con manubrio",
        "Close grip bench press",
        "Tricep dip machine",
        "Overhead tricep extension con bilanciere"
    ];
    const eserciziPesiIpertrofiaGambe = [
        "Squat con bilanciere",
        "Affondi con bilanciere",
        "Glute bridge con bilanciere",
        "Deadlift rumeno con bilanciere",
        "Leg press",
        "Stacchi da terra con bilanciere",
        "Calf raise con bilanciere",
        "Extension su macchina per quadricipiti",
        "Curl su macchina per femorali",
        "Hip thrust con bilanciere"
    ];

    // Vettori con esercizi selezionati
    const eserciziSceltiPolpacci = [];
    const eserciziSceltiPetto = [];
    const eserciziSceltiSpalle = [];
    const eserciziSceltiSchiena = [];
    const eserciziSceltiAddome = [];
    const eserciziSceltiBicipite = [];
    const eserciziSceltiTricipite = [];
    const eserciziSceltiGambe = [];

    // Richiamo della funzione selezionaEserciziCasuali per i gruppi muscolari
    selezionaEserciziCasuali(eserciziPesiIpertrofiaPolpacci, nEsercizi, eserciziSceltiPolpacci);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaPetto, nEsercizi, eserciziSceltiPetto);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSpalle, nEsercizi, eserciziSceltiSpalle);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSchiena, nEsercizi, eserciziSceltiSchiena);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaAddome, nEsercizi, eserciziSceltiAddome);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaBicipite, nEsercizi, eserciziSceltiBicipite);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaTricipite, nEsercizi, eserciziSceltiTricipite);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaGambe, nEsercizi, eserciziSceltiGambe);

    const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    const giorniSplit = [];
    let dividiEserciziUnoPiccolo;
    let dividiEserciziUnoGrande;
    let dividiEserciziDuePiccolo;
    let dividiEserciziDueGrande;

    // Partizione di codice che si esegue solo se l'utente seleziona "Pesi"
    if (pesiCorpoLibero === 1) {
        // Nel caso in cui frequenzaAllenamento === 1
        if (frequenzaAllenamento === 1) {
            giorniSplit[0] = "Full Body";
            for (let i = 1; i < 7; i++) {
                giorniSplit[i] = "Riposo";
            }
            stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit);
        }

        // Nel caso in cui frequenzaAllenamento === 2
        if (frequenzaAllenamento === 2) {
            giorniSplit[0] = "Full Body";
            giorniSplit[1] = "Riposo";
            giorniSplit[2] = "Riposo";
            giorniSplit[3] = "Full Body";
            giorniSplit[4] = "Riposo";
            giorniSplit[5] = "Riposo";
            giorniSplit[6] = "Riposo";
            stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit);
        }

        // Nel caso in cui frequenzaAllenamento === 3
        if (frequenzaAllenamento === 3) {
            giorniSplit[0] = "Push (Petto, Spalle, Tricipiti)";
            giorniSplit[1] = "Riposo";
            giorniSplit[2] = "Pull (Schiena, Bicipiti)";
            giorniSplit[3] = "Riposo";
            giorniSplit[4] = "Leg (Gambe, Glutei e Addome)";
            giorniSplit[5] = "Riposo";
            giorniSplit[6] = "Riposo";
            stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit);
        }

        // Nel caso in cui frequenzaAllenamento === 4
        if (frequenzaAllenamento === 4) {
            giorniSplit[0] = "Upper Body";
            giorniSplit[1] = "Lower Body";
            giorniSplit[2] = "Riposo";
            giorniSplit[3] = "Upper Body";
            giorniSplit[4] = "Lower Body";
            giorniSplit[5] = "Riposo";
            giorniSplit[6] = "Riposo";
            stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit);
        }

        // Nel caso in cui frequenzaAllenamento === 5
        if (frequenzaAllenamento === 5) {
            giorniSplit[0] = "Upper Body";
            giorniSplit[1] = "Lower Body";
            giorniSplit[2] = "Riposo";
            giorniSplit[3] = "Upper Body";
            giorniSplit[4] = "Lower Body";
            if (gruppiMenoSviluppati.length === 2) {
                giorniSplit[5] = gruppiMenoSviluppati[0] + " e " + gruppiMenoSviluppati[1];
            } else{
                giorniSplit[5] = gruppiMenoSviluppati[0];
            }
            giorniSplit[6] = "Riposo";
            stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit);
        }

        // Nel caso in cui frequenzaAllenamento === 6
        if (frequenzaAllenamento === 3) {
            giorniSplit[0] = "Push (Petto, Spalle, Tricipiti)";
            giorniSplit[1] = "Pull (Schiena, Bicipiti)";
            giorniSplit[2] = "Leg (Gambe, Glutei e Addome)";
            giorniSplit[3] = "Push (Petto, Spalle, Tricipiti)";
            giorniSplit[4] = "Pull (Schiena, Bicipiti)";
            giorniSplit[5] = "Leg (Gambe, Glutei e Addome)";
            giorniSplit[6] = "Riposo";
            stampaSplitAllenamentoSettimanale(giorniSettimana, giorniSplit);
        }

        // Stamapa Push, Pull, Leg, Push, Pull, Leg o Push, Pull, Leg. Quindi frequenzaAllenamento === 3 o 6
        if (frequenzaAllenamento === 6 || frequenzaAllenamento === 3) {
            let treOSei;
            if (frequenzaAllenamento === 6) {
                treOSei = 3;
            } else {
                treOSei = 2;
            }
            if (nEsercizi === 6) {
                dividiEserciziUnoPiccolo = 0;
                dividiEserciziUnoGrande = 0;
                dividiEserciziDuePiccolo = 2;
                dividiEserciziDueGrande = 3;
            } else {
                dividiEserciziUnoPiccolo = 0;
                dividiEserciziUnoGrande = 0;
                dividiEserciziDuePiccolo = 2;
                dividiEserciziDueGrande = 3;
            }
            for (let k = 1; k < treOSei; k++) {
                for (let j = 1; j < 4; j++) {
                    console.log("Giorno " + ((k - 1) * 3 + j));
                    // Stamapa Push
                    if (j === 1) {
                        console.log("Gruppo muscolare: Petto");
                        for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                            stampaEsercizioConSerie(eserciziSceltiPetto[i], seriePerEsercizio);
                        }
                        console.log("Gruppo muscolare: Spalle");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiSpalle[i], seriePerEsercizio);
                        }
                        console.log("Gruppo muscolare: Tricipite");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiTricipite[i], seriePerEsercizio);
                        }
                    }
                    // Stamapa Pull
                    if (j === 2) {
                        console.log("Gruppo muscolare: Schiena");
                        for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                            stampaEsercizioConSerie(eserciziSceltiSchiena[i], seriePerEsercizio);
                        }
                        console.log("Gruppo muscolare: Bicipite");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiBicipite[i], seriePerEsercizio);
                        }
                    }
                    // Stamapa Leg
                    if (j === 3) {
                        console.log("Gruppo muscolare: Gambe");
                        for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                            stampaEsercizioConSerie(eserciziSceltiGambe[i], seriePerEsercizio);
                        }
                        console.log("Gruppo muscolare: Polpacci");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiPolpacci[i], seriePerEsercizio);
                        }
                        console.log("Gruppo muscolare: Addome");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiAddome[i], seriePerEsercizio);
                        }
                        dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
                        dividiEserciziUnoGrande = dividiEserciziDueGrande;
                        dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
                        dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
                    }
                }
            }
        }

        //stampa esercizi se la frequenzaAllenamento === 1 o 2
        if (frequenzaAllenamento === 1 || frequenzaAllenamento === 2) {
            if (nEsercizi === 6) {
                dividiEserciziUnoPiccolo = 0;
                dividiEserciziUnoGrande = 0;
                dividiEserciziDuePiccolo = 1;
                dividiEserciziDueGrande = 2;
            } else {
                dividiEserciziUnoPiccolo = 0;
                dividiEserciziUnoGrande = 0;
                dividiEserciziDuePiccolo = 1;
                dividiEserciziDueGrande = 2;
            }
            for (let j = 1; j < frequenzaAllenamento + 1; j++) {
                console.log("Giorno " + j);
                console.log("Gruppo muscolare: Gambe");
                for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                    stampaEsercizioConSerie(eserciziSceltiGambe[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Schiena");
                for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                    stampaEsercizioConSerie(eserciziSceltiSchiena[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Petto");
                for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                    stampaEsercizioConSerie(eserciziSceltiPetto[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Spalle");
                for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                    stampaEsercizioConSerie(eserciziSceltiSpalle[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Tricipite");
                for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                    stampaEsercizioConSerie(eserciziSceltiTricipite[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Bicipite");
                for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                    stampaEsercizioConSerie(eserciziSceltiBicipite[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Addome");
                for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                    stampaEsercizioConSerie(eserciziSceltiAddome[i], seriePerEsercizio);
                }
                console.log("Gruppo muscolare: Polpacci");
                for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                    stampaEsercizioConSerie(eserciziSceltiPolpacci[i], seriePerEsercizio);
                }
                dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
                dividiEserciziUnoGrande = dividiEserciziDueGrande;
                dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
                dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
            }
        }

        //stampa esercizi se la frequenzaAllenamento === 4 o 5
        if (frequenzaAllenamento === 4 || frequenzaAllenamento === 5) {
            dividiEserciziUnoPiccolo = 0;
            dividiEserciziUnoGrande = 0;
            dividiEserciziDuePiccolo = 1;
            dividiEserciziDueGrande = 2;
            let dividiEserciziUnoPiccoloLower = 0;
            let dividiEserciziUnoGrandeLower = 0;
            let dividiEserciziDuePiccoloLower = 2;
            let dividiEserciziDueGrandeLower = 3;
            for (let j = 1; j < 5; j++) {
                // Stamapa Upper
                if (j === 1 || j === 3) {
                    console.log("Giorno " + j);
                    console.log("Gruppo muscolare: Schiena");
                    for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                        stampaEsercizioConSerie(eserciziSceltiSchiena[i], seriePerEsercizio);
                    }
                    console.log("Gruppo muscolare: Petto");
                    for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                        stampaEsercizioConSerie(eserciziSceltiPetto[i], seriePerEsercizio);
                    }
                    console.log("Gruppo muscolare: Spalle");
                    for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                        stampaEsercizioConSerie(eserciziSceltiSpalle[i], seriePerEsercizio);
                    }
                    console.log("Gruppo muscolare: Tricipite");
                    for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                        stampaEsercizioConSerie(eserciziSceltiTricipite[i], seriePerEsercizio);
                    }
                    console.log("Gruppo muscolare: Bicipite");
                    for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                        stampaEsercizioConSerie(eserciziSceltiBicipite[i], seriePerEsercizio);
                    }
                }
                // Stamapa Lower
                if (j === 2 || j === 4) {
                    console.log("Giorno " + j);
                    console.log("Gruppo muscolare: Gambe");
                    for (let i = dividiEserciziUnoGrandeLower; i < dividiEserciziDueGrandeLower; i++) {
                        stampaEsercizioConSerie(eserciziSceltiGambe[i], seriePerEsercizio);
                    }
                    console.log("Gruppo muscolare: Polpacci");
                    for (let i = dividiEserciziUnoPiccoloLower; i < dividiEserciziDuePiccoloLower; i++) {
                        stampaEsercizioConSerie(eserciziSceltiPolpacci[i], seriePerEsercizio);
                    }
                    console.log("Gruppo muscolare: Addome");
                    for (let i = dividiEserciziUnoPiccoloLower; i < dividiEserciziDuePiccoloLower; i++) {
                        stampaEsercizioConSerie(eserciziSceltiAddome[i], seriePerEsercizio);
                    }
                    dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
                    dividiEserciziUnoGrande = dividiEserciziDueGrande;
                    dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
                    dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
                    dividiEserciziUnoPiccoloLower = dividiEserciziDuePiccoloLower;
                    dividiEserciziUnoGrandeLower = dividiEserciziDueGrandeLower;
                    dividiEserciziDuePiccoloLower = dividiEserciziDuePiccoloLower * 2;
                    dividiEserciziDueGrandeLower = dividiEserciziDueGrandeLower * 2;
                }
            }
            if (frequenzaAllenamento === 5) {
                console.log("Giorno 5");
                if(gruppiMenoSviluppati.length != 2){
                    dividiEserciziDuePiccoloLower = dividiEserciziDuePiccoloLower - 1;
                    dividiEserciziDueGrandeLower = dividiEserciziDueGrandeLower -1;
                    dividiEserciziDueGrande = dividiEserciziDueGrande -1;
                    dividiEserciziDuePiccolo = dividiEserciziDuePiccolo - 1;
                } else {
                    dividiEserciziDuePiccoloLower = dividiEserciziDuePiccoloLower - 1;
                    dividiEserciziDueGrandeLower = dividiEserciziDueGrandeLower -1;
                    dividiEserciziDueGrande = dividiEserciziDueGrande -1;
                    dividiEserciziDuePiccolo = dividiEserciziDuePiccolo - 1;
                }
                for (let j = 0; j < gruppiMenoSviluppati.length; j++) {
                    if (gruppiMenoSviluppati[j] === "Polpacci") {
                        console.log("Gruppo muscolare: Polpacci");
                        for (let i = dividiEserciziUnoPiccoloLower; i < dividiEserciziDuePiccoloLower; i++) {
                            stampaEsercizioConSerie(eserciziSceltiPolpacci[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Gambe") {
                        console.log("Gruppo muscolare: Gambe");
                        for (let i = dividiEserciziUnoGrandeLower; i < dividiEserciziDueGrandeLower; i++) {
                            stampaEsercizioConSerie(eserciziSceltiGambe[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Petto") {
                        console.log("Gruppo muscolare: Petto");
                        for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                            stampaEsercizioConSerie(eserciziSceltiPetto[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Schiena") {
                        console.log("Gruppo muscolare: Schiena");
                        for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                            stampaEsercizioConSerie(eserciziSceltiSchiena[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Spalle") {
                        console.log("Gruppo muscolare: Spalle");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiSpalle[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Tricipiti") {
                        console.log("Gruppo muscolare: Tricipiti");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiTricipite[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Bicipiti") {
                        console.log("Gruppo muscolare: Bicipiti");
                        for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                            stampaEsercizioConSerie(eserciziSceltiBicipite[i], seriePerEsercizio);
                        }
                    } else if (gruppiMenoSviluppati[j] === "Addome") {
                        console.log("Gruppo muscolare: Addome");
                        for (let i = dividiEserciziUnoPiccoloLower; i < dividiEserciziDuePiccoloLower; i++) {
                            stampaEsercizioConSerie(eserciziSceltiAddome[i], seriePerEsercizio);
                        }
                    }
                }
            }
        }
    }

    // Pulisce e chiude l'interfaccia readline
    rl.close();
}

main();
