import fireApp from './_module/firebase';

class SignInClass {
  constructor() {
    this.signInTabs = document.querySelectorAll('.js-signin-tab a');
    this.signInBtns = document.querySelectorAll('.js-signin-btn');
    this.inputMail = document.getElementById('js-signin-input-email');
    this.inputPassword = document.getElementById('js-signin-input-password');
    this.signInBtn = document.getElementById('js-signin-btn');
    this.signUpBtn = document.getElementById('js-signup-btn');
    this.topPageName = '';
  }
  init() {
    this.tabChangeHandler();
    this.signInHandler();
    this.signUpHandler();
  }
  signIn(email, password) {
    fireApp.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        location.href = `./${this.topPageName}`;
      })
      .catch(error => {
        console.log(error);
      });
  }
  signInHandler() {
    this.signInBtn.addEventListener('click', () => {
      const email = this.inputMail.value;
      const password = this.inputPassword.value;
      this.signIn(email, password);
    });
  }
  signUp(email, password) {
    fireApp.auth().createUserWithEmailAndPassword(email, password)
      .then(data => {
        const id = data.user.uid;
        const userData = {
          name: '',
          message: '',
          text: '',
          updatedAt: Date.now(),
        };
        return fireApp.database().ref(`site-03/data/${id}`).set(userData);
      })
      .then(() => {
        console.log('サインアップ');
        location.href = `./${this.topPageName}`;
      })
      .catch(error => {
        console.log(error);
      });
  }
  signUpHandler() {
    this.signUpBtn.addEventListener('click', () => {
      const email = this.inputMail.value;
      const password = this.inputPassword.value;
      this.signUp(email, password);
    });
  }
  tabChange(el) {
    // タブのクラス切り替え
    [...this.signInTabs].forEach(tab => {
      tab.parentNode.classList.remove('is-active');
    });
    el.parentNode.classList.add('is-active');
    // 対象ボタンを表示
    [...this.signInBtns].forEach(btn => {
      btn.style.display = 'none';
    });
    const targetId = el.getAttribute('href');
    const targetEl = document.getElementById(targetId.slice(1));
    targetEl.style.display = null;
  }
  tabChangeHandler() {
    // 初期ボタンの表示とクリックイベントの設定
    [...this.signInTabs].forEach(el => {
      if(el.parentNode.classList.contains('is-active')) {
        this.tabChange(el);
      }
      el.addEventListener('click', e => {
        e.preventDefault();
        this.tabChange(e.target);
      });
    });
  }
}

(function() {
  const signin = new SignInClass();
  signin.init();
})();
