const consult = () => {
  document.addEventListener('click', (event) => {
    const consultDialog = document.querySelector('.popup-consultation');

    if (event.target.closest('.button_wide')) {
      consultDialog.style.visibility = 'visible';
    } else if (!event.target.closest('.feedback-wrap') || event.target.closest('.close-consultation')) {
      consultDialog.style.visibility = 'hidden';
    }
  });
};

export default consult;