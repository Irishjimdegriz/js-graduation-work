const scrollFunction = (event) => {
  event.preventDefault();

  if (event.target.tagName.toLowerCase() === "a") {
    let targetLink = event.target.getAttribute("href").substring(1),
        token,
        offsetTop = document.getElementById(targetLink).offsetTop,
        scrollTop = document.documentElement.scrollTop,
        bottom = scrollTop < offsetTop;

        token = requestAnimationFrame(function calculate() {
          scrollTop = bottom ? scrollTop + 100 : scrollTop - 100;
          document.documentElement.scrollTop = scrollTop;

          if ((scrollTop >= offsetTop && bottom) || (scrollTop < offsetTop && !bottom)) {
            cancelAnimationFrame(token);
          } else {
            calculate();
          }
        });

  }
};

const smoothScrolling = () => {
  const links = document.querySelector(".popup-dialog-menu"),
        footerLink = document.querySelector(".button-footer a");

  links.addEventListener("click", () => {
    if (event.target.closest(".popup-menu-nav__item")) {
      scrollFunction(event);
    }
  });

  footerLink.addEventListener("click", scrollFunction);
  
  const html = document.querySelector('html');
  html.style.scrollBehavior = 'smooth';
}


//smoothScrolling();
export default smoothScrolling;