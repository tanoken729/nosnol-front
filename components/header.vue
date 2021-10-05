<template>
    <div>
        <header class="header">
            <NuxtLink to="/"><h1 class="logo">Beat Space</h1></NuxtLink>
            <nav class="nav">
            <ul>
                <!-- <li>検索</li> -->
                <NuxtLink tag="li" to="/signin"><a class="login-btn">ログイン</a></NuxtLink>
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
  color:#fff;
}
a {
  text-decoration: none;
  color: #000;
}
.header {
  background: linear-gradient(rgb(7, 22, 110), transparent);
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding-bottom: 30px;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5); */
}
.btn {
  padding: 12px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to right, rgb(38, 0, 255), rgb(0, 140, 255));
  color: #fff;
  font-size: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  font-weight: bold;
}
.btn:hover {
  padding: 12px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to left, rgb(38, 0, 255), rgb(0, 140, 255));
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
  vertical-align: middle;
  padding-left: 0;
  display: inline-block;
}
.modal-enter-active, .modal-leave-active { transition: opacity .5s; }
.modal-enter, .modal-leave-active { opacity: 0; }

.user-icon {
    border-style: none;
    border-radius: 5rem;
    width: 30px;
    height: 30px;
    background: #d3d3d4;
    margin-right: 10px;
    vertical-align: bottom;
}
.login-btn {
  color: #fff;
  font-weight: bold;
  margin-right: 10px;
}
</style>
