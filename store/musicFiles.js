export const state = () => ({
  musicFileData: [],
})

export const getters = {
  musicFileData: state => state.musicFileData
}

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    console.log(state.musicFileData)
    state.musicFileData = musicFileData
  }
}

export const actions = {
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
