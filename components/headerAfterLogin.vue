<template>
    <div>
        <header class="header">
            <NuxtLink to="/"><h1 class="logo">Sound Matching</h1></NuxtLink>
            <nav class="nav">
            <ul>
                <li>検索</li>
                <li>{{ $store.state.auth.user.name }}</li>
                <button @click="logout">ログアウト</button>
                <li><button class="btn" @click="openBeforeMusicUploadModal">アップロード</button></li>
            </ul>
            </nav>
        </header>
        <div>
          <transition name="modal" mode="out-in">
            <BeforeMusicUploadModal
              @BeforeMusicUploadModal-event="openAfterMusicUploadModal"
              v-show="showContent"
              @click.self="closeBeforeMusicUploadModal"
              @openBeforeMusicUploadModal="openBeforeMusicUploadModal"
              @closeBeforeMusicUploadModal="closeBeforeMusicUploadModal"
            ></BeforeMusicUploadModal>
          </transition>
        </div>
        <div>
          <transition name="modal" mode="out-in">
            <AfterMusicUploadModal
              v-show="showContent2"
              @click.self="closeAfterMusicUploadModal"
              @openAfterMusicUploadModal="openAfterMusicUploadModal"
              @closeAfterMusicUploadModal="closeAfterMusicUploadModal"
            ></AfterMusicUploadModal>
          </transition>
        </div>
    </div>
</template>

<script>
import BeforeMusicUploadModal from '@/components/BeforeMusicUploadModal.vue'
import AfterMusicUploadModal from '@/components/AfterMusicUploadModal.vue'

export default {
    transition: {
    name: 'modal',
    mode: 'out-in'
  },
  components: {
    BeforeMusicUploadModal,
    AfterMusicUploadModal,
  },
  data () {
    return {
      showContent: false,
      showContent2: false
    }
  },
  methods: {
    openBeforeMusicUploadModal () {
      this.showContent = true
    },
    closeBeforeMusicUploadModal () {
      this.showContent = false
    },
    openAfterMusicUploadModal () {
      this.showContent = false
      this.showContent2 = true
    },
    closeAfterMusicUploadModal () {
      this.showContent2 = false
    },
    logout() {
      this.$auth.logout();
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
}
a {
  text-decoration: none;
  color: #000;
}
.header {
  background-color: #C0C1EB;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}
.btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #060834;
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
}
.modal-enter-active, .modal-leave-active { transition: opacity .5s; }
.modal-enter, .modal-leave-active { opacity: 0; }
</style>
