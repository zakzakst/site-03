import fireApp from './firebase';

class HeaderMenu {
  constructor() {
    this.headerEl = document.getElementById('js-header__navbar');
    this.headerMenuBtn = document.getElementById('js-header__navbar-button');
    this.headerSignout = document.getElementById('js-header__signout');
  }
  init() {
    this.headerMenuHandler();
    this.headerBgHandler();
    this.headerSignoutHandler();
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
  signOut() {
    fireApp.auth().signOut()
      .then(() => {
        console.log('サインアウト');
      })
      .catch(error => {
        console.log(error);
      });
  }
  headerSignoutHandler() {
    this.headerSignout.addEventListener('click', e => {
      e.preventDefault();
      this.signOut();
    });
  }
}

export function headerScripts() {
  const headerMenu = new HeaderMenu();
  headerMenu.init();
}
