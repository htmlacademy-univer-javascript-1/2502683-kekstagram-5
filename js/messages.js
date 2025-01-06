const createMessage = (templateId, closeButtonClass) => {
    const template = document.querySelector(templateId).content.querySelector('section');
    const message = template.cloneNode(true);
  
    const closeMessage = () => {
      message.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    };
  
    const onDocumentKeydown = (evt) => {
      if (evt.key === 'Escape') {
        closeMessage();
      }
    };
  
    const onOutsideClick = (evt) => {
      if (evt.target === message) {
        closeMessage();
      }
    };
  
    document.body.append(message);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onOutsideClick);
  
    message.querySelector(closeButtonClass).addEventListener('click', closeMessage);
  };
  
  const showSuccessMessage = () => {
    createMessage('#success', '.success__button');
  };
  
  const showErrorMessage = () => {
    createMessage('#error', '.error__button');
  };
  
  export { showSuccessMessage, showErrorMessage };  