export const state = () => ({
  musicFileData: [],
  // clickedFileUserId: '',
  // clickedLoginUserId: '',
  followedId:'',
  userId:'',
  commentInfos:'',
  items: [],
})

export const getters = {
  musicFileData: state => state.musicFileData,
  // clickedFileUserId: state => state.clickedFileUserId,
  // clickedLoginUserId: state => state.clickedLoginUserId,
  followedId: (state) => state.followedId,
  userId: (state) => state.userId,
  commentInfos: (state) => state.commentInfos,
  items: (state) => state.items,
}

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    // console.log(state.musicFileData)
    state.musicFileData = musicFileData
  },
  setMusicDetailPageData (state, { followedId, userId, commentInfos }) {
    state.followedId = followedId
    state.userId = userId
    state.commentInfos = commentInfos
  },
  setmusicFileTopPageData (state, items) {
    state.items = items
    console.log(items)
  }
  // setFileUserId(state, clickedFileUserId) {
  //   // console.log(state.clickedFileUserId)
  //   state.clickedFileUserId = clickedFileUserId
  // },
  // setLoginUserId(state, clickedLoginUserId) {
  //   console.log(state.clickedLoginUserId)
  //   state.clickedLoginUserId = clickedLoginUserId
  // },
}

export const actions = {
  setMusicFileData(context, payload) {
    const musicFiledatum = {
      clickedFileTitle: payload.clickedFileTitle,
      clickedFileCoverImage: payload.clickedFileCoverImage,
      clickedFileMusicfile: payload.clickedFileMusicfile,
      clickedFileUserName: payload.clickedFileUserName,
      clickedFileUserId: payload.clickedFileUserId,
      clickedFileId: payload.clickedFileId,
    }
    const musicFileData = [];
    musicFileData.push(musicFiledatum)
    context.commit('setMusicFileDataMutations', musicFileData)
  },
  // follow(context, payload) {
  //   context.commit('setFileUserId', payload.clickedFileUserId)
  //   context.commit('setLoginUserId', payload.clickedLoginUserId)
  // },
  async musicDetailPageData(context, payload) {
    await this.$axios.$get(`api/${payload.clickedLoginUserId}/${payload.clickedFileId}/${payload.clickedFileUserId}/musicDetailPageData`)
    .then(response => {
      const musicDetailPageData = response
      console.log(musicDetailPageData)
      // フォロー
      let followedId = ''
      const id = payload.clickedFileUserId
      const followedIdCheck = musicDetailPageData.musicDetailPageData.some((v) => v.followed_id === id);
        if (followedIdCheck) {
          followedId = musicDetailPageData.musicDetailPageData[0].followed_id
          console.log('follow ifだよ')
        } else {
          followedId = false
          console.log('follow elseだよ')
        }
      // いいね
      let userId = ''
      const likeId = payload.clickedLoginUserId
      const userIdCheck = musicDetailPageData.musicDetailPageData.some((v) => v.likes_user_id === likeId);
        if (userIdCheck) {
          userId = musicDetailPageData.musicDetailPageData[0].likes_user_id
          console.log('like ifだよ')
        } else {
          userId = false
          console.log('like elseだよ')
        }
        // コメント
        let commentInfos = musicDetailPageData.musicDetailPageData
        // const textCheck = musicDetailPageData.musicDetailPageData.some((v) => v.tex);
        // if (textCheck) {
        //   commentInfos = musicDetailPageData.musicDetailPageData
        // } else {
        //   commentInfos = false
        // }
        // console.log(musicDetailPageData.musicDetailPageData.some((v) => v.tex))
        context.commit('setMusicDetailPageData', { followedId: followedId, userId: userId, commentInfos: commentInfos })
    })
  },
  // 感情絞り込み
  filterByJoy(context) {
    let items = []
    this.$axios.$get('api/musicfile/musicFileFilterEmotionJoy')
      .then(response => {
        items = response
        console.log(items)
        context.commit('setmusicFileTopPageData', items)
      })
      .catch(error => {
        console.log(error)
      })
  },
  filterByAngry(context) {
    let items = []
    this.$axios.$get('api/musicfile/musicFileFilterEmotionAngry')
      .then(response => {
        items = response
        console.log(items)
        context.commit('setmusicFileTopPageData', items)
      })
      .catch(error => {
        console.log(error)
      })
  },
  filterBySorrow(context) {
    let items = []
    this.$axios.$get('api/musicfile/musicFileFilterEmotionSorrow')
      .then(response => {
        items = response
        console.log(items)
        context.commit('setmusicFileTopPageData', items)
      })
      .catch(error => {
        console.log(error)
      })
  },
  filterByEasy(context) {
    let items = []
    this.$axios.$get('api/musicfile/musicFileFilterEmotionEasy')
      .then(response => {
        items = response
        console.log(items)
        context.commit('setmusicFileTopPageData', items)
      })
      .catch(error => {
        console.log(error)
      })
  },
  musicFileTopPageData(context) {
    let items = []
    this.$axios.$get('api/musicFileData')
      .then(response => {
        items = response
        console.log(items)
        context.commit('setmusicFileTopPageData', items)
      })
      .catch(error => {
        console.log(error)
      })
  }
}