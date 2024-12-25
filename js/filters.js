import { debounce } from './util.js';
import { renderThumbnails } from './thumbnails.js';

const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const imgFiltersElement = document.querySelector('.img-filters');
const filterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');

const showFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const removeActiveClass = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const applyFilter = (filter, photos) => {
  switch (filter) {
    case FILTER_RANDOM:
      return photos
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, RANDOM_PHOTOS_COUNT);

    case FILTER_DISCUSSED:
      return photos.slice().sort((a, b) => b.comments.length - a.comments.length);

    default:
      return photos;
  }
};

const setFilterListeners = (photos) => {
  const debouncedRender = debounce((filteredPhotos) => renderThumbnails(filteredPhotos), DEBOUNCE_DELAY);

  imgFiltersElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      const filter = evt.target.id;

      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');

      const filteredPhotos = applyFilter(filter, photos);
      debouncedRender(filteredPhotos);
    }
  });
};

export { showFilters, setFilterListeners };
