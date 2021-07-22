<template>
<div class="wrapper">
  <headerAfterLogin />
    <main class="main">
      <nav class="side-bar">
        <h3>感情</h3>
          <div class="emotion">
            <input type="radio" name="emotion" value="joy" id="joy"><label for="joy" class="label">喜</label>
            <input type="radio" name="emotion" value="angry" id="angry"><label for="angry" class="label">怒</label>
            <input type="radio" name="emotion" value="sorrow" id="sorrow"><label for="sorrow" class="label">哀</label>
            <input type="radio" name="emotion" value="easy" id="easy"><label for="easy" class="label">楽</label>
          </div>
        <h3>ジャンル</h3>
          <div class="genre">
            <input type="radio" name="genre" value="j-pop" id="j-pop"><label for="j-pop" class="genre-label">J-POP</label>
            <input type="radio" name="genre" value="anime" id="anime"><label for="anime" class="genre-label">アニメ</label>
            <input type="radio" name="genre" value="hiphop-rnb-reggae" id="hiphop-rnb-reggae"><label for="hiphop-rnb-reggae" class="genre-label">ヒップホップ/R&B/レゲエ</label>
            <input type="radio" name="genre" value="rock" id="rock"><label for="rock" class="genre-label">ロック</label>
            <input type="radio" name="genre" value="dance-electronica" id="dance-electronica"><label for="dance-electronica" class="genre-label">ダンス/エレクトロニカ</label>
            <input type="radio" name="genre" value="k-pop" id="k-pop"><label for="k-pop" class="genre-label">K-POP/ワールド・ミュージック</label>
            <input type="radio" name="genre" value="western-music" id="western-music"><label for="western-music" class="genre-label">洋楽総合</label>
            <input type="radio" name="genre" value="western-pop" id="western-pop"><label for="western-pop" class="genre-label">洋楽ポップス</label>
            <input type="radio" name="genre" value="kayokyoku-enka" id="kayokyoku-enka"><label for="kayokyoku-enka" class="genre-label">歌謡曲/演歌</label>
            <input type="radio" name="genre" value="jazz" id="jazz"><label for="jazz" class="genre-label">ジャズ</label>
            <input type="radio" name="genre" value="classic" id="classic"><label for="classic" class="genre-label">クラシック</label>
          </div>
      </nav>
      <div class="content-fit">
      <NuxtLink to="/musicfiledetail">
      <div class="content" v-for="(item, index) in items" :key="index" @click="setMusicFileData">
        <div>
            <img :src="`${$axios.defaults.baseURL}storage/${item.cover_image}`" class="cover-image">
            <h3>{{ item.title }}</h3>
            <audio controls>
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
/* サイドバー */
.side-bar {
  /* border: solid 1px; */
  padding: 10px;
  min-width: 150px;
}
.side-bar ul {
  list-style: none;
  padding: 0;
  margin: 10px;
}
.side-bar li {
  padding: 10px;
  /* text-align: center; */
  margin: 0 auto;
  color: #696969;
}
.side-bar h3 {
  padding: 10px;
  color: #696969;
}
/* 感情 */
.emotion li {
  /* border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  text-align: center; */
}
.joy:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
  font-weight: bold;
}
.angry:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
  font-weight: bold;
}
.sorrow:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
  font-weight: bold;
}
.easy:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
  font-weight: bold;
}
/* ジャンル */
.genre li:hover {
  color: #000CFF;
  background-color: #e5e9f7;
  font-weight: bold;
  border-radius: 0.5rem;
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

.emotion {
  list-style: none;
  margin: 0 auto;
}
input[type=radio] {
  display: none;
}
input[type="radio"]:checked + .label {
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  color: #000CFF;
  background-color: #e5e9f7;
  font-weight: bold;
  padding: 10px 10px;
  margin: 10px auto;
}
.label {
  border: 1px solid #d4d3d3;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  text-align: center;
  padding: 10px 10px;
  margin: 10px auto;
  display:block;
  position:relative;
}
.label:hover {
  color: #000CFF;
  background-color: #e5e9f7;
  margin: 10px auto;
}

input[type="radio"]:checked + .genre-label {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  color: #000CFF;
  background-color: #e5e9f7;
  font-weight: bold;
  padding: 10px 10px;
  margin: 10px auto;
}
.genre-label {
  margin-bottom: 10px;
  border-radius: 0.5rem;
  padding: 10px 10px;
  margin: 10px auto;
  display:block;
  position:relative;
}
.genre-label:hover {
  color: #000CFF;
  background-color: #e5e9f7;
  margin: 10px auto;
}
</style>
