<template>
<div class="wrapper">
  <Header />
    <main class="main">
      <sideBar />
      <div class="content-fit">
      <NuxtLink to="/musicfiledetail">
      <div class="content" v-for="(item, index) in items" :key="index" @click="setMusicFileData">
        <div>
            <img :src="`${$axios.defaults.baseURL}storage/${item.cover_image}`" class="cover-image">
            <h3>{{ item.title }}</h3>
            <audio controls controlslist="nodownload">
              <source :src="`${$axios.defaults.baseURL}storage/${item.music_file}`" type="audio/mp3">
            </audio>
        </div>
      </div>
      </NuxtLink>
      </div>
    </main>
</div>
</template>

<script>
import headerAfterLogin from "@/components/headerAfterLogin.vue";
import store from '../store';

export default {
  // middleware: 'user_auth',
  components: {
    headerAfterLogin,
  },
  data(){
    return {
      musicFile: "",
      coverImage: "",
      title: "",
      genre: "",
      emotions: "",
      userId: "",
      items: []
    }
  },
  mounted: function() {
    this.$axios
      .$get('api/musicFileData')
      .then(response => {
        this.items = response
        // console.log(this.items)
      })
      .catch(error => {
        // console.log(error)
      })
  },
  methods: {
    setMusicFileData () {
      this.$store.dispatch('setMusicFileData', {
        items: this.items
      })
      console.log(this.items)
    }
  },
  // computed: {
  //   items: function () {
  //     return this.$store.getters.musicFileData
  //   },
  // },
};
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
/* メイン */
.main {
  display: flex;
}
/* メインコンテンツ */
.content {
  /* display: flex; */
  padding: 10px;
  /* height: 200px;
  width: 295px; */
}
.content {
  /* padding-top: 70px; */
  border-radius: 0.5rem;
  border: 1px solid #d4d3d3;
  display: inline-block;
  margin: 10px;
  /* box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22); */
	transition: .3s;
  /* background-color: #e5e9f7; */
  color: #696969;
  padding: 5px;
  /* background-color: rgb(230, 231, 252); */
}
.content:hover {
  /* padding-top: 70px; */
  border-radius: 0.5rem;
  border: 1px solid #d4d3d3;
  display: inline-block;
  margin: 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.22);
	transition: .3s;
  /* background-color: #e5e9f7; */
  color: #696969;
}
.cover-image {
  height: 200px;
  width: 200px;
  display: flex;
}
audio {
  width: 200px;
  /* height: 50px; */
  margin-top: 5px;
  /* background-color: #000CFF; */
}
.content-fit {
  max-width: 100%;
  margin: 10px;
}
</style>
