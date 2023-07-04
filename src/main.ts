import p5 from "p5";

let left,right;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
  
    left = 100;
    right = p.width - 100;
  };

  p.draw = () => {
    p.clear();

    p.strokeWeight(1);
    p.stroke(255, 0, 0);
    p.line(left, 0, left, p.height);//左の線
    p.line(right, 0, right, p.height);//右の線
  
    p.strokeWeight(2);
    p.stroke(240);
    //maxとminを組み合わせる
    const mx = p.max(left, p.min(right, p.mouseX));
    p.line(mx, 0, mx, p.height);
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

// max() と min() の組み合わせをクランプ値が最小値～最大値の範囲を超えないようにする
const clamp = (value, min, max) => {
  return max(min(value, max), min);
}
