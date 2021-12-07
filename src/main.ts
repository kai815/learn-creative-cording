import p5 from "p5";

const sketch = (p: p5) => {
  let r, x, s;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.strokeWeight(10);
    p.stroke(240);
    p.noFill();
    p.circle( p.width / 4, p.height / 2, 100)

    p.noStroke();
    p.fill(240);
    p.circle(p.width / 4 * 3 ,p.height / 2, 100)
  };
};

new p5(sketch);
