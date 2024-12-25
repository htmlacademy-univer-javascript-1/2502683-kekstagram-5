import { sendPhoto } from './api.js';
import { resetEffects } from './effects.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const resetForm = () => {
  form.reset();
  resetEffects();
  previewImage.src = 'img/upload-default-image.jpg';
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;

      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
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