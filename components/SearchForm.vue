<template>
    <div>
        <input type="text" placeholder="検索" class="search-form">
        <button @click="searchMusicFile"><font-awesome-icon :icon="['fas', 'search']" class="search-icon"/></button>
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
        searchMusicFile (){
            console.log('searchMusicFile')
        },
    }
}
</script>

<style scoped>
/* * {
    outline: #000 1px solid;
} */
.search-form {
    height: 30px;
    width: 250px;
    border-radius: 0.3rem;
    border: none;
    padding-top: 5px;
    padding-left: 10px;
    background: #07166e;
    font-size: 15px;
    color: #fff;
}
    ::placeholder {
        font-size: 15px;
    }
.search-icon {
  font-size: 20px;
  color: #fff;
  margin: 0 10px;
}
button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
}
</style>