import { openBigPicture } from './fullscreen.js';

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', () => {
    openBigPicture({ url, description, likes, comments });
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const container = document.querySelector('.pictures');
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });

  container.append(fragment);
};

export { renderThumbnails };
