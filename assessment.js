'use strict';
const userNameInput = document.getElementById('user-name'); //入力エリア
const assessmentButton = document.getElementById('assessment'); //診断ボタン
const resultDivided = document.getElementById('result-area'); //結果表示エリア
const tweetDivided = document.getElementById('tweet-area'); //ツイートボタン
//診断ボタンが押された時の処理
assessmentButton.onclick = () => {
    const userName = userNameInput.value;//userNameを取得
    if(userName.length === 0){
        //名前が空の時は処理を終了する
        return;
    }


//▼▼今ある診断結果を削除する▼▼
    removeAllChildren(resultDivided);//診断結果表示エリアの子要素を全て削除する
    removeAllChildren(tweetDivided);//ツイート表示エリアの子要素を全て削除

    //▼▼ 診断を実行して結果を表示する▼▼
  const header = document.createElement('h3');//h3タグの作成
  header.innerText = '診断結果';//h3タグにテキストを設定する
  resultDivided.appendChild(header);//h3タグを診断結果表示エリアに追加する

  const p = document.createElement('p');//pタグの作成
  const result = assessment(userName);//
  p.innerText = result;//assessment関数を実行してPタグに診断結果を設定する
  resultDivided.appendChild(p);//pタグを診断結果表示エリアに追加する
    
   //ツイートボタンを設置する
   const anchor = document.createElement('a');//aタグを新しく作る
   //リンク先を作成
   const href = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
   anchor.setAttribute('href', href);//リンク先を設定
   anchor.className = 'twitter-hashtag-button' ; //widgets.jsがツイートボタンに変換するためのマーカー
   anchor.setAttribute('data-text', result);//ツイート本文
   anchor.innerText = 'Tweet #あなたのいいところ';//ボタンの表示内容
   tweetDivided.appendChild(anchor);//aタグをツイートエリアに表示

   const script = document.createElement('script');//scriptタグを新しく作る
   //読み込むJSファイル（Twitterが提供しているwidgets.jsファイルを読み込む)
   script.setAttribute('src','https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);//scriptタグをhtml上に設置
};

/**
 * 指定した要素の子要素を全て削除する関数
 * @param{HTMLElement} element
 */
function removeAllChildren(element){
    //子要素がある限りループする
   while(element.firstChild){
        //最初の子要素を削除する
       element.removeChild(element.firstChild);
   }
   

};

 //enterキーを押したときに診断を実行する   
 userNameInput.onkeydown = event =>{
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};
    
const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];
/**
 * 名前の文字列をパラメータとして渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * @return{string} 診断結果
 */
function assessment(userName){
    //文字のコード数を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0 ; i<userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコードの合計数を回答数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //TODO ｛userName｝をユーザーの名前に置き換える
    result = result.replaceAll('{userName}',userName);
    return result; //診断結果

}



