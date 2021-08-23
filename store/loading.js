export const state = () => ({
    loading: false,
})

export const getters = {
    loading: state => state.loading,
}

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload;
    }
}

export const actions = {

}
