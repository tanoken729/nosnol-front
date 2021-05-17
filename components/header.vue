<template>
    <div>
        <header class="header">
            <router-link to="/"><h1 class="logo">Sound Matching</h1></router-link>
            <nav class="nav">
            <ul>
                <li>検索</li>
                <router-link to="/signin"><li><a href="">ログイン</a></li></router-link>
                <router-link to="/signup"><li><button class="btn">新規登録</button></li></router-link>
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
a {
  text-decoration: none;
  color: #000;
}
.header {
  background-color: #C0C1EB;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
}
.btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #060834;
  color: #fff;
  font-size: 15px;
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
