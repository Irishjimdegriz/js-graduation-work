const phoneAccordeon = () => {
  const contactsArrow = document.querySelector('.header-contacts__arrow');

  contactsArrow.addEventListener('click', () => {
    const hiddenPhoneBlock = document.querySelector('.header-contacts__phone-number-accord'),
          hiddenPhone = hiddenPhoneBlock.querySelector('.header-contacts__phone-number');

    if (hiddenPhoneBlock.style.position === '' || hiddenPhoneBlock.style.position === 'absolute') {
      hiddenPhoneBlock.style.position = 'static';
      hiddenPhone.style.opacity = 1;
      contactsArrow.querySelector('img').style.cssText = 'transform: rotateX(180deg)';

      contactsArrow.style.cssText = `
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            `;
    } else {
      hiddenPhoneBlock.style.position = 'absolute';
      hiddenPhone.style.opacity = 0;
      contactsArrow.querySelector('img').style.cssText = 'transform: rotateX(0deg)';
      //contactsArrow.style.display = "block";
    }
  });
};

export default phoneAccordeon;