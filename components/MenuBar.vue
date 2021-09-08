<template>
<div id="overlay" v-show="showMenuBar" @click.self="closeMenuBar">
    <div id="main-content">
        <ul>
        <li id="user-name">{{ $store.state.auth.user.name }}</li>
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
        }
    },
    methods: {
        closeMenuBar (){
        this.$emit('closeMenuBar');
        },
        logout() {
        this.$auth.logout();
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
    z-index:1;

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
    max-height: 100px;
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
    color: #0606a5;
}
</style>