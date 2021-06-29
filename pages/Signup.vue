<template>
<div class="wrapper">
    <Header />
    <div class="aaa">
      <div class="guide-sentence">
        <h1>SoundMatchingにようこそ！</h1>
      </div>
      <form class="form" @submit.prevent="registerUser">
        <h2 class="title">新規登録</h2>
          <table>
            <div v-if="$v.user.name.$error && !$v.user.name.required" class="error-message">
              ユーザ名を入力してください。
            </div>
            <tr>
              <td><input type="text" placeholder="ユーザ名" v-model="user.name" class="text-box"></td>
            </tr>
            <div v-if="$v.user.email.$error && !$v.user.email.required" class="error-message">
              メールアドレスを入力してください。
            </div>
            <tr>
              <td><input type="text" placeholder="メールアドレス" v-model="user.email" class="text-box"></td>
            </tr>
            <div v-if="$v.user.password.$error && !$v.user.password.required" class="error-message">
              パスワードを入力してください。
            </div>
            <tr>
              <td><input type="password" placeholder="パスワード" v-model="user.password" class="text-box"></td>
            </tr>
            <div v-if="$v.user.passwordToConfirm.$error && !$v.user.passwordToConfirm.required" class="error-message">
              確認用パスワードを入力してください。
            </div>
            <tr>
              <td><input type="password" placeholder="確認用パスワード" v-model="user.passwordToConfirm" class="text-box"></td>
            </tr>
          </table>
        <button class="btn" type="submit">新規登録</button>
        <NuxtLink to="/signin">ログインはこちらから</NuxtLink>
      </form>
    </div>
</div>
</template>

<script>
/* eslint-disable */

import {required,maxLength,minLength} from "vuelidate/lib/validators"
export default {
  name: 'Signup',
  data(){
    return {
      user:{
        name:'',
        email:'',
        password:'',
        passwordToConfirm:''
      }
    }
  },
    // フォーム要素ごとのルールを記述
  validations: {
    user: {
      name: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
      },
      passwordToConfirm: {
        required,
      },
    }
  },
  methods: {
    checkFormHasError(){
      this.$v.$touch()
      if(this.$v.$invalid){
        console.log("バリデーションエラー")
      }else{
        // console.log(this.form)
      }
    },
    async registerUser(){
      if(this.checkFormHasError()) return;
      
      try{ 
        await this.$axios.post('http://localhost:8000/api/register',this.user)
        this.$router.push('/TopAfterLogin')
      } catch(error){
        console.log(error)
        this.$router.push('/signup')
      }
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
.error-message {
  color: #ff0000;
  font-size: 13px;
}
</style>
