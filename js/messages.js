import { isEscapeKey } from './util.js';

const closeMessage = (message, onDocumentKeydown) => {
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const handleKeydownAndClose = (evt, closeCallback, message, onDocumentKeydown) => {
  if (isEscapeKey(evt)) {
    closeCallback(message, onDocumentKeydown);
  }
};

const createMessage = (templateId, closeButtonClass) => {
  const template = document.querySelector(templateId).content.querySelector('section');
  const message = template.cloneNode(true);

  const onDocumentKeydown = (evt) => handleKeydownAndClose(evt, closeMessage, message, onDocumentKeydown);

  const onOutsideClick = (evt) => {
    if (evt.target === message) {
      closeMessage(message, onDocumentKeydown);
    }
  };

  document.body.append(message);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);

  message.querySelector(closeButtonClass).addEventListener('click', () => closeMessage(message, onDocumentKeydown));
};

const showSuccessMessage = () => {
  createMessage('#success', '.success__button');
};

const showErrorMessage = () => {
  createMessage('#error', '.error__button');
};

export { showSuccessMessage, showErrorMessage };
