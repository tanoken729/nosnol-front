<template>
<div class="wrapper">
  <headerAfterLogin />
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
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
        <p>音声ファイル</p>
      </div>
      <div v-if="this.$auth.loggedIn">
        {{ this.$auth.user.email }}
      </div>
    </main>
</div>
</template>

<script>
import headerAfterLogin from "@/components/headerAfterLogin.vue";

export default {
  // middleware: 'user_auth',
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
  padding: 70px;
  border-radius: 0.5rem;
  border: 1px solid #e5e9f7;
  display: inline-block;
  margin: 10px;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
	transition: .3s;
  /* background-color: #e5e9f7; */
}
</style>
