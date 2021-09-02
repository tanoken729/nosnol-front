<template>
<div class="wrapper">
  <headerAfterLogin />
    <main class="main">
      <sideBar />
      <div class="content-fit">
      <div class="content" v-for="(item, index) in items" :key="index" @click="setMusicFileData(item.title, item.cover_image, item.music_file, item.user_name, item.user_id, item.id)">
      <NuxtLink to="/musicfiledetail">
        <div>
            <img :src="`${$axios.defaults.baseURL}storage/${item.cover_image}`" class="cover-image">
            <h3>{{ item.title }}</h3>
            <audio id="bgm1" preload>
              <source
                :src="`${$axios.defaults.baseURL}storage/${item.music_file}`"
                type="audio/mp3"
              >
            </audio>
        </div>
      </NuxtLink>
            <button v-if="!play" @click="playAction(item.music_file)" id="btn-play" type="button"><font-awesome-icon :icon="['fas', 'play']"/></button>
            <button v-else @click="pauseAction(item.music_file)" id="btn-play" type="button"><font-awesome-icon :icon="['fas', 'pause']"/></button>
      </div>
      </div>
    </main>
</div>
</template>

<script>
import headerAfterLogin from "@/components/headerAfterLogin.vue";
import store from '../store';

export default {
  // middleware: 'user_auth',
  components: {
    headerAfterLogin,
  },
  data(){
    return {
      musicFile: "",
      coverImage: "",
      title: "",
      genre: "",
      emotions: "",
      userId: "",
      items: [],
      clickedFileTitle: '',
      clickedFileCoverImage: '',
      clickedFileId: '',
      play: false,
    }
  },
  mounted: function() {
    this.$axios
      .$get('api/musicFileData')
      .then(response => {
        this.items = response
        // console.log(this.items)
      })
      .catch(error => {
        // console.log(error)
      })
  },
  methods: {
    setMusicFileData (clickedFileTitle, clickedFileCoverImage, clickedFileMusicfile, clickedFileUserName, clickedFileUserId, clickedFileId) {
      this.clickedFileTitle = clickedFileTitle
      this.clickedFileCoverImage = clickedFileCoverImage
      this.clickedFileMusicfile = clickedFileMusicfile
      this.clickedFileUserName = clickedFileUserName
      this.clickedFileUserId = clickedFileUserId
      this.clickedFileId = clickedFileId
      this.$store.dispatch('musicFiles/setMusicFileData', {
        clickedFileTitle: this.clickedFileTitle,
        clickedFileCoverImage: this.clickedFileCoverImage,
        clickedFileMusicfile: this.clickedFileMusicfile,
        clickedFileUserName: this.clickedFileUserName,
        // フォローで渡すためのやつ
        clickedFileUserId: this.clickedFileUserId,
        clickedFileId: this.clickedFileId,
      })
    },
    playAction (mp3File) {
      this.play = true
      const bgm1 = document.querySelector("#bgm1");       // <audio>
      bgm1.play();

      // /*++++ オーディオ要素のリスト ++++*/
      // var audios = document.querySelectorAll( "audio" );
      // var audios2 = document.querySelectorAll( "audio" );

      // /*++++ イベント ++++*/
      // for(var i=0;i<audios2.length;i++){
      // audios[ i ].addEventListener( "play", function(){
      // for(var j=0;j<audios2.length;j++){
      // if( audios[ j ]!=this ){ audios[ j ].play() }
      // }
      // }, true );
      // }
    },
    pauseAction (mp3File) {
      this.play = false
      const bgm1 = document.querySelector("#bgm1");       // <audio>
      bgm1.pause();

      // /*++++ オーディオ要素のリスト ++++*/
      // var audios = this.items
      // console.log(this.items)

      // /*++++ イベント ++++*/
      // for(var i=0;i<audios.length;i++){
      // audios[ i ].addEventListener( "play", function(){
      // for(var j=0;j<audios.length;j++){
      // if( audios[ j ]!=this ){ audios[ j ].pause() }
      // }
      // }, false );
      // }
    },
  },
  // computed: {
  //   items: function () {
  //     return this.$store.getters.musicFileData
  //   },
  // },
};
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
/* メイン */
#btn-play {
  padding: 15px 17px;
  border-radius: 5rem;
}
.main {
  display: flex;
}
/* メインコンテンツ */
.content {
  /* padding-top: 70px; */
  border-radius: 0.5rem;
  /* border: 1px solid #d4d3d3; */
  display: inline-block;
  margin: 10px;
  /* box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22); */
	transition: .3s;
  /* background-color: #e5e9f7; */
  color: #696969;
  padding: 5px;
  /* background-color: rgb(230, 231, 252); */
  position: relative;
}
.content button {
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  /*以下装飾*/
  margin:0;/*余計な隙間を除く*/
  font-size: 20px;/*文字サイズ*/
  border: none; /*線で囲う*/
  padding: 7px;/*文字と線の間の余白*/
  color: white;/*文字色*/
  text-decoration: none;/*下線を表示させない*/
  background: rgba(255, 255, 255, 0.3);/*背景を半透明に*/
}
.content button:hover{/*カーソルを当てたとき*/
  background: #000CFF;/*背景を半透明に*/
  }

.content:hover {
  /* padding-top: 70px; */
  border-radius: 0.5rem;
  /* border: 1px solid #d4d3d3; */
  display: inline-block;
  margin: 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.22);
	transition: .3s;
  /* background-color: #e5e9f7; */
  color: #696969;
}
.cover-image {
  height: 200px;
  width: 200px;
  display: flex;
}
audio {
  width: 200px;
  /* height: 50px; */
  margin-top: 5px;
  /* background-color: #000CFF; */
}
.content-fit {
  max-width: 100%;
  margin: 10px;
}
</style>
