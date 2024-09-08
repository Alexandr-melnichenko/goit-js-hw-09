const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

let emailInput = document.querySelector('.feedback-form  input');
let messageInput = document.querySelector('.feedback-form  textarea');


checkInputArea();

// Перевірка полів форми та їх заповнення при перезавантаженні сторінки
function checkInputArea() {
  try {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const formDataValue = JSON.parse(savedMessage);

    if (savedMessage === null) {
      throw new Error('Local storage is empty');
    }

    emailInput.value = formDataValue.email;

    messageInput.value = formDataValue.message;
  } catch (error) {
    console.warn(error.message);
  }
}

form.addEventListener('input', addInputValue);

function addInputValue(event) {
  formData.email = emailInput.value;
  formData.message = messageInput.value;
  const target = event.target;

  // Определяем, какое именно поле было изменено
  if (target.name === 'email') {
    formData.email = target.value;
  } else if (target.name === 'message') {
    formData.message = target.value;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Натискання кнопки сабміт
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const formSubmit = event.currentTarget;

  if (emailInput.value === '' || messageInput.value === '') {
    return alert('Fill please all field');
  }

  //   Вивожу в консоль FormData, та очищаю форму та локальне сховище
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  console.log('formData:', JSON.parse(savedMessage));
  localStorage.removeItem(STORAGE_KEY);
  formSubmit.reset();
}
