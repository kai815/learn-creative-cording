import p5 from "p5";

let x,y;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    x = 0;
    y = p.height / 2;
  };

  p.draw = () => {
    p.clear();

    // 中央から左上の距離
    const max = p.dist(0, 0, p.width / 2, p.height / 2); //distは距離を計算する
    // 中央からマウスの位置
    const d = p.dist(p.width / 2, p.height / 2, p.mouseX, p.mouseY);
    p.circle(p.mouseX, p.mouseY, map(d, 0, max, max, 0));
  }
};
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
