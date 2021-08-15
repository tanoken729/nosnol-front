export const state = () => ({
  musicFileData: [],
  clickedFileUserId: '',
  clickedLoginUserId: '',
})

export const getters = {
  musicFileData: state => state.musicFileData,
  clickedFileUserId: state => state.clickedFileUserId,
  clickedLoginUserId: state => state.clickedLoginUserId,
}

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    // console.log(state.musicFileData)
    state.musicFileData = musicFileData
  },
  setFileUserId(state, clickedFileUserId) {
    // console.log(state.clickedFileUserId)
    state.clickedFileUserId = clickedFileUserId
  },
  setLoginUserId(state, clickedLoginUserId) {
    console.log(state.clickedLoginUserId)
    state.clickedLoginUserId = clickedLoginUserId
  },
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
  follow(context, payload) {
    context.commit('setFileUserId', payload.clickedFileUserId)
    context.commit('setLoginUserId', payload.clickedLoginUserId)
  }
}
