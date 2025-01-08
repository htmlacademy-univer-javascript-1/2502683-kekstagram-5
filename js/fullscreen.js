import { appendComments } from './comments.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PER_PAGE = 5;
const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__img img');
const pictureCaption = document.querySelector('.social__caption');
const pictureLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsContainer = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

const commentsRender = {
  currentComments: [],
  commentsShown: 0,
};

let onDocumentKeydown;

const handleKeydownAndClose = (evt, closeCallback, additionalCheck) => {
  if (isEscapeKey(evt) && (!additionalCheck || !evt.target.closest(additionalCheck))) {
    closeCallback();
  }
};

const updateCommentCount = () => {
  commentsContainer.textContent = `${commentsRender.commentsShown} из ${commentsRender.currentComments.length} комментариев`;
};

const loadMoreComments = () => {
  const newComments = commentsRender.currentComments.slice(
    commentsRender.commentsShown,
    commentsRender.commentsShown + COMMENTS_PER_PAGE
  );
  appendComments(newComments);
  commentsRender.commentsShown += newComments.length;
  updateCommentCount();

  if (commentsRender.commentsShown >= commentsRender.currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const closeBigPicture = () => {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', loadMoreComments);
};

const openBigPicture = (data) => {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  pictureImage.src = data.url;
  pictureLikesCount.textContent = data.likes || 0;
  pictureCaption.textContent = data.description || 'Нет описания';

  commentsRender.currentComments = data.comments || [];
  commentsRender.commentsShown = 0;
  commentsList.innerHTML = '';

  appendComments(commentsRender.currentComments.slice(0, COMMENTS_PER_PAGE));
  commentsRender.commentsShown = Math.min(COMMENTS_PER_PAGE, commentsRender.currentComments.length);
  updateCommentCount();

  commentsLoader.classList.toggle('hidden', commentsRender.commentsShown >= commentsRender.currentComments.length);

  pictureCloseButton.addEventListener('click', () => closeBigPicture());
  onDocumentKeydown = (evt) => handleKeydownAndClose(evt, closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', loadMoreComments);
};

export { openBigPicture, updateCommentCount, loadMoreComments, commentsRender };
