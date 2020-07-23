const hint = () => {
  const formulaIcons = document.querySelectorAll('.formula-item__icon');
  console.log(formulaIcons.length);
  formulaIcons.forEach(item => {
    item.addEventListener('mouseenter', (event) => {
      event.target.closest('.formula-item').classList.add('active-item');

      const popup = event.target.querySelector('.formula-item-popup');

      if (popup.getBoundingClientRect().top < 0) {
        popup.classList.add('popup-rotated');
        popup.closest('.row').classList.add('row-popup');
      }
    });
    item.addEventListener('mouseleave', (event) => {
      event.target.closest('.formula-item').classList.remove('active-item');

      const popup = event.target.querySelector('.formula-item-popup');

      popup.classList.remove('popup-rotated');
      popup.closest('.row').classList.remove('row-popup');
    });
  });
}

export default hint;