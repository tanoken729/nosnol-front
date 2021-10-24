<template>
<div class="wrapper">
    <headerAfterLogin />
    <div class="profile-settings-page"></div>
    <div class="title">
    <h1>Settings</h1>
    </div>
    <form method="post" enctype="multipart/form-data" class="profile-settgins">
        <div class="icon-area">
            <img class="user-icon" :src="`${$axios.defaults.baseURL}storage/${$store.state.auth.user.user_icon}`" alt="icon" v-show="showImageBeforeUploading">
            <img class="user-icon" :src="userIconPreviewAfterUploading" alt="icon" v-show="showImageAfterUploading">
            <label id="update-icon">
            <input type="file" name="file" @change="userIconUpload">変更する
            </label>
        </div>
        <div class="text-area">
            <!-- 予定：getterのloginUserProfileItemsをstoreで配列にしてここではvーforで受け取る（現在はオブジェクトになっているためv-forできない） -->
            <label for="">表示名</label><input type="text" class="text" v-model="name">
            <label for="">メールアドレス</label><input type="email" class="text" v-model="email">
            <label for="">新しいパスワード</label><input type="text" class="text" v-model="password" placeholder="※未入力の場合、パスワードの更新はされません。">
            <label for="">自己紹介</label><input type="textarea" id="description" v-model="description">
            <button type="button" class="update-button" @click="updateProfile">更新</button>
        </div>
    </form>
        <!-- <button @click="env">env</button> -->
</div>
</template>

<script>
// import env from '../nuxt.config.js';

export default {
    data () {
        return {
            getLoginUserProfileData: [],
            showImageBeforeUploading: true,
            showImageAfterUploading: false,
            userIconPreviewAfterUploading: '',
            userIcon: [],
            name: `${this.$store.getters['users/loginUserProfileItems'].loginUserProfileItems[0].name}`,
            email: `${this.$store.getters['users/loginUserProfileItems'].loginUserProfileItems[0].email}`,
            // password: `${this.$store.getters['users/loginUserProfileItems'].loginUserProfileItems[0].password}`,
            password: '',
            description: `${this.$store.getters['users/loginUserProfileItems'].loginUserProfileItems[0].description}`,
            // BaseUrl: ENV.API_BASE_URL
        }
    },
    asyncData: async function(context) {
        context.store.commit("loading/setLoading", true)
        // プロフィール画面情報取得
        await context.store.dispatch('users/setProfileData', {
            clickedLoginUserId: context.store.state.auth.user.id,
        })
        context.store.commit("loading/setLoading", false)
    },
    methods: {
        userIconUpload(e) {
        const file = (e.target.files || e.dataTransfer)[0]
            if (file.type.startsWith("image/")) {
                this.userIconPreviewAfterUploading = window.URL.createObjectURL(file);
                this.showImageBeforeUploading = false
                this.showImageAfterUploading = true
            }
            // ここにe.dataTransfer.filesは入ってこない？
            this.userIcon = e.target.files
            console.log(this.userIcon)
        },
        async updateProfile() {
        this.$store.commit("loading/setLoading", true)
        let formData = new FormData();

        formData.append('user_icon', this.userIcon[0]);
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('description', this.description);

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'contentType': false,
                'processData': false
            },
        };
        console.log(this.description)
        console.log(formData)

        await this.$axios.post(`api/putLoginUserProfileData/${this.$store.state.auth.user.id}`, formData, config)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        this.$store.commit("loading/setLoading", false)
        },
        // env() {
        //     console.log('hoge')
        // // console.log(process.env)
        // console.log(env)
        // }
    },
}
</script>

<style scoped>
/* * {
    outline: solid 1px #000;
} */
#update-icon {
    padding: 10px 10px;
    color: rgb(84, 71, 255);
    border: 1px solid rgb(84, 71, 255);
    border-radius: 0.5rem;
    background-color: #ffffff;
    cursor: pointer;
    margin-left: 25px;
    font-size: 15px;
}
input[type="file"] {
    display: none;
}
.wrapper {
    max-width: 100%;
}
.title {
    margin: 0px auto;
    padding: 10px;
    display: block;
    width: 50%;
    width: 720px;
    max-width: 100%;
}
.profile-settings-page {
    margin-top: 100px;
}
.profile-settgins {
    /* border: 1px solid rgb(197, 196, 196); */
    margin: 10px auto;
    width: 50%;
    width: 720px;
    display: flex;
    color: #000000D1;
    justify-content: space-between;
    max-width: 100%;
}
@media screen and (max-width: 750px){
    .profile-settgins{
        display: block;
    }
}
.icon-area {
    /* margin-right: 50px; */
}
.user-icon {
    /* padding: 10px 10px; */
    /* border: 1px solid rgb(185, 184, 184); */
    border-radius: 5rem;
    width: 110px;
    height: 110px;
    background: #d3d3d4;
    margin: 10px;
}
.text-area {
    display: flex;
    flex-direction: column;
    /* max-width: 100%; */
}
.text {
    width: 570px;
    height: 45px;
    background: #f1f5f9;
    border: 1px solid #d3d3d4;
    border-radius: 0.5rem;
    max-width: 100%;
}
#description {
    width: 570px;
    height: 75px;
    background: #f1f5f9;
    border: 1px solid #d3d3d4;
    border-radius: 0.5rem;
    max-width: 100%;
}
.update-button {
    width: 115px;
    height: 45px;
    margin: 20px auto;
    /* box-shadow: 0 0 10px 0 rgba(0,0,0,.22); */
    border: none;
    background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
    border-radius: 0.5rem;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
}
</style>