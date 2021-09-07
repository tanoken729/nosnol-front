<template>
<div class="wrapper">
  <headerAfterLogin />
  <body>
        <!-- 詳細ファイルの上部分 -->
        <div class="user-music-file-detail-header">
            <div class="user-info">
                <div class="user-music-file-image">
                    <!-- 音声ファイルカバー画像 -->
                    <div class="user-music-file-cover-image">
                        <p v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`fifth-${index}`"><img :src="`${$axios.defaults.baseURL}storage/${musicFiledatum.clickedFileCoverImage}`" class="cover-image"></p>
                    </div>
                </div>
            </div>
            <div class="user-music-file-detail-body">
                <!-- 音声ファイルのタイトル -->
                <h3 class="record-type" v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`third-${index}`">{{ musicFiledatum.clickedFileTitle }} - Single</h3>
                <!-- 音声ファイルデータ -->
                <div class="user-music-file-data">
                    <audio id="bgm" preload v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`fourth-${index}`">
                        <source :src="`${$axios.defaults.baseURL}storage/${musicFiledatum.clickedFileMusicfile}`" type="audio/mp3">
                    </audio>
                </div>
                <div class="botton-list-flex">
                <button v-if="play" @click="pauseAction(index)" class="btn-play" type="button"><font-awesome-icon :icon="['fas', 'pause']"/></button>
                <button v-else @click="playAction(index)" class="btn-play" type="button"><font-awesome-icon :icon="['fas', 'play']"/></button>
                <ul v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`eighth-${index}`">
                    <li>{{ musicFiledatum.clickedFileTitle }}</li>
                </ul>
                </div>
            </div>
        </div>
        <!-- いいね部分 -->
        <div class="like-display" v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`sixth-${index}`">
            <div class="like-icon">
                <font-awesome-icon
                    :icon="['fas', 'heart']"
                    class="like-font-solid"
                    v-if="userId === $store.state.auth.user.id"
                    @click="unlike(musicFiledatum.clickedFileId, $store.state.auth.user.id)"
                />
                <font-awesome-icon
                    :icon="['far', 'heart']"
                    class="like-font-regular"
                    v-else
                    @click="like(musicFiledatum.clickedFileId, $store.state.auth.user.id)"
                />
            </div>
        </div>
        <!-- 上と下を分ける境界線 -->
        <div class="border-for-header-body"></div>
        <!-- 詳細ファイルの下部分 -->
        <div class="user-music-file-detail-header2">
            <!-- アイコン -->
            <div class="user-icon-user-status">
                <div class="user-icon">
                    <img src="" alt="">
                </div>
                <!-- クリエイターネーム -->
                <div class="user-status">
                    <!-- クリエイターネーム -->
                    <h2 v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`first-${index}`">{{ musicFiledatum.clickedFileUserName }}</h2>
                </div>
            </div>
            <!-- フォローボタン -->
            <div class="follow-action-to-user" v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`second-${index}`">
                <!-- <button class="btn">メッセージ</button> -->
                <button
                    v-if="musicFiledatum.clickedFileUserId === followedId"
                    class="btn-after-follow"
                    @click="unfollow(musicFiledatum.clickedFileUserId, $store.state.auth.user.id)"
                >
                    <font-awesome-icon :icon="['fas', 'user-check']"/>&nbsp;
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
        <!-- 上と下を分ける境界線 -->
        <div class="border-for-header-body"></div>
        <!-- 詳細ファイルの下部分 -->
        <!-- 詳細ファイルの下の余白をカラー指定するためのdiv -->
        <div class="full-page">
        <div class="comment-display" v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`seventh-${index}`">
            <div class="display-flex-icon-comment">
                <div class="comment-user-icon">
                    <img src="" alt="">
                </div>
                <input type="text" v-model="comment" class="comment-text-box">
                <button
                    @click="addComment(musicFiledatum.clickedFileId, $store.state.auth.user.id)"
                    class="comment-button"
                >
                    コメント
                </button>
            </div>
            <!-- commentInfos.commentInfoのデータ構造見直す(どうなっているかいまいち不明) -->
            <div class="display-flex-icon-comment" v-for="(commentInfo, index) in commentInfos" :key="index">
                <div class="comment-user-icon">
                    <img src="" alt="">
                </div>
                <div class="comment-info">
                    <div class="commenter-info">
                        {{commentInfo.commenter_name}}
                        {{commentInfo.comments_created_at}}
                    </div>
                    <p class="comment">{{commentInfo.text}}</p>
                    <br>
                </div>
            </div>
        </div>
        </div>
  </body>
</div>
</template>

<script>
import store from '../store';

