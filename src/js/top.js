import fireApp from './_module/firebase';
import axios from 'axios';

class TopClass {
  constructor() {
    this.userListEl = document.getElementById('js-user-list');
    this.userDataUrl = 'https://nuxt-29a7e.firebaseio.com/site-03/data.json';
    this.messageLimit = 30;
    this.defaultImg = 'https://bulma.io/images/placeholders/96x96.png';
  }
  init() {
    console.log('top page');
    this.showTopData();
  }
  getTopData() {
    // ユーザー一覧データを取得
    const result = new Promise(resolve => {
      axios
      .get(this.userDataUrl)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    });
    return result;
  }
  showTopData() {
    // ユーザー一覧を表示
    this.getTopData().then(data => {
      // オブジェクトを配列形式に変更
      const dataArr = Object.keys(data).map(key => {
        return Object.assign(data[key], {id: key});
      });
      // 配列を名前順にソート
      dataArr.sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      // 各アイテムをユーザー一覧に追加
      for(let i = 0; i < dataArr.length; i++) {
        this.addUserItem(dataArr[i]);
      }
    });
  }
  addUserItem(data) {
    const limitedMessage = data.message.length > this.messageLimit ? data.message.substring(0, this.messageLimit) + '…' : data.message;
    const html = `
      <div class="column is-one-third">
        <div class="card">
        <a href="./mypage.html?id=${data.id}">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img id="js-user-img-${data.id}" src="${this.defaultImg}" alt="">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${data.name}</p>
              </div>
            </div>
            <div class="content">
              <p>${limitedMessage}</p>
            </div>
          </div>
        </a>
        </div>
      </div>
    `;
    this.userListEl.insertAdjacentHTML('beforeend', html);
    // プロフィール画像URLの取得
    // （※ユーザーの並び順の制御のため、タイミングを送らせてデータ取得
    fireApp.storage().ref().child(`site03/${data.id}/img`).getDownloadURL()
      .then(url => {
        const userImgEl = document.getElementById(`js-user-img-${data.id}`);
        userImgEl.setAttribute('src', url);
      });
  }
}

(function() {
  const top = new TopClass();
  top.init();
})();
