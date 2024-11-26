import { generatePhotoData } from './photos.js';

const renderThumbnails = () => {
  const photos = generatePhotoData();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
