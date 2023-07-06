import p5 from "p5";

let t,x1,y1,x2,y2;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    x1 = 0;
    y1 = p.height;
    x2 = p.width;
    y2 = 0;
    t = 0;
  };

  p.draw = () => {
    const x = lerp(x1, x2, tt(t));
    const y = lerp(y1, y2, tt(t));
    t += 0.005;
    if (t > 1) {
      t = 0;
    }
    p.clear();
    p.circle(x, y, 20);
  }
};

// イージング関数
// イージング関数のサイトもあるみたい
const tt = (t) => {
  return t * t
}

new p5(sketch);

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
