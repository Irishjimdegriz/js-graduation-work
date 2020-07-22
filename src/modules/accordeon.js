const accordeon = () => {
  const accordeonBlock = document.querySelector('.accordion'),
        hideAllItems = () => {
          const allListItems = accordeonBlock.querySelectorAll('.title_block');

          allListItems.forEach(item => {
            item.classList.remove('msg-active');
          });
        };

  hideAllItems();

  accordeonBlock.addEventListener('click', (event) => {
    let target = event.target.closest('.title_block');
    if (target) {
      let allHidden = false;

      if (target.classList.contains('msg-active')) {
        allHidden = true;
      }

      hideAllItems();

      if (!allHidden) {
        target.classList.add('msg-active');
      }

      //console.dir(event.target);
      // event.target.nextElementSibling.style.cssText = `max-height: auto;
      //                                                  opacity: 1;
      //                                                  -webkit-transform: none;
      //                                                  transform: none;`;
    }
  });
};

export default accordeon;