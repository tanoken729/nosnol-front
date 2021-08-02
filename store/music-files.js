const namespaced = true

const state = {
  musicFileData: [],
}

const getters = {
  musicFileData: state => state.musicFileData
}

const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    console.log(musicFileData)
    state.musicFileData = musicFileData
  }
}

const actions = {
  setMusicFileData(context, payload) {
    
    const musicFiledatum = {
      clickedFileTitle: payload.clickedFileTitle,
      clickedFileCoverImage: payload.clickedFileCoverImage,
    }
    const musicFileData = [];
    musicFileData.push(musicFiledatum)
    console.log(musicFiledatum)
    context.commit('setMusicFileDataMutations', musicFileData)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}