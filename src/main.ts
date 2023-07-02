import p5 from "p5";

let route, t, i;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  
    // 3つの点の座標
    route = [
      { x: 100, y: 100 },
      { x: 300, y: 300 },
      { x: 300, y: 100 },
    ];
  
    t = 0;
    i = 0;
  };

  p.draw = () => {
    p.clear();

    route.forEach((r) => {
      p.circle(r.x, r.y, 20);
    });
  
    // prev～nextまでを線形補間して、tの位置に円を移動させる
    const prev = route[i];
    const next = route[(i + 1) % route.length]; //余りを出す
  
    //位置の計算
    const x = lerp(prev.x, next.x, t); 
    const y = lerp(prev.y, next.y, t);
  
    p.circle(x, y, 10);
  
    t += 0.01;
    //目的の位置についた後
    if (t > 1) {
      t = 0;
      i++;
      i %= route.length;
    }
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
