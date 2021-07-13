import Vuex from 'vuex'
const store = () => {
    return new Vuex.Store({
        state: () => ({
            musicFileData: []
        }),
        getters: {
            list(state) {
                return state.musicFileData
            }
        },
        mutations: {
            addMusicFileData(state, data) {
                state.musicFileData.push({
                    musicFile: data.musicFile,
                    coverImage: data.coverImage,
                    title: data.title,
                    genre: data.genre,
                    emotions: data.emotions,
                    userId: data.userId,
                })
            },
            getMusicFileData(state, data) {
                state.musicFileData = data
            }
        },
        actions: {
            async addMusicFileDataAction({ commit }, data) {
                const response = await this.$axios.$post('/musicFileData', data)
                    .catch(err => {
                        console.log(err);
                    })
                commit('addMusicFileData', response)
            },
            async getMusicFileDataAction() {
                return await this.$axios.$get('/musicFileData')
                    .catch(err => {
                        console.log(err);
                    })
            },
        }
    })
}
export default store