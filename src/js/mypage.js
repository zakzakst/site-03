import fireApp from './_module/firebase';
import marked from 'marked';

class MyPageClass {
  constructor() {
    this.nameEl = document.getElementById('js-mypage-name');
    this.messageEl = document.getElementById('js-mypage-message');
    this.textEl = document.getElementById('js-mypage-text');
    this.imgEl = document.getElementById('js-mypage-img');
    this.defaultImg = 'https://bulma.io/images/placeholders/96x96.png';
    this.id = '';
    const params = location.search.substring(1).split('&');
    for(let i = 0; i < params.length; i++) {
      const param = params[i].split('=');
      if(param[0] === 'id') {
        this.id = param[1];
      }
    }
  }
  init() {
    if(!this.id) {
      // idパラメータがない場合はリダイレクト
      location.href = './';
    } else {
      this.showPageData();
    }
  }
  getPageData() {
    // マイページ用のデータを取得
    const result = new Promise(resolve => {
      fireApp.database().ref(`site-03/data/${this.id}`).on('value', snapshot => {
        resolve(snapshot.val());
      });
    });
    return result;
  }
  showPageData() {
    // 内容を表示
    // データベースの表示
    this.getPageData().then(pageData => {
      this.nameEl.textContent = pageData.name;
      this.messageEl.textContent = pageData.message;
      this.textEl.innerHTML = marked(pageData.text);
    });
    // ストレージの表示
    let imgUrl = '';
    fireApp.storage().ref().child(`site03/${this.id}/img`).getDownloadURL()
      .then(url => {
        imgUrl = url;
      })
      .catch(error => {
        imgUrl = this.defaultImg;
      })
      .finally(() => {
        this.imgEl.setAttribute('src', imgUrl);
      });
  }
}

(function() {
  const mypage = new MyPageClass();
  mypage.init();
})();
