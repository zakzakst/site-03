import fireApp from './_module/firebase';

class SignInClass {
  constructor() {
    this.inputMail = document.getElementById('js-signin-input-email');
    this.inputPassword = document.getElementById('js-signin-input-password');
    this.signInBtn = document.getElementById('js-signin-btn');
    this.signUpBtn = document.getElementById('js-signup-btn');
    this.topPageName = '';
  }
  init() {
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
}

(function() {
  const signin = new SignInClass();
  signin.init();
})();
