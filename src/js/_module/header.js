import { AuthCheck } from './auth-check';

class HeaderMenu {
  constructor() {
    this.headerEl = document.getElementById('js-header__navbar');
    this.headerMenuBtn = document.getElementById('js-header__navbar-button');
    this.headerSignout = document.getElementById('js-header__signout');
    this.headerMyPage = document.getElementById('js-header__mypage');
    this.authCheck = new AuthCheck();
  }
  init() {
    this.headerMenuHandler();
    this.headerBgHandler();
    this.headerSignoutHandler();
    this.headerMyPageHandler();
  }
  headerMenuOpen() {
    this.headerEl.classList.add('is-open');
  }
  headerMenuClose() {
    this.headerEl.classList.remove('is-open');
  }
  headerMenuHandler() {
    this.headerMenuBtn.addEventListener('click', e => {
      e.preventDefault();
      if(this.headerEl.classList.contains('is-open')) {
        this.headerMenuClose();
      } else {
        this.headerMenuOpen();
      }
    });
  }
  headerBgHandler() {
    const options = {
      root: null,
      rootMargin: '1% 0px -101%',
      threshold: 0
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.headerEl.classList.add('is-show-bg');
        } else {
          this.headerEl.classList.remove('is-show-bg');
        }
      });
    }, options);
    observer.observe(document.body);
  }
  headerSignoutHandler() {
    this.headerSignout.addEventListener('click', e => {
      e.preventDefault();
      this.authCheck.signOut();
    });
  }
  headerMyPageHandler() {
    this.headerMyPage.addEventListener('click', e => {
      const id = this.authCheck.getIdStorage();
      if(id) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        location.href = `${href}?id=${id}`;
      }
    });
  }
}

export function headerScripts() {
  const headerMenu = new HeaderMenu();
  headerMenu.init();
}
