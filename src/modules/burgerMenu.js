const burgerMenu = () => {
  const popupDialogMenu = document.querySelector('.popup-dialog-menu');

  const setStartingPosition = (elem) => {
    if (elem.style.right != 0) {
      if (document.documentElement.clientWidth < 576) {
        elem.style.transition = '0';
        elem.style.cssText = `top: -${elem.clientHeight}px; right: ${elem.clientWidth}px`;
        elem.style.transition = '1s';
      } else {
        elem.style.cssText = '';
      }
    }
  };

  setStartingPosition(popupDialogMenu);

  window.addEventListener("resize", () => {
    setStartingPosition(popupDialogMenu);
  });

  document.addEventListener('click', (event) => {
    let target = event.target;
    

    if (target.closest('.menu')) {
      popupDialogMenu.style.cssText = `top: 0px; 
                                       right: ${popupDialogMenu.clientWidth}px;
                                       ${document.documentElement.clientWidth < 576 ? "transform: translate3d(0,0,0)" : ""}`;
    } else {
      if (!target.closest('.popup-dialog-menu') || target.closest('.popup-menu-nav') || target.closest('.close-menu')) {
        setStartingPosition(popupDialogMenu);
      }
    }

  });
};

export default burgerMenu;