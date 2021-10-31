<template>
<div id="overlay" v-show="showMenuBar" @click.self="closeMenuBar">
    <div id="main-content">
        <ul>
        <!-- clickedFileUserIdを渡せれば良い -->
        <nuxt-link :to="{ name: 'user', params: {user: `${$store.state.auth.user.name}`} }"><li id="user-name" @click="setMusicFileData($store.state.auth.user.id)">{{ $store.state.auth.user.name }}</li></nuxt-link>
        <NuxtLink to="/profilesettings"><li><font-awesome-icon :icon="['fas', 'cogs']" class="cogs-font-solid"/>設定</li></NuxtLink>
        <li @click="logout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="sign-out-font-solid"/>ログアウト</li>
        </ul>
    </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            showMenuBar: false,
            clickedFileUserId: '',
        }
    },
    methods: {
        closeMenuBar (){
        this.$emit('closeMenuBar');
        },
        async logout() {
        this.$store.commit("loading/setLoading", true)
        await this.$auth.logout();
        this.$store.commit("loading/setLoading", false)
        },
        setMusicFileData (clickedFileUserId) {
        this.clickedFileUserId = clickedFileUserId
        this.$store.dispatch('musicFiles/setMusicFileData', {
            clickedFileUserId: this.clickedFileUserId,
        })
        console.log(clickedFileUserId)//4
        },
    }
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

    /*　画面の中央に要素を表示させる設定　*/
    display: flex;
    align-items: top;
    justify-content: right;
    padding: 0%;
}
#main-content{
    z-index:2;
    width: 230px;
    background:#fff;
    border-radius: 0.5rem;
    margin-top: 80px;
    margin-right: 20px;
    height: 120px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.32);
    padding: 8px 0;
}
ul {
    list-style: none;
    padding-left: 0;
}
li {
    padding: 8px 16px;
    font-size: 14px;
    color: #242432;
}
li:hover {
    padding: 8px 16px;
    font-size: 14px;
    color: #242432;
    background: #e7e7f8;
}
#user-name {
    font-weight: bold;
    /* border-bottom: #000 1px solid; */
}
.sign-out-font-solid {
    margin-right: 10px;
    color: rgb(84, 71, 255);
}
.cogs-font-solid {
    margin-right: 10px;
    color: rgb(84, 71, 255);
}
a {
    text-decoration: none;
}
</style>