<template>
<div class="wrapper">
    <Header />
    <div class="aaa">
      <form @submit.stop.prevent="handleSubmit" class="form">
          <h2 class="title">ログイン</h2>
          <table>
          <div v-if="$v.form.email.$error && !$v.form.email.required">
            メールアドレスを入力してください。
          </div>
          <tr>
              <td><input type="email" placeholder="メールアドレス" class="text-box" v-model="$v.form.email.$model"></td>
          </tr>
          <div v-if="$v.form.password.$error && !$v.form.password.required">
            パスワードを入力してください。
          </div>
          <tr>
              <td><input type="password" placeholder="パスワード" class="text-box" v-model="$v.form.password.$model"></td>
          </tr>
          </table>
          <button class="btn" @click.prevent="submit">ログイン</button>
          <NuxtLink to="/signup">会員登録はこちらから</NuxtLink>
      </form>
    </div>
</div>
</template>

<script>
/* eslint-disable */

import {required,maxLength,minLength} from "vuelidate/lib/validators"
export default {
    data(){
      return {
        form: {
          email: "",
          password: "",
        },
        emailState:null,
        passState:null,
        loginErrMes:null,
      }
      // return{
      //     email:'',
      //     pass:'',
      //     emailState:null,
      //     passState:null,
      //     loginErrMes:null,
      // }
    },
    // フォーム要素ごとのルールを記述
    validations: {
      form: {
        email: {
          required,
        },
        password: {
          required,
        },
      }
    },
    methods:{
        checkFormHasError(){
          this.$v.$touch()
          if(this.$v.$invalid){
            console.log("バリデーションエラー")
          }else{
            console.log(this.form)
          }
        },
        async submit() {
            if(this.checkFormHasError()) return;

            try{
              const response = await this.$auth.loginWith('local', { data: this.form })
              console.log(response)
              console.log(this.$auth.loggedIn)
              // this.resetModal();
              // this.$store.dispatch('message/setFlashMessage',{
              //   content:'ログインしました。',
              //   messageType:'success'
              // })
              // this.$bvModal.hide('login-modal')
            } catch(error){
              // this.loginErrMes='パスワードまたはメールアドレスが異なります。';
              console.log('非同期通信エラー')
            }
        }
    },
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
  border: 1px solid #000;
  width: 400px;
  padding: 30px 10px;
  margin: 0 auto;;
}
input.text-box {
  width: 300px;
}
.title {
  font-size: 23px;
}
.aaa {
  display: flex;
  margin:  100px auto;
  width: 50%;
  padding: 0;
}
</style>
