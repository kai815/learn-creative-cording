import p5 from "p5";

let prevR, nextR, d, t;
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    d = 200;
    reset();
  };

  p.draw = () => {
    t += 0.03;
    // イージング後の余韻を持たせるため、すぐにはリセットしない
    if (t >= 1.5) {
      reset();
      return;
    }

    // t = 1.0 でイージング終了なので、t > 1.0 の場合は画面を更新しない
    if (t > 1.0) {
      return;
    }

    p.clear();
    //直系
    d = lerp(prevR, nextR, easeInOutBack(t));
    p.circle(p.width / 2, p.height / 2, d);
  }
  const reset =()=>{
    prevR = d;
    nextR = p.random(20, 400);
    t = 0;
  }
  // https://easings.net/ja#easeInOutBack
  const easeInOutBack = (t) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
  
    return t < 0.5 ? (p.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (p.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  }
};

// イージング関数
// イージング関数のサイトもあるみたい
const tt = (t) => {
  return t * t
}

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
