<template>
  <div class="wrapper">
    <headerAfterLogin />
    <div class="profile-settings-page"></div>
    <div class="title">
      <h1>Settings</h1>
    </div>
    <form method="post" enctype="multipart/form-data" class="profile-settgins">
      <div class="icon-area">
        <img
          class="user-icon"
          :src="
            `${$axios.defaults.baseURL}storage/${$store.state.auth.user.user_icon}`
          "
          alt="icon"
          v-show="showImageBeforeUploading"
        />
        <img
          class="user-icon"
          :src="userIconPreviewAfterUploading"
          alt="icon"
          v-show="showImageAfterUploading"
        />
        <label id="update-icon">
          <input type="file" name="file" @change="userIconUpload" />変更する
        </label>
      </div>
      <div class="text-area">
        <!-- 予定：getterのloginUserProfileItemsをstoreで配列にしてここではvーforで受け取る（現在はオブジェクトになっているためv-forできない） -->
        <label for="">表示名</label
        ><input type="text" class="text" v-model="name" />
        <label for="">メールアドレス</label
        ><input type="email" class="text" v-model="email" />
        <label for="">新しいパスワード</label
        ><input
          type="text"
          class="text"
          v-model="password"
          placeholder="※未入力の場合、パスワードの更新はされません。"
        />
        <label for="">自己紹介</label
        ><input type="textarea" id="description" v-model="description" />
        <button type="button" class="update-button" @click="updateProfile">
          更新
        </button>
      </div>
    </form>
    <button class="account-delete" @click="deleteAccount">
      アカウント削除
    </button>
  </div>
</template>

<script>
export default {
  middleware: "user_auth",
  data() {
    return {
      getLoginUserProfileData: [],
      showImageBeforeUploading: true,
      showImageAfterUploading: false,
      userIconPreviewAfterUploading: "",
      userIcon: [],
      name: `${this.$store.getters["users/loginUserProfileItems"].loginUserProfileItems[0].name}`,
      email: `${this.$store.getters["users/loginUserProfileItems"].loginUserProfileItems[0].email}`,
      password: "",
      description: `${this.$store.getters["users/loginUserProfileItems"].loginUserProfileItems[0].description}`
    };
  },
  asyncData: async function(context) {
    context.store.commit("loading/setLoading", true);
    // プロフィール画面情報取得
    await context.store.dispatch("users/setProfileData", {
      clickedLoginUserId: context.store.state.auth.user.id
    });
    context.store.commit("loading/setLoading", false);
  },
  methods: {
    userIconUpload(e) {
      const file = (e.target.files || e.dataTransfer)[0];
      if (file.type.startsWith("image/")) {
        this.userIconPreviewAfterUploading = window.URL.createObjectURL(file);
        this.showImageBeforeUploading = false;
        this.showImageAfterUploading = true;
      }
      // ここにe.dataTransfer.filesは入ってこない？
      this.userIcon = e.target.files;
      console.log(this.userIcon);
    },
    async updateProfile() {
      this.$store.commit("loading/setLoading", true);
      let formData = new FormData();

      formData.append("user_icon", this.userIcon[0]);
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("description", this.description);

      let config = {
        headers: {
          "content-type": "multipart/form-data",
          contentType: false,
          processData: false
        }
      };
      console.log(this.description);
      console.log(formData);

      await this.$axios
        .post(
          `api/loginUserProfileData/${this.$store.state.auth.user.id}`,
          formData,
          config
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.commit("loading/setLoading", false);
    },
    async deleteAccount() {
      console.log("unko");
      var answer = confirm("アカウントを削除しますか？");
      if (answer) {
        //true or false
        this.$store.commit("loading/setLoading", true);
        await this.$axios.post("api/deleteUser", {
          id: this.$store.state.auth.user.id
        });
        this.$store.commit("loading/setLoading", false);
      }
    }
  }
};
</script>

<style scoped>
/* * {
    outline: solid 1px #000;
} */
#update-icon {
  padding: 10px 10px;
  color: rgb(84, 71, 255);
  border: 1px solid rgb(84, 71, 255);
  border-radius: 0.5rem;
  background-color: #ffffff;
  cursor: pointer;
  margin-left: 25px;
  font-size: 15px;
}
input[type="file"] {
  display: none;
}
.wrapper {
  max-width: 100%;
}
.title {
  margin: 0px auto;
  padding: 10px;
  display: block;
  width: 50%;
  width: 720px;
  max-width: 100%;
}
.profile-settings-page {
  margin-top: 100px;
}
.profile-settgins {
  margin: 10px auto;
  width: 50%;
  width: 720px;
  display: flex;
  color: #000000d1;
  justify-content: space-between;
  max-width: 100%;
}
@media screen and (max-width: 750px) {
  .profile-settgins {
    display: block;
  }
}
.user-icon {
  border-radius: 5rem;
  width: 110px;
  height: 110px;
  background: #d3d3d4;
  margin: 10px;
}
.text-area {
  display: flex;
  flex-direction: column;
}
.text {
  width: 570px;
  height: 45px;
  background: #f1f5f9;
  border: 1px solid #d3d3d4;
  border-radius: 0.5rem;
  max-width: 100%;
}
#description {
  width: 570px;
  height: 75px;
  background: #f1f5f9;
  border: 1px solid #d3d3d4;
  border-radius: 0.5rem;
  max-width: 100%;
}
.update-button {
  width: 115px;
  height: 45px;
  margin: 20px auto;
  border: none;
  background: linear-gradient(to right, rgb(84, 71, 255), rgb(62, 114, 255));
  border-radius: 0.5rem;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
.account-delete {
  color: rgb(255, 0, 0);
  display: block;
  margin-right: 200px;
  text-decoration: none;
  height: 50px;
  width: 200px;
  margin-left: auto;
  background: rgb(251, 212, 212);
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
}
</style>
