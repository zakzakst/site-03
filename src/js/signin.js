import fireApp from './_module/firebase';

(function() {
  console.log(fireApp);
  loginClick();
})();

function loginClick() {
  const btnEl = document.getElementById('js-login-test');
  btnEl.addEventListener('click', () => {
    console.log(btnEl);
    // signUp('fortest1@mail.co.jp', 'password');
    signIn('fortest1@mail.co.jp', 'password');
    // signOut();
  });
}

function signIn(email, password) {
  fireApp.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('サインイン');
    })
    .catch(error => {
      console.log(error);
    });
}

function signUp(email, password) {
  fireApp.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      // userId = data.user.uid;
      // const userData = {
      //   email: payload.email,
      //   createdAt: new Date().toISOString(),
      // };
      // return fireApp.database().ref(`base/users/${userId}`).set(userData);
      console.log(data);
    })
    // .then(() => {
    //   commit('setId', userId);
    //   commit('setSignInBusy', false);
    //   // this.$router.push('/');
    //   console.log('サインアップ');
    // })
    .catch(error => {
      console.log(error);
    });
}

function signOut() {
  fireApp.auth().signOut()
    .then(() => {
      console.log('サインアウト');
      // this.$router.push('/auth');
      // setTimeout(() => {
      //   commit('setId', null);
      //   console.log('サインアウト');
      // }, 500);
    })
    .catch(error => {
      console.log(error);
    });
}
