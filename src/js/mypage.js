import fireApp from './_module/firebase';
import marked from 'marked';

class MyPageClass {
  constructor() {
    this.nameEl = document.getElementById('js-mypage-name');
    this.messageEl = document.getElementById('js-mypage-message');
    this.textEl = document.getElementById('js-mypage-text');
    this.imgEl = document.getElementById('js-mypage-img');
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
  // async showPageData() {
  showPageData() {
    // 内容を表示
    // const pageData = await this.getPageData();
    this.getPageData().then(pageData => {
      this.nameEl.textContent = pageData.name;
      this.messageEl.textContent = pageData.message;
      this.textEl.innerHTML = marked(pageData.text);
      this.imgEl.setAttribute('src', pageData.img);
    });
  }
}

(function() {
  const mypage = new MyPageClass();
  mypage.init();
})();
