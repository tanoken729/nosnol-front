<template>
    <div id="overlay" v-show="showSearchForm" @click.self="closeSearchForm">
            <input type="text" placeholder="検索" class="search-form">
    </div>
</template>

<script>

export default {
    data () {
        return {
            showSearchForm: false,
        }
    },
    methods: {
        closeSearchForm (){
        this.$emit('closeSearchForm');
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
/* #main-content{
    z-index:2;
    margin-top: 80px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.32);
} */
.search-form {
    margin-top: 30px;
    margin-right: 240px;
    height: 30px;
    width: 250px;
    border-radius: 0.3rem;
    border: none;
    padding-top: 5px;
    padding-left: 10px;
}
::placeholder {
    font-size: 15px;
}
</style>