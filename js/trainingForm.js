// Seleziona gli elementi del DOM necessari per il modulo di allenamento
const form = document.getElementById('trainingForm');
const questions = document.querySelectorAll('.question');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');

// Inizializza un indice per tener traccia della domanda corrente
let currentQuestionIndex = 0;

// Funzione per mostrare la prossima domanda nel modulo di allenamento
function showNextQuestion() {
  questions[currentQuestionIndex].style.display = 'none';  // Nasconde la domanda corrente

  currentQuestionIndex++;  // Incrementa l'indice per passare alla prossima domanda

  if (currentQuestionIndex < questions.length) {
    questions[currentQuestionIndex].style.display = 'block';  // Mostra la prossima domanda
  } else {
    nextButton.style.display = 'none';  // Nasconde il pulsante "Avanti" quando tutte le domande sono state completate
    submitButton.style.display = 'block';  // Mostra il pulsante di invio per completare il modulo
  }
  if (currentQuestionIndex === 0) {
    backButton.style.display = 'none'; // Se siamo alla prima domanda toglie il bottone
  } else{
    backButton.style.display = 'block'; // Se non siamo alla prima domanda mette il bottone
  }
  if (currentQuestionIndex === 10){ // Se siamo all'ultima domanda toglie il bottone back
    backButton.style.display = 'none';
  }
}

nextButton.addEventListener('click', () => {
  showNextQuestion();  // Chiamata alla funzione per mostrare la prossima domanda
});
// Mostra la prima domanda inizialmente
questions[currentQuestionIndex].style.display = 'block';  // Mostra la prima domanda

// Funzione per mostrare la domanda precedente nel modulo di allenamento
function showPreviousQuestion() {
  questions[currentQuestionIndex].style.display = 'none'; // Nasconde la domanda corrente

  currentQuestionIndex--; // Decrementa l'indice per tornare alla domanda precedente
  if (currentQuestionIndex >= 0) {
    questions[currentQuestionIndex].style.display = 'block'; // Mostra la domanda precedente
  } else {
    currentQuestionIndex = 0; // Se l'indice va al di sotto di 0, riportalo a 0 per evitare errori
  } 
  if (currentQuestionIndex === 0) {
    backButton.style.display = 'none'; // Se siamo alla prima domanda toglie il bottone
  } else{
    backButton.style.display = 'block'; // Se non siamo alla prima domanda mette il bottone
  }
  nextButton.style.display = 'block'; // Mostra sempre il pulsante "Avanti" quando si torna alla domanda precedente
  submitButton.style.display = 'none'; // Nascondi sempre il pulsante di invio quando si torna alla domanda precedente
}

backButton.addEventListener('click', () => {
  showPreviousQuestion(); // Chiamata alla funzione per mostrare la domanda precedente
  console.log("Risposte dell'utente:", currentQuestionIndex);
});

function showAvantiButton() {
  var scelta = document.getElementById("sceltaSecondoGruppo");  // Ottieni l'elemento select per la scelta del secondo gruppo
  var focaliContainer = document.getElementById("focaliContainer3");  // Ottieni il contenitore delle domande del secondo gruppo
  var nextButton = document.getElementById("nextButton");  // Ottieni il pulsante "Avanti"
  var submitButton = document.getElementById("submitButton");  // Ottieni il pulsante di invio
  if (scelta.value !== "1" && scelta.value !== "2") { 
    nextButton.style.display = 'block';
  } else {
    if (scelta.value == "1") {
      focaliContainer.style.display = "none";  // Se il valore selezionato è "1" (opzione "Si"), nascondi il contenitore delle domande del secondo gruppo
      nextButton.style.display = "block";  // Mostra il pulsante "Avanti" per passare alla domanda successiva
      submitButton.style.display = "none";  // Nascondi il pulsante di invio, poiché ci sono ancora altre domande da mostrare
    } else {
      focaliContainer.style.display = "none";  // Se il valore selezionato è diverso da "1" (opzione "No"), nascondi il contenitore delle domande del secondo gruppo
      nextButton.style.display = "none";  // Nascondi il pulsante "Avanti", poiché non ci sono altre domande da mostrare
      submitButton.style.display = "block";  // Mostra il pulsante di invio per completare il modulo
    }
    nextButton.addEventListener('click', () => {
      scelta.value = 0; // Da valore 0 quando viene cliccato il bottone per non fare else
    });
  }
}
// quando viene cliccato uno dei menù a tendina, la funzione showAvantiButton venga eseguita per gestire l'evento
const dropdowns = document.querySelectorAll('select');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', showAvantiButton);
});
// toglie il bottone "invia" quando viene cliccato
nextButton.addEventListener('click', () => {
  nextButton.style.display = 'none';
});

var sceltaUno = 1;
var sceltaDue = 1;
function gestisciScelta() {
  sceltaUno = $("#areaPiuSviluppata").val(); // Assegna il valore selezionato da "#areaPiuSviluppata" alla variabile "sceltaUno"
  sceltaDue = $("#primoGruppoMenoSviluppato").val(); // Assegna il valore selezionato da "#primoGruppoMenoSviluppato" alla variabile "sceltaDue"
  disabilitaOpzione(sceltaUno, sceltaDue); // Chiama la funzione "disabilitaOpzione" passando "sceltaUno" e "sceltaDue" come argomenti
}
function disabilitaOpzione(scelta, sceltaa) {
  if (sceltaa === "") {
    sceltaa = 1; // If per risolvere il problema della selezione di polpacci
}
  $("#secondoGruppoMenoSviluppato option").prop('disabled', false); // Riabilita tutte le opzioni nel secondoGruppoMenoSviluppato
  $("#primoGruppoMenoSviluppato option").prop('disabled', false); // Riabilita tutte le opzioni nel primoGruppoMenoSviluppato
  console.log("Prima scelta :", scelta);
  console.log("Seconda scelta:", sceltaa);
  $("#secondoGruppoMenoSviluppato option[value='" + scelta + "']").prop('disabled', true); // Disabilita l'opzione corrispondente a "scelta" nel secondoGruppoMenoSviluppato
  $("#primoGruppoMenoSviluppato option[value='" + scelta + "']").prop('disabled', true); // Disabilita l'opzione corrispondente a "scelta" nel primoGruppoMenoSviluppato
  $("#secondoGruppoMenoSviluppato option[value='" + sceltaa + "']").prop('disabled', true); // Disabilita l'opzione corrispondente a "sceltaa" nel secondoGruppoMenoSviluppato
}
$("#areaPiuSviluppata").on("change", gestisciScelta); // Chiamiamo la funzione "gestisciSceltaUno" quando la selezione cambia
$("#primoGruppoMenoSviluppato").on("change", gestisciScelta); // Chiamiamo la funzione "gestisciSceltaUno" quando la selezione cambia    
disabilitaOpzione(sceltaUno, sceltaDue); // Chiamiamo la funzione iniziale per disabilitare l'opzione nella domanda successiva

// Rimuoviamo l'opzione iniziale "Seleziona una risposta" quando l'utente apre il menu a tendina
$("select").on("click", function () {
  $(this).find("option[value='']").remove();
});

$(document).ready(function() {
  $('label').addClass('animate-label');// Aggiunge la classe animate-label a tutti i tag label
});

document.getElementById("trainingForm").addEventListener("submit", async function (e) {
var dettagliDiv = document.getElementById("reportDetails");
    dettagliDiv.style.display = "block"; // Quando viene cliccato il pulsante "reportDetails", "trainingForm" ritorna visibile
  });

