import { setLikeToCard, removeLikeFromCard } from "./api.js";
import { openModal } from "./modal.js";

const createCard = (card, handleDeleteCard, handleLikeCard, handleOpenImagePopup, currentUserId, deleteCardPopup, cardToDelete) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const { name, link, likes } = card;
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');
  const likesCountSpan = cardElement.querySelector('.card__likes-count');

  cardImage.src = link;
  cardTitle.textContent = name;
  likesCountSpan.textContent = likes.length;

 
  likeCardButton.addEventListener('click', () => handleLikeCard(likeCardButton, card, likesCountSpan, currentUserId));
  cardImage.addEventListener('click', () => handleOpenImagePopup(link, name));

  if (likes.some((like) => like._id === currentUserId)) {
    likeCardButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id !== currentUserId) {
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener('click', () => handleDeleteCard(deleteCardButton, card, deleteCardPopup, cardToDelete));
  }
 
  return cardElement;
}

const handleDeleteCard = (deleteCardButton, card, deleteCardPopup, cardToDelete) => {
  cardToDelete._id = card._id;
  cardToDelete.element = deleteCardButton.closest('.places__item');
  openModal(deleteCardPopup);
}

const handleLikeCard = (likeCardButton, card, likesCountSpan, currentUserId) => {
  if (card.likes.some((like) => like._id === currentUserId)) {
    removeLikeFromCard(card._id)
      .then((updatedCard) => {
        card.likes = updatedCard.likes;
        likesCountSpan.textContent = updatedCard.likes.length;
        likeCardButton.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.log(error);
      })
  } else {
    setLikeToCard(card._id)
    .then((updatedCard) => {
      card.likes = updatedCard.likes;
      likesCountSpan.textContent = updatedCard.likes.length;
      likeCardButton.classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
}

export { createCard, handleDeleteCard, handleLikeCard };