import fireApp from './firebase';

export class AuthCheck {
  constructor() {
    this.storageKey = 'id';
    this.authClass = 'is-signin';
    this.signInPageName = 'signin.html';
  }
  init() {
    const idStorage = this.getIdStorage();
    if(idStorage) {
      this.setAuthClass();
    } else {
      this.checkAuth();
    }
  }
  getIdStorage() {
    // セッションストレージを取得
    const result = sessionStorage.getItem(this.storageKey);
    return result;
  }
  setIdStorage(id) {
    // セッションストレージをセット
    sessionStorage.setItem(this.storageKey, id);
  }
  clearIdStorage() {
    // セッションストレージをクリア
    sessionStorage.removeItem(this.storageKey);
  }
  checkAuth() {
    // fireauthをチェック
    fireApp.auth().onAuthStateChanged(user => {
      if(user) {
        // サインインしていいる場合はストレージにIDをセット
        this.setIdStorage(user.uid);
        this.setAuthClass();
      }
    });
  }
  setAuthClass() {
    // bodyにクラスをセット
    document.body.classList.add(this.authClass);
  }
  signOut() {
    // サインアウト
    fireApp.auth().signOut()
      .then(() => {
        document.body.classList.remove(this.authClass);
        this.clearIdStorage();
        location.href = `./${this.signInPageName}`;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
