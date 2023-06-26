import p5 from "p5";

let d, circleColor, bgColor;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke()
    circleColor = p.color(p.random(255), p.random(255), p.random(255));
    reset()
  };
  p.draw = () => {
    d += 2;
    // 三平方の定理を使って画面中央から画面の端までを計算
    const x1 = 0;
    const y1 = 0;
    const x2 = p.width / 2;
    const y2 = p.height / 2;

    const a = x1 - x2;
    const b = y1 - y2;
    const c = Math.sqrt(a * a + b * b); // sqrt()で平方根の計算ができるらしい
    //半径が画面の端までを超えたらリセット
    if(d/2 > c){
      reset();
    }

    p.background(bgColor);
    p.fill(circleColor);
    p.circle(p.width/2, p.height /2 , d)
  }
  p.mouseClicked = () => {
    reset();
  }
  const reset = () => {
    d = 0;
    bgColor = circleColor;
    circleColor = p.color(p.random(255), p.random(255), p.random(255));
  }
};
new p5(sketch);
