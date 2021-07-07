<template>
<div class="wrapper">
  <Header />
        <div class="a">
            <div class="a-1">
                <div class="a-1-1">
                    <div>ユーザーアイコン</div>
                </div>
                <div class="a-1-2">
                    <h2>ユーザー名</h2>
                    <NuxtLink to="" class="follow">フォロー</NuxtLink>
                    <NuxtLink to="" class="follow">フォロワー</NuxtLink>
                </div>
            </div>
            <div class="a-2">
                <button class="btn">メッセージ</button>
                <button class="btn">フォロー</button>
            </div>
        </div>
        <div class="a-b"></div>
        <div class="body">
            <div class="b">
                <div class="b-1">
                    <div class="b-1-1">
                        <button>再生ボタン</button>
                    </div>
                </div>
                <div class="b-2">
                    <div class="b-1-2">
                        <div>オーディオビジュアライザ</div>
                    </div>
                    <div class="b-1-3">
                        <div>音声ファイルに設定された画像</div>
                    </div>
                </div>
            </div>
            <div class="c">
                <div>いいね件数表示</div>
            </div>
        </div>
</div>
</template>

<script>
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
/* 何かのバグでindex.vueにも反映されるためbody→.bodyに修正 */
.body {
    background-color: #F0F1F8
}
footer {
    background-color: #F0F1F8
}
h2 {
    font-size: 20px;
}
.a {
    /* text-align: center; */
    display: flex;
    margin: 0 auto;
    width: 60%;
    padding: 0;
}
.a-1 {
    margin: 40px auto;
    display: flex;
}
.a-1-1 {
    padding: 60px 10px;
    border: 1px solid rgb(185, 184, 184);
    border-radius: 0.5rem;
}
.a-1-2 {
    padding: 10px 10px;
}
.follow {
    color: #696969;
}
a {
  text-decoration: none;
}
.follow:hover {
    color: #000;
}
.a-2 {
    padding: 30px 10px;
    margin: 0 auto;
}
.a-b {
    border-bottom: 1px solid rgb(185, 184, 184);
}
.b {
    margin: 0 auto;
    width: 70%;
    padding: 0;
    border-right: 1px solid rgb(185, 184, 184);
    border-left: 1px solid rgb(185, 184, 184);
    border-bottom: 1px solid rgb(185, 184, 184);
    background-color: #fff;
}
.b-1-1 {
    padding: 10px;
}
.b-1-2 {
    padding: 10px;
}
.b-1-3 {
    padding: 10px;
}
.b-2 {
    display: flex;
    justify-content: space-between;
}
.c {
    width: 70%;
    margin: 0 auto;
    border-right: 1px solid rgb(185, 184, 184);
    border-left: 1px solid rgb(185, 184, 184);
    border-bottom: 1px solid rgb(185, 184, 184);
    padding: 0 10px;
    background-color: #fff;
}
.btn {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}
.btn:hover {
  padding: 7px 20px;
  border-radius: 0.5rem;
  border: 1px solid #696969;
  background-color: #fff;
  color: #000;
  font-size: 15px;
}

</style>