export default {
    data(){
        return {
            clickedFileUserId :'',
            clickedLoginUserId :'',
            followInfo: [],
            followedId: '',
            clickedFileId: '',
            likeInfo: [],
            userId: '',
            comment: '',
            commentInfos: [],
            play: false,
        }
    },
    asyncData: async function(context) {
        context.store.commit("loading/setLoading", true)
        let clickedFileUserId = ''
        // 配列でclickedFileUserId取得
        context.store.getters['musicFiles/musicFileData'].forEach(musicFiledatum => {
            clickedFileUserId = musicFiledatum.clickedFileUserId
        });
        let clickedFileId = ''
        context.store.getters['musicFiles/musicFileData'].forEach(musicFiledatum => {
            clickedFileId = musicFiledatum.clickedFileId
        });
        await context.store.dispatch('musicFiles/musicDetailPageData', {
            clickedLoginUserId: context.store.state.auth.user.id,
            clickedFileId: clickedFileId,
            clickedFileUserId: clickedFileUserId,
        })
        context.store.commit("loading/setLoading", false)
    },
    created: function() {
        this.followedId = this.$store.getters['musicFiles/followedId']
        this.userId = this.$store.getters['musicFiles/userId']
        this.commentInfos = this.$store.getters['musicFiles/commentInfos']
    },
    methods: {
        async follow (clickedFileUserId, clickedLoginUserId) {
            this.followedId = clickedFileUserId
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
            this.followedId = false
            this.clickedFileUserId = clickedFileUserId
            this.clickedLoginUserId = clickedLoginUserId
            await this.$axios.$get(`api/${this.clickedFileUserId}/${this.clickedLoginUserId}/unfollow`)
                .then(res => {
                    // console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        async like (clickedFileId, clickedLoginUserId) {
            this.userId = clickedLoginUserId
            this.clickedFileId = clickedFileId
            this.clickedLoginUserId = clickedLoginUserId
            await this.$axios.post('api/like', {
                user_id: this.clickedLoginUserId,
                // ここでリクエストするのはユーザーのidでなくファイルのid
                music_file_id: this.clickedFileId,
            })
            .then(res => {
                // console.log(res)
                this.$axios.$get(`api/${this.clickedLoginUserId}/${this.clickedFileId}/getLikeInfo`)
                .then(res => {
                    this.likeInfo = res
                    this.userId = this.likeInfo.likeInfo[0].user_id
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        async unlike (clickedFileId, clickedLoginUserId) {
            this.userId = false
            this.clickedFileId = clickedFileId
            this.clickedLoginUserId = clickedLoginUserId
            await this.$axios.$get(`api/${this.clickedLoginUserId}/${this.clickedFileId}/unlike`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        async addComment (clickedFileId, clickedLoginUserId) {
            this.clickedFileId = clickedFileId
            this.clickedLoginUserId = clickedLoginUserId
            await this.$axios.post('api/comment', {
                text: this.comment,
                user_id: this.clickedLoginUserId,
                // ここでリクエストするのはユーザーのidでなくファイルのid
                music_file_id: this.clickedFileId,
            })
            .then(res => {
                this.$axios.$get(`api/${this.clickedLoginUserId}/${this.clickedFileId}/getCommentInfo`)
                .then(res => {
                    this.commentInfos = res.commentInfo
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        playAction (mp3File) {
        this.play = true
        const bgm = document.querySelector("#bgm");       // <audio>
        bgm.play();
        },
        pauseAction (mp3File) {
        this.play = false
        const bgm = document.querySelector("#bgm");       // <audio>
        bgm.pause();
        },
    }
}
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
/* 何かのバグでindex.vueにも反映されるためbody→.bodyに修正 */
.display-flex-icon-comment {
    display: flex;
    margin-top: 10px;
}
.border-for-header-body {
    border-bottom: 1px solid rgb(185, 184, 184);
    width: 50%;
    margin: 0 auto;
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
.user-icon-user-status {
    display: flex;
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
    margin-right: 20px;
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
.comment-text-box {
    margin-bottom: 20px;
    height: 30px;
}
.comment-button {
    height: 30px;
}
.comment-button:hover {
}
.commenter-info {
    font-size: 13px;
}
.comment {
    font-size: 14px;
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
  background-color: rgb(50, 39, 247);
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
  border-radius: 0.5rem;
}
.audio-image {
  height: 200px;
  width: 200px;
}
.like-font-regular {
    font-size: 30px ;
    color: #696969;
}
.like-font-regular:hover {
    font-size: 30px ;
    color: #696969;
    background-color: rgba(22, 24, 35, 0.06);
}
.like-font-solid {
    font-size: 30px ;
    color: #f83979;
}
.btn-play {
  padding: 15px 17px;
  background: #fff;
  border: none;
}
.botton-list-flex {
    display: flex;
}
ul {
    list-style: none;
    font-size: 17px;
    padding-left: 0;
    padding-top: 12px;
}
.user-music-file-detail-body {
    margin-left: 30px;
}
.record-type {
    font-size: 30px;
}
</style>
