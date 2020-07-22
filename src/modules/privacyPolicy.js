const privacyPolicy = () => {
  document.addEventListener('click', (event) => {
    const popupPrivacy = document.querySelector('.popup-privacy');

    if (event.target.closest('.link-privacy')) {
      popupPrivacy.style.visibility = 'visible';
    } else if (!event.target.closest('.popup-dialog-privacy')) {
      popupPrivacy.style.visibility = 'hidden';
    }
  });
};

export default privacyPolicy;