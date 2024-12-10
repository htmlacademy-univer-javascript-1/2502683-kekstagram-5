import { generatePhotoData } from './photos.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';

const photoData = generatePhotoData();
console.log(photoData);

renderThumbnails(photoData);
//module9-task2