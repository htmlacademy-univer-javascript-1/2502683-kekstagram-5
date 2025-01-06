import { getData } from './api.js';

const getPhotos = async () => {
  try {
    const photos = await getData();
    return photos;
  } catch (error) {
    throw new Error('Не удалось загрузить данные с сервера');
  }
};

export { getPhotos };