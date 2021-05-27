<template>
<div class="wrapper">
  <headerAfterLogin />
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
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
      </div>
    </main>
</div>
</template>

<script>
import headerAfterLogin from "@/components/headerAfterLogin.vue";

export default {
  components: {
    headerAfterLogin,
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
