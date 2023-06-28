import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    //HSB(色相・彩度・明度)で指定
    p.colorMode(p.HSB, p.width, 100, 100);
  };
  p.draw = () => {
    p.fill(p.mouseX, 100, 100);// 色相, 彩度, 明度
    p.circle(p.mouseX, p.mouseY, 100); // 円の位置
  }
};
new p5(sketch);
