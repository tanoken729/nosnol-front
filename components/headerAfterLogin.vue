<template>
    <div>
        <header class="header">
          <div class="header-content">
            <div class="logo-position-adjustment">
            <!-- <NuxtLink to="/"><img class="logo" src="" alt="NOSNOL"></NuxtLink> -->
            <NuxtLink to="/TopAfterLogin"><h1 class="logo">NOSNOL</h1></NuxtLink>
            </div>
            <nav class="nav">
            <ul>
              <li>
                <SearchForm />
              </li>
              <li>
                <div>
                  <img class="user-icon" :src="`${$axios.defaults.baseURL}storage/${$store.state.auth.user.user_icon}`" alt="icon" @click="openMenuBar">
                </div>
              </li>
              <li><button class="btn" @click="openBeforeMusicUploadModal">アップロード</button></li>
            </ul>
            </nav>
          </div>
        </header>
        <div>
          <transition name="modal" mode="out-in">
            <BeforeMusicUploadModal
              v-show="showContent"
              @click.self="closeBeforeMusicUploadModal"
              @closeBeforeMusicUploadModal="closeBeforeMusicUploadModal"
              @openAfterMusicUploadModal="openAfterMusicUploadModal"
            ></BeforeMusicUploadModal>
          </transition>
        </div>
        <div>
          <transition name="modal" mode="out-in">
            <AfterMusicUploadModal
              :musicFile="musicFile" 
              :musicFileName="musicFileName" 
              v-show="showContent2"
              @click.self="closeAfterMusicUploadModal"
              @closeAfterMusicUploadModal="closeAfterMusicUploadModal"
            ></AfterMusicUploadModal>
          </transition>
        </div>
        <div>
          <transition name="modal" mode="out-in">
            <MenuBar
              v-show="showMenuBar"
              @click.self="closeMenuBar"
              @closeMenuBar="closeMenuBar"
            ></MenuBar>
          </transition>
        </div>
    </div>
</template>

<script>
import BeforeMusicUploadModal from '@/components/BeforeMusicUploadModal.vue'
import AfterMusicUploadModal from '@/components/AfterMusicUploadModal.vue'
import MenuBar from '@/components/MenuBar.vue'
import SearchForm from '@/components/SearchForm.vue'

export default {
    transition: {
    name: 'modal',
    mode: 'out-in'
  },
  components: {
    BeforeMusicUploadModal,
    AfterMusicUploadModal,
    MenuBar,
    SearchForm,
  },
  data () {
    return {
      showContent: false,
      showContent2: false,
      musicFile: '',
      musicFileName: '',
      showMenuBar: false,
      showSearchForm: false,
    }
  },
  // mounted () {
  //   console.log(this.$store)
  // },
  methods: {
    openBeforeMusicUploadModal () {
      this.showContent = true
    },
    closeBeforeMusicUploadModal () {
      this.showContent = false
    },
    openAfterMusicUploadModal (musicFile, musicFileName) {
      this.showContent = false
      this.showContent2 = true
      //BeforeModelからのmusicFileNameをセット
      this.musicFile = musicFile
      this.musicFileName = musicFileName
    },
    closeAfterMusicUploadModal () {
      this.showContent2 = false
    },
    logout() {
      this.$auth.logout();
    },
    openMenuBar () {
      this.showMenuBar = true
    },
    closeMenuBar () {
      this.showMenuBar = false
    },
  },
}
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
.logo-position-adjustment {
   display: flex;
 align-items: center;
}
.logo {
  /* padding: 10px; */
  font-size: 35px;
  color:rgb(84, 71, 255);
  /* height: 100px;
  line-height: 100px; */
}
a {
  text-decoration: none;
  color: #000;
}
.header {
  position:fixed;
  width: 100%;
  top: 0px;
  border-bottom: rgb(209, 207, 207) 1px solid;
  z-index: 10;
  background: #fff;
  /* background: linear-gradient(rgb(7, 22, 110), transparent); */
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
  /* padding-bottom: 30px; */
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5); */
}
@media screen and (max-width: 750px){
  .header-content{
    display: block;
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
.btn:hover {
  padding: 12px 20px;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(to left, rgb(84, 71, 255), rgb(62, 114, 255));
  color: #fff;
  font-size: 15px;
}
.nav ul {
  margin: 0 0 0 0;
  padding: 20px 20px 20px 20px;
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
  color: #2c55fe;
  font-weight: bold;
  margin-right: 10px;
}
</style>
