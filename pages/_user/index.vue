<template>
<div class="wrapper">
    <headerAfterLogin />
    <div class="user-music-file-detail">
        <!-- 詳細ファイルの上部分 -->
        <div class="user-music-file-detail-header">
            <!-- クリエイターネーム・アイコン・フォロー数フォロワー数 -->
            <div class="user-info">
                <!-- アイコン -->
                <div v-for="(userDetailItem, index) in userDetailItems" :key="index">
                    <!-- 配列全てを取得すると、ユーザーの持つファイル数分アイコン画像が表示されるため、indexを0に指定して１つだけ表示させる -->
                    <img :src="`${$axios.defaults.baseURL}storage/${userDetailItem[0].user_icon}`" alt="" class="user-icon">
                </div>
                <!-- クリエイターネーム・フォロー数フォロワー数 -->
                <div class="user-status">
                    <!-- クリエイターネーム -->
                    <h2  v-for="(userDetailItem, index) in userDetailItems" :key="index">{{ userDetailItem[0].user_name }}</h2>
                    <!-- 自己紹介 -->
                    <p class="click-file-user-description" v-for="(userDetailItem, index) in userDetailItems" :key="index">{{userDetailItem[0].description}}</p>
                    <!-- フォロー数フォロワー数 -->
                    <!-- <NuxtLink to="" class="follow">フォロー</NuxtLink>
                    <NuxtLink to="" class="follow">フォロワー</NuxtLink> -->
                </div>
            </div>
            <!-- フォローボタン -->
            <div class="follow-action-to-user" v-for="(musicFiledatum, index) in $store.getters['musicFiles/musicFileData']" :key="`second-${index}`">
                <!-- <button class="btn">メッセージ</button> -->
                <button
                    v-if="musicFiledatum.clickedFileUserId === followedId && musicFiledatum.clickedFileUserId !== $store.state.auth.user.id"
                    class="btn-after-follow"
                    @click="unfollow(musicFiledatum.clickedFileUserId, $store.state.auth.user.id)"
                >
                    フォロー中
                </button>
                <button
                    v-if="musicFiledatum.clickedFileUserId !== followedId && musicFiledatum.clickedFileUserId !== $store.state.auth.user.id"
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
        <div class="content-fit">
            <div class="content" v-for="(userDetailItem, index) in userDetailItems.userDetailItems" :key="index" @click="setMusicFileData(userDetailItem.title, userDetailItem.cover_image, userDetailItem.music_file, userDetailItem.user_name, userDetailItem.user_id, userDetailItem.id, userDetailItem.description, userDetailItem.user_icon)">
            <nuxt-link :to="{ name: 'user-title', params: {user: `${userDetailItem.user_name}`, title: `${userDetailItem.title}`} }">
                <div>
                    <img :src="`https://nosnol-production-image-and-audio.s3.ap-northeast-1.amazonaws.com/${userDetailItem.cover_image}`" class="cover-image">
                    <h3 class="userDetailItem-title">{{ userDetailItem.title }}</h3>
                    <NuxtLink to="/userdetail"><h3 class="userDetailItem-user-name">{{ userDetailItem.user_name }}</h3></NuxtLink>
                    <audio v-bind:id="`bgm-${index}`" preload>
                    <source
                        :src="`https://nosnol-production-image-and-audio.s3.ap-northeast-1.amazonaws.com/${userDetailItem.music_file}`"
                        type="audio/mp3"
                    >
                    </audio>
                </div>
            </nuxt-link>
                    <font-awesome-icon :icon="['fas', 'minus-circle']" class="ellipsis-h" @click="deleteMusicFile(userDetailItem.id)"/>
                    <button v-if="play === index" @click="pauseAction(index)" id="btn-play" type="button"><font-awesome-icon :icon="['fas', 'pause']"/></button>
                    <button v-else @click="playAction(index)" id="btn-play" type="button"><font-awesome-icon :icon="['fas', 'play']"/></button>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    middleware: 'user_auth',
    data(){
        return {
            clickedFileUserId :'',
            clickedLoginUserId :'',
            followInfo: [],
            followedId: '',
            clickedFileId: '',
            play: false,
            userDetailItems: [],
        }
    },
    // データをストアに入れてから表示させるため、fetchを使用する
    // topページからデータをストアに格納→"そのデータを元に詳細データを取得・storeに格納→storeのデータを表示する"の流れ
    fetch: async function() {
        this.$store.commit("loading/setLoading", true)
        let clickedFileUserId = ''
        // 配列でclickedFileUserId取得
        this.$store.getters['musicFiles/musicFileData'].forEach(musicFiledatum => {
            clickedFileUserId = musicFiledatum.clickedFileUserId
        });
        await this.$store.dispatch('musicFiles/userDetailPageData', {
            clickedFileUserId: clickedFileUserId,
        })
        this.$store.commit("loading/setLoading", false)
        this.followedId = this.$store.getters['musicFiles/followedId']
        this.userDetailItems = this.$store.getters['musicFiles/userDetailItems']
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
                })
                .catch(err => {
                    console.log(err)
                })
        },
        playAction (index) {
            this.play = index
            this.bgm = index
            console.log(this.bgm)
            var audios = document.getElementById(`bgm-${index}`);
            console.log(audios)
            audios.play();
        },
        pauseAction (index) {
            this.play = false
            this.bgm = index
            console.log(this.bgm)
            var audios = document.getElementById(`bgm-${index}`);
            console.log(audios)
            audios.pause();
        },
        setMusicFileData (clickedFileTitle, clickedFileCoverImage, clickedFileMusicfile, clickedFileUserName, clickedFileUserId, clickedFileId, clickedFileUserDescription, clickedFileUserUserIcon) {
            this.clickedFileTitle = clickedFileTitle
            this.clickedFileCoverImage = clickedFileCoverImage
            this.clickedFileMusicfile = clickedFileMusicfile
            this.clickedFileUserName = clickedFileUserName
            this.clickedFileUserId = clickedFileUserId
            this.clickedFileId = clickedFileId
            this.clickedFileUserDescription = clickedFileUserDescription
            this.clickedFileUserUserIcon = clickedFileUserUserIcon
            this.$store.dispatch('musicFiles/setMusicFileData', {
                clickedFileTitle: this.clickedFileTitle,
                clickedFileCoverImage: this.clickedFileCoverImage,
                clickedFileMusicfile: this.clickedFileMusicfile,
                clickedFileUserName: this.clickedFileUserName,
                clickedFileUserDescription: this.clickedFileUserDescription,
                clickedFileUserUserIcon: this.clickedFileUserUserIcon,
                // フォローで渡すためのやつ
                clickedFileUserId: this.clickedFileUserId,
                clickedFileId: this.clickedFileId,
            })
        },
        async deleteMusicFile(clickedFileId) {
            this.clickedFileId = clickedFileId
            var answer = confirm('このファイルを削除しますか？');
            if(answer) { //true or false
                this.$store.commit("loading/setLoading", true)
                await this.$axios.$post(`api/deleteMusicfile`, {
                    id: this.clickedFileId
                })
                this.$store.commit("loading/setLoading", false)
            }
        }
    }
}
</script>

