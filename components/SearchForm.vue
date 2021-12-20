<template>
  <div>
    <input
      v-model="searchMusicFileTitle"
      type="text"
      placeholder="タイトル検索"
      class="search-form"
    />
    <button @click="searchMusicFile">
      <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearchForm: false,
      searchMusicFileTitle: ""
    };
  },
  methods: {
    searchMusicFile() {
      this.$store.dispatch("musicFiles/FilterMusicFile", {
        searchMusicFileTitle: this.searchMusicFileTitle
      });
      console.log("searchMusicFile");
    }
  }
};
</script>

<style scoped>
/* * {
    outline: #000 1px solid;
} */
.search-form {
  height: 30px;
  width: 250px;
  border-radius: 0.3rem;
  border: 1px solid rgb(150, 152, 161);
  padding: 15px;
  background: transparent;
  font-size: 15px;
  color: #000;
}
::placeholder {
  font-size: 15px;
  color: rgb(150, 152, 161);
}
.search-icon {
  font-size: 20px;
  color: linear-gradient(to right, rgb(38, 0, 255), rgb(0, 140, 255));
  margin: 0 10px;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
