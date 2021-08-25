export const state = () => ({
  musicFileData: [],
  // clickedFileUserId: '',
  // clickedLoginUserId: '',
  followedId:''
})

export const getters = {
  musicFileData: state => state.musicFileData,
  // clickedFileUserId: state => state.clickedFileUserId,
  // clickedLoginUserId: state => state.clickedLoginUserId,
  followedId: (state) => state.followedId
}

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    // console.log(state.musicFileData)
    state.musicFileData = musicFileData
  },
  setfollowInfo (state, { followedId }) {
    state.followedId = followedId
    console.log(state.followedId)
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

      const followInfo = response
      let followedId = ''
      //   const arr = Object.entries(followInfo);
      //   console.log(arr)
      //   const id = payload.clickedFileUserId
      //   const targetUser = arr.find(([id, data]) => data.followed_id === id);
      //   console.log(targetUser);

      // const users = [
      //   { id: '101', name: 'Alice' },
      //   { id: '102', name: 'Bob' },
      //   { id: '103', name: 'Charlie' },
      // ];
      const id = payload.clickedFileUserId
      console.log(id)
      const targetUser = followInfo.followInfo.some((v) => v.followed_id === id);
      console.log(targetUser);

        if (targetUser) {
          followedId = followInfo.followInfo[0].followed_id
          console.log('ifだよ')
        } else {
          followedId = false
          console.log('elseだよ')
        }
        // console.log(followInfo.followInfo[0].followed_id)
        context.commit('setfollowInfo', { followedId: followedId })
    })
  }
}
