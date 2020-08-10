import $ from 'jquery';

export function headerScripts() {
  const el = $('#js-header__navbar');
  if(!el) {return;}
  const menu = $('#js-header__navbar-menu');
  const button = $('#js-header__navbar-button');
  const speed = 400;

  addEventToggleMenu();
  addEventRisizeReset();
  addObserverHederBg();

  function addEventToggleMenu() {
    button.on('click', (e) => {
      e.preventDefault();
      if(el.hasClass('is-open')) {
        menuClose();
      } else {
        menuOpen();
      }
    });
  }

  function addEventRisizeReset() {
    $(window).resize(() => {
      menuClear();
    });
  }

  function menuOpen() {
    menu.slideDown(speed);
    el.addClass('is-open');
    button.addClass('is-active');
  }

  function menuClose() {
    menu.slideUp(speed, () => {
      el.removeClass('is-open');
      button.removeClass('is-active');
    });
  }

  function menuClear() {
    menu.css('display', '');
    el.removeClass('is-open');
    button.removeClass('is-active');
  }

  function addObserverHederBg() {
    const options = {
      root: null,
      rootMargin: '2% 0px -102%',
      threshold: 0
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.addClass('is-show-bg');
        } else {
          el.removeClass('is-show-bg');
        }
      });
    }, options);
    observer.observe(document.body);
  }
}
