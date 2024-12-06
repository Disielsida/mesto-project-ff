const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${validationConfig.inputErrorClass}`);
  errorElement.classList.add(`${validationConfig.errorClass}`);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  errorElement.classList.remove(`${validationConfig.errorClass}`);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid
  });
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
  }
}

const setEventListiners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
  formList.forEach((formElement) => setEventListiners(formElement, validationConfig));
}

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}


export { enableValidation, clearValidation };