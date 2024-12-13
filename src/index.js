import './pages/index.css';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUser, getCards, editProfile, addCard, changeAvatar, deleteCardApi } from './components/api.js';

const cardsContainer = document.querySelector('.places__list');
const closePopupButtons = document.querySelectorAll('.popup__close');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileDescriptionInput = document.querySelector('.popup__input_type_description');
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editProfileSendButton = editProfileForm.querySelector('.popup__button');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardUrlInput = document.querySelector('.popup__input_type_url');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const addCardSendButton = addCardForm.querySelector('.popup__button');

const viewImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const captionPopupImage = document.querySelector('.popup__caption');

const changeAvatarPopup = document.querySelector('.popup_type_avatar');
const changeAvatarForm = document.querySelector('.popup_type_avatar .popup__form')
const changeAvatarUrlInput = document.querySelector('.popup__input_type_avatar_url');
const changeAvatarSendButton = changeAvatarForm.querySelector('.popup__button');

const deleteCardPopup = document.querySelector('.popup_type_delete');
const deleteCardForm = document.querySelector('.popup_type_delete .popup__form');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const currentUser = {
  _id: ''
}

const cardToDelete = {
  _id: '',
  element: ''
}

const handleOpenImagePopup = (link, name) => {
  popupImage.src = link;
  captionPopupImage.textContent = name;
  openModal(viewImagePopup);
}

profileImage.addEventListener('click', () => {
  changeAvatarUrlInput.value = '';
  clearValidation(changeAvatarForm, validationConfig);
  openModal(changeAvatarPopup);
})

editProfileButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});

closePopupButtons.forEach((button) => {
  const closestPopup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(closestPopup));
});

enableValidation(validationConfig);

const setProfileData = (data) => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    setProfileData(userData);
    currentUser._id = userData._id;

    cards.forEach((card) => {
      const cardElement = createCard(card, handleDeleteCard, handleLikeCard, handleOpenImagePopup, currentUser._id, deleteCardPopup, cardToDelete);
      cardsContainer.append(cardElement);
    });
  })
  .catch((error) => {
    console.log(error);
});

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Отправить";
  }
}

const handleAddCardSubmit = (e) => {
  e.preventDefault();

  renderLoading(true, addCardSendButton);
  const name = addCardNameInput.value;
  const link = addCardUrlInput.value;

  addCard(name, link)
    .then((card) => {
      const cardElement = createCard(card, handleDeleteCard, handleLikeCard, handleOpenImagePopup, currentUser._id, deleteCardPopup, cardToDelete);
      cardsContainer.prepend(cardElement);
      closeModal(addCardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderLoading(false, addCardSendButton));
}

const handleChangeAvatarSubmit = (e) => {
  e.preventDefault();

  renderLoading(true, changeAvatarSendButton);
  const avatar = changeAvatarUrlInput.value;

  changeAvatar(avatar)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(changeAvatarPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderLoading(true, changeAvatarSendButton));
}

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  renderLoading(true, editProfileSendButton);
  const name = editProfileNameInput.value;
  const about = editProfileDescriptionInput.value;

  editProfile(name, about)
    .then((userData) => {
      setProfileData(userData);
      profileName.textContent = name;
      profileDescription.textContent = about;
      closeModal(editProfilePopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderLoading(false, editProfileSendButton));
}

const handleDeleteCardSubmit = (e) => {
  e.preventDefault();

  console.log(cardToDelete._id);
  deleteCardApi(cardToDelete._id)
    .then(() => {
      cardToDelete.element.remove();
      closeModal(deleteCardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
}

addCardForm.addEventListener('submit', handleAddCardSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
changeAvatarForm.addEventListener('submit', handleChangeAvatarSubmit);
deleteCardForm.addEventListener('submit', handleDeleteCardSubmit)