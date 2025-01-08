import '../vendor/nouislider/nouislider.js';

const EffectSetups = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const elements = {
  previewImage: document.querySelector('.img-upload__preview img'),
  effectLevelSlider: document.querySelector('.effect-level__slider'),
  effectLevelValue: document.querySelector('.effect-level__value'),
  effectContainer: document.querySelector('.img-upload__effect-level'),
  effectRadios: document.querySelectorAll('.effects__radio'),
};

const { previewImage, effectLevelSlider, effectLevelValue, effectContainer, effectRadios } = elements;

let chosenEffect = EffectSetups.none;

noUiSlider.create(effectLevelSlider, {
  range: { min: chosenEffect.min, max: chosenEffect.max },
  start: chosenEffect.max,
  step: chosenEffect.step,
  connect: 'lower',
});

const updateEffect = () => {
  if (chosenEffect === EffectSetups.none) {
    previewImage.style.filter = '';
    effectContainer.classList.add('hidden');
  } else {
    effectContainer.classList.remove('hidden');
    const value = effectLevelSlider.noUiSlider.get();
    previewImage.style.filter = `${chosenEffect.filter}(${value}${chosenEffect.unit})`;
    effectLevelValue.value = value;
  }
};

effectLevelSlider.noUiSlider.on('update', updateEffect);

effectRadios.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    chosenEffect = EffectSetups[evt.target.value];
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: chosenEffect.min, max: chosenEffect.max },
      start: chosenEffect.max,
      step: chosenEffect.step,
    });
    updateEffect();
  });
});

const resetEffects = () => {
  chosenEffect = EffectSetups.none;
  updateEffect();
};

export { resetEffects };
