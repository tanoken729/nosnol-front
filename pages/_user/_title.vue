<template>
  <div class="wrapper">
    <headerAfterLogin />
    <div class="user-music-file-detail">
      <!-- 詳細ファイルの上部分 -->
      <div class="user-music-file-detail-header">
        <div class="user-info">
          <div class="user-music-file-image">
            <!-- 音声ファイルカバー画像 -->
            <div class="user-music-file-cover-image">
              <p
                v-for="(musicFiledatum, index) in $store.getters[
                  'musicFiles/musicFileData'
                ]"
                :key="`fifth-${index}`"
              >
                <img
                  :src="
                    `https://nosnol-production-image-and-audio.s3.ap-northeast-1.amazonaws.com/${musicFiledatum.clickedFileCoverImage}`
                  "
                  class="cover-image"
                />
              </p>
            </div>
          </div>
        </div>
        <div class="user-music-file-detail-body">
          <!-- 音声ファイルのタイトル -->
          <h3
            class="record-type"
            v-for="(musicFiledatum, index) in $store.getters[
              'musicFiles/musicFileData'
            ]"
            :key="`third-${index}`"
          >
            {{ musicFiledatum.clickedFileTitle }} - Single
          </h3>
          <!-- 音声ファイルデータ -->
          <div class="user-music-file-data">
            <audio
              id="bgm"
              preload
              v-for="(musicFiledatum, index) in $store.getters[
                'musicFiles/musicFileData'
              ]"
              :key="`fourth-${index}`"
            >
              <source
                :src="
                  `https://nosnol-production-image-and-audio.s3.ap-northeast-1.amazonaws.com/${musicFiledatum.clickedFileMusicfile}`
                "
                type="audio/mp3"
              />
            </audio>
          </div>
          <div class="botton-list-flex">
            <button
              v-if="play"
              @click="pauseAction(index)"
              class="btn-play"
              type="button"
            >
              <font-awesome-icon :icon="['fas', 'pause']" />
            </button>
            <button
              v-else
              @click="playAction(index)"
              class="btn-play"
              type="button"
            >
              <font-awesome-icon :icon="['fas', 'play']" />
            </button>
            <ul
              v-for="(musicFiledatum, index) in $store.getters[
                'musicFiles/musicFileData'
              ]"
              :key="`eighth-${index}`"
              class="file-title"
            >
              <li>{{ musicFiledatum.clickedFileTitle }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- いいね部分 -->
      <div
        class="like-display"
        v-for="(musicFiledatum, index) in $store.getters[
          'musicFiles/musicFileData'
        ]"
        :key="`sixth-${index}`"
      >
        <div class="like-icon">
          <font-awesome-icon
            :icon="['fas', 'heart']"
            class="like-font-solid"
            v-if="userId === $store.state.auth.user.id"
            @click="
              unlike(musicFiledatum.clickedFileId, $store.state.auth.user.id)
            "
          />
          <font-awesome-icon
            :icon="['far', 'heart']"
            class="like-font-regular"
            v-else
            @click="
              like(musicFiledatum.clickedFileId, $store.state.auth.user.id)
            "
          />
        </div>
      </div>
      <!-- 上と下を分ける境界線 -->
      <div class="border-for-header-body"></div>
      <!-- 詳細ファイルの下部分 -->
      <div class="user-music-file-detail-header2">
        <!-- アイコン -->
        <div class="user-icon-user-status">
          <div
            v-for="(musicFiledatum, index) in $store.getters[
              'musicFiles/musicFileData'
            ]"
            :key="`test-${index}`"
          >
            <img
              :src="
                `${$axios.defaults.baseURL}storage/${musicFiledatum.clickedFileUserUserIcon}`
              "
              alt="icon"
              class="user-icon"
            />
          </div>
          <!-- クリエイターネーム -->
          <div
            class="user-status"
            v-for="(musicFiledatum, index) in $store.getters[
              'musicFiles/musicFileData'
            ]"
            :key="`first-${index}`"
          >
            <!-- クリエイターネーム -->
            <nuxt-link
              :to="{
                name: 'user',
                params: { user: `${musicFiledatum.clickedFileUserName}` }
              }"
              ><h2 class="user-name">
                {{ musicFiledatum.clickedFileUserName }}
              </h2></nuxt-link
            >
            <!-- 自己紹介 -->
            <p class="click-file-user-description">
              {{ musicFiledatum.clickedFileUserDescription }}
            </p>
            <!-- <NuxtLink to="/userdetail"><h2 v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`first-${index}`">{{ musicFiledatum.clickedFileUserName }}</h2></NuxtLink> -->
          </div>
        </div>
        <!-- フォローボタン -->
        <div
          class="follow-action-to-user"
          v-for="(musicFiledatum, index) in $store.getters[
            'musicFiles/musicFileData'
          ]"
          :key="`second-${index}`"
        >
          <!-- <button class="btn">メッセージ</button> -->
          <button
            v-if="
              musicFiledatum.clickedFileUserId === followedId &&
                musicFiledatum.clickedFileUserId !== $store.state.auth.user.id
            "
            class="btn-after-follow"
            @click="
              unfollow(
                musicFiledatum.clickedFileUserId,
                $store.state.auth.user.id
              )
            "
          >
            <font-awesome-icon :icon="['fas', 'user-check']" />&nbsp; フォロー中
          </button>
          <button
            v-if="
              musicFiledatum.clickedFileUserId !== followedId &&
                musicFiledatum.clickedFileUserId !== $store.state.auth.user.id
            "
            class="btn-before-follow"
            @click="
              follow(
                musicFiledatum.clickedFileUserId,
                $store.state.auth.user.id
              )
            "
          >
            フォローする
          </button>
        </div>
      </div>
      <!-- 上と下を分ける境界線 -->
      <div class="border-for-header-body"></div>
      <!-- 詳細ファイルの下部分 -->
      <!-- 詳細ファイルの下の余白をカラー指定するためのdiv -->
      <div class="full-page">
        <div
          class="comment-display"
          v-for="(musicFiledatum, index) in $store.getters[
            'musicFiles/musicFileData'
          ]"
          :key="`seventh-${index}`"
        >
          <div class="display-flex-icon-comment-login-user">
            <img
              class="comment-user-icon"
              :src="
                `${$axios.defaults.baseURL}storage/${$store.state.auth.user.user_icon}`
              "
              alt="icon"
            />
            <input type="text" v-model="comment" class="comment-text-box" />
            <button
              @click="
                addComment(
                  musicFiledatum.clickedFileId,
                  $store.state.auth.user.id
                )
              "
              class="comment-button"
            >
              投稿
            </button>
          </div>
          <!-- commentInfos.commentInfoのデータ構造見直す(どうなっているかいまいち不明) -->
          <div
            class="display-flex-icon-comment"
            v-for="(commentInfo, index) in commentInfos"
            :key="index"
          >
            <div v-if="commentInfo.commenter_user_icon">
              <!-- コメントしたときにしか反映されない -->
              <img
                :src="
                  `${$axios.defaults.baseURL}storage/${commentInfo.commenter_user_icon}`
                "
                alt=""
                class="comment-user-icon"
              />
            </div>
            <div v-else>
              <!-- コメントしたときにしか反映されない -->
              <p>コメントはまだありません。</p>
            </div>
            <div class="comment-info">
              <div class="commenter-info">
                {{ commentInfo.commenter_name }}
              </div>
              <p class="comment">{{ commentInfo.text }}</p>
              <p class="comment-date">{{ commentInfo.comments_created_at }}</p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  middleware: "user_auth",
  data() {
    return {
      clickedFileUserId: "",
      clickedLoginUserId: "",
      followInfo: [],
      followedId: "",
      clickedFileId: "",
      likeInfo: [],
      userId: "",
      comment: "",
      commentInfos: [],
      play: false
    };
  },
  // データをストアに入れてから表示させるため、fetchを使用する
  // topページからデータをストアに格納→"そのデータを元に詳細データを取得・storeに格納→storeのデータを表示する"の流れ
  fetch: async function() {
    this.$store.commit("loading/setLoading", true);
    let clickedFileUserId = "";
    // 配列でclickedFileUserId取得
    this.$store.getters["musicFiles/musicFileData"].forEach(musicFiledatum => {
      clickedFileUserId = musicFiledatum.clickedFileUserId;
    });
    let clickedFileId = "";
    this.$store.getters["musicFiles/musicFileData"].forEach(musicFiledatum => {
      clickedFileId = musicFiledatum.clickedFileId;
    });
    await this.$store.dispatch("musicFiles/musicDetailPageData", {
      clickedLoginUserId: this.$store.state.auth.user.id,
      clickedFileId: clickedFileId,
      clickedFileUserId: clickedFileUserId
    });
    this.$store.commit("loading/setLoading", false);
    this.followedId = this.$store.getters["musicFiles/followedId"];
    this.userId = this.$store.getters["musicFiles/userId"];
    this.commentInfos = this.$store.getters["musicFiles/commentInfos"];
  },
  methods: {
    async follow(clickedFileUserId, clickedLoginUserId) {
      this.followedId = clickedFileUserId;
      this.clickedFileUserId = clickedFileUserId;
      this.clickedLoginUserId = clickedLoginUserId;
      this.$store.dispatch("musicFiles/follow", {
        clickedFileUserId: this.clickedFileUserId,
        clickedLoginUserId: this.clickedLoginUserId
      });
      await this.$axios
        .post("api/follow", {
          following_id: this.clickedLoginUserId,
          followed_id: this.clickedFileUserId
        })
        .then(res => {
          // console.log(res)
          this.$axios
            .$get(
              `api/followInfo/${this.clickedFileUserId}/${this.clickedLoginUserId}`
            )
            .then(res => {
              this.followInfo = res;
              this.followingId = this.followInfo.followInfo[0].following_id;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async unfollow(clickedFileUserId, clickedLoginUserId) {
      this.followedId = false;
      this.clickedFileUserId = clickedFileUserId;
      this.clickedLoginUserId = clickedLoginUserId;
      await this.$axios
        .$get(
          `api/unfollow/${this.clickedFileUserId}/${this.clickedLoginUserId}`
        )
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err);
        });
    },
    async like(clickedFileId, clickedLoginUserId) {
      this.userId = clickedLoginUserId;
      this.clickedFileId = clickedFileId;
      this.clickedLoginUserId = clickedLoginUserId;
      await this.$axios
        .post("api/like", {
          user_id: this.clickedLoginUserId,
          // ここでリクエストするのはユーザーのidでなくファイルのid
          music_file_id: this.clickedFileId
        })
        .then(res => {
          // console.log(res)
          this.$axios
            .$get(
              `api/likeInfo/${this.clickedLoginUserId}/${this.clickedFileId}`
            )
            .then(res => {
              this.likeInfo = res;
              this.userId = this.likeInfo.likeInfo[0].user_id;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async unlike(clickedFileId, clickedLoginUserId) {
      this.userId = false;
      this.clickedFileId = clickedFileId;
      this.clickedLoginUserId = clickedLoginUserId;
      await this.$axios
        .$get(`api/unlike/${this.clickedLoginUserId}/${this.clickedFileId}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async addComment(clickedFileId, clickedLoginUserId) {
      this.clickedFileId = clickedFileId;
      this.clickedLoginUserId = clickedLoginUserId;
      await this.$axios
        .post("api/comment", {
          text: this.comment,
          user_id: this.clickedLoginUserId,
          // ここでリクエストするのはユーザーのidでなくファイルのid
          music_file_id: this.clickedFileId
        })
        .then(res => {
          this.$axios
            .$get(`api/commentInfo/${this.clickedFileId}`)
            .then(res => {
              this.commentInfos = res.commentInfo;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    playAction(mp3File) {
      this.play = true;
      const bgm = document.querySelector("#bgm"); // <audio>
      bgm.play();
    },
    pauseAction(mp3File) {
      this.play = false;
      const bgm = document.querySelector("#bgm"); // <audio>
      bgm.pause();
    }
  }
};
</script>

<style scoped>
/* * {
    outline: solid 1px #000;
} */
.user-music-file-detail {
  margin-top: 150px;
}
@media screen and (max-width: 750px) {
  .user-music-file-detail {
    margin-top: 200px;
  }
}
/* 何かのバグでindex.vueにも反映されるためbody→.bodyに修正 */
.display-flex-icon-comment-login-user {
  display: flex;
  margin-top: 10px;
}
.display-flex-icon-comment {
  display: flex;
  margin-top: 10px;
  /* border: 1px solid #333333;
    border-radius: 0.5rem; */
}
.border-for-header-body {
  border-bottom: 1px solid rgb(185, 184, 184);
  width: 50%;
  margin: 0 auto;
}
@media screen and (max-width: 750px) {
  .border-for-header-body {
    border-bottom: 1px solid rgb(185, 184, 184);
    width: 90%;
    margin: 0 auto;
  }
}
.user-music-file-detail-header {
  /* text-align: center; */
  display: flex;
  margin: 0 auto;
  width: 50%;
  padding: 0;
  background-color: #fff;
  margin-top: 30px;
  /* justify-content: space-between; */
}
@media screen and (max-width: 750px) {
  .user-music-file-detail-header {
    /* text-align: center; */
    display: block;
    margin: 0 auto;
    width: 50%;
    padding: 0;
    background-color: #fff;
    margin-top: 30px;
    /* justify-content: space-between; */
  }
}
.user-music-file-detail-header2 {
  /* text-align: center; */
  display: flex;
  margin: 0 auto;
  width: 50%;
  padding: 0;
  background-color: #fff;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: space-between;
}
@media screen and (max-width: 750px) {
  .user-music-file-detail-header2 {
    /* text-align: center; */
    display: flex;
    margin: 0 auto;
    width: 90%;
    padding: 0;
    background-color: #fff;
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: space-between;
  }
}
.user-icon-user-status {
  display: flex;
  align-items: center;
}
.user-icon {
  border: 1px solid rgb(185, 184, 184);
  border-radius: 5rem;
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.comment-user-icon {
  border: 1px solid rgb(185, 184, 184);
  border-radius: 5rem;
  width: 40px;
  height: 40px;
  margin: 20px 20px;
}
@media screen and (max-width: 750px) {
  .comment-user-icon {
    border: 1px solid rgb(185, 184, 184);
    border-radius: 5rem;
    min-width: 40px;
    height: 40px;
    margin-right: 20px;
  }
}
.like-display {
  width: 50%;
  margin: 0 auto;
  /* border-right: 1px solid rgb(185, 184, 184);
    border-left: 1px solid rgb(185, 184, 184); */
  padding: 10px;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}
@media screen and (max-width: 750px) {
  .like-display {
    width: 90%;
    margin: 0 auto;
    /* border-right: 1px solid rgb(185, 184, 184);
        border-left: 1px solid rgb(185, 184, 184); */
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.like-icon {
  margin-top: 10px;
  margin-bottom: 10px;
}
.comment-display {
  width: 50%;
  margin: 0 auto;
  /* border-right: 1px solid rgb(185, 184, 184);
    border-left: 1px solid rgb(185, 184, 184); */
  background-color: #fff;
  margin-top: 30px;
  margin-bottom: 10px;
}
@media screen and (max-width: 750px) {
  .comment-display {
    width: 90%;
  }
}
.comment-text-box {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 40px;
  width: 400px;
  border: 1px solid rgb(185, 184, 184);
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.comment-button {
  height: 40px;
  margin-top: 20px;
  font-size: 14px;
  padding: 0 20px 0 20px;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  color: #fff;
  font-weight: bold;
  border: none;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  cursor: pointer;
}
.comment-button:hover {
  background: linear-gradient(to right, rgb(69, 59, 211), rgb(50, 91, 204));
  color: #fff;
}
.commenter-info {
  font-size: 18px;
  font-weight: bold;
}
.comment {
  font-size: 16px;
  margin: 10px 0 10px 0;
}
.comment-date {
  font-size: 14px;
}
/* フォローボタン */
.btn-before-follow {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid rgb(84, 71, 255);
  background: #fff;
  color: rgb(84, 71, 255);
  font-size: 15px;
  font-weight: bold;
}
.btn-before-follow:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid rgb(84, 71, 255);
  background: rgb(238, 236, 255);
  color: rgb(84, 71, 255);
  font-size: 15px;
  font-weight: bold;
}
.btn-after-follow {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: bold;
}
.btn-after-follow:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #d4d4d4;
  background-color: rgb(246, 246, 246);
  color: #000;
  font-size: 15px;
}
footer {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
}
.cover-image {
  height: 200px;
  width: 200px;
  display: flex;
  border-radius: 0.5rem;
}
.audio-image {
  height: 200px;
  width: 200px;
}
.like-font-regular {
  font-size: 30px;
  color: #696969;
}
.like-font-regular:hover {
  font-size: 30px;
  color: #696969;
  background-color: rgba(22, 24, 35, 0.06);
}
.like-font-solid {
  font-size: 30px;
  color: #f83979;
}
.btn-play {
  padding: 15px 17px;
  background: #fff;
  border: none;
  font-size: 20px;
  margin-right: 20px;
}
.botton-list-flex {
  display: flex;
  border-top: rgb(163, 162, 162) 1px solid;
  border-bottom: rgb(163, 162, 162) 1px solid;
  margin-top: 20px;
}
.file-title {
  font-size: 20px;
  display: flex;
  align-items: center;
}
ul {
  list-style: none;
  font-size: 17px;
  padding-left: 0;
}
.user-music-file-detail-body {
  margin-left: 30px;
  width: 100%;
}
.record-type {
  font-size: 30px;
}
@media screen and (max-width: 750px) {
  .record-type {
    font-size: 20px;
  }
}
a {
  text-decoration: none;
}
.user-status {
  /* display: flex; */
  align-items: center;
}
.user-name {
  font-size: 25px;
  color: #000;
}
.user-name:hover {
  font-size: 25px;
  color: #000;
  color: rgb(84, 71, 255);
}
.click-file-user-description {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media screen and (max-width: 750px) {
  .click-file-user-description {
    display: none;
  }
}
.follow-action-to-user {
  display: flex;
  align-items: center;
}
</style>
