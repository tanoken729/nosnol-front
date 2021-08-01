const namespaced = true

const state = {
  musicFileData: [],
}

const getters = {
  musicFileData: state => state.musicFileData
}

const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    state.musicFileData = musicFileData
  }
}

const actions = {
  setMusicFileData(vuexContext, payload) {
    const musicFiledatum = {
      clickedFileTitle: payload.clickedFileTitle,
      clickedFileCoverImage: payload.clickedFileCoverImage,
    }
    const musicFileData = [];
    musicFileData.push(musicFiledatum)
    vuexContext.commit('setMusicFileDataMutations', musicFileData)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}