import p5 from "p5";
const space = 20; //端のスペース
let a, b, t;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    a = { x: space, y: space };
    b = { x: p.width - space, y: p.height - space }
    p.textAlign(p.CENTER, p.CENTER);
    t = 0;
  };

  p.draw = () => {
    t += 0.005;
    t %= 1;

    p.clear();

    p.stroke(240);
    p.noFill();
    p.line(a.x, a.y, b.x, b.y); //真ん中の線

    p.stroke(240);
    p.fill("#292a33");
    p.circle(lerp(a.x, b.x, t), lerp(a.y, b.y, t), 10); //tが変化することで円の位置も変化する

    p.noStroke();
    p.fill(240);
    p.text("t = " + t.toFixed(2), p.width / 2, space * 2);
    p.text("a", space, space * 2); //左上のa
    p.text("b", p.width - space, p.height - space * 2);//右下のb
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
