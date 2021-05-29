<template>
<div class="wrapper">
  <Header />
        <div class="up">
            <div class="a">
                <p>ユーザーアイコン</p>
                <h2>ユーザー名</h2>
                <button>フォロー</button>
                <button>フォロワー</button>
            </div>
            <div class="b">
                <button>メッセージ</button>
                <button>フォロー</button>
            </div>
        </div>
        <div class="down">
            <div class="main">
                <button>再生ボタン</button>
                <p>オーディオビジュアライザ</p>
                <p>音声ファイルに設定された画像</p>
            </div>
            <div class="footer">
                <p>いいね件数表示</p>
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
.up {
    text-align: center;
    border: 1px solid #000;
}
.down {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center
}
.main {
    text-align: center;
    border: 1px solid #000;
    width: 1200px;
}
.footer {
    border: 1px solid #000;
    width: 1200px;
}
.a {
    /* display: flex; */
}
</style>
