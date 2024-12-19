import { generatePhotoData } from './photos.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { fetchPhotos } from './api.js';

const showErrorMessage = (message, duration = 5000) => {
  const errorContainer = document.createElement('div');
  errorContainer.style = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: red;
    color: white;
    text-align: center;
  `;
  errorContainer.textContent = message;

  document.body.appendChild(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, duration);
};

fetchPhotos()
  .then(renderThumbnails)
  .catch(() => {
    showErrorMessage('Не удалось загрузить фотографии. Используем тестовые данные.');
    const photoData = generatePhotoData();
    renderThumbnails(photoData);
  });

renderThumbnails(photoData);