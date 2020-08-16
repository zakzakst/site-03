import fireApp from './_module/firebase';

class SettingsClass {
  constructor() {
    this.nameInput = document.getElementById('js-settings-name');
    this.messageInput = document.getElementById('js-settings-message');
    this.textInput = document.getElementById('js-settings-text');
    this.imgInput = document.getElementById('js-settings-img');
    this.imgPreview = document.getElementById('js-settings-img-preview');
    this.id = sessionStorage.getItem('id');
    this.settingsBtn = document.getElementById('js-settings-btn');
  }
  init() {
    if(!this.id) {
      // idパラメータがない場合はリダイレクト
      location.href = './';
    } else {
      this.showSettingsData();
      this.updateSettingsHandler();
      this.imgPreviewHandler();
    }
  }
  getSettingsData() {
    // 現在の設定データを取得
    const result = new Promise(resolve => {
      fireApp.database().ref(`site-03/data/${this.id}`).on('value', snapshot => {
        resolve(snapshot.val());
      });
    });
    return result;
  }
  showSettingsData() {
    // 現在の設定を表示
    // データベースの表示
    this.getSettingsData()
      .then(settings => {
        this.nameInput.value = settings.name;
        this.messageInput.value = settings.message;
        this.textInput.value = settings.text;
      });
    // ストレージの表示
    fireApp.storage().ref().child(`site03/${this.id}/img`).getDownloadURL()
      .then(url => {
        this.imgPreview.setAttribute('src', url);
      })
      .catch(error => {
        console.log(error);
      });
  }
  updateSettings(data) {
    // 設定を更新
    // データベースの更新
    fireApp.database().ref(`site-03/data/${this.id}`).update(data.database)
      .then(() => {
        if(data.storage.img) {
          // ストレージの更新
          return fireApp.storage().ref(`site03/${this.id}/img`).put(data.storage.img);
        }
      })
      .then(() => {
        console.log('項目更新');
      })
      .catch(error => {
        console.log(error);
      });
  }
  updateSettingsHandler() {
    this.settingsBtn.addEventListener('click', () => {
      const updateData = {
        database: {
          name: this.nameInput.value,
          message: this.messageInput.value,
          text: this.textInput.value,
        },
        storage: {
          img: this.imgInput.files[0],
        }
      };
      this.updateSettings(updateData);
    });
  }
  imgPreviewChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview.setAttribute('src', reader.result);
    }
    reader.readAsDataURL(file);
  }
  imgPreviewHandler() {
    this.imgInput.addEventListener('change', e => {
      this.imgPreviewChange(e);
    });
  }
}

(function() {
  const settings = new SettingsClass();
  settings.init();
})();
