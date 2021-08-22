<template>
<div class="wrapper">
  <headerAfterLogin />
  <body>
        <!-- 詳細ファイルの上部分 -->
        <div class="user-music-file-detail-header">
            <!-- クリエイターネーム・アイコン・フォロー数フォロワー数 -->
            <div class="user-info">
                <!-- アイコン -->
                <div class="user-icon">
                    <img src="" alt="">
                </div>
                <!-- クリエイターネーム・フォロー数フォロワー数 -->
                <div class="user-status">
                    <!-- クリエイターネーム -->
                    <h2 v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="index">{{ musicFiledatum.clickedFileUserName }}</h2>
                    <!-- フォロー数フォロワー数 -->
                    <NuxtLink to="" class="follow">フォロー</NuxtLink>
                    <NuxtLink to="" class="follow">フォロワー</NuxtLink>
                </div>
            </div>
            <!-- フォローボタン -->
            <div class="follow-action-to-user" v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="index">
                <!-- <button class="btn">メッセージ</button> -->
                <button
                    v-if="followingId === $store.state.auth.user.id"
                    class="btn-after-follow"
                    @click="unfollow(musicFiledatum.clickedFileUserId, $store.state.auth.user.id)"
                >
                    フォロー中
                </button>
                <button
                    v-else
                    class="btn-before-follow"
                    @click="follow(musicFiledatum.clickedFileUserId, $store.state.auth.user.id)"
                >
                    フォローする
                </button>
            </div>
        </div>
        <!-- 詳細ファイルの下の余白をカラー指定するためのdiv -->
        <div class="full-page">
        <!-- 上と下を分ける境界線 -->
        <div class="border-for-header-body"></div>
        <!-- 詳細ファイルの下部分 -->
        <div class="user-music-file-detail-body">
            <!-- 音声ファイルのタイトル -->
            <h3 v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="index">{{ musicFiledatum.clickedFileTitle }}</h3>
            <!-- 音声ファイルデータ -->
            <div class="user-music-file-data">
                <audio controls v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="index">
                    <source :src="`${$axios.defaults.baseURL}storage/${musicFiledatum.clickedFileMusicfile}`" type="audio/mp3">
                </audio>
            </div>
            <!-- エフェクト・音声ファイルカバー画像 -->
            <div class="user-music-file-image">
                <!-- エフェクト -->
                <div class="user-music-file-audio-image">
                    <img src="1051470.png" alt="audio visualizer" class="audio-image">
                </div>
                <!-- 音声ファイルカバー画像 -->
                <div class="user-music-file-cover-image">
                    <p v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="index"><img :src="`${$axios.defaults.baseURL}storage/${musicFiledatum.clickedFileCoverImage}`" class="cover-image"></p>
                </div>
            </div>
        </div>
        <div class="like-display">
            <font-awesome-icon :icon="['far', 'heart']" class="like-font-regular" />
            <font-awesome-icon :icon="['fas', 'heart']" class="like-font-solid" />
        </div>
        </div>
  </body>
</div>
</template>

<script>
import store from '../store';

