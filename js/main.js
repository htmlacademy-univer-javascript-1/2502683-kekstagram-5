function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

const commentsMessages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
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

function generateComment(id) {
    const messageCount = getRandomInt(1, 2);
    const messages = [];
    for (let i = 0; i < messageCount; i++) {
        messages.push(getRandomElement(commentsMessages));
    }
    return {
        id: id,
        avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
        message: messages.join(' '),
        name: getRandomElement(commenterNames),
    };
}

function generatePhotoData() {
    const photos = [];
    
    for (let i = 1; i <= 25; i++) {
        const photo = {
            id: i,
            url: `photos/${i}.jpg`,
            description: `Описание фотографии номер ${i}.`,
            likes: getRandomInt(15, 200),
            comments: []
        };

        const commentCount = getRandomInt(0, 30);
        for (let j = 1; j <= commentCount; j++) {
            photo.comments.push(generateComment(j));
        }
        
        photos.push(photo);
    }
    
    return photos;
}

const photoData = generatePhotoData();
console.log(photoData);
