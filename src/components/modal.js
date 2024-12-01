const overlayCloseModal = (e) => {
  if (e.target === e.currentTarget) {
    const activePopup = document.querySelector('.popup_is-opened');

    if (activePopup) {
      closeModal(activePopup);
    }
  }
}
const escCloseModal = (e)  => {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');

    if (activePopup) {
      closeModal(activePopup);
    }
  }
}

const openModal = (popupElement) => {
  if (!popupElement.classList.contains('popup_is-opened')) {
    popupElement.classList.add('popup_is-opened');
    popupElement.addEventListener('click', overlayCloseModal);
    document.addEventListener('keydown',escCloseModal);
  }
}

const closeModal = (popupElement) => {
  popupElement.classList.remove('popup_is-opened');
  popupElement.removeEventListener('click', overlayCloseModal);
  document.removeEventListener('keydown', escCloseModal);
}

export { openModal, closeModal };