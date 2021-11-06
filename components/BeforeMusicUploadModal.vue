<template>
  <div id="overlay" v-show="showContent" @click.self="closeBeforeMusicUploadModal">
    <div id="main-content">
      <h2 class="title">音声ファイルのアップロード</h2>
      <form method="post" enctype="multipart/form-data">
        <div class="drop_area"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragover.prevent
          @drop.prevent="dropFile"
          :class="{enter: isEnter}"
        >
          <p>クリックしてファイルを追加</p>
          <p>最大100MB、形式: MP3, AAC</p>
          {{files.file}}
        </div>
      </form>
      <div class="button-content">
        <button class="cancel-btn" @click="closeBeforeMusicUploadModal">キャンセル</button>
        <button class="disabled-btn" disabled>アップロード</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  // ここからheader.vueにクリックイベント（openAfterMusicUploadModal）を渡す
  transition: {
    name: 'modal',
    mode: 'out-in'
  },
  components: {
  },
  data () {
    return {
      showContent: false,
      showContent2: false,
      MusicFile: '',
      isEnter: false,
      files: [],
    }
  },
  methods: {
    openBeforeMusicUploadModal (){
      this.$emit('openBeforeMusicUploadModal');
    },
    closeBeforeMusicUploadModal (){
      this.$emit('closeBeforeMusicUploadModal');
    },
    closeAfterMusicUploadModal () {
      this.showContent2 = false
    },
    dragEnter() {
        this.isEnter = true;
    },
    dragLeave() {
        this.isEnter = false;
    },
    dragOver() {
        console.log('DragOver')
    },
    dropFile(event) {
        this.files = [...event.dataTransfer.files]
        this.$emit('openAfterMusicUploadModal', this.files[0], this.files[0].name);
        this.isEnter = false;
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
  z-index:30;

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
  width: 500px;
  padding-top: 40px;
  background:#fff;
  text-align: center;
  border-radius: 0.5rem;
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
.disabled-btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #d3d3d3;
  color: #f5f5f5;
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
.drop_area {
  border: 1px dashed #707070;
  width: 400px;
  padding: 40px 10px;
  margin: 10px auto;
  font-size: 17px;
}
.drop_area p {
  pointer-events: none;
}
.enter {
    border: 2px dashed rgb(184, 188, 241);
}
.title {
  font-size: 20px;
  padding-bottom: 20px;
}
.modal-enter-active, .modal-leave-active { transition: opacity .5s; }
.modal-enter, .modal-leave-active { opacity: 0; }
</style>
