<template>
  <div
    id="overlay"
    v-show="showContent2"
    @click.self="closeAfterMusicUploadModal"
  >
    <div id="main-content">
      <h2 class="title">音声ファイルのアップロード</h2>
      <div class="sections">
        <form method="post" enctype="multipart/form-data">
          <div>
            <!-- {{musicFile}} -->
            <h3>カバー画像</h3>
            <div
              class="drop_area"
              @dragenter="dragEnter"
              @dragleave="dragLeave"
              @dragover.prevent
              @drop.prevent="dropFile"
              :class="{ enter: isEnter }"
            >
              <p>ドラッグ&ドロップして画像を追加</p>
              <p>10MB以内 .jpg .png .heic に対応しています。</p>
            </div>
            <!-- {{coverImages[0]}} -->
          </div>
        </form>
        <h3>タイトル</h3>
        <input type="text" class="text-box" v-model="musicFileName" />
        <h3>ジャンル選択</h3>
        <div class="cp_ipselect cp_sl01">
          <select required @change="selectedGenre">
            <option value="" hidden class="aa"
              >ジャンルを選択してください</option
            >
            <option></option>
            <option value="j-pop">J-POP</option>
            <option value="anime">アニメ</option>
            <option value="hiphop-rnb-reggae">ヒップホップ/R&B/レゲエ</option>
            <option value="rock">ロック</option>
            <option value="dance-electronica">ダンス/エレクトロニカ</option>
            <option value="k-pop">K-POP/ワールド・ミュージック</option>
            <option value="western-music">洋楽総合</option>
            <option value="western-pop">洋楽ポップス</option>
            <option value="kayokyoku-enka">歌謡曲/演歌</option>
            <option value="jazz">ジャズ</option>
            <option value="classic">クラシック</option>
          </select>
          <!-- {{genre}} -->
        </div>
        <h3>感情</h3>
        <div class="emotion">
          <input
            type="radio"
            name="emotion-in-modal"
            value="joy"
            @change="selectedEmotion"
            id="joy-in-modal"
          /><label for="joy-in-modal" class="emotion-label"
            ><font-awesome-icon :icon="['fas', 'smile-beam']"
          /></label>
          <input
            type="radio"
            name="emotion-in-modal"
            value="angry"
            @change="selectedEmotion"
            id="angry-in-modal"
          /><label for="angry-in-modal" class="emotion-label"
            ><font-awesome-icon :icon="['fas', 'sad-tear']"
          /></label>
          <input
            type="radio"
            name="emotion-in-modal"
            value="sorrow"
            @change="selectedEmotion"
            id="sorrow-in-modal"
          /><label for="sorrow-in-modal" class="emotion-label"
            ><font-awesome-icon :icon="['fas', 'angry']"
          /></label>
          <input
            type="radio"
            name="emotion-in-modal"
            value="easy"
            @change="selectedEmotion"
            id="easy-in-modal"
          /><label for="easy-in-modal" class="emotion-label"
            ><font-awesome-icon :icon="['fas', 'kiss-beam']"
          /></label>
        </div>
        <!-- {{emotion}} -->
      </div>
      <div class="button-content">
        <button class="cancel-btn" @click="closeAfterMusicUploadModal">
          キャンセル
        </button>
        <button class="btn" @click="uploadMusicFile">アップロード</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
// import axios from "axios";
import Vue from "vue";

export default Vue.extend({
  name: "AfterMusicUploadModal",
  props: ["musicFile", "musicFileName"],
  data() {
    return {
      showContent2: false,
      isEnter: false,
      // this.$setでも変更がリアクティブにならないためいったんコメントアウト
      // musicFileData: {
      // musicFile: [],
      coverImages: [],
      // musicFileName: '',
      genre: "",
      emotion: ""
      // }
    };
  },
  methods: {
    closeAfterMusicUploadModal() {
      this.$emit("closeAfterMusicUploadModal");
    },
    async uploadMusicFile() {
      this.$store.commit("loading/setLoading", true);
      let formData = new FormData();

      formData.append("music_file", this.musicFile);
      formData.append("cover_image", this.coverImages[0]);
      formData.append("title", this.musicFileName);
      formData.append("genre", this.genre);
      formData.append("emotions", this.emotion);
      formData.append("user_id", this.$store.state.auth.user.id);

      let config = {
        headers: {
          "content-type": "multipart/form-data",
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': '*',
          contentType: false,
          processData: false
        }
      };

      await this.$axios
        .post("api/musicFile", formData, config)
        .then(res => {
          console.log(res);
          (this as any).posts = res.data.posts;
          console.log((this as any).posts);
          this.closeAfterMusicUploadModal();
          this.$store.dispatch("musicFiles/musicFileTopPageData");
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.commit("loading/setLoading", false);
    },
    dragEnter() {
      this.isEnter = true;
    },
    dragLeave() {
      this.isEnter = false;
    },
    dragOver() {
      console.log("DragOver");
    },
    dropFile(event: any) {
      (this as any).coverImages = [...event.dataTransfer.files];
    },
    selectedGenre(e: any) {
      this.genre = e.target.value;
    },
    selectedEmotion(e: any) {
      this.emotion = e.target.value;
    },
    // musicFileNameはこのファイルのpropsから取得
    setMusicFileFromBeforeMusicUploadModal(musicFileName: string) {
      (this as any).musicFileName = musicFileName;
    }
  }
});
</script>

<style scoped>
/* * {
  outline: #000 1px solid;
} */
#overlay {
  /*　要素を重ねた時の順番　*/
  z-index: 30;

  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#main-content {
  z-index: 2;
  width: 500px;
  padding-top: 40px;
  background: #fff;
  text-align: center;
  border-radius: 0.5rem;
}

.button-content {
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
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  color: #fff;
  font-size: 15px;
}
.btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to left, rgb(84, 71, 255), rgb(62, 114, 255));
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
input[type="radio"] {
  display: none;
}
input[type="radio"]:checked + .emotion-label {
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  color: rgb(255, 255, 255);
  background-color: #e5e9f7;
  font-weight: bold;
  padding: 10px 10px;
  margin: 0px 10px;
}
.emotion-label {
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  text-align: center;
  padding: 10px 10px;
  margin: 0px 10px;
}
.emotion-label:hover {
  color: rgb(255, 255, 255);
  background-color: #e5e9f7;
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  text-align: center;
  padding: 10px 10px;
  margin: 0px 10px;
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-active {
  opacity: 0;
}
</style>
