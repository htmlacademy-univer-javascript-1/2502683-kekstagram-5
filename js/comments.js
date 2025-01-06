const COMMENTS_PER_PAGE = 5;
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentsCounter = document.querySelector('.social__comment-count');

let comments = [];
let commentsShown = 0;

const createComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = avatar;
  imgElement.alt = name;
  imgElement.width = 35;
  imgElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(imgElement, textElement);

  return commentElement;
};

const appendComments = (newComments) => {
  const fragment = document.createDocumentFragment();
  newComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });
  commentsList.append(fragment);
  commentsShown += newComments.length;

  commentsCounter.textContent = `${commentsShown} из ${comments.length} комментариев`;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const clearComments = () => {
  commentsList.innerHTML = '';
  commentsShown = 0;
};

const loadComments = (data) => {
  comments = data;
  clearComments();
  renderComments();
};

commentsLoader.addEventListener('click', () => {
  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);
  appendComments(nextComments);
});

export { loadComments, clearComments, appendComments };