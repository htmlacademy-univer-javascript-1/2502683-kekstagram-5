import noUiSlider from '../vendor/nouislider/nouislider.js';

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

const resetEffects = () => {
  currentEffect = 'none';
  updateEffect();
};

export { resetEffects };