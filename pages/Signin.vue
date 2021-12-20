<template>
  <div class="wrapper">
    <Header />
    <div class="signin-form-positon-adjustment">
      <form @submit.stop.prevent="submit" class="form">
        <h2 class="title">ログイン</h2>
        <table>
          <div
            v-if="$v.form.email.$error && !$v.form.email.required"
            class="error-message"
          >
            メールアドレスを入力してください。
          </div>
          <tr>
            <td>
              <input
                type="email"
                placeholder="メールアドレス"
                class="text-box"
                v-model="form.email"
              />
            </td>
          </tr>
          <div
            v-if="$v.form.password.$error && !$v.form.password.required"
            class="error-message"
          >
            パスワードを入力してください。
          </div>
          <tr>
            <td>
              <input
                type="password"
                placeholder="パスワード"
                class="text-box"
                v-model="form.password"
              />
            </td>
          </tr>
        </table>

        <button class="btn" type="submit">ログイン</button>
        <NuxtLink to="/signup">会員登録はこちらから</NuxtLink>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  // フォーム要素ごとのルールを記述
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    checkFormHasError() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("バリデーションエラー");
      } else {
        // console.log(this.form)
      }
    },
    async submit() {
      if (this.checkFormHasError()) return;

      this.$store.commit("loading/setLoading", true);
      try {
        const response = await this.$auth.loginWith("local", {
          data: this.form
        });
        console.log(response);
        console.log(this.$auth.loggedIn);
      } catch (error) {
        console.log(error);
      }
      this.$store.commit("loading/setLoading", false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* * {
  outline: #000 1px solid;
} */
h1,
h2 {
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
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.22);
  border-radius: 0.5rem;
}
@media screen and (max-width: 750px) {
  .form {
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
.signin-form-positon-adjustment {
  display: flex;
  margin: 0 auto;
  width: 50%;
  padding: 0;
  margin-top: 200px;
}
@media screen and (max-width: 750px) {
  .signin-form-positon-adjustment {
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
