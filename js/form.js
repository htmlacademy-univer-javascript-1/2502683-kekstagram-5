import { sendData } from './api.js';
import { resetEffects } from './effects.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const previewImage = document.querySelector('.img-upload__preview img');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isValidHashtag = (tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag);

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  return hashtags.every(isValidHashtag);
};

pristine.addValidator(hashtagsInput, validateHashtags, 'Неверный формат хэштега');

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(descriptionInput, validateDescription, 'Превышена длина описания');

const resetForm = () => {
  form.reset();
  resetEffects();
  previewImage.src = 'img/upload-default-image.jpg';
  pristine.reset();
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
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

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) return;

  submitButton.disabled = true;
  const formData = new FormData(form);

  try {
    await sendData(formData);
    resetForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
});