<template>
    <div>
        <header class="header">
            <NuxtLink to="/"><h1 class="logo">Sound Matching</h1></NuxtLink>
            <nav class="nav">
            <ul>
                <!-- <li>検索</li> -->
                <li><input type="text" placeholder="検索" class="serch-form"><font-awesome-icon :icon="['fas', 'search']" class="serch-icon"/></li>
                <li>
                  <div class="user-icon">
                    <img src="" alt="icon" @click="openMenuBar">
                  </div>
                </li>
                <li><button class="btn" @click="openBeforeMusicUploadModal">アップロード</button></li>
            </ul>
            </nav>
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

export default {
    transition: {
    name: 'modal',
    mode: 'out-in'
  },
  components: {
    BeforeMusicUploadModal,
    AfterMusicUploadModal,
    MenuBar,
  },
  data () {
    return {
      showContent: false,
      showContent2: false,
      musicFile: '',
      musicFileName: '',
      showMenuBar: false,
    }
  },
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
  padding-left: 30px;
  vertical-align: middle;
  padding-left: 0;
  display: inline-block;
}
.modal-enter-active, .modal-leave-active { transition: opacity .5s; }
.modal-enter, .modal-leave-active { opacity: 0; }

.user-icon {
    border: 1px solid rgb(185, 184, 184);
    border-radius: 5rem;
    width: 40px;
    height: 40px;
    background: #fff;
    margin-right: 10px;
}
.serch-icon {
  font-size: 20px;
  color: #fff;
  margin-right: 10px;
}
.serch-form {
  margin-right: 10px;
  height: 30px;
  width: 250px;
  border-radius: 0.3rem;
  border: none;
  padding-top: 5px;
  padding-left: 10px;
}
::placeholder {
  font-size: 15px;
}
</style>
