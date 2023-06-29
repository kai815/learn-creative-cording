import p5 from "p5";

let x1, x2, x, y;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textAlign(p.CENTER, p.CENTER);
    x1 = 30; //下限の値
    x2 = p.width - x1; //上限の値
    x = x1; //初期値
    y = p.height / 2; //図を描く場所の高さ
  };
  p.draw = () => {
    x++;
    //元に戻る
    if (x >= x2) {
      x = x1;
    }

    p.clear();

    p.noStroke();
    p.fill(240);
    p.text(x1, x1, y - 65); //最小の位置のテキスト(65は線からの位置)
    p.text(x2, x2, y - 65); //最大の位置のテキスト
    p.text(x, x, y - 65); //動いてるところの上側のテキスト
    p.text(norm(x, x1, x2).toFixed(2), x, y + 65); // 動いてるところの割合を表すテキスト
    p.text(0, x1, y + 65);
    p.text(1, x2, y + 65);

    p.stroke(240);
    p.noFill();
    p.line(x1, y - 45, x1, y - 25); //最小の位置のテキストのところの縦線
    p.line(x2, y - 45, x2, y - 25); //最大の位置のテキストのところの縦線
    p.line(x, y - 45, x, y - 25); //動いてるところの縦線
    p.line(x, y + 45, x, y + 25); //動いてるところの縦線
    p.line(x1, y + 45, x1, y + 25);
    p.line(x2, y + 45, x2, y + 25);

    p.stroke(240);
    p.noFill();
    p.line(x1, y, x2, y); //真ん中の線

    p.stroke(240);
    p.fill("#292a33");
    p.circle(x, y, 20);
  }
};
new p5(sketch);

// 正規化:値を割合に戻す
// (対象の値 - 下限値) / (上限値 - 下限値)
const norm = (v:number,a:number,b:number) =>{
  return (v - a) / (b - a);
}
