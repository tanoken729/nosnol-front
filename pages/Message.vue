<template>
<div class="wrapper">
  <headerAfterLogin />
    <main class="main">
        <h2>メッセージ</h2>
        <p>ユーザー名</p>
        <p>ユーザー名</p>
        <h2>ユーザー名</h2>
        <input type="text" placeholder="新しいメッセージを作成">
        <button>送信</button>
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
.main {
  display: flex;
}
</style>
