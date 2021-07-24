<template>
  <div id="overlay" v-show="showContent2" @click.self="closeAfterMusicUploadModal">
    <div id="main-content">
      <h2 class="title">音声ファイルのアップロード</h2>
      <div class="sections">
        <form method="post" enctype="multipart/form-data">
        <div>
          {{musicFile}}
          <h3>カバー画像</h3>
          <div class="drop_area" 
            @dragenter="dragEnter" 
            @dragleave="dragLeave" 
            @dragover.prevent 
            @drop.prevent="dropFile" 
            :class="{enter: isEnter}" 
          >
            <p>クリックして画像を追加</p>
            <p>10MB以内 .jpg .png .heic に対応しています。</p>
          </div>
          {{coverImages[0]}}
        </div>
        </form>
<!-- <form method="POST" action="<URL>" enctype="multipart/form-data">
  <input type="file" name="file"/><br>
  <input type="submit" value="SUBMIT" @change="dropFile"/>
</form> -->
        <h3>タイトル</h3>
          <input type="text" class="text-box" v-model="musicFileName">
        <h3>ジャンル選択</h3>
          <div class="cp_ipselect cp_sl01">
          <select required @change="selectedGenre">
            <option value="" hidden class="aa">ジャンルを選択してください</option>
            <option></option>
            <option value="j-pop">J-POP</option>
            <option value="anime">アニメ</option>
            <option value="hiphop-rnb-reggae">ヒップホップ/R&B/レゲエ</option>
            <option value="rock">ロック</option>
            <option value="dance-electronica">ダンス/エレクトロニカ</option>
            <option value="k-pop">K-POP/ワールド・ミュージック</option>
            <option value="western-music">洋楽総合</option>
            <option value="western-pop">洋楽ポップス</option>
            <option value="kayokyoku-enka">歌謡曲/演歌</option>
            <option value="jazz">ジャズ</option>
            <option value="classic">クラシック</option>
          </select>
          {{genre}}
          </div>
        <h3>感情</h3>
        <div class="emotion">
          <input type="radio" name="emotion" value="joy" @change="selectedEmotion" id="joy"><label for="joy" class="label">喜</label>
          <input type="radio" name="emotion" value="angry" @change="selectedEmotion" id="angry"><label for="angry" class="label">怒</label>
          <input type="radio" name="emotion" value="sorrow" @change="selectedEmotion" id="sorrow"><label for="sorrow" class="label">哀</label>
          <input type="radio" name="emotion" value="easy" @change="selectedEmotion" id="easy"><label for="easy" class="label">楽</label>
        </div>
        {{emotion}}
          <!-- <ul class="emotion">
            <li class="joy">喜</li>
            <li class="angry">怒</li>
            <li class="sorrow">哀</li>
            <li class="easy">楽</li>
          </ul> -->
      </div>
      <div class="button-content">
        <button class="cancel-btn" @click="closeAfterMusicUploadModal">キャンセル</button>
        <button class="btn" @click="uploadMusicFile">アップロード</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  props: [
    'musicFile',
    'musicFileName',
    ],
  // props: ['musicFileName'],
  data () {
    return {
      showContent2: false,
      isEnter: false,
      // this.$setでも変更がリアクティブにならないためいったんコメントアウト
      // musicFileData: {
        // musicFile: [],
        coverImages: [],
        // musicFileName: '',
        genre: '',
        emotion: '',
      // }
    }
  },
  methods: {
    closeAfterMusicUploadModal (){
      this.$emit('closeAfterMusicUploadModal');
    },
    async uploadMusicFile () {
      let formData = new FormData();

      // formData.append('file', {
      //   music_file: this.musicFile,
      //   cover_image: this.coverImages,
      //   title: this.musicFileName,
      //   genre: this.genre,
      //   emotions: this.emotion,
      //   }
      // );
      formData.append('music_file', this.musicFile);
      formData.append('cover_image', this.coverImages);
      formData.append('title', this.musicFileName);
      formData.append('genre', this.genre);
      formData.append('emotions', this.emotion);

      let config = {
        headers: {
            'content-type': 'multipart/form-data',
            'contentType': false,
            'processData': false
        },
        // method: "POST",
        // // 'X-HTTP-Method-Override': 'PUT',
        // body: formData
        // 'X-HTTP-Method-Override': 'PUT'
      };

      // fetch("http://localhost:8000/api/musicFileUpload", config)
      //   .then((res)=>{
      //     return( res.json() );
      //   })
      //   .then((json)=>{
      //     // 通信が成功した際の処理
      //   })
      //   .catch((error)=>{
      //     // エラー処理
      //   });

      // axios.post('http://localhost:8000/api/musicFileUpload', formData, config)
      //     .then(function(response) {
      //         console.log(response)
      //     })
      //     .catch(function(error) {
      //         console.log(error)
      //     })

      await this.$axios.post('/proxy/api/musicFileUpload', formData, config)
      .then(res => {
        console.log(res)
        this.posts = res.data.posts
        console.log(this.posts)
      })
      .catch(err => {
        console.log(err)
      })
      // try{ 
      //   axios.post('http://localhost:8000/api/musicFileUpload', formData, config)
      //   .then(res => {
      //     console.log(res)
      //     this.posts = response.data.posts
      //     console.log(this.posts)
      //   })
      //   this.$router.push('/TopAfterLogin')
      // } catch(error){
      //   console.log(error)
      //   // console.log(this.musicFile)
      //   // console.log(this.musicFileName)
      // }
    },
    dragEnter() {
        // console.log('Enter Drop Area');
        this.isEnter = true;
    },
    dragLeave() {
        this.isEnter = false;
    },
    dragOver() {
        console.log('DragOver')
    },
    dropFile(event) {
      this.coverImages = [...event.dataTransfer.files]
      // console.log(this.coverImages)
      // console.log(this.musicFile)
      // console.log(this.musicFileName)
    },
    selectedGenre (e) {
      this.genre = e.target.value
      // this.$set(this.musicFileData, 'genre', e.target.value)
    },
    selectedEmotion (e) {
      this.emotion = e.target.value
      // this.$set(this.musicFileData, 'emotion', e.target.value)
    },
    // musicFileNameはこのファイルのpropsから取得
    setMusicFileFromBeforeMusicUploadModal (musicFileName) {
      this.musicFileName = musicFileName
    },
    // hederSet () {
    //   let config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    //   }
    //   this.uploadMusicFile (config)
    //   console.log(config)
    // }
  },
}
</script>

