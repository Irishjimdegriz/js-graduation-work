const initIcons = (selector) => {
  const formulaIcons = document.querySelectorAll(`.row>.${selector}-item>.${selector}-item__icon`);
  formulaIcons.forEach(item => {
    item.addEventListener('mouseenter', (event) => {
      event.target.closest(`.${selector}-item`).classList.add('active-item');

      const popup = event.target.querySelector(`.${selector}-item-popup`);

      if (popup.getBoundingClientRect().top < 0) {
        popup.classList.add('popup-rotated');
        popup.closest('.row').classList.add('row-popup');
      }
    });
    item.addEventListener('mouseleave', (event) => {
      event.target.closest(`.${selector}-item`).classList.remove('active-item');

      const popup = event.target.querySelector(`.${selector}-item-popup`);

      popup.classList.remove('popup-rotated');
      popup.closest('.row').classList.remove('row-popup');
    });
  });
};

const hint = () => {
  initIcons('formula');
  initIcons('problems');
}

hint();
//export default hint;