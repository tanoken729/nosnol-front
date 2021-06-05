<template>
  <div id="overlay" v-show="showContent2" @click.self="closeAfterMusicUploadModal">
    <div id="main-content">
      <h2 class="title">音声ファイルのアップロード</h2>
      <div class="sections">
        <div>
          <h3>カバー画像</h3>
          <div class="description">
            <p>クリックして画像を追加</p>
            <p>10MB以内 .jpg .png .heic に対応しています。</p>
          </div>
        </div>
        <h3>タイトル</h3>
          <input type="text" class="text-box">
        <h3>ジャンル選択</h3>
          <div class="cp_ipselect cp_sl01">
          <select required>
            <option value="" hidden class="aa">ジャンルを選択してください</option>
            <option value="1">cat</option>
            <option value="2">dog</option>
            <option value="3">rabbit</option>
            <option value="4">squirrel</option>
          </select>
          </div>
        <h3>感情アイコン選択</h3>
          <ul class="emotion">
            <li class="joy">喜</li>
            <li class="angry">怒</li>
            <li class="sorrow">哀</li>
            <li class="easy">楽</li>
          </ul>
      </div>
      <div class="button-content">
        <button class="cancel-btn" @click="closeAfterMusicUploadModal">キャンセル</button>
        <button class="btn">アップロード</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data () {
    return {
      showContent2: false
    }
  },
  methods: {
    openAfterMusicUploadModal (){
      this.$emit('openAfterMusicUploadModal', this.showContent2);
    },
    closeAfterMusicUploadModal (){
      this.$emit('closeAfterMusicUploadModal', this.showContent2);
    }
  },
}
</script>

<style scoped>
/* * {
  outline: #000 1px solid;
} */
#overlay{
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#main-content{
  z-index:2;
  width:50%;
  padding-top: 40px;
  background:#fff;
  text-align: center;
}

.button-content{
  margin: 30px;
}

/* モーダルないの上下で色違うやつのcssの当て方あってるか聞く */
.modal-button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.modal-button:hover {
  background-color: #ff4500;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
}
.btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #060834;
  color: #fff;
  font-size: 15px;
}
.cancel-btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
.cancel-btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #696969;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
.description {
  border: 1px dashed #707070;
  width: 400px;
  padding: 40px 10px;
  margin: 0 auto;
  font-size: 17px;
}
.title {
  font-size: 20px;
}
input.text-box {
  padding: 10px;
  width: 400px;
}
.emotion {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}
.emotion li {
  border: 1px solid #696969;;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  /* height: 50px; */
  width: 50px;

  padding: 10px;
  margin: 0px 10px;
  color: #696969;
}
/* セレクト */
.cp_ipselect select {
	width: 400px;
  padding: 8px;
	color: #666666;
  font-size: 15px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}
.sections {
  /* border: 1px solid #000; */
  width: 400px;
  margin: 0 auto;
}
</style>
