import { getRandomInt } from './util.js';
import { generateComment } from './comments.js';

export function generatePhotoData() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии номер ${i}.`,
      likes: getRandomInt(15, 200),
      comments: [],
    };

    const commentCount = getRandomInt(0, 30);
    for (let j = 1; j <= commentCount; j++) {
      photo.comments.push(generateComment(j));
    }

    photos.push(photo);
  }
  return photos;
}