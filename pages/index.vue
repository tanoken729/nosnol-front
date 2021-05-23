<template>
<div class="wrapper">
  <Header />
    <main class="main">
      <nav class="side-bar">
        <h3>感情アイコン</h3>
        <ul class="emotion">
          <li>喜</li>
          <li>怒</li>
          <li>哀</li>
          <li>楽</li>
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
        <p>{{data}}</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
      </div>
      <div>
          <h1>Laravel & Nuxt.js</h1>
          <h2>URL</h2>
          {{ url }}
          <h2>Result</h2>
          {{ message }}
      </div>
    </main>
</div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  components: {
    Header,
  },
  async asyncData({app}) {
    const url = 'http://localhost/api/test' //Laravel の API URI
    const message = await app.$axios.$get(url)
    return {
        url,
        message
     };
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
}
.side-bar li {
  padding: 10px;
}
.emotion li {
  padding-left: 45px;
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
