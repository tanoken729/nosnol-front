import Vuex from 'vuex'
const store = () => {
    return new Vuex.Store({
        state: () => ({
            musicFileData: []
        }),
        getters: {
            musicFileData(state) {
                return state.musicFileData
            }
        },
        mutations: {
            setMusicFileData(state, response) {
                state.musicFileData = response
Ω            },
        },
        actions: {
            async setMusicFileData(commit) {
                const response = await this.$axios.$get('api/musicFileData')
                commit('setMusicFileData', response)
                console.log('成功')
            },
        }
    })
}

export default store
