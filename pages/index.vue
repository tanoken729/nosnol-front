<template>
<div class="wrapper">
  <Header />
    <main class="main">
      <nav class="side-bar">
        <h3>感情アイコン</h3>
        <ul class="emotion">
          <li class="joy">喜</li>
          <li class="angry">怒</li>
          <li class="sorrow">哀</li>
          <li class="easy">楽</li>
        </ul>
        <h3>ジャンル</h3>
        <ul class="genre">
          <li>ジャンル名</li>
          <li>ジャンル名</li>
          <li>ジャンル名</li>
          <li>ジャンル名</li>
          <li>ジャンル名</li>
        </ul>
      </nav>
      <div class="content">
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
      </div>
      <h2>Result</h2>
      {{ this.message }}
    </main>
</div>
</template>

<script>
import Header from "@/components/header.vue";
import axios from 'axios'

export default {
  components: {
    Header,
  },
  data() {
    return {
      message: '',
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
  border: solid 1px;
  padding: 10px;
}
.side-bar ul {
  list-style: none;
  padding: 0;
  margin: 10px;
}
.side-bar li {
  padding: 10px;
  text-align: center;
  margin: 0 auto;
  color: #696969;
}
.side-bar h3 {
  padding: 10px;
  color: #696969;
}
.emotion li {
  border: 1px solid #696969;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
}
.joy:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
}
.angry:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
}
.sorrow:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
}
.easy:hover {
  border: 1px solid #FF7F00;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  background-color: #FF7F00;
  color: #fff;
}
/* メインコンテンツ */
.content {
  display: flex;
  padding: 10px;
}
.content p {
  padding: 10px;
}
</style>
