const popupDialogMenu = document.querySelector('.popup-dialog-menu');

const fullList = () => {
  const setStartingPosition = (elem) => {
    if (elem.style.right != 0) {
      if (window.innerWidth < 576) {
        elem.style.transition = '0';
        elem.style.cssText = `top: -${elem.clientHeight}px; right: ${elem.clientWidth}px`;
        elem.style.transition = '1s';
      } else {
        elem.style.cssText = '';
      }
    }
  };

  document.addEventListener('click', (event) => {
    const popupRepairTypes = document.querySelector('.popup-repair-types');
    if (event.target.closest('.link-list-menu') || event.target.closest('.link-list-repair')) {
      popupRepairTypes.style.visibility = 'visible';
      setStartingPosition(popupDialogMenu);
    } else if (!event.target.closest('.popup-dialog-repair-types') || event.target.closest('.close')) {
      popupRepairTypes.style.visibility = 'hidden';
    }
  });
}

export default fullList;