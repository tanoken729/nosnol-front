<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <SideBar />
      <div class="tracks-title-adjustment">
        <div class="tracks-title">
          <h1>Tracks</h1>
        </div>
        <div class="content-fit">
          <div
            class="content"
            v-for="(item, index) in $store.getters['musicFiles/items'].items"
            :key="index"
            @click="
              setMusicFileData(
                item.title,
                item.cover_image,
                item.music_file,
                item.user_name,
                item.user_id,
                item.id,
                item.description
              )
            "
          >
            <NuxtLink to="/signin">
              <div>
                <img
                  :src="
                    `https://nosnol-production-image-and-audio.s3.ap-northeast-1.amazonaws.com/${item.cover_image}`
                  "
                  class="cover-image"
                />
                <h3 class="item-title">{{ item.title }}</h3>
                <nuxt-link
                  :to="{ name: 'user', params: { user: `${item.user_name}` } }"
                  ><h3 class="item-user-name">
                    {{ item.user_name }}
                  </h3></nuxt-link
                >
                <audio v-bind:id="`bgm-${index}`" preload>
                  <source
                    :src="
                      `https://nosnol-production-image-and-audio.s3.ap-northeast-1.amazonaws.com/${item.music_file}`
                    "
                    type="audio/mp3"
                  />
                </audio>
              </div>
            </NuxtLink>
            <button
              v-if="play === index"
              @click="pauseAction(index)"
              id="btn-play"
              type="button"
            >
              <font-awesome-icon :icon="['fas', 'pause']" />
            </button>
            <button
              v-else
              @click="playAction(index)"
              id="btn-play"
              type="button"
            >
              <font-awesome-icon :icon="['fas', 'play']" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import headerAfterLogin from "@/components/headerAfterLogin.vue";
import Vue from "vue";

export default Vue.extend({
  // middleware: 'user_auth',
  components: {
    headerAfterLogin
  },
  data() {
    return {
      musicFile: "",
      coverImage: "",
      title: "",
      genre: "",
      emotions: "",
      userId: "",
      items: [],
      clickedFileTitle: "",
      clickedFileCoverImage: "",
      clickedFileId: "",
      play: false,
      audios: ""
    };
  },
  asyncData: async function(context) {
    // すべての音声ファイルを取得する
    context.store.dispatch("musicFiles/musicFileTopPageData");
  },
  methods: {
    setMusicFileData(
      clickedFileTitle: string,
      clickedFileCoverImage: any,
      clickedFileMusicfile: any,
      clickedFileUserName: string,
      clickedFileUserId: string,
      clickedFileId: string,
      clickedFileUserDescription: string
    ) {
      this.clickedFileTitle = clickedFileTitle;
      this.clickedFileCoverImage = clickedFileCoverImage;
      (this as any).clickedFileMusicfile = clickedFileMusicfile;
      (this as any).clickedFileUserName = clickedFileUserName;
      (this as any).clickedFileUserId = clickedFileUserId;
      this.clickedFileId = clickedFileId;
      (this as any).clickedFileUserDescription = clickedFileUserDescription;
      console.log(clickedFileUserDescription);
      this.$store.dispatch("musicFiles/setMusicFileData", {
        clickedFileTitle: this.clickedFileTitle,
        clickedFileCoverImage: this.clickedFileCoverImage,
        clickedFileMusicfile: (this as any).clickedFileMusicfile,
        clickedFileUserName: (this as any).clickedFileUserName,
        clickedFileUserDescription: (this as any).clickedFileUserDescription,
        // フォローで渡すためのやつ
        clickedFileUserId: (this as any).clickedFileUserId,
        clickedFileId: this.clickedFileId
      });
    },
    playAction(index: number) {
      (this as any).play = index;
      (this as any).bgm = index;
      if (this.audios) {
        (this as any).audios.pause();
      }
      var audios = document.getElementById(`bgm-${index}`) as HTMLAudioElement;
      (this as any).audios = audios;
      audios.play();
    },
    pauseAction(index: number) {
      this.play = false;
      (this as any).bgm = index;
      var audios = document.getElementById(`bgm-${index}`) as HTMLAudioElement;
      audios.pause();
    }
  }
});
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
/* メイン */
/* * {
  background: #333333;
} */
.tracks-title-adjustment {
  margin: 0 auto;
}
@media screen and (max-width: 750px) {
  .tracks-title-adjustment {
    width: 100%;
    width: 360px;
    margin: 0 auto;
  }
}
.tracks-title {
  /* margin: 0px auto; */
  padding: 10px 15px;
  display: block;
  min-width: 50%;
  width: 720px;
  color: #333333;
  max-width: 100%;
  margin-left: 250px;
}
@media screen and (max-width: 750px) {
  .tracks-title {
    margin: 15px 0 0 0;
  }
}
#btn-play {
  padding: 15px 17px;
  border-radius: 5rem;
}
.main {
  display: flex;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 100px;
  z-index: 0;
}
/* メインコンテンツ */
.content {
  border-radius: 0.5rem;
  display: inline-block;
  margin: 10px;
  transition: 0.3s;
  color: #696969;
  padding: 5px;
  position: relative;
}
.content button {
  position: absolute;
  top: 42%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  /*以下装飾*/
  margin: 0; /*余計な隙間を除く*/
  font-size: 20px; /*文字サイズ*/
  border: none; /*線で囲う*/
  padding: 7px; /*文字と線の間の余白*/
  color: transparent; /*文字色*/
  text-decoration: none; /*下線を表示させない*/
  background: transparent; /*背景を半透明に*/
}
.content button:hover {
  /*カーソルを当てたとき*/
  color: #fff;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
}

.content:hover {
  border-radius: 0.5rem;
  display: inline-block;
  margin: 10px;
  transition: 0.3s;
  color: #696969;
}
.cover-image {
  height: 150px;
  width: 150px;
  display: flex;
  border-radius: 0.5rem;
  /* box-shadow: 0 0 10px 0 rgba(0,0,0,.22); */
}
audio {
  width: 200px;
  margin-top: 5px;
}
.content-fit {
  max-width: 100%;
  width: 900px;
  margin: 0 auto;
  margin-left: 250px;
}
@media screen and (max-width: 750px) {
  .content-fit {
    width: 100%;
    width: 360px;
    margin: inherit;
  }
}
.item-title {
  font-size: 16px;
  color: #333333;
  height: 25px;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-user-name {
  font-size: 14px;
  color: #999999;
}
a {
  text-decoration: none;
}
</style>
