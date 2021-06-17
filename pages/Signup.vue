<template>
<div class="wrapper">
    <Header />
    <div class="aaa">
      <div class="guide-sentence">
        <h1>SoundMatchingにようこそ！</h1>
      </div>
      <div class="form">
          <h2 class="title">新規登録</h2>
          <table>
          <tr>
              <td><input type="text" placeholder="ユーザ名" v-model="username" class="text-box"></td>
          </tr>
          <tr>
              <td><input type="text" placeholder="メールアドレス" v-model="email" class="text-box"></td>
          </tr>
          <tr>
              <td><input type="password" placeholder="パスワード" v-model="password" class="text-box"></td>
          </tr>
          </table>
          <button class="btn" @click="signUp">新規登録</button>
          <NuxtLink to="/signin">ログインはこちらから</NuxtLink>
      </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      myWallet: 500,
    }
  },
  methods: {
    async signUp () {
      await this.$store.dispatch('signUp', {
            username: this.username,
            email: this.email,
            password: this.password,
            myWallet: this.myWallet,
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* * {
  outline: #000 1px solid;
} */
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #000CFF;
  text-decoration: none;
}
.form {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
  margin: 20px;
}
.btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #060834;
  color: #fff;
  font-size: 15px;
}
.form {
  border: 1px solid #dcdcdc;
  width: 400px;
  padding: 30px 10px;
  margin: 0 auto;;
}
input.text-box {
  width: 300px;
  border: 1px solid #dcdcdc;
}
.title {
  font-size: 23px;
}
.guide-sentence {
  margin: 0 auto;;
}
.aaa {
  display: flex;
  margin:  100px auto;
  width: 50%;
  padding: 0;
}
</style>
