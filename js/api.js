const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

/**
 * Функция для получения данных с сервера
 * @returns {Promise<Array>} Массив данных с сервера
 */
const fetchPhotos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * Функция для отправки данных на сервер
 * @param {FormData} formData Данные формы
 * @returns {Promise<Response>} Ответ сервера
 */
const sendPhoto = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { fetchPhotos, sendPhoto };