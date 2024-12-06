import './pages/index.css';
import initialCards from "./components/initialCards.js";
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js'

const cardsContainer = document.querySelector('.places__list');
const closePopupButtons = document.querySelectorAll('.popup__close');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileDescriptionInput = document.querySelector('.popup__input_type_description');
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardUrlInput = document.querySelector('.popup__input_type_url');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

const viewImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const captionPopupImage = document.querySelector('.popup__caption');

const handleOpenImagePopup = (link, name) => {
  popupImage.src = link;
  captionPopupImage.textContent = name;
  openModal(viewImagePopup);
}

const handleAddCardSubmit = (e) => {
  e.preventDefault();

  const name = addCardNameInput.value;
  const link = addCardUrlInput.value;
  const card = { name, link};
  const cardElement = createCard(card, handleDeleteCard, handleLikeCard, handleOpenImagePopup);
  
  cardsContainer.prepend(cardElement);
  closeModal(addCardPopup);
}

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const name = editProfileNameInput.value;
  const description = editProfileDescriptionInput.value;

  profileName.textContent = name;
  profileDescription.textContent = description;
  closeModal(editProfilePopup);
}

initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDeleteCard, handleLikeCard, handleOpenImagePopup);
  cardsContainer.append(cardElement);
});

editProfileButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  addCardNameInput.value = '';
  addCardUrlInput.value = '';
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});

addCardForm.addEventListener('submit', handleAddCardSubmit);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

closePopupButtons.forEach((button) => {
  const closestPopup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(closestPopup));
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

