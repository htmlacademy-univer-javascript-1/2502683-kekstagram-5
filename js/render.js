import { openBigPicture } from './fullscreen.js';
import { getData } from './api.js';
import { init } from './filters.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture({ url, description, likes, comments, id });
  });

  thumbnail.querySelector('.picture__likes').addEventListener('click', (evt) => {
    evt.stopPropagation();
    const likesElement = evt.target;
    const currentLikes = parseInt(likesElement.textContent, 10);
    likesElement.textContent = currentLikes + 1;
  });

  return thumbnail;
};

const showError = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;

  const closeError = () => {
    errorElement.remove();
  };

  errorElement.querySelector('.error__button').addEventListener('click', closeError);
  errorElement.addEventListener('click', (evt) => {
    if (evt.target === errorElement) {
      closeError();
    }
  });

  body.append(errorElement);
};

const renderFilteredThumbnails = (filteredPhotos) => {
  const thumbnails = container.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    container.removeChild(thumbnail);
  });

  filteredPhotos.forEach((photo) => {
    container.append(createThumbnail(photo));
  });
};

const renderThumbnails = async () => {
  try {
    const photos = await getData();
    photos.forEach((photo) => {
      container.append(createThumbnail(photo));
    });
    init(photos, renderFilteredThumbnails);
  } catch (error) {
    showError(error.message);
  }
};

export { createThumbnail, renderFilteredThumbnails, renderThumbnails };
