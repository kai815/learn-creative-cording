import p5 from "p5";

const sketch = (p: p5) => {
  let r, x, s;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    r = p.min(p.width, p.height) / 6;
    x = r;
    s = "0";
  };
  p.draw = () => {
    x += 10;
    if (x > p.width + r) {
      x = -r;
    }

    p.clear();
    p.circle(x, p.height / 2, r * 2);

    if (p.frameCount % 30 === 0) {
      s = p.frameRate().toFixed(0);
    }

    p.push();
    p.noStroke();
    p.fill(240);
    p.text(s, 20, 20);
    p.pop();
  }
};

new p5(sketch);
