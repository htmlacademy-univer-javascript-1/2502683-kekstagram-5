import { fetchPhotos } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showFilters, setFilterListeners } from './filters.js';

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
  .then((photos) => {
    renderThumbnails(photos);
    showFilters();
    setFilterListeners(photos);
  })
  .catch(() => {
    showErrorMessage('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  });

//module12-task1