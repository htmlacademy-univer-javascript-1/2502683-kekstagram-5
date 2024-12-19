import { sendPhoto } from './api.js';
import { resetEffects } from './effects.js';
import noUiSlider from '../vendor/nouislider/nouislider.js';


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
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');
const effectContainer = document.querySelector('.img-upload__effect-level');

const effects = {
  none: { style: '', min: 0, max: 0, step: 0 },
  chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1 },
  sepia: { style: 'sepia', min: 0, max: 1, step: 0.1 },
  marvin: { style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { style: 'brightness', min: 1, max: 3, step: 0.1 },
};

let currentScale = 100;
let currentEffect = 'none';

noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const updateEffect = () => {
  const effect = effects[currentEffect];
  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    effectContainer.classList.add('hidden');
  } else {
    effectContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: effect.min, max: effect.max },
      start: effect.max,
      step: effect.step,
    });
    imagePreview.style.filter = `${effect.style}(${effect.max}${effect.unit || ''})`;
    effectLevelValue.value = effect.max;
  }
};

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effect = effects[currentEffect];
  imagePreview.style.filter = `${effect.style}(${value}${effect.unit || ''})`;
  effectLevelValue.value = value;
});

effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;
    updateEffect();
  });
});

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
});

const resetForm = () => {
  form.reset();
  currentScale = 100;
  currentEffect = 'none';
  updateScale();
  updateEffect();
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