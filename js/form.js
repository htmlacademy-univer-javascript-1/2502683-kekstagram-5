import { sendPhoto } from './api.js';
import { resetEffects } from './effects.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


const resetForm = () => {
  form.reset();
  resetEffects();
};

fileInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetForm();
});

closeButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
});

const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === message) {
      removeMessage();
    }
  };

  message.querySelector('button').addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  submitButton.disabled = true;

  const formData = new FormData(form);

  try {
    await sendPhoto(formData);
    showMessage(successTemplate);
    resetForm();
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  } catch {
    showMessage(errorTemplate);
  } finally {
    submitButton.disabled = false;
  }
});