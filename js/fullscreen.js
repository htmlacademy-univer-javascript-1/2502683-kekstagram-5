const COMMENTS_PER_PAGE = 5;
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let currentPage = 0;

const renderComments = () => {
  const start = currentPage * COMMENTS_PER_PAGE;
  const end = start + COMMENTS_PER_PAGE;
  const commentsToShow = currentComments.slice(start, end);

  commentsToShow.forEach((comment) => {
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const openFullscreen = (photoData) => {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  socialComments.innerHTML = '';
  
  photoData.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(commentElement);
  });

  currentPage++;

  const displayedComments = Math.min(currentPage * COMMENTS_PER_PAGE, currentComments.length);
  commentCountBlock.innerHTML = `${displayedComments} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  if (displayedComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const openFullscreen = (photoData) => {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  currentComments = photoData.comments;
  currentPage = 0;
  socialComments.innerHTML = '';

  renderComments();

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsLoader.addEventListener('click', renderComments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyPress);
};

const closeFullscreen = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyPress);
  commentsLoader.removeEventListener('click', renderComments);
};

const onEscKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullscreen();
  }
};

closeButton.addEventListener('click', closeFullscreen);

export { openFullscreen };
export { openFullscreen };
//test