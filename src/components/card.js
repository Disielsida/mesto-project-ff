const createCard = (card, handleDeleteCard, handleLikeCard, handleOpenImagePopup) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const { name, link } = card;
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  deleteCardButton.addEventListener('click', () => handleDeleteCard(deleteCardButton));
  likeCardButton.addEventListener('click', () => handleLikeCard(likeCardButton));
  cardImage.addEventListener('click', () => handleOpenImagePopup(link, name));
  return cardElement;
}

const handleDeleteCard = (deleteCardButton) => {
  const closestItem = deleteCardButton.closest('.places__item')
  closestItem.remove();
}

const handleLikeCard = (likeCardButton) => {
  likeCardButton.classList.toggle('card__like-button_is-active');
}

export { createCard, handleDeleteCard, handleLikeCard };