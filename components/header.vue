<template>
    <div>
        <header class="header">
            <NuxtLink to="/"><h1 class="logo">Sound Matching</h1></NuxtLink>
            <nav class="nav">
            <ul>
                <li>検索</li>
                <NuxtLink tag="li" to="/signin"><a>ログイン</a></NuxtLink>
                <NuxtLink tag="li" to="/signup"><button class="btn">新規登録</button></NuxtLink>
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
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
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
