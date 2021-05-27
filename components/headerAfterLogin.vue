<template>
    <div>
        <header class="header">
            <router-link to="/"><h1 class="logo">Sound Matching</h1></router-link>
            <nav class="nav">
            <ul>
                <li>検索</li>
                <li>ユーザー名</li>
                <li><button class="btn" @click="openMusicUploadModal">アップロード</button></li>
            </ul>
            </nav>
        </header>
        <div>
          <transition>
            <MusicUploadModal
              v-show="showContent"
              @click.self="closeMusicUploadModal"
              @openMusicUploadModal="openMusicUploadModal"
              @closeMusicUploadModal="closeMusicUploadModal"
            ></MusicUploadModal>
          </transition>
        </div>
    </div>
</template>

<script>
import MusicUploadModal from '@/components/MusicUploadModal.vue'

export default {
  components: {
    MusicUploadModal,
  },
  data () {
    return {
      showContent: false,
    }
  },
  methods: {
    openMusicUploadModal () {
      // モーダルウィンドウを表示する
      this.showContent = true
    },
    closeMusicUploadModal () {
      this.showContent = false
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
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: none;
  background-color: #000CFF;
  color: #fff;
  font-size: 15px;
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
</style>
