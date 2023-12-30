// Dichiarazione delle variabili globali per i valori delle opzioni selezionate
var pesiCorpoLiberoString, obiettivoString, intensitaString, genereString, perditaGrassoString,
  frequenzaAllenamentoString, areaPiuSviluppataString, primoGruppoMenoSviluppatoString,
  secondoGruppoMenoSviluppatoString = "null";

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

  var data = {
    pesiCorpoLiberoString: pesiCorpoLiberoString,
    obiettivoString: obiettivoString,
    intensitaString: intensitaString,
    genereString: genereString,
    perditaGrassoString: perditaGrassoString,
    frequenzaAllenamentoString: frequenzaAllenamentoString,
    areaPiuSviluppataString: areaPiuSviluppataString,
    primoGruppoMenoSviluppatoString: primoGruppoMenoSviluppatoString,
    secondoGruppoMenoSviluppatoString: secondoGruppoMenoSviluppatoString
  };
  


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
  <p>Obiettivo specifico di allenamento: ${obiettivoString}</p>
    <p>Livello di esperienza: ${intensitaString}</p>
    <p>Genere: ${genereString}</p>
    <p>Obiettivo di perdita di grasso: ${perditaGrassoString}</p>
    <p>Preferenza tra pesi e corpo libero: ${pesiCorpoLiberoString}</p>
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
    function binderExerciseSeriesRepetitions(binderExercise, esercizio, seriePerEsercizio) {
      const ripetizioni = generaNumeroCasualePari(6, 12);
      binderExercise = binderExercise + "<p>";
      binderExercise = binderExercise + esercizio + " " + seriePerEsercizio + "x" + ripetizioni;
      binderExercise = binderExercise + "</p>";
      return binderExercise;
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
    let gruppiMenoSviluppati = [];
    gruppiMenoSviluppati[0] = primoGruppoMenoSviluppatoString;
    gruppiMenoSviluppati[1] = secondoGruppoMenoSviluppatoString;
    
    // Vettori con esercizi per ogni gruppo muscolare. Pesi, Ipertrofia.
    // Petto
    const eserciziPesiIpertrofiaPettoAlto = [
      "Panca inclinata con bilanciere",
      "Croci inclinate con manubri",
      "Push-up inclinati",
      "Pressa inclinata con manubri",
      "Fly inclinati su macchina pec deck",
      "Alzate frontali con manubri",
      "Alzate laterali con manubri",
      "Alzate laterali a cavo",
      "Shoulder press con manubri",
      "Military press",
    ];
    const eserciziPesiIpertrofiaPettoBasso = [
      "Panca piana con bilanciere",
      "Panca declinata con bilanciere",
      "Croci su panca piana con manubri",
      "Fly su macchina pec deck",
      "Push-up",
      "Dips sulle parallele",
      "Cable crossover",
      "Push-up con piedi elevati su fitball",
      "Pull-over su panca piana",
      "Push-up diamante",
    ];
    const eserciziSceltiPettoAlto = [];
    const eserciziSceltiPettoBasso = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaPettoAlto, nEsercizi, eserciziSceltiPettoAlto);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaPettoBasso, nEsercizi, eserciziSceltiPettoBasso);

    // Spalle
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
    const eserciziPesiIpertrofiaSpalleDeltoideAnteriore = [
      "Alzate frontali con bilanciere",
      "Arnold press",
      "Shoulder press con manubri",
      "Reverse fly su macchina posterior deltoid",
    ];
    const eserciziPesiIpertrofiaSpalleDeltoideLaterale = [
      "Alzate laterali con manubri",
      "Arnold press",
      "Shoulder press con manubri",
      "Face pull con cavo",
    ];  
    const eserciziPesiIpertrofiaSpalleDeltoidePosteriore = [
      "Alzate posteriori con manubri",
      "Rematore verticale con bilanciere",
      "Face pull con cavo",
      "Reverse fly su macchina posterior deltoid",
    ];
    const eserciziSceltiSpalle = [];
    const eserciziSceltiSpalleDeltoideAnteriore = [];
    const eserciziSceltiSpalleDeltoideLaterale = [];
    const eserciziSceltiSpalleDeltoidePosteriore = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSpalle, nEsercizi, eserciziSceltiSpalle);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSpalleDeltoideAnteriore, nEsercizi, eserciziSceltiSpalleDeltoideAnteriore);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSpalleDeltoideLaterale, nEsercizi, eserciziSceltiSpalleDeltoideLaterale);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSpalleDeltoidePosteriore, nEsercizi, eserciziSceltiSpalleDeltoidePosteriore);

    // Schiena
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
    const eserciziPesiIpertrofiaSchienaUpper = [
      "Pull-up",
      "Lat pulldown",
      "Seated cable row",
      "Face pulls",
      "Bent-over rows",
      "Single-arm dumbbell row",
      "T-bar row",
      "Wide-grip row",
      "Inverted row",
      "Chest-supported row"
    ];
    const eserciziPesiIpertrofiaSchienaLatissimusDorsi = [
      "Wide-grip pull-ups",
      "Straight-arm pulldown",
      "Lat pushdown",
      "Lat pullover",
      "Wide-grip lat pulldown",
      "Close-grip lat pulldown",
      "Underhand cable pulldown",
      "Lat preacher curl",
      "Lat pull machine",
      "Lat isolation row"
    ];
    const eserciziSceltiSchiena = [];
    const eserciziSceltiSchienaUpper = [];
    const eserciziSceltiSchienaLatissimusDorsi = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSchiena, nEsercizi, eserciziSceltiSchiena);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSchienaUpper, nEsercizi, eserciziSceltiSchienaUpper);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaSchienaLatissimusDorsi, nEsercizi, eserciziSceltiSchienaLatissimusDorsi);

    // Addome
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
    const eserciziSceltiAddome = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaAddome, nEsercizi, eserciziSceltiAddome);

    // Bicipite
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
    const eserciziPesiIpertrofiaBicipiteGomitoLungoTronco = [
      "Curl con bilanciere",
      "Curl con manubri",
      "Hammer curl con manubri",
      "Concentration curl",
      "Curl con cavo",
      "Drag curl",
      "Reverse curl",
      "EZ bar curl"
    ];
    const eserciziPesiIpertrofiaBicipiteGomitoDietroTronco = [
      "Curl su panca 60",
      "Curl martello su panca 60"
    ];
    const eserciziPesiIpertrofiaBicipiteGomitoAvantiTronco = [
      "Drag curl",
      "Spider curl",
      "Reverse curl",
      "EZ bar curl"
    ];
    const eserciziSceltiBicipite = [];
    const eserciziSceltiBicipiteGomitoLungoTronco = [];
    const eserciziSceltiBicipiteGomitoDietroTronco = [];
    const eserciziSceltiBicipiteGomitoAvantiTronco = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaBicipiteGomitoLungoTronco, nEsercizi, eserciziSceltiBicipiteGomitoLungoTronco);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaBicipiteGomitoDietroTronco, nEsercizi, eserciziSceltiBicipiteGomitoDietroTronco);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaBicipiteGomitoAvantiTronco, nEsercizi, eserciziSceltiBicipiteGomitoAvantiTronco);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaBicipite, nEsercizi, eserciziSceltiBicipite);

    // Tricipite
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
    const eserciziPesiIpertrofiaTricipiteCapoLungo = [
      "French press con bilanciere",
      "Tricep dip machine",
      "Overhead tricep extension con bilanciere",
      "French press con manubrio",
      "Push-up con presa stretta",
      "Tricep kickback con cavo",
      "Tricep stretch con cavo alto",
      "Hammer curl inverso con cavo",
      "Tricep pulldown inverso",
      "Tricep dip su sedia o panca"
    ];
    const eserciziPesiIpertrofiaTricipiteCapoMediale = [
      "Tricep pushdown con cavo",
      "Tricep extension con manubrio",
      "Skull crusher con bilanciere",
      "Push-up diamante",
      "Tricep kickback con manubrio",
      "Tricep pushdown con corda",
      "Tricep kickback a braccio singolo con cavo",
      "Tricep extension a braccio singolo con cavo",
      "Close grip bench press",
      "Tricep pushdown con impugnatura a V"
    ];
    const eserciziPesiIpertrofiaTricipiteCapoLaterale = [
      "Dip su panca",
      "Dip alle parallele",
      "Kickback con manubrio",
      "Close grip bench press",
      "Push-up con presa media",
      "Diamond push-up su panca",
      "Tricep dips con gambe alzate",
      "Tricep stretch su sedia",
      "Push-up con palla medica sotto le mani",
      "Tricep dip su sedia con gamba estesa"
    ];
    const eserciziSceltiTricipite = [];
    const eserciziSceltiTricipiteCapoLungo = [];
    const eserciziSceltiTricipiteCapoMediale = [];
    const eserciziSceltiTricipiteCapoLaterale = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaTricipite, nEsercizi, eserciziSceltiTricipite);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaTricipiteCapoLungo, nEsercizi, eserciziSceltiTricipiteCapoLungo);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaTricipiteCapoMediale, nEsercizi, eserciziSceltiTricipiteCapoMediale);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaTricipiteCapoLaterale, nEsercizi, eserciziSceltiTricipiteCapoLaterale);

    // Gambe
    const eserciziPesiIpertrofiaGambeQuadricipiti = [
      "Squat con bilanciere",
      "Leg press",
      "Extension su macchina per quadricipiti",
      "Hack squat",
      "Pistol squat",
      "Step-up con bilanciere",
      "Squat frontale",
      "Jump squat",
      "Split squat",
      "Smith machine squat"
    ];
    const eserciziPesiIpertrofiaGambeFemorali = [
      "Affondi con bilanciere",
      "Glute bridge con bilanciere",
      "Deadlift rumeno con bilanciere",
      "Stacchi da terra con bilanciere",
      "Calf raise con bilanciere",
      "Curl su macchina per femorali",
      "Hip thrust con bilanciere",
      "Leg curl su macchina",
      "Good morning con bilanciere",
      "Stacchi sumo"
    ];
    const eserciziPesiIpertrofiaGlutei = [
      "Glute bridge con bilanciere",
      "Hip thrust con bilanciere",
      "Squat con bilanciere (con attenzione alla profondità)",
      "Affondi laterali con manubri",
      "Deadlift rumeno con bilanciere",
      "Stacchi da terra con bilanciere",
      "Kickback del gluteo con cavigliere",
      "Cable pull-through",
      "Good morning con bilanciere",
      "Sumo deadlift con bilanciere"
    ];
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
    const eserciziSceltiGambeQuadricipiti = [];
    const eserciziSceltiGambeFemorali = [];
    const eserciziSceltiGlutei = [];
    const eserciziSceltiPolpacci = [];
    selezionaEserciziCasuali(eserciziPesiIpertrofiaGambeQuadricipiti, nEsercizi, eserciziSceltiGambeQuadricipiti);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaGambeFemorali, nEsercizi, eserciziSceltiGambeFemorali);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaGlutei, nEsercizi, eserciziSceltiGlutei);
    selezionaEserciziCasuali(eserciziPesiIpertrofiaPolpacci, nEsercizi, eserciziSceltiPolpacci);

    const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    let dividiEserciziUnoPiccolo;
    let dividiEserciziUnoMedio;
    let dividiEserciziUnoGrande;
    let dividiEserciziDuePiccolo;
    let dividiEserciziDueMedio;
    let dividiEserciziDueGrande;

    var reportTrainingProgramTitle = `
    <h1>Ecco il tuo programma di allenamento personalizzato</h1>
  `;
    var reportTrainingProgramTitleElement = document.getElementById("reportTrainingProgramTitle");
    reportTrainingProgramTitleElement.innerHTML = '';
    await writeText(reportTrainingProgramTitleElement, reportTrainingProgramTitle, 15);

    var binderSplit = "";
    var binderExercise = "";

    // Partizione di codice che si esegue solo se l'utente seleziona "Pesi"
    if (pesiCorpoLiberoString === "Pesi") {
      if (genereString === "Uomo" || genereString === "Donna") {
        if (frequenzaAllenamentoString === "1 volta") {
          binderSplit += "<p>" + giorniSettimana[0] + ": Giorno 1) Full Body" + "</p>";
          for (let i = 1; i < 7; i++) {
            binderSplit += "<p>" + giorniSettimana[i] + ": Riposo" + "</p>";
          }
        }
        if (frequenzaAllenamentoString === "2 volte") {
          binderSplit += "<p>" + giorniSettimana[0] + ": Giorno 1) Full Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[1] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[2] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[3] + ": Giorno 2) Full Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[4] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[5] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
        }
        if (frequenzaAllenamentoString === "3 volte") {
          binderSplit += "<p>" + giorniSettimana[0] + ": Giorno 1) Push (Petto, Spalle, Tricipiti)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[1] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[2] + ": Giorno 2) Pull (Schiena, Bicipiti)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[3] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[4] + ": Giorno 3) Leg (Gambe, Glutei e Addome)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[5] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
        }
        if (frequenzaAllenamentoString === "4 volte") {
          binderSplit += "<p>" + giorniSettimana[0] + ": Giorno 1) Upper Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[1] + ": Giorno 2) Lower Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[2] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[3] + ": Giorno 3) Upper Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[4] + ": Giorno 4) Lower Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[5] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
        }
        if (frequenzaAllenamentoString === "5 volte") {
          binderSplit += "<p>" + giorniSettimana[0] + ": Giorno 1) Upper Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[1] + ": Giorno 2) Lower Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[2] + ": Riposo" + "</p>";
          binderSplit += "<p>" + giorniSettimana[3] + ": Giorno 3) Upper Body" + "</p>";
          binderSplit += "<p>" + giorniSettimana[4] + ": Giorno 4) Lower Body" + "</p>";
          if (secondoGruppoMenoSviluppatoString === "null") {
            binderSplit += "<p>" + giorniSettimana[5] + ": Giorno 5) " + primoGruppoMenoSviluppatoString + "</p>";
          } else {
            binderSplit += "<p>" + giorniSettimana[5] + ": Giorno 5) " + primoGruppoMenoSviluppatoString + " e " + secondoGruppoMenoSviluppatoString + "</p>";
          }
          binderSplit += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
        }
        if (frequenzaAllenamentoString === "6 volte") {
          binderSplit += "<p>" + giorniSettimana[0] + ": Giorno 1) Push (Petto, Spalle, Tricipiti)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[1] + ": Giorno 2) Pull (Schiena, Bicipiti)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[2] + ": Giorno 3) Leg (Gambe, Glutei e Addome)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[3] + ": Giorno 4) Push (Petto, Spalle, Tricipiti)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[4] + ": Giorno 5) Pull (Schiena, Bicipiti)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[5] + ": Giorno 6) Leg (Gambe, Glutei e Addome)" + "</p>";
          binderSplit += "<p>" + giorniSettimana[6] + ": Riposo" + "</p>";
        }
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
        for (let j = 1; j < frequenzaAllenamento + 1; j++) {
          binderExercise += "<p>Giorno " + j + "</p>";
          binderExercise += "<p>Gruppo muscolare: Gambe</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeQuadricipiti[i], seriePerEsercizio);
          }
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeFemorali[i], seriePerEsercizio);
          }
          binderExercise += "<p>Gruppo muscolare: Schiena</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaUpper[i], seriePerEsercizio);
          }
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaLatissimusDorsi[i], seriePerEsercizio);
          }
          binderExercise += "<p>Gruppo muscolare: Petto</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoBasso[i], seriePerEsercizio);
          }
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoAlto[i], seriePerEsercizio);
          }
          binderExercise += "<p>Gruppo muscolare: Spalle</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideLaterale[i], seriePerEsercizio);
          } 
          binderExercise += "<p>Gruppo muscolare: Tricipite</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiTricipite[i], seriePerEsercizio);
          }
          binderExercise += "<p>Gruppo muscolare: Bicipite</p>";
          if(j === 1){
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoLungoTronco[i], seriePerEsercizio);
            }
          } else {
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoDietroTronco[i], seriePerEsercizio);
            }
          }
          binderExercise += "<p>Gruppo muscolare: Addome</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiAddome[i], seriePerEsercizio);
          }
          if(primoGruppoMenoSviluppatoString === "Polpacci" || secondoGruppoMenoSviluppatoString === "Polpacci"){
            dividiEserciziDuePiccolo = dividiEserciziDuePiccolo + 1;
          }
          binderExercise += "<p>Gruppo muscolare: Polpacci</p>";
          for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
            binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPolpacci[i], seriePerEsercizio);
          }
          if(primoGruppoMenoSviluppatoString === "Polpacci" || secondoGruppoMenoSviluppatoString === "Polpacci"){
            dividiEserciziDuePiccolo = dividiEserciziDuePiccolo - 1;
          }
          dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
          dividiEserciziUnoGrande = dividiEserciziDueGrande;
          dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
          dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
        }
      }
      // Stamapa Push, Pull, Leg, Push, Pull, Leg o Push, Pull, Leg. Quindi frequenzaAllenamento === 3 o 6
      if (frequenzaAllenamentoString === "6 volte" || frequenzaAllenamentoString === "3 volte") {
        let treOSei;
        if (frequenzaAllenamentoString === "6 volte") {
          treOSei = 3;
        } else {
          treOSei = 2;
        }
        dividiEserciziUnoPiccolo = 0;
        dividiEserciziUnoMedio = 0;
        dividiEserciziUnoGrande = 0;
        dividiEserciziDuePiccolo = 1;
        dividiEserciziDueMedio = 2;
        dividiEserciziDueGrande = 3;
        for (let k = 1; k < treOSei; k++) {
          for (let j = 1; j < 4; j++) {
            binderExercise += "Giorno " + ((k - 1) * 3 + j);
            // Stamapa Push
            if (j === 1) {
              binderExercise += "<p>Gruppo muscolare: Petto</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoBasso[i], seriePerEsercizio);
              }
              if(areaPiuSviluppataString !== "Petto"){
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoAlto[i], seriePerEsercizio);
              }
            }
              binderExercise += "<p>Gruppo muscolare: Spalle</p>";
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideAnteriore[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideLaterale[i], seriePerEsercizio);
              }
              if(areaPiuSviluppataString !== "Spalle"){
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoidePosteriore[i], seriePerEsercizio);
              }
            }
              binderExercise += "<p>Gruppo muscolare: Tricipite</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiTricipite[i], seriePerEsercizio);
              }
            }
            // Stamapa Pull
            if (j === 2) {
              binderExercise += "<p>Gruppo muscolare: Schiena</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaLatissimusDorsi[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaUpper[i], seriePerEsercizio);
              }
              binderExercise += "<p>Gruppo muscolare: Bicipite</p>";
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoLungoTronco[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoDietroTronco[i], seriePerEsercizio);
              }
            }
            // Stamapa Leg
            if (j === 3) {
              binderExercise += "<p>Gruppo muscolare: Gambe</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeQuadricipiti[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeFemorali[i], seriePerEsercizio);
              }
              binderExercise += "<p>Gruppo muscolare: Polpacci</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPolpacci[i], seriePerEsercizio);
              }
              binderExercise += "<p>Gruppo muscolare: Addome</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiAddome[i], seriePerEsercizio);
              }
              dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
              dividiEserciziUnoMedio = dividiEserciziDueMedio;
              dividiEserciziUnoGrande = dividiEserciziDueGrande;
              dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
              dividiEserciziDueMedio = dividiEserciziDueMedio * 2;
              dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
            }
          }
        }
      }
      //stampa esercizi se la frequenzaAllenamento === 4 o 5
      if (frequenzaAllenamentoString === "4 volte" || frequenzaAllenamentoString === "5 volte") {
        dividiEserciziUnoPiccolo = 0;
        dividiEserciziUnoMedio = 0;
        dividiEserciziUnoGrande = 0;
        dividiEserciziDuePiccolo = 1;
        dividiEserciziDueMedio = 2;
        dividiEserciziDueGrande = 3;
        for (let j = 1; j < 5; j++) {
          // Stamapa Upper
          if (j === 1 || j === 3) {
            binderExercise += "<p>Giorno " + j + "</p>";
            binderExercise += "<p>Gruppo muscolare: Schiena</p>";
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaUpper[i], seriePerEsercizio);
            }
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaLatissimusDorsi[i], seriePerEsercizio);
            }
            binderExercise += "<p>Gruppo muscolare: Petto</p>";
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoBasso[i], seriePerEsercizio);
            }
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoAlto[i], seriePerEsercizio);
            }
            binderExercise += "<p>Gruppo muscolare: Spalle</p>";
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideAnteriore[i], seriePerEsercizio);
            }
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideLaterale[i], seriePerEsercizio);
            }
            binderExercise += "<p>Gruppo muscolare: Tricipite</p>";
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiTricipite[i], seriePerEsercizio);
            }
            binderExercise += "<p>Gruppo muscolare: Bicipite</p>";
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoLungoTronco[i], seriePerEsercizio);
            }
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoDietroTronco[i], seriePerEsercizio);
            }
          }
          // Stamapa Lower
          if (j === 2 || j === 4) {
            binderExercise += "<p>Giorno " + j + "</p>";
            binderExercise += "<p>Gruppo muscolare: Gambe</p>";
            for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeQuadricipiti[i], seriePerEsercizio);
            }
            for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeFemorali[i], seriePerEsercizio);
            }
            binderExercise += "<p>Gruppo muscolare: Polpacci</p>";
            for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPolpacci[i], seriePerEsercizio);
            }
            binderExercise += "<p>Gruppo muscolare: Addome</p>";
            for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
              binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiAddome[i], seriePerEsercizio);
            }
            dividiEserciziUnoPiccolo = dividiEserciziDuePiccolo;
            dividiEserciziUnoMedio = dividiEserciziDueMedio;
            dividiEserciziUnoGrande = dividiEserciziDueGrande;
            dividiEserciziDuePiccolo = dividiEserciziDuePiccolo * 2;
            dividiEserciziDueMedio = dividiEserciziDueMedio * 2;
            dividiEserciziDueGrande = dividiEserciziDueGrande * 2;
          }
        }
        if (frequenzaAllenamentoString === "5 volte") {
          binderExercise += "<p>Giorno 5</p>";
          let nMax = 1; // resta 1 se c'è scritto qualcosa di diverso da "null" 
          dividiEserciziDuePiccolo = dividiEserciziUnoPiccolo + 1;
          dividiEserciziDueMedio = dividiEserciziUnoMedio + 2;
          dividiEserciziDueGrande = dividiEserciziUnoGrande + 3;
          if (gruppiMenoSviluppati[1] === "null") {
            nMax = 0;
            if (intensitaString === "Avanzato") {
              seriePerEsercizio = 4;
            }
          } else {
            if (intensitaString === "Avanzato" || intensitaString === "Principiante") {
              seriePerEsercizio = 4;
              if (intensitaString === "Principiante") {
                // dividiEserciziDuePiccolo = dividiEserciziDuePiccolo - 1; (ad ora tolto)
                dividiEserciziDueMedio = dividiEserciziDueMedio - 1;
                dividiEserciziDueGrande = dividiEserciziDueGrande - 1;
              }
            }
          }
          for (let j = 0; j < nMax + 1; j++) {
            if (gruppiMenoSviluppati[j] === "Polpacci") {
              binderExercise += "<p>Gruppo muscolare: Polpacci</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPolpacci[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Gambe") {
              binderExercise += "<p>Gruppo muscolare: Gambe</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeQuadricipiti[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGambeFemorali[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Petto") {
              binderExercise += "<p>Gruppo muscolare: Petto</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoBasso[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiPettoAlto[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Schiena") {
              binderExercise += "<p>Gruppo muscolare: Schiena</p>";
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDueMedio; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaLatissimusDorsi[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoMedio; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSchienaUpper[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Spalle") {
              binderExercise += "<p>Gruppo muscolare: Spalle</p>";
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideAnteriore[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoideLaterale[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiSpalleDeltoidePosteriore[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Tricipiti") {
              binderExercise += "<p>Gruppo muscolare: Tricipite</p>";
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiTricipiteCapoLungo[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiTricipiteCapoMediale[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiTricipiteCapoLaterale[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Bicipiti") {
              binderExercise += "<p>Gruppo muscolare: Bicipite</p>";
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoLungoTronco[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoDietroTronco[i], seriePerEsercizio);
              }
              for (let i = dividiEserciziUnoPiccolo; i < dividiEserciziDuePiccolo; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiBicipiteGomitoAvantiTronco[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Addome") {
              binderExercise += "<p>Gruppo muscolare: Addome</p>";
              for (let i = dividiEserciziUnoGrande; i < dividiEserciziDueGrande; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiAddome[i], seriePerEsercizio);
              }
            } else if (gruppiMenoSviluppati[j] === "Glutei") {
              binderExercise += "<p>Gruppo muscolare: Glutei</p>";
              for (let i = 0; i < 3; i++) {
                binderExercise = binderExerciseSeriesRepetitions(binderExercise, eserciziSceltiGlutei[i], seriePerEsercizio);
              }
            }
          }
        }
      }
      var reportTrainingProgramDownSplitElement = document.getElementById("reportTrainingProgramDownSplit");
      var reportTrainingProgramDownThreeElement = document.getElementById("reportTrainingProgramDownThree");
      await writeText(reportTrainingProgramDownSplitElement, binderSplit, 15);
      await writeText(reportTrainingProgramDownThreeElement, binderExercise, 15);
      console.log(binderExercise);
      console.log("ciao");
      console.log(reportTrainingProgramDownThreeElement);
    }
  });
});



