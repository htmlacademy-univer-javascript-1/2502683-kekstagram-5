import { generatePhotoData } from './photos.js';
import { renderThumbnails } from './render-thumbnails.js'

const photoData = generatePhotoData();
console.log(photoData);

renderThumbnails();
