<template>
    <div>
        <header class="header">
            <h1 class="logo">Sound Matching</h1>
            <nav class="nav">
            <ul>
                <li>検索</li>
                <li><a href="">ログイン</a></li>
                <li><button class="btn">新規登録</button></li>
            </ul>
            </nav>
        </header>
    </div>
</template>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
.logo {
  padding: 10px;
  font-size: 25px;
}
.header {
  background-color: #C0C1EB;
  display: flex;
  justify-content: space-between;
}
.btn {
  padding: 5px 10px;
  border-radius: 0.5rem;
}
.nav ul {
  margin: 0 0 0 0;
  padding: 20px 10px 15px 20px;
  background-image: none;
  background-repeat: repeat-x;
  text-align: right;
}
.nav li {
  display: inline;
  list-style-type: none;
  padding-left: 30px;
}
</style>
