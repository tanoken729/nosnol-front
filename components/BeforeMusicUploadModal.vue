<template>
  <div id="overlay" v-show="showContent" @click.self="closeBeforeMusicUploadModal">
    <div id="main-content">
      <h2 class="title">音声ファイルのアップロード</h2>
      <div class="description">
        <p>クリックしてファイルを追加</p>
        <p>最大100MB、形式: MP3, AAC</p>
      </div>
      <div class="button-content">
        <button class="cancel-btn" @click="closeBeforeMusicUploadModal">キャンセル</button>
        <button class="btn" @click="openAfterMusicUploadModal">アップロード</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import AfterMusicUploadModal from '@/components/AfterMusicUploadModal.vue'

export default {
  // ここからheader.vueにクリックイベント（openAfterMusicUploadModal）を渡す
  transition: {
    name: 'modal',
    mode: 'out-in'
  },
  components: {
    // AfterMusicUploadModal,
  },
  data () {
    return {
      showContent: false,
      showContent2: false
    }
  },
  methods: {
    openBeforeMusicUploadModal (){
      this.$emit('openBeforeMusicUploadModal', this.showContent);
    },
    closeBeforeMusicUploadModal (){
      this.$emit('closeBeforeMusicUploadModal', this.showContent);
    },
    openAfterMusicUploadModal () {
      this.$emit('BeforeMusicUploadModal-event')
    },
    closeAfterMusicUploadModal () {
      this.showContent2 = false
    },
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
  border: 1px solid #707070;
  width: 400px;
  padding: 50px 10px;
  margin: 0 auto;
  font-size: 23px;
}
.title {
  font-size: 23px;
  padding: 30px;
}
.modal-enter-active, .modal-leave-active { transition: opacity .5s; }
.modal-enter, .modal-leave-active { opacity: 0; }
</style>
