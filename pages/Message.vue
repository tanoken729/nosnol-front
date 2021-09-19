<template>
  <div class="wrapper">
    <headerAfterLogin />
      <div id="your_container">
        <!-- チャットの外側部分① -->
        <div id="bms_messages_container">
          <!-- ヘッダー部分② -->
          <div id="bms_chat_header">
              <!--ステータス-->
              <div id="bms_chat_user_status">
                  <!--ステータスアイコン-->
                  <div id="bms_status_icon">●</div>
                  <!--ユーザー名-->
                  <div id="bms_chat_user_name">ユーザー</div>
              </div>
          </div>
          <!-- タイムライン部分③ -->
          <div id="bms_messages">
              <!--メッセージ１（左側）-->
              <div class="bms_message bms_left">
                  <div class="bms_message_box">
                      <div class="bms_message_content">
                          <div class="bms_message_text">テストテストテストテストテスト</div>
                      </div>
                  </div>
              </div>
              <div class="bms_clear"></div><!-- 回り込みを解除（スタイルはcssで充てる） -->
              <!--メッセージ２（右側）-->
              <div class="bms_message bms_right">
                  <div class="bms_message_box">
                      <div class="bms_message_content">
                          <div class="bms_message_text">テストテストテストテストテスト</div>
                      </div>
                  </div>
              </div>
              <div class="bms_clear"></div><!-- 回り込みを解除（スタイルはcssで充てる） -->
          </div>
          <!-- テキストボックス、送信ボタン④ -->
          <div id="bms_send">
              <textarea id="bms_send_message" placeholder="新しいメッセージを作成"></textarea>
              <div id="bms_send_btn">送信</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import headerAfterLogin from "@/components/headerAfterLogin.vue";

export default {
  components: {
    headerAfterLogin,
  }
};
</script>

<style scoped>
/* * {
  outline: solid 1px #000;
} */
#your_container{
    /* 高さや幅など、好きな様に設定
    bms_messages_containerの方で、縦横いっぱいに広がってくれるので、
    ここで充てた高さと横幅がそのままスタイルになる仕組み */

    height:600px;/*ここはご自由に*/
    width: 50%;/*ここはご自由に*/
    margin: 0 auto;
}
/* チャットの外側部分① */
#bms_messages_container{
    height: 100%;/*your_containerに対して100%になる */
    width: 100%;/*your_containerに対して100%になる */
    background-color: #000;
}

/* ヘッダー部分② */
#bms_chat_header {
    padding: 6px;/*隙間調整*/
    font-size: 16px;
    height: 34px;
    background: #fff;
    border: 1px solid #000;
}
    /* ステータスマークとユーザー名 */
    /* ここバグ */
    #bms_chat_user_status {
        float: left;/* bms_chat_headerに対して左寄せ */
    }
    /* ステータスマーク */
    #bms_status_icon {
        float: left;/* bms_chat_user_statusに対して左寄せ */
        line-height: 2em;/*高さ調整*/
    }
    /* ユーザー名 */
    #bms_chat_user_name {
        float: left;/* bms_chat_user_statusに対して左寄せ */
        line-height: 2em;/*高さ調整*/
        padding-left: 8px;
    }

/* タイムライン部分③ */
#bms_messages {
    overflow: auto;/* スクロールを効かせつつ、メッセージがタイムラインの外に出ないようにする */
    height:100%;/*テキストエリアが下に張り付く様にする*/
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    background-color: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.2) inset;/*ヘッダーの下に影を入れる*/
}
    /* メッセージ全般のスタイル */
    .bms_message {
        margin: 0px;
        padding: 0 14px;/*吹き出しがタイムラインの側面にひっつかない様に隙間を開ける*/
        font-size: 16px;
        word-wrap: break-word;/* 吹き出し内で自動で改行 */
        white-space: normal;/*指定widthに合わせて、文字を自動的に改行*/
    }
    /* メッセージ１（左側） */
    .bms_left {
        float: left;/*吹き出しをbms_messagesに対して左寄せ*/
        line-height: 1.3em;
    }
    /* メッセージ２（右側） */
    .bms_right {
        float: right;/*吹き出しをbms_messagesに対して右寄せ*/
        line-height: 1.3em;
    }
    /* 回り込みを解除 */
    .bms_clear {
        clear: both; /* 左メッセージと右メッセージの回り込み(float)の効果の干渉を防ぐために必要（これが無いと、自分より下のメッセージにfloatが影響する） */
    }
            /*
         *追加
         */
        .bms_message_box{
            margin-top: 20px;/*上下の吹き出しがひっつかない様に隙間を入れる*/
            max-width: 100%;/*文字が長くなった時に吹き出しがタイムラインからはみ出さない様にする*/
            font-size: 16px;
        }
            /*
            *追加
            */
            .bms_message_content{
                padding: 20px;/*文字や画像（コンテンツ）の外側に隙間を入れる*/
            }

        /* メッセージ１（左側） */
        .bms_left {
            float: left;/*吹き出しをbms_messagesに対して左寄せ*/
            line-height: 1.3em;
        }
            /*
            *追加
            */
            .bms_left .bms_message_box {
                color: #333;/*テキストを黒にする*/
                background: #fff;
                border: 2px solid #000CFF;
                border-radius: 30px 30px 30px 0px;/*左下だけ尖らせて吹き出し感を出す*/
                margin-right: 50px;/*左側の発言だとわかる様に、吹き出し右側に隙間を入れる*/
            }

        /* メッセージ２（右側） */
        .bms_right {
            float: right;/*吹き出しをbms_messagesに対して右寄せ*/
            line-height: 1.3em;
        }
            /*
            *追加
            */
            .bms_right .bms_message_box {
                color: #fff;/*テキストを白にする*/
                background: #000CFF;
                border: 2px solid #000CFF;
                border-radius: 30px 30px 0px 30px;/*右下だけ尖らせて吹き出し感を出す*/
                margin-left: 50px;/*右側の発言だとわかる様に、吹き出し左側に隙間を入れる*/
            }

/* テキストエリア、送信ボタン④ */
#bms_send {
    background-color:#eee;/*タイムラインの色と同じにする*/
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    height: 48px;
    padding: 4px;
}
    #bms_send_message{
        width: calc(100% - 75px);/*常に送信ボタンの横幅を引いたサイズに動的に計算*/
        line-height: 16px;
        height: 48px;
        padding: 14px 6px 0px 6px;/*文字がテキストエリアの中心になる様に隙間調整*/
        border: 1px solid #ccc;
        border-radius: 4px;/*角丸*/
        text-align: left;/*文字を左寄せ*/
        box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.2) inset;/*内側に影を入れてテキストエリアらしくした*/
        box-sizing: border-box;/*paddingとborderの要素の高さと幅の影響をなくす（要素に高さと幅を含める）*/

    }
    #bms_send_btn {
        width: 72px;
        height: 48px;
        font-size: 16px;
        line-height: 3em;
        float: right;/*bms_sendに対して右寄せ*/
        color: #fff;
        font-weight: bold;
        background: #bcbcbc;
        text-align: center;/*文字をボタン中央に表示*/
        border: 1px solid #bbb;
        border-radius: 4px;/*角丸*/
        box-sizing: border-box;/*paddingとborderの要素の高さと幅の影響をなくす（要素に高さと幅を含める）*/
    }
    #bms_send_btn:hover {
        background: #000CFF; /*マウスポインタを当てた時にアクティブな色になる*/
        cursor: pointer;/*マウスポインタを当てた時に、カーソルが指の形になる*/
    }
    
</style>
