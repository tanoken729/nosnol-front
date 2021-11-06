<template>
    <nav class="side-bar">
        <input @click="musicFileNoFilter" type="radio" id="all" name="all" checked="checked"><label for="all" class="all-tracks">All tracks</label>
    <h3>Emotions</h3>
        <div class="emotion">
        <input @click="FilterMusicFile" type="radio" name="emotion" value="joy" id="joy"><label for="joy" class="emotion-label"><font-awesome-icon :icon="['fas', 'smile-beam']"/></label>
        <input @click="FilterMusicFile" type="radio" name="emotion" value="angry" id="angry"><label for="angry" class="emotion-label"><font-awesome-icon :icon="['fas', 'sad-tear']"/></label>
        <input @click="FilterMusicFile" type="radio" name="emotion" value="sorrow" id="sorrow"><label for="sorrow" class="emotion-label"><font-awesome-icon :icon="['fas', 'angry']"/></label>
        <input @click="FilterMusicFile" type="radio" name="emotion" value="easy" id="easy"><label for="easy" class="emotion-label"><font-awesome-icon :icon="['fas', 'kiss-beam']"/></label>
        </div>
    <h3>Genres</h3>
        <div class="genre">
        <input @click="FilterMusicFile" type="radio" name="genre" value="j-pop" id="j-pop"><label for="j-pop" class="genre-label">J-POP</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="anime" id="anime"><label for="anime" class="genre-label">アニメ</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="hiphop-rnb-reggae" id="hiphop-rnb-reggae"><label for="hiphop-rnb-reggae" class="genre-label">ヒップホップ/R&B/レゲエ</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="rock" id="rock"><label for="rock" class="genre-label">ロック</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="dance-electronica" id="dance-electronica"><label for="dance-electronica" class="genre-label">ダンス/エレクトロニカ</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="k-pop" id="k-pop"><label for="k-pop" class="genre-label">K-POP/ワールド・ミュージック</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="western-music" id="western-music"><label for="western-music" class="genre-label">洋楽総合</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="western-pop" id="western-pop"><label for="western-pop" class="genre-label">洋楽ポップス</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="kayokyoku-enka" id="kayokyoku-enka"><label for="kayokyoku-enka" class="genre-label">歌謡曲/演歌</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="jazz" id="jazz"><label for="jazz" class="genre-label">ジャズ</label>
        <input @click="FilterMusicFile" type="radio" name="genre" value="classic" id="classic"><label for="classic" class="genre-label">クラシック</label>
        </div>
    </nav>
</template>

<script>

export default {
    data () {
        return {
            selectedEmotion: '',
            selectedGenre: '',
        }
    },
  methods: {
    FilterMusicFile (event) {
      if (event.target.name === 'emotion') {
        // dataに格納することで次のリクエストでも続けて値を渡せるようにする
        this.selectedEmotion = event.target.value
      }
      else if (event.target.name === 'genre') {
        // dataに格納することで次のリクエストでも続けて値を渡せるようにする
        this.selectedGenre = event.target.value
      }
      //「すべて」のチェックを外す
      const element = document.getElementById('all')
      element.checked = false;
      // easyでフィルターするapiをstoreで実行する
      this.$store.dispatch('musicFiles/FilterMusicFile', {
        selectedEmotion: this.selectedEmotion,
        selectedGenre: this.selectedGenre
      })
    },
    musicFileNoFilter () {
      this.selectedEmotion = ""
      this.selectedGenre = ""
      //「感情」のチェックを外す
      for (const element of document.getElementsByName('emotion')) {
        element.checked = false;
      }
      //「ジャンル」のチェックを外す
      for (const element of document.getElementsByName('genre')) {
        element.checked = false;
      }
      // すべての音声ファイルを取得する
      this.$store.dispatch('musicFiles/musicFileTopPageData')
    },
  }
}
</script>


<style>
/* * {
  outline: #696969 1px solid;
} */
/* サイドバー */
.side-bar {
  padding: 10px;
  min-width: 180px;
  position: fixed;
  height: calc(100% - 100px);
  overflow-y: scroll;
}
@media screen and (max-width: 750px){
  .side-bar{
    display:none;
  }
}
.side-bar ul {
  list-style: none;
  padding: 0;
  margin: 10px;
}
.side-bar li {
  padding: 10px;
  margin: 0 auto;
  color: #696969;
}
.side-bar h3 {
  padding: 10px;
  color: #696969;
  font-size: 20px;
}
/* 感情 */
.emotion {
  list-style: none;
  margin: 0 auto;
}
input[type=radio] {
  display: none;
}
input[type="radio"]:checked + .emotion-label {
  color: #fff;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  font-weight: bold;
}
.emotion-label {
  margin-bottom: 10px;
  border-radius: 0.5rem;
  text-align: center;
  padding: 10px 10px;
  display:block;
  position:relative;
  text-align: left;
  font-size: 25px;
}
.emotion-label:hover {
  color: #fff;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  font-weight: bold;
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
.genre-label {
  border-radius: 0.5rem;
  padding: 10px 10px;
  display:block;
  position:relative;
  margin-top: 10px;
  margin-bottom: 10px;
}
.genre-label:hover {
  color: #fff;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
}
input[type="radio"]:checked + .genre-label {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  color: #fff;
  background-color: #e5e9f7;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  font-weight: bold;
  padding: 10px 10px;
  margin: 10px auto;
}
.all-tracks {
  border-radius: 0.5rem;
  padding: 10px;
  margin: 0;
  display:block;
  position:relative;
  font-size: 20px;
  font-weight: bold;
}
.all-tracks:hover {
  color: #fff;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
}
input[type="radio"]:checked + .all-tracks {
  border-radius: 0.5rem;
  color: #fff;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  font-weight: bold;
}
</style>