<style scoped>
/* * {
  outline: #000 1px solid;
} */
#overlay{
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#main-content{
  z-index:2;
  width: 500px;
  padding-top: 40px;
  background:#fff;
  text-align: center;
  border-radius: 0.5rem;
}

.button-content{
  margin: 30px;
}

/* モーダルないの上下で色違うやつのcssの当て方あってるか聞く */
.modal-button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.modal-button:hover {
  background-color: #ff4500;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
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
.cancel-btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
.cancel-btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #696969;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
.description {
  border: 1px dashed #707070;
  width: 400px;
  padding: 40px 10px;
  margin: 0 auto;
  font-size: 17px;
}
.title {
  font-size: 20px;
}
input.text-box {
  padding: 10px;
  width: 400px;
}
.emotion {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}
input[type=radio] {
display: none;
}
input[type="radio"]:checked + label {
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  color: #000CFF;
  background-color: #e5e9f7;
  font-weight: bold;
  padding: 10px 10px;
  margin: 0px 10px;
}
.label {
  border: 1px solid #d4d3d3;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  width: 50px;
  text-align: center;
  padding: 10px 10px;
  margin: 0px 10px;
/* display: block;
float: left;
margin: 5px;
width: 100px;
height: 45px;
padding-left: 5px;
padding-right: 5px;
color: #b20000;
text-align: center;
line-height: 45px;
cursor: pointer;
border: 2px solid #006DD9;
border-radius: 5px; */
}
.label:hover {
  color: #000CFF;
  background-color: #e5e9f7;
}






/* セレクト */
.cp_ipselect select {
	width: 400px;
  padding: 8px;
	color: #666666;
  font-size: 15px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}
.sections {
  /* border: 1px solid #000; */
  width: 400px;
  margin: 0 auto;
}
.drop_area {
  border: 1px dashed #707070;
  width: 400px;
  padding: 40px 10px;
  margin: 10px auto;
  font-size: 17px;
}
.drop_area p {
  pointer-events: none;
}
.enter {
    border: 2px dashed rgb(184, 188, 241);
}
.title {
  font-size: 20px;
  padding-bottom: 20px;
}
.modal-enter-active, .modal-leave-active { transition: opacity .5s; }
.modal-enter, .modal-leave-active { opacity: 0; }
</style>
