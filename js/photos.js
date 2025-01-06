import { getPhotos } from './data.js';
import { renderThumbnails } from './render.js';
import { init } from './filters.js';

const loadPhotos = async () => {
  try {
    const photos = await getPhotos();
    renderThumbnails(photos);
    init(photos, renderThumbnails);
  } catch (error) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('data-error');
    errorElement.textContent = 'Ошибка загрузки данных. Попробуйте обновить страницу.';
    document.body.append(errorElement);
  }
};

export { loadPhotos };