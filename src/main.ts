import p5 from "p5";

let img;
const sketch = (p: p5) => {
  p.preload = () => {
    //一旦dist側にも画像を置いた
    img = p.loadImage("hideo-beju2.png");
  }
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // 中央に寄せる
    const x = (p.width - img.width) / 2;
    const y = (p.height - img.height) / 2;
    p.image(img, x, y);
  };
};

new p5(sketch);

// イージング関数
// イージング関数のサイトもあるみたい
const tt = (t) => {
  return t * t
}

// 正規化:値を割合に戻す
// (対象の値 - 下限値) / (上限値 - 下限値)
const norm = (v:number,a:number,b:number) => {
  return (v - a) / (b - a);
}
// 線形補間:その割合の位置にある値を返す(正規化の処理とは逆)
// 下限値 + (上限値 - 下限値) * 割合
const lerp = (a:number, b:number, t:number) => {
  return a + (b - a) * t;
}

// マップ：範囲の中にある値の位置を t として、別の範囲での位置 t にある値を返す機能
// 範囲Bの値 = 線形補間(範囲Bの下限, 範囲Bの上限, 正規化(範囲Aの値, 範囲Aの下限, 範囲Aの上限))
// v:範囲Aの値,a:範囲Aの下限,b:範囲Aの上限,c:下限Bの下限 d:範囲Bの上限,
const map = (v:number, a:number, b:number, c:number, d:number) => {
  return lerp(c, d, norm(v, a, b));
}

// max() と min() の組み合わせをクランプ値が最小値～最大値の範囲を超えないようにする
const clamp = (value, min, max) => {
  return max(min(value, max), min);
}
