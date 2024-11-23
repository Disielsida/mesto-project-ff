const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const createCard = (card, deleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => deleteCard(deleteButton));

  cardsContainer.append(cardElement);
}

const deleteCard = (deleteButton) => {
  const closestItem = deleteButton.closest('.places__item')
  closestItem.remove();
}

initialCards.forEach((card) => createCard(card, deleteCard));
