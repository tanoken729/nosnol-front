export const state = () => ({
  musicFileData: [],
  // clickedFileUserId: '',
  // clickedLoginUserId: '',
  items:''
})

export const getters = {
  musicFileData: state => state.musicFileData,
  // clickedFileUserId: state => state.clickedFileUserId,
  // clickedLoginUserId: state => state.clickedLoginUserId,
  items: (state) => state.items
}

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    // console.log(state.musicFileData)
    state.musicFileData = musicFileData
  },
  setfollowInfo (state, { items }) {
    state.items = items
    console.log(state.items)
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
    }
    const musicFileData = [];
    musicFileData.push(musicFiledatum)
    // console.log(musicFiledatum)
    context.commit('setMusicFileDataMutations', musicFileData)
  },
  // follow(context, payload) {
  //   context.commit('setFileUserId', payload.clickedFileUserId)
  //   context.commit('setLoginUserId', payload.clickedLoginUserId)
  // },
  async setFollowState(context, payload) {
    await this.$axios.$get(`api/${payload.clickedFileUserId}/${payload.clickedLoginUserId}/getFollowInfo`)
    .then(response => {
      console.log(response)
        let followInfo = response
        let followingId = followInfo.followInfo[0].followed_id
        context.commit('setfollowInfo', { items: followingId })
    })
  }
}
