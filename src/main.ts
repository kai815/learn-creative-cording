import p5 from "p5";

let d;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke()
    reset()
  };
  p.draw = () => {
    d += 2;
    if(d > 900){
      reset();
    }
    p.clear()
    p.circle(p.width/2, p.height /2 , d)
  }
  p.mouseClicked = () => {
    reset();
  }
};

const reset = () => {
  d = 0;
}
new p5(sketch);
