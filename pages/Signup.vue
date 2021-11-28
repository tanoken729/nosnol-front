<template>
<div class="wrapper">
    <Header />
    <div class="signup-form-positon-adjustment">
      <div class="guide-sentence">
        <h1>Welcome to NOSNOL！</h1>
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
            <div v-if="$v.user.password_confirmation.$error && !$v.user.password_confirmation.required" class="error-message">
              確認用パスワードを入力してください。
            </div>
            <tr>
              <td><input type="password" placeholder="確認用パスワード" v-model="user.password_confirmation" class="text-box"></td>
            </tr>
          </table>
        <button class="btn" type="submit">新規登録</button>
        <NuxtLink to="/signin">ログインはこちらから</NuxtLink>
      </form>
    </div>
</div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue'

import {required,maxLength,minLength} from "vuelidate/lib/validators"
export default Vue.extend ({
  name: 'Signup',
  data(){
    return {
      user:{
        name:'',
        email:'',
        password:'',
        password_confirmation:''
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
      password_confirmation: {
        required,
      },
    }
  },
  methods: {
    // $v は ts に対応していないためthisのanyマッピング
    checkFormHasError(){
      (this as any).$v.$touch()
      if((this as any).$v.$invalid){
        console.log("バリデーションエラー")
      }else{
        // console.log(this.form)
      }
    },
    async registerUser(){
      if((this as any).checkFormHasError()) return; // "An expression of type 'void' cannot be tested for truthiness."のエラーが出力されるため、ひとまずanyで対応する
      
      this.$store.commit("loading/setLoading", true)
      try{
        await this.$axios.$post('api/register',this.user)
        .then( () =>{
          // 新規登録時にログイン処理を行い、userデータをトップ画面に反映させる
          this.$auth.loginWith('local', { data: this.user })
          .then( () =>{
            this.$router.push('/TopAfterLogin')
            })
        })
      } catch(error){
        console.log(error)
        this.$router.push('/signup')
      }
      this.$store.commit("loading/setLoading", false)
    },
  }
})
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
  color: rgb(84, 71, 255);
  text-decoration: none;
}
.form {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 30px 10px;
  margin: 0 auto;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.22);
  border-radius: 0.5rem;
}
@media screen and (max-width: 750px){
  .form{
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  width: 350px;
  padding: 30px 10px;
  margin: 0 auto;
  }
}
input {
  margin: 10px 0;
  padding: 10px;
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
  margin: 20px;
}
.btn:hover {
  padding: 12px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to left, rgb(84, 71, 255), rgb(62, 114, 255));
  color: #fff;
  font-size: 15px;
}
input.text-box {
  width: 300px;
  border: 1px solid #dcdcdc;
}
.title {
  font-size: 23px;
}
.guide-sentence {
  margin: 0 auto;
}
@media screen and (max-width: 750px){
  .guide-sentence{
    margin: 0 auto;
    font-size: 10px;
    text-align: center;
  }
}
.signup-form-positon-adjustment {
  display: flex;
  margin:  0 auto;
  min-width: 50%;
  width: 900px;
  padding: 0;
  margin-top: 200px;
}
@media screen and (max-width: 750px){
  .signup-form-positon-adjustment{
    display: block;
    margin-top: 150px;
    width: 100%;
    padding: 0;
  }
}
.error-message {
  color: #ff0000;
  font-size: 13px;
}
</style>
