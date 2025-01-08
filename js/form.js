import { sendData } from './api.js';
import { resetEffects } from './effects.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';
import { commentsRender, updateCommentCount, loadMoreComments } from './fullscreen.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const elements = {
  form: document.querySelector('.img-upload__form'),
  fileInput: document.querySelector('.img-upload__input'),
  previewImage: document.querySelector('.img-upload__preview img'),
  overlay: document.querySelector('.img-upload__overlay'),
  closeButton: document.querySelector('.img-upload__cancel'),
  submitButton: document.querySelector('.img-upload__submit'),
  hashtagsInput: document.querySelector('.text__hashtags'),
  descriptionInput: document.querySelector('.text__description'),
  commentInput: document.querySelector('.social__footer-text'),
  sendButton: document.querySelector('.social__footer-btn'),
};

const { form, fileInput, previewImage, overlay, closeButton, submitButton, hashtagsInput, descriptionInput, commentInput, sendButton } = elements;

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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetForm();
  }
};

fileInput.addEventListener('change', () => {
  const onFormKeydown = (evt) => {
    if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags, .text__description')) {
      overlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  document.addEventListener('keydown', onFormKeydown);

  closeButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onFormKeydown);
  });
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
      resetScale();
    });

    reader.readAsDataURL(file);
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
  }
});

closeButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydown);
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  submitButton.disabled = true;
  const formData = new FormData(form);

  try {
    await sendData(formData);
    resetForm();
    showSuccessMessage();
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  } catch {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
});

const isValidComment = (comment) => comment.length <= MAX_COMMENT_LENGTH;

sendButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const commentText = commentInput.value.trim();

  if (!isValidComment(commentText)) {
    const oldPlaceholder = commentInput.placeholder;
    commentInput.value = '';
    commentInput.placeholder = `Не более ${MAX_COMMENT_LENGTH} символов!`;

    setTimeout(() => {
      commentInput.placeholder = oldPlaceholder;
    }, 2000);
    return;
  }

  if (commentText) {
    const newComment = {
      avatar: 'img/avatar-6.svg',
      name: 'Вы',
      message: commentText,
    };

    commentsRender.currentComments.push(newComment);
    loadMoreComments();
    commentInput.value = '';
    updateCommentCount();
  }
});
