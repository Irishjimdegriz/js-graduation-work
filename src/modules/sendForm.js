const sendForm = () => {
  const formsFeedback = document.querySelectorAll('.feedback__form');
  const errorMessage = 'Что-то пошло не так...',
      loadMessage = `<div class="sk-rotating-plane"></div>`,
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;`;
  formsFeedback.forEach(item => {
      item.addEventListener('submit', e => {
          e.preventDefault();

          const checkBox = item.querySelector('.checkbox__input');

          if (checkBox.checked === false) {
            alert('Вы должны дать согласие на обработку персональных данных');
            return;
          }

          const formData = new FormData(item);
          let body = {};
          formData.forEach((value,key) => body[key] = value);
          
          const popupThank = document.querySelector('.popup-thank');
          popupThank.style.visibility = 'visible';

          document.addEventListener('click', (event) => {
              if (!event.target.closest('.popup-thank-bg') || event.target.closest('.close')) {
                popupThank.style.visibility = 'hidden';
              }
          });

          postData(body)
              .then((response) => {
                  console.log(response);
                  if(response.status !== 200) {
                    throw new Error(`Что-то пошло не так, код ошибки - ${response.status}`);
                  }
                  statusMessage.innerHTML = successMessage;
                  setTimeout(() => statusMessage.innerHTML = '', 3000);
              })
              .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage; setTimeout(() => statusMessage.innerHTML = '', 3000);});
      });
  })

  const postData = (body) => {
      return fetch('/server.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });
  } 
}

//sendForm();
export default sendForm;