export const state = () => ({
    loginUserProfileItems: {},
})

export const getters = {
    loginUserProfileItems: state => state.loginUserProfileItems,
}

export const mutations = {
    setProfileData(state, loginUserProfileItems) {
        state.loginUserProfileItems = loginUserProfileItems
    },
}

export const actions = {
    // プロフィール画面情報取得
    async setProfileData (context, payload) {
        await this.$axios.$get(`api/loginUserProfileData/${payload.clickedLoginUserId}`)
        .then(response => {
            const loginUserProfileItems = response
            console.log(loginUserProfileItems)
            context.commit('setProfileData', loginUserProfileItems)
        })
    },
}
