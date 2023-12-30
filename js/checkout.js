var formContainer = document.getElementById('form-container');
var paypalButtonContainer = document.getElementById('paypal-button-container');
var firstNameInput = document.getElementById('first-name');
var lastNameInput = document.getElementById('last-name');
var emailInput = document.getElementById('email');
var emailError = document.getElementById('email-error');
var emailError2 = document.getElementById('email-error-2');
var emailLabel = document.querySelector('label[for="email"]');

// Funzione per verificare se il modulo è vuoto
function isFormEmpty() {
  var firstName = firstNameInput.value;
  var lastName = lastNameInput.value;
  var email = emailInput.value;
  return firstName === '' || lastName === '' || email === '';
}

// Funzione per abilitare/disabilitare i pulsanti PayPal
function togglePayPalButton() {
  if (isFormEmpty() || !isEmailValid(emailInput.value)) {
    paypalButtonContainer.style.pointerEvents = 'none';
  } else {
    paypalButtonContainer.style.pointerEvents = 'auto';
  }
}

// Funzione per mostrare/nascondere errori
function showError(elementId, show) {
  var inputElement = document.getElementById(elementId);
  var labelElement = document.querySelector('label[for="' + elementId + '"]');
  var errorMessageElement = document.getElementById(elementId + '-error');
  if (show) {
    inputElement.classList.add('error');
    labelElement.classList.add('error-label');
    errorMessageElement.style.display = 'block';
  } else {
    inputElement.classList.remove('error');
    labelElement.classList.remove('error-label');
    errorMessageElement.style.display = 'none';
  }
}

// Aggiungi un ascoltatore di eventi per l'input del nome, cognome e email
firstNameInput.addEventListener('input', function () {
  togglePayPalButton();
  showError('first-name', firstNameInput.value === '');
  capitalizeFirstLetter(firstNameInput);
});
lastNameInput.addEventListener('input', function () {
  togglePayPalButton();
  showError('last-name', lastNameInput.value === '');
  capitalizeFirstLetter(lastNameInput);
});
emailInput.addEventListener('input', function () {
  togglePayPalButton();
  showError('email', emailInput.value === '');
  handleEmailInput();
});

// Gestione bug email
emailInput.addEventListener('blur', function () {
  if (emailInput.value === '') {
    emailLabel.style.color = '#555'; // Quando la casella è vuota e si perde il focus
  } else {
    emailLabel.style.color = '#555'; // Quando la casella contiene del testo e si perde il focus
  }
});
emailInput.addEventListener('input', function () {
  togglePayPalButton();
  if (emailInput.value === '') {
    emailLabel.style.color = 'red'; // Quando la casella è vuota
  } else {
    emailLabel.style.color = '#0070ba'; // Quando la casella contiene del testo
  }
});
emailInput.addEventListener('click', function () {
  togglePayPalButton();
  if (emailInput.value === '') {
    emailLabel.style.color = 'red'; // Quando la casella è vuota e l'ho cliccata
  } else {
    emailLabel.style.color = '#0070ba'; // Quando la casella contiene del testo e l'ho cliccata
  }
});
if (emailInput.value === '') {
  emailLabel.style.color = '#555'; // Quando la casella è vuota all'avvio
} else {
  emailLabel.style.color = '#555'; // Quando la casella contiene del testo all'avvio
}

// Funzioni per gestire le maiuscole
function capitalizeFirstLetter(input) {
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}
function convertToUppercase(input) {
  let inputValue = input.value.toUpperCase();
  if (inputValue.length > 15) {
    inputValue = inputValue.slice(0, 15);
  }
  input.value = inputValue;
}

// Controllo email se è valida
function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function handleEmailInput() {
  const emailValue = emailInput.value;
  if (!emailValue) {
    emailError.style.display = 'block';
    emailError2.style.display = 'none';
  } else if (!isEmailValid(emailValue)) {
    emailError.style.display = 'none';
    emailError2.style.display = 'block';
  } else {
    emailError.style.display = 'none';
    emailError2.style.display = 'none';
  }
}
function initializeCheckout() {
  togglePayPalButton();
}
window.addEventListener('load', initializeCheckout);



