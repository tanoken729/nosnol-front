<template>
  <div>
    <header class="header">
      <div class="header-content">
        <div class="logo-position-adjustment">
          <NuxtLink to="/"
            ><img class="logo" src="~/assets/Group 25.jpg" alt="NOSNOL"
          /></NuxtLink>
          <NuxtLink to="/"><h1 class="logo">NOSNOL</h1></NuxtLink>
        </div>
        <nav class="nav">
          <ul>
            <NuxtLink tag="li" to="/signin"
              ><a class="login-btn">ログイン</a></NuxtLink
            >
            <NuxtLink tag="li" to="/signup"
              ><button class="btn">新規登録</button></NuxtLink
            >
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
.logo-position-adjustment {
  display: flex;
  align-items: center;
}
.logo {
  font-size: 30px;
  color: rgb(84, 71, 255);
  height: 40px;
}
@media screen and (max-width: 750px) {
  .logo {
    font-size: 20px;
    height: 30px;
  }
}
a {
  text-decoration: none;
  color: #000;
}
.header {
  position: fixed;
  width: 100%;
  top: 0px;
  border-bottom: rgb(209, 207, 207) 1px solid;
  z-index: 10;
  background: #fff;
}
.header-content {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  z-index: 20;
}
@media screen and (max-width: 750px) {
  .header-content {
    padding: 0 0px 0 20px;
  }
}
.btn {
  padding: 12px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  color: #fff;
  font-size: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  font-weight: bold;
}
@media screen and (max-width: 750px) {
  .btn {
    padding: 6px 10px;
    font-size: 12px;
  }
}
.btn:hover {
  padding: 12px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  color: #fff;
  font-size: 15px;
}
@media screen and (max-width: 750px) {
  .btn:hover {
    padding: 6px 10px;
    font-size: 12px;
  }
}
.nav ul {
  margin: 0 0 0 0;
  padding: 20px 20px 20px 20px;
  background-image: none;
  background-repeat: repeat-x;
  text-align: right;
}
@media screen and (max-width: 750px) {
  .nav ul {
    padding: 10px 20px 10px 20px;
  }
}
.nav li {
  display: inline;
  list-style-type: none;
  vertical-align: middle;
  padding-left: 0;
  display: inline-block;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

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
  color: #2c55fe;
  font-weight: bold;
  margin-right: 10px;
}
@media screen and (max-width: 750px) {
  .login-btn {
    font-size: 12px;
  }
}
</style>
