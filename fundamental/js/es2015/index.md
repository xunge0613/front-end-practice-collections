## 解构赋值

```
let z = {
  a: 1,
  b: 2,
  c: {
    aa: 11,
    bb: 22
  }
}

let {a,b,c,c:{aa}} = z;
console.log(a,b,c,aa);

```