<style scoped>
/* * {
    outline: solid 1px #000;
} */
.user-music-file-detail {
    margin-top: 100px;
}
@media screen and (max-width: 750px) {
    .user-music-file-detail {
        margin-top: 200px;
    }
}
/* 何かのバグでindex.vueにも反映されるためbody→.bodyに修正 */
body {
    margin-top: 10px;
    padding: 0;
}

/* .full-page {
    width: 100vw;
    height: 100vh;
    background-color: #F0F1F8
} */

h2 {
    font-size: 20px;
}
.user-music-file-detail-header {
    /* text-align: center; */
    display: flex;
    margin: 0 auto;
    width: 50%;
    padding: 0;
    background-color: #fff;
}
@media screen and (max-width: 750px){
    .user-music-file-detail-header{
        width: 100%;
    }
}
.user-info {
    margin: 40px auto;
    display: flex;
}
@media screen and (max-width: 750px){
    .user-info{
        margin: 0;
    }
}
.user-icon {
    /* padding: 10px 10px; */
    /* border: 1px solid rgb(185, 184, 184); */
    border-radius: 5rem;
    min-width: 150px;
    max-width: 150px;
    height: 150px;
    background: #d3d3d4;
}
@media screen and (max-width: 750px){
    .user-icon{
        min-width: 50px;
        height: 50px;
        margin-top: 10px;
        margin-left: 5px;
    }
}
.user-status {
    padding: 10px 10px;
}
@media screen and (max-width: 750px){
    .user-status{
        padding: 10px 5px;
    }
}
/* フォロー情報 */
.follow {
    color: #696969;
}
.follow:hover {
    color: #000;
}
.follow-action-to-user {
    padding: 60px 10px;
    margin: 0 auto;
}
@media screen and (max-width: 750px){
    .follow-action-to-user{
        padding: 10px 10px;
        margin: 0;
    }
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
.cover-image {
    height: 200px;
    width: 200px;
    display: flex;
    /* box-shadow: 0 0 10px 0 rgba(0,0,0,.22); */
}
.audio-image {
    height: 200px;
    width: 200px;
}

/* コンテンツ */
.content {
    border-radius: 0.5rem;
    display: inline-block;
    margin: 10px;
    transition: .3s;
    color: #696969;
    padding: 5px;
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
    background: linear-gradient(to right, rgb(38, 0, 255), rgb(0, 140, 255));
}
.content:hover {
    border-radius: 0.5rem;
    display: inline-block;
    margin: 10px;
	transition: .3s;
    color: #696969;
}
.cover-image {
    height: 150px;
    width: 150px;
    display: flex;
    border-radius: 0.5rem;
}
audio {
    width: 200px;
    margin-top: 5px;
}
.content-fit {
    width: 50%;
    /* width: 1030px; */
    margin: 0 auto;
}
@media screen and (max-width: 750px){
    .content-fit{
        width: 100%;
        width: 360px;
        margin: 0 auto;
    }
}
/* item-titleとstyle同じのためあとで継承させる */
.userDetailItem-title {
    font-size: 16px;
    color: #333333;
    height: 25px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.userDetailItem-user-name {
    font-size: 14px;
    color: #999999;
}
a {
    text-decoration: none;
}
#btn-play {
    padding: 15px 17px;
    border-radius: 5rem;
}
.click-file-user-description {
    width: 200px;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
}
.ellipsis-h {
    position: absolute;
    top: 1%;
    left: 74%;
    /*以下装飾*/
    margin:0;/*余計な隙間を除く*/
    font-size: 40px;/*文字サイズ*/
    border: none; /*線で囲う*/
    padding: 7px;/*文字と線の間の余白*/
    color: rgb(226, 226, 226);/*文字色*/
    text-decoration: none;/*下線を表示させない*/
}
</style>
