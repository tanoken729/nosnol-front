<template>
<div class="wrapper">
  <Header />
    <main class="main">
      <nav class="side-bar">
        <h3>感情</h3>
        <ul class="emotion">
          <li class="joy">喜</li>
          <li class="angry">怒</li>
          <li class="sorrow">哀</li>
          <li class="easy">楽</li>
        </ul>
        <h3>ジャンル</h3>
        <ul class="genre">
          <li>J-POP</li>
          <li>アニメ</li>
          <li>邦楽ヒップホップ/R&B/レゲエ</li>
          <li>邦楽ロック</li>
          <li>邦楽ダンス/エレクトロニカ</li>
          <li>K-POP/ワールド・ミュージック</li>
          <li>洋楽総合</li>
          <li>洋楽ポップス</li>
          <li>洋楽ヒップホップ/R&B/レゲエ</li>
          <li>洋楽ロック</li>
          <li>洋楽ダンス/エレクトロニカ</li>
          <li>歌謡曲/演歌</li>
          <li>ジャズ</li>
          <li>クラシック</li>
        </ul>
      </nav>
      <div class="content">
        <NuxtLink to="/musicfiledetail">
          <p><audio src="" controls><source src="op.mp3" type="audio/mp3"></audio></p>
        </NuxtLink>
        <NuxtLink to="/musicfiledetail">
          <p><audio src="" controls></audio></p>
        </NuxtLink>
        <NuxtLink to="/musicfiledetail">
          <p><audio src="" controls></audio></p>
        </NuxtLink>
        <NuxtLink to="/musicfiledetail">
          <p><audio src="" controls></audio></p>
        </NuxtLink>
        <NuxtLink to="/musicfiledetail">
          <p><audio src="" controls></audio></p>
        </NuxtLink>
        <div id="app">
          <aplayer :music="music" :list="list"></aplayer>
        </div>
        <h2>Result</h2>
        {{ this.message }}
      </div>
    </main>
</div>
</template>

<script>
import Header from "@/components/header.vue";
import axios from 'axios'
//document is not definedになるためコメントアウト
// import Aplayer from 'vue-aplayer';
// require('vue-aplayer')

export default {
  components: {
    Header,
    //document is not definedになるためコメントアウト
    // Aplayer
  },
  data() {
    return {
      message: '',
      music: {
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
      },
      list: [
        {
          title: 'secret base~君がくれたもの~',
          artist: 'Silent Siren',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
        },
      {title:"前前前世",artist:"RADWIMPS",src:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yourname.mp3",pic:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yourname.jpg",lrc:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yourname.lrc"},
      {title:"光るなら.m3u8",artist:"Goose house",src:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/hls/hikarunara.m3u8",pic:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/hikarunara.jpg",lrc:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/hikarunara.lrc"},
      {title:"回レ！雪月花",artist:"小倉唯",src:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/snowmoonflowers.mp3",pic:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/snowmoonflowers.jpg",lrc:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/snowmoonflowers.lrc"},
      {title:"あっちゅ～ま青春!",artist:"七森中☆ごらく部",src:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yuruyuri.mp3",pic:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yuruyuri.jpg",lrc:"https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yuruyuri.lrc"}
      ]
    }
  },
  mounted () {
  axios.get('http://localhost:8000/api/test')
    .then((res) => {
      console.log(res.data)
      this.message = res.data
    })
    .catch((error) => {
      console.log(error)
    })
  }
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
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  text-align: center;
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
}
.content p {
  padding-top: 70px;
  border-radius: 0.5rem;
  border: 1px solid #d4d3d3;
  display: inline-block;
  margin: 10px;
  /* box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22); */
	transition: .3s;
  /* background-color: #e5e9f7; */
  color: #696969;
}
.content p:hover {
  padding-top: 70px;
  border-radius: 0.5rem;
  border: 1px solid #d4d3d3;
  display: inline-block;
  margin: 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.22);
	transition: .3s;
  /* background-color: #e5e9f7; */
  color: #696969;
}
audio {
  width: 250px;
  /* height: 50px; */
}
</style>