export default {
    asyncData({ $axios }) {
        // AxiosによるHTTP通信 ...（1）
        // $axios.$get(`api/${this.$store.state.auth.user.id}/follow`)
        // .then(response => {
        //     this.followInfo = response
        //     this.followingId = this.followInfo.followInfo[0].following_id
        // })
    },
    data(){
        return {
            clickedFileUserId :'',
            clickedLoginUserId :'',
            followInfo: [],
            followingId: '',
        }
    },
    beforeCreate: function() {
        let clickedFileUserId = ''
        this.$store.getters['musicFiles/musicFileData'].forEach(musicFiledatum => {
            clickedFileUserId = musicFiledatum.clickedFileUserId
            // console.log(musicFiledatum.clickedFileUserId)
        });
        // console.log(clickedFileUserId)
        // console.log(this.$store.getters['musicFiles/musicFileData'])
        this.$axios.$get(`api/${clickedFileUserId}/${this.$store.state.auth.user.id}/getFollowInfo`)
        .then(response => {
            this.followInfo = response
            this.followingId = this.followInfo.followInfo[0].following_id
            // console.log(response)
        })
    },
    computed: {
        musicFileData () {
            return this.$store.getters.musicFileData
        }
    },
    methods: {
        async follow (clickedFileUserId, clickedLoginUserId) {
            this.clickedFileUserId = clickedFileUserId
            this.clickedLoginUserId = clickedLoginUserId
            this.$store.dispatch('musicFiles/follow', {
                clickedFileUserId: this.clickedFileUserId,
                clickedLoginUserId: this.clickedLoginUserId,
            })
            await this.$axios.post('api/follow', {
                following_id: this.clickedLoginUserId,
                followed_id: this.clickedFileUserId,
            })
            .then(res => {
                // console.log(res)
                this.$axios.$get(`api/${this.clickedFileUserId}/${this.clickedLoginUserId}/getFollowInfo`)
                .then(res => {
                    this.followInfo = res
                    this.followingId = this.followInfo.followInfo[0].following_id
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        async unfollow (clickedFileUserId, clickedLoginUserId) {
            this.followingId = false
            this.clickedFileUserId = clickedFileUserId
            this.clickedLoginUserId = clickedLoginUserId
            await this.$axios.$get(`api/${this.clickedFileUserId}/${this.clickedLoginUserId}/unfollow`)
                .then(res => {
                    // console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
/* 何かのバグでindex.vueにも反映されるためbody→.bodyに修正 */
body {
  margin-top: 10px;
  padding: 0;
}

.full-page {
  width: 100vw;
  height: 100vh;
  background-color: #F0F1F8
}

h2 {
    font-size: 20px;
}
.user-music-file-detail-header {
    /* text-align: center; */
    display: flex;
    margin: 0 auto;
    width: 60%;
    padding: 0;
    background-color: #fff;
}
.user-info {
    margin: 40px auto;
    display: flex;
}
.user-icon {
    padding: 60px 10px;
    border: 1px solid rgb(185, 184, 184);
    border-radius: 0.5rem;
    min-width: 150px;
    height: 150px;
}
.user-status {
    padding: 10px 10px;
}
.follow {
    color: #696969;
}
a {
  text-decoration: none;
}
.follow:hover {
    color: #000;
}
.follow-action-to-user {
    padding: 30px 10px;
    margin: 0 auto;
}
.border-for-header-body {
    border-bottom: 1px solid rgb(185, 184, 184);
}
.user-music-file-detail-body {
    margin: 0 auto;
    width: 70%;
    padding: 0;
    border-right: 1px solid rgb(185, 184, 184);
    border-left: 1px solid rgb(185, 184, 184);
    border-bottom: 1px solid rgb(185, 184, 184);
    background-color: #fff;
}
.user-music-file-data {
    padding: 10px;
}
.user-music-file-audio-image {
    padding: 10px;
}
.user-music-file-cover-image {
    padding: 10px;
}
.user-music-file-image {
    display: flex;
    justify-content: space-between;
}
.like-display {
    width: 70%;
    margin: 0 auto;
    border-right: 1px solid rgb(185, 184, 184);
    border-left: 1px solid rgb(185, 184, 184);
    border-bottom: 1px solid rgb(185, 184, 184);
    padding: 0 10px;
    background-color: #fff;
}
.btn-before-follow {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
}
.btn-before-follow:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #696969;
  background-color: rgb(60, 39, 247);
  color: #fff;
  font-size: 15px;
}
.btn-after-follow {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
.btn-after-follow:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #696969;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
footer {
  width:100%;
  height: 100px;
  position: absolute;
  bottom: 0;
}
.cover-image {
  height: 200px;
  width: 200px;
  display: flex;
}
.audio-image {
  height: 200px;
  width: 200px;
}
.like-font-regular {
    font-size: 30px ;
    color: #696969;
}
.like-font-solid {
    font-size: 30px ;
    color: #f83979;
}
</style>
