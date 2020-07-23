const accordeon = () => {
  const accordeonBlock = document.querySelector('.accordion'),
        hideAllItems = () => {
          const allListItems = accordeonBlock.querySelectorAll('.title_block');

          allListItems.forEach(item => {
            item.classList.remove('msg-active');
          });
        };

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
    }
  });
};

export default accordeon;