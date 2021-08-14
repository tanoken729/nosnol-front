import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    // paths: ['authUser'],
    paths: ['musicFiles'],  // localStorageに保存したいstoreを入れる
  })(store);
};