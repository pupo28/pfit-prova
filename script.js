// Dichiarazione delle variabili globali per i valori delle opzioni selezionate
var pesiCorpoLiberoString, obiettivoString, intensitaString, genereString, perditaGrassoString,
  frequenzaAllenamentoString, areaPiuSviluppataString, primoGruppoMenoSviluppatoString,
  secondoGruppoMenoSviluppatoString;

// Definisci una funzione per stampare i valori
function stampaValori() {
  // Assegna i valori alle variabili globali
  pesiCorpoLiberoString = document.getElementById("pesiCorpoLibero").options[document.getElementById("pesiCorpoLibero").selectedIndex].text;
  obiettivoString = document.getElementById("obiettivo").options[document.getElementById("obiettivo").selectedIndex].text;
  intensitaString = document.getElementById("intensita").options[document.getElementById("intensita").selectedIndex].text;
  genereString = document.getElementById("genere").options[document.getElementById("genere").selectedIndex].text;
  perditaGrassoString = document.getElementById("perditaGrasso").options[document.getElementById("perditaGrasso").selectedIndex].text;
  frequenzaAllenamentoString = document.getElementById("frequenzaAllenamento").options[document.getElementById("frequenzaAllenamento").selectedIndex].text;
  areaPiuSviluppataString = document.getElementById("areaPiuSviluppata").options[document.getElementById("areaPiuSviluppata").selectedIndex].text;
  primoGruppoMenoSviluppatoString = document.getElementById("primoGruppoMenoSviluppato").options[document.getElementById("primoGruppoMenoSviluppato").selectedIndex].text;
  secondoGruppoMenoSviluppatoString = document.getElementById("secondoGruppoMenoSviluppato").options[document.getElementById("secondoGruppoMenoSviluppato").selectedIndex].text;

  // Stampa i valori ottenuti sulla console
  console.log("Valore pesiCorpoLibero:", pesiCorpoLiberoString);
  console.log("Valore obiettivo:", obiettivoString);
  console.log("Valore intensita:", intensitaString);
  console.log("Valore genere:", genereString);
  console.log("Valore perditaGrasso:", perditaGrassoString);
  console.log("Valore frequenzaAllenamento:", frequenzaAllenamentoString);
  console.log("Valore areaPiuSviluppata:", areaPiuSviluppataString);
  console.log("Valore primoGruppoMenoSviluppato:", primoGruppoMenoSviluppatoString);
  console.log("Valore secondoGruppoMenoSviluppato:", secondoGruppoMenoSviluppatoString);
}

// Aggiungi un gestore di eventi per l'evento change di ogni menu a discesa
document.getElementById("pesiCorpoLibero").addEventListener("change", stampaValori);
document.getElementById("obiettivo").addEventListener("change", stampaValori);
document.getElementById("intensita").addEventListener("change", stampaValori);
document.getElementById("genere").addEventListener("change", stampaValori);
document.getElementById("perditaGrasso").addEventListener("change", stampaValori);
document.getElementById("frequenzaAllenamento").addEventListener("change", stampaValori);
document.getElementById("areaPiuSviluppata").addEventListener("change", stampaValori);
document.getElementById("primoGruppoMenoSviluppato").addEventListener("change", stampaValori);
document.getElementById("secondoGruppoMenoSviluppato").addEventListener("change", stampaValori);

