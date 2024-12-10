import { getRandomInt, getRandomElement } from './util.js';

const commentsMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commenterNames = [
  'Алексей',
  'Мария',
  'Иван',
  'Елена',
  'Сергей',
  'Татьяна',
  'Дмитрий',
  'Наталья',
];

export function generateComment(id) {
  const messageCount = getRandomInt(1, 2);
  const messages = [];
  for (let i = 0; i < messageCount; i++) {
    messages.push(getRandomElement(commentsMessages));
  }
  return {
    id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandomElement(commenterNames),
  };
}
