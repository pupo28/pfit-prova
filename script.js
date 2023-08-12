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
  if(secondoGruppoMenoSviluppatoString === "Seleziona una risposta" || secondoGruppoMenoSviluppatoString === "" ){
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
if(secondoGruppoMenoSviluppatoString !== "null"){
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
  document.getElementById("reportTrainingProgram").style.display = "block"; // Mostra il nuovo copntenitore della scheda

  var reportTrainingProgramTitle = `
  <h1>Ecco il tuo programma di allenamento personalizzato</h1>
`;

var reportTrainingProgramTitleElement = document.getElementById("reportTrainingProgramTitle");

reportTrainingProgramTitleElement.innerHTML = '';

await writeText(reportTrainingProgramTitleElement, reportTrainingProgramTitle, 15); 
});

});



