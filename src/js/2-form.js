const formEl = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';

loadFromLS(formEl, storageKey);

formEl.addEventListener('input', saveToLS);
formEl.addEventListener('submit', handlerFormSubmit);

function loadFromLS(form, key) {
  const savedData = localStorage.getItem(key);

  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email ?? '';
    form.elements.message.value = message ?? '';
  }
}

function saveToLS(e) {
  const data = {
    email: e.currentTarget.elements.email.value.trim(),
    message: e.currentTarget.elements.message.value.trim(),
  };

  localStorage.setItem(storageKey, JSON.stringify(data));
}
function handlerFormSubmit(e) {
  e.preventDefault();
  const formData = JSON.parse(localStorage.getItem(storageKey)) || {};
  const { email, message } = formData;

  if (!email || !message) {
    return alert('Please fill in all the fields!');
  }

  console.log(formData);

  localStorage.removeItem(storageKey);
  formEl.reset();
}
