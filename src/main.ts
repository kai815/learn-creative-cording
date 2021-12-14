import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill()
  };
  p.draw = () => {
    p.stroke(p.random(180,255))
    p.ellipse(p.random(p.width), p.height /2 , p.random(50,300), p.random(50,300))
  }
};

new p5(sketch);
