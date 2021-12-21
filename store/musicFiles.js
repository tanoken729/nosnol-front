export const state = () => ({
  musicFileData: [],
  // clickedFileUserId: '',
  // clickedLoginUserId: '',
  followedId: "",
  userId: "",
  commentInfos: "",
  // topページとフィルターで格納されるデータ（api側と変数名同じにしている）
  items: [],
  // ユーザー詳細ページのデータ（api側と変数名同じにしている）
  UserDetailItems: []
});

export const getters = {
  musicFileData: state => state.musicFileData,
  // clickedFileUserId: state => state.clickedFileUserId,
  // clickedLoginUserId: state => state.clickedLoginUserId,
  followedId: state => state.followedId,
  userId: state => state.userId,
  commentInfos: state => state.commentInfos,
  items: state => state.items,
  userDetailItems: state => state.UserDetailItems
};

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    // console.log(state.musicFileData)
    state.musicFileData = musicFileData;
  },
  setMusicDetailPageData(state, { followedId, userId, commentInfos }) {
    state.followedId = followedId;
    state.userId = userId;
    state.commentInfos = commentInfos;
  },
  // 初期表示とフィルターされたデータの格納
  setmusicFileTopPageData(state, items) {
    state.items = items;
    console.log(items);
  },
  // ユーザー詳細データの格納
  setUserDetailPageData(state, UserDetailItems) {
    state.UserDetailItems = UserDetailItems;
    console.log(UserDetailItems);
  }
  // setFileUserId(state, clickedFileUserId) {
  //   // console.log(state.clickedFileUserId)
  //   state.clickedFileUserId = clickedFileUserId
  // },
  // setLoginUserId(state, clickedLoginUserId) {
  //   console.log(state.clickedLoginUserId)
  //   state.clickedLoginUserId = clickedLoginUserId
  // },
};

export const actions = {
  setMusicFileData(context, payload) {
    const musicFiledatum = {
      clickedFileTitle: payload.clickedFileTitle,
      clickedFileCoverImage: payload.clickedFileCoverImage,
      clickedFileMusicfile: payload.clickedFileMusicfile,
      clickedFileUserName: payload.clickedFileUserName,
      clickedFileUserId: payload.clickedFileUserId, //storeへ格納→詳細ページでのfetchでのapi通信に使用
      clickedFileId: payload.clickedFileId, //storeへ格納→詳細ページでのfetchでのapi通信に使用
      clickedFileUserDescription: payload.clickedFileUserDescription,
      clickedFileUserUserIcon: payload.clickedFileUserUserIcon
    };
    const musicFileData = [];
    musicFileData.push(musicFiledatum);
    context.commit("setMusicFileDataMutations", musicFileData);
  },
  // follow(context, payload) {
  //   context.commit('setFileUserId', payload.clickedFileUserId)
  //   context.commit('setLoginUserId', payload.clickedLoginUserId)
  // },
  // 音声ファイル詳細画面api取得（フォロー、いいね、コメント）
  async musicDetailPageData(context, payload) {
    await this.$axios
      .$get(
        `api/musicDetailPageData/${payload.clickedLoginUserId}/${payload.clickedFileId}/${payload.clickedFileUserId}`
      )
      .then(response => {
        const musicDetailPageData = response;
        console.log(musicDetailPageData);
        // フォロー
        let followedId = "";
        const id = payload.clickedFileUserId;
        const followedIdCheck = musicDetailPageData.musicDetailPageData.some(
          v => v.followed_id === id
        );
        if (followedIdCheck) {
          followedId = musicDetailPageData.musicDetailPageData[0].followed_id;
          console.log("follow ifだよ");
        } else {
          followedId = false;
          console.log("follow elseだよ");
        }
        // いいね
        let userId = "";
        const likeId = payload.clickedLoginUserId;
        const userIdCheck = musicDetailPageData.musicDetailPageData.some(
          v => v.likes_user_id === likeId
        );
        if (userIdCheck) {
          userId = musicDetailPageData.musicDetailPageData[0].likes_user_id;
          console.log("like ifだよ");
        } else {
          userId = false;
          console.log("like elseだよ");
        }
        // コメント
        let commentInfos = musicDetailPageData.musicDetailPageData;
        context.commit("setMusicDetailPageData", {
          followedId: followedId,
          userId: userId,
          commentInfos: commentInfos
        });
      });
  },
  // ユーザー詳細画面api取得
  async userDetailPageData(context, payload) {
    let UserDetailItems = [];
    await this.$axios
      .$get(`api/userDetailPageData/${payload.clickedFileUserId}`)
      .then(response => {
        UserDetailItems = response;
        console.log(response);
        context.commit("setUserDetailPageData", UserDetailItems);
      });
  },
  // 感情・ジャンル絞り込み、ファイル名検索
  FilterMusicFile(context, payload) {
    let items = [];
    this.$axios
      .$get("api/searchMusicFile/emotion/genre/title", {
        params: {
          emotion: payload.selectedEmotion,
          genre: payload.selectedGenre,
          title: payload.searchMusicFileTitle
        }
      })
      .then(response => {
        items = response;
        console.log(items);
        context.commit("setmusicFileTopPageData", items);
      })
      .catch(error => {
        console.log(error);
      });
  },
  musicFileTopPageData(context) {
    let items = [];
    this.$axios
      .$get("api/musicFileList")
      .then(response => {
        items = response;
        console.log(items);
        context.commit("setmusicFileTopPageData", items);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