// Gestore dell'evento submit del form
document.getElementById("trainingForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Blocca l'invio del form
  document.getElementById("trainingForm").reset(); // Pulisci il form
  // Nascondi tutto tranne il titolo
  document.getElementById("container").style.display = "none";
  document.getElementById("submitButton").style.display = "none";
  document.getElementById("backButton").style.display = "none";
  document.getElementById("nextButton").style.display = "none";
  document.getElementsByTagName("h1")[0].style.display = "block";
  if (secondoGruppoMenoSviluppatoString === "Seleziona una risposta" || secondoGruppoMenoSviluppatoString === "") {
    secondoGruppoMenoSviluppatoString = "null";
  }

  // Funzione per aggiungere il testo gradualmente con un effetto di scrittura
  async function writeText(element, text, delay) {
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === '<') {
        let closingIndex = text.indexOf('>', i);
        let tag = text.slice(i, closingIndex + 1);
        element.innerHTML += tag;
        i = closingIndex;
      } else {
        element.innerHTML += text.charAt(i);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  var reportTitle = `
  <h1>Preferisci apportare una modifica o confermare?</h1>
`;

  var reportDetails = `
  <p>Preferenza tra pesi e corpo libero: ${pesiCorpoLiberoString}</p>
  <p>Obiettivo specifico di allenamento: ${obiettivoString}</p>
  <p>Livello di esperienza: ${intensitaString}</p>
  <p>Genere: ${genereString}</p>
  <p>Obiettivo di perdita di grasso: ${perditaGrassoString}</p>
  <p>Frequenza di allenamento settimanale: ${frequenzaAllenamentoString}</p>
  <p>Gruppo muscolare dominante: ${areaPiuSviluppataString}</p>
  <p>Primo gruppo muscolare da sviluppare: ${primoGruppoMenoSviluppatoString}</p>
`;

  var reportTitleElement = document.getElementById("reportDetailsTitle");
  var reportDetailsElement = document.getElementById("reportDetailsDown");
  reportTitleElement.innerHTML = ''; // Pulisci il contenuto dell'elemento
  reportDetailsElement.innerHTML = '';
  await writeText(reportTitleElement, reportTitle, 15);
  await writeText(reportDetailsElement, reportDetails, 15);
  if (secondoGruppoMenoSviluppatoString !== "null") {
    var reportSecondoGruppoMenoSviluppatoString = `
<p>Secondo gruppo muscolare da sviluppare: ${secondoGruppoMenoSviluppatoString}</p>
`;
    await writeText(reportDetailsElement, reportSecondoGruppoMenoSviluppatoString, 15); // Imposta un ritardo di 50ms tra i caratteri
  }

  // Gestione pulsante per generare una scheda
  const submitFinalButton = document.getElementById('submitFinalButton');
  submitFinalButton.style.display = 'block';
  submitFinalButton.addEventListener("click", async function (e) {
    document.getElementById("reportDetails").style.display = "none"; // Nascondi l'elemento reportDetails
    document.getElementById("reportTrainingProgram").style.display = "block"; // Mostra il nuovo contenitore della scheda

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

    // Funzione che raccoglie i valori della scheda
    function binderExerciseSeriesRepetitions(raccoglitore, esercizio, seriePerEsercizio) {
      const ripetizioni = generaNumeroCasualePari(6, 12);
      raccoglitore = raccoglitore + "<p>";
      raccoglitore = raccoglitore + esercizio + " " + seriePerEsercizio + "x" + ripetizioni;
      raccoglitore = raccoglitore + "</p>";
      return raccoglitore;
    }

    // Gestisce l'intensità dell'allenamento
    let seriePerGruppoSettimanale;
    let seriePerEsercizio = 4;
    let nEsercizi;
    if (intensitaString === "Principiante") {
      seriePerGruppoSettimanale = 15;
      seriePerEsercizio = 3;
    } else if (intensitaString === "Intermedio") {
      seriePerGruppoSettimanale = 20;
    } else {
      seriePerGruppoSettimanale = 24;
    }
    nEsercizi = (seriePerGruppoSettimanale / seriePerEsercizio) + 2;
    
    // Gestisce il/i gruppo/i muscolare/i meno sviluppato/i
    const gruppiMenoSviluppati = [];
    gruppiMenoSviluppati.push(primoGruppoMenoSviluppatoString);
    if (secondoGruppoMenoSviluppatoString === "null") {
      gruppiMenoSviluppati.push(secondoGruppoMenoSviluppatoString);
    }

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

    var reportTrainingProgramTitle = `
    <h1>Ecco il tuo programma di allenamento personalizzato</h1>
  `;
      var reportTrainingProgramTitleElement = document.getElementById("reportTrainingProgramTitle");
      reportTrainingProgramTitleElement.innerHTML = '';
      await writeText(reportTrainingProgramTitleElement, reportTrainingProgramTitle, 15);

    // Partizione di codice che si esegue solo se l'utente seleziona "Pesi"
    if (pesiCorpoLiberoString === "Pesi") {
      var raccoglitore = "";
      // Nel caso in cui frequenzaAllenamentoString === 1
      if (frequenzaAllenamentoString === 1) {
        raccoglitore += "<p>" + giorniSettimana[0] + ": Giorno 1) Full Body" + "</p>";
        for (let i = 1; i < 7; i++) {
          raccoglitore += "<p>" + giorniSettimana[i] + ": Riposo" + "</p>";
        }
      }

      // Nel caso in cui frequenzaAllenamentoString === 2
      if (frequenzaAllenamentoString === "2 volte") {
        raccoglitore += "<p>" + giorniSettimana[0] + ": Giorno 1) Full Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[1] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[2] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[3] + ": Giorno 2) Full Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[4] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[5] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
      }

      // Nel caso in cui frequenzaAllenamentoString === 3
      if (frequenzaAllenamentoString === "3 volte") {
        raccoglitore += "<p>" + giorniSettimana[0] + ": Giorno 1) Push (Petto, Spalle, Tricipiti)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[1] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[2] + ": Giorno 2) Pull (Schiena, Bicipiti)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[3] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[4] + ": Giorno 3) Leg (Gambe, Glutei e Addome)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[5] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
      }
      
      if (frequenzaAllenamentoString === "4 volte") {
        raccoglitore += "<p>" + giorniSettimana[0] + ": Giorno 1) Upper Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[1] + ": Giorno 3) Lower Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[2] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[3] + ": Giorno 3) Upper Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[4] + ": Giorno 4) Lower Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[5] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
      }
      
      if (frequenzaAllenamentoString === "5 volte") {
        raccoglitore += "<p>" + giorniSettimana[0] + ": Giorno 1) Upper Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[1] + ": Giorno 2) Lower Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[2] + ": Riposo" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[3] + ": Giorno 3) Upper Body" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[4] + ": Giorno 4) Lower Body" + "</p>";
        if (gruppiMenoSviluppati.length === 2) {
          raccoglitore += "<p>" + giorniSettimana[5] + ": Giorno 5) " + gruppiMenoSviluppati[0] + " e " + gruppiMenoSviluppati[1] + "</p>";
        } else {
          raccoglitore += "<p>" + giorniSettimana[5] + ": " + gruppiMenoSviluppati[0] + "</p>";
        }
        raccoglitore += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
      }
      
      if (frequenzaAllenamentoString === "6 volte") {
        raccoglitore += "<p>" + giorniSettimana[0] + ": Giorno 1) Push (Petto, Spalle, Tricipiti)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[1] + ": Giorno 2) Pull (Schiena, Bicipiti)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[2] + ": Giorno 3) Leg (Gambe, Glutei e Addome)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[3] + ": Giorno 4) Push (Petto, Spalle, Tricipiti)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[4] + ": Giorno 5) Pull (Schiena, Bicipiti)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[5] + ": Giorno 6) Leg (Gambe, Glutei e Addome)" + "</p>";
        raccoglitore += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
      }   

      //stampa esercizi se la frequenzaAllenamentoString === 2
      if (frequenzaAllenamentoString === "2 volte") {
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
        var frequenzaAllenamento;
        switch (frequenzaAllenamentoString) {
          case "2 volte":
            frequenzaAllenamento = 2;
            break;
          case "3 volte":
            frequenzaAllenamento = 3;
            break;
          case "4 volte":
            frequenzaAllenamento = 4;
            break;
          case "5 volte":
            frequenzaAllenamento = 5;
            break;
          case "6 volte":
            frequenzaAllenamento = 6;
            break;
        }

        var reportTrainingProgramDownTwoElement = document.getElementById("reportTrainingProgramDownTwo");
        for (let j = 1; j < frequenzaAllenamento + 1; j++) {
          raccoglitore += "<p>Giorno " + j + "</p>";
          raccoglitore += "<p>Gruppo muscolare: Gambe</p>";
          for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiGambe[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Schiena</p>";
          for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiSchiena[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Petto</p>";
          for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiPetto[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Spalle</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiSpalle[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Tricipite</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiTricipite[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Bicipite</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiBicipite[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Addome</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiAddome[i], seriePerEsercizio);
          }
          raccoglitore += "<p>Gruppo muscolare: Polpacci</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            raccoglitore = binderExerciseSeriesRepetitions(raccoglitore, eserciziSceltiPolpacci[i], seriePerEsercizio);
          }
          dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
          dividiEserciziUnoGrande = dividiEserciziDueGrande;
          dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
          dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
        }
        console.log("GUARDA QUA: " + raccoglitore)
        await writeText(reportTrainingProgramDownTwoElement, raccoglitore, 15);
      }
    }








    

  });

});



