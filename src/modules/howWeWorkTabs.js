
  const howWeWorkTabs = () => {
    const tabHeader = document.querySelector('#scheme-list'),
          tab = tabHeader.querySelectorAll('.scheme-nav__item'),
          tabContent = document.querySelectorAll('.scheme-description-block'),
          pictures = document.querySelectorAll('.scheme-slider__slide');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.add('visible-content-block');
          pictures.forEach(picture => {
            picture.style.transform = `translateY(-${i * 100}%)`;
          });
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.remove('visible-content-block');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.scheme-nav__item');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  export default howWeWorkTabs;