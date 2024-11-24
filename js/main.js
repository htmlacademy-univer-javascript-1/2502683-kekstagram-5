import { generatePhotoData } from './photos.js';
import { renderThumbnails } from './thumbnails.js';


const photoData = generatePhotoData();
console.log(photoData);

renderThumbnails();
