import Pristine from '../vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const pristine = new Pristine(form);

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
};

const validateHashtags = (value) => {
  if (!value) return true; // Поле необязательное
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const isValid = hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  const noDuplicates = new Set(hashtags).size === hashtags.length;
  return isValid && noDuplicates && hashtags.length <= 5;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Хэш-теги должны начинаться с #, быть уникальными, не длиннее 20 символов и разделяться пробелами'
);

pristine.addValidator(
  descriptionInput,
  (value) => value.length <= 140,
  'Комментарий не должен превышать 140 символов'
);

fileInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !document.activeElement.closest('.text__hashtags, .text__description')) {
    closeForm();
  }
});