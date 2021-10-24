# SupraLibrix

We'll be using signed integer values using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) representation. 

Depending on desired granularity, we may use:
| bits  | range | 
| -: | :-  |
| 2 | [ -1, +1 ] |
| 4 | [ -7, +7 ] |
| 8 | [ -127, +127 ] |

<svg width="96" height="96" viewBox="-48 -48 96 96">
    <defs>
        <image id="rbo" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAD6ADAAQAAAABAAAADwAAAAAHNtsJAAACAUlEQVQoFWWSWVMbQQyEW7uzBz7xgU3CFbzmgeL//yNSlVQeHOIy2DFY+bQ45CFbHs+OVq1u9cgkc4nf8bF2NyL/YhGKuFv7f0w32TKRVXM+IaEkg7VL0tMh09oy+b5PoCftK+mN769S2kvZ3pUaEjUAOIKtC1sXYAlIuX5ZLq2Hss2FfEuBF5h3gJ7hOFBkWQCmuGYAT9lH0o8T01qZHimg1Vi+uqLiWNoglZW/uaod4HvADnN2zj6n8rmrS7GvAfRK9m0q/34r1ZfST5zIAP3muAnmBKAH6wzWCz5eI39gGgYY2V4ix66xdfFuYvS8xqYsU1okl8GsGUUuKXLr2tJ/H9mksQDvrzBu0ZqlnSmtkB0K7o49+5Qin8lF4dM0mBPXU8hfJ9IzzC8NZqEKuRnGVwhLullKc5SFaR0WFStAMw4NywoM68AwRNkWG5A956rC3+Q3jSyMOuXEXUerNeAzzGqMQAFzv+YqAXI9MS1ENApm+4Kc6Df6Ro7TZkmFM6t1x9uhHMu6pTx8wzLLTQOAAwYrefNAr7AOATMgDBUCcn2iyr0VOlRzZb1KTooqSJiVDkS9CcPSMnP/LRhm5d4yz6iyix7oWT1mlqKhLAgqwNUE10XP6lC25mvBjuyKzCl5IV8lVAYzQMOsmO0cw2K+zeMhhqD35+Pw8fL3y3/7H3n2joxh7RbZAAAAAElFTkSuQmCC" x="-50%" y="-50%" width="100%" height="100%"  />
        <circle id="n0" r="15" />
        <path id="n3" d="M 0 -15 L-12.99 7.5 L12.99 7.5 Z"></path>
        <path id="n4" d="M 0 -15 L-15 0 L0 15 L15 0 Z"></path>
        <path id="n5" d="M 0 -15 L-14.266 -4.635 L-8.817 12.135 L8.817 12.135 L14.266 -4.635 Z"></path>
        <path id="n6" d="M 0 -15 L-12.99 -7.5 L-12.99 7.5 L0 15 L12.99 7.5 L12.99 -7.5 Z"></path>
        <path id="n7" d="M 0 -15 L-11.727 -9.352 L-14.624 3.338 L-6.508 13.515 L6.508 13.515 L14.624 3.338 L11.727 -9.352 Z"></path>
        <path id="n8" d="M 0 -15 L-10.607 -10.607 L-15 0 L-10.607 10.607 L0 15 L10.607 10.607 L15 0 L10.607 -10.607 Z"></path>
        <path id="n9" d="M 0 -15 L-9.642 -11.491 L-14.772 -2.605 L-12.99 7.5 L-5.13 14.095 L5.13 14.095 L12.99 7.5 L14.772 -2.605 L9.642 -11.491 Z"></path>
        <path id="n10" d="M 0 -15 L-8.817 -12.135 L-14.266 -4.635 L-14.266 4.635 L-8.817 12.135 L0 15 L8.817 12.135 L14.266 4.635 L14.266 -4.635 L8.817 -12.135 Z"></path>
        <pattern id="grid" width="32" height="32" x="16.25" y="16.25" viewBox="-16 -16 32 32" patternUnits="userSpaceOnUse">
            <path d="M16 -16 v32 h-32" fill="none" stroke="gray" stroke-width="0.5" />
        </pattern>
        <g id="bg">
            <use transform="scale(1 -1)" href="#rbo" />
            <rect x="-50%" y="-50%" width="100%" height="100%" fill="url(#grid)" />
        </g>
    </defs>
</svg>

##

<svg width="96" height="96" viewBox="-48 -48 96 96" >
    <use href="#rbo" style="image-rendering: pixelated" >
</svg>

## 3x3

<svg width="96" height="96" viewBox="-48 -48 96 96">
    <use href="#bg" />
    <use href="#n0" />
    <use x="-32" href="#n3" />
</svg>

## 5x5

<svg width="160" height="160" viewBox="-80 -80 160 160">
    <use href="#bg" />
    <use href="#n0" />
    <use x="-32" href="#n3" />
</svg>

## 7x7

<svg width="224" height="224" viewBox="-112 -112 224 224">
    <use href="#bg" />
    <use href="#n0" />
    <use x="-32" href="#n3" />
</svg>

## 15x15

```
//two's complement
const decv = (v) => (v > 7) ?  ~((v-2) & 0b111) : v 
const encv = (v) => (v < 0) ?  -~-v | 0b1000 : v

//test encoding/decoding
let dall = [0x8, 0xf, 0xe, 0xd, 0xc, 0xb, 0xa, 0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7].map(decv)
let eall = [-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7].map(encv);
console.log({dall, eall});

//encode pair
const dexy = (ff) => [decv(f & 0b1111), decv(f & 0b1111 >> 4)]
const enxy = ([x,y]) => encv(x) << 4 + encv(y)

//decode string
const decodeXY = ([shape,xy])=> [shape,dexy(xy)]
const decode = (nfss)=> decodeXY(nffs.split('n'))

let shapes = [ "3n0404", "0n0000" ].map(decode); 

/*
[ 
    [3,[4,4]], 
    [0,[0,0]] 
]
*/
```


<svg width="480" height="480" viewBox="-240 -240 480 480">
    <use href="#bg" style="image-rendering: pixelated" />
    <use width="1" href="#n0" />
    <use width="1" x="-128" y="-128" href="#n3" />
</svg>

[f6://0n003nd4](f6://0n003nd4)

```
/* example above
{"circle":[0,0], "triangle":[-4,4]} => [ '0n00', '3nd4' ] => f6://0n003nd4/ => https://physix.tech?ff=0n003nd4
*/


f6://0n003nd4@3puf2l2:0815 => https://physix.tech?sl=3puf2l2&wt=0815&ff=0n003nd4

let all = [-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7].map(v=>[v,encv(v)]).map(([l,v])=>[l,'0b'+v.toString(2).padStart(4,'0'), '0x'+v.toString(16), v])
 

/* all possible values in 4 bit encoding
[
    [-7, "0b1000", "0x8", 8],
    [-6, "0b1111", "0xf", 15],
    [-5, "0b1110", "0xe", 14],
    [-4, "0b1101", "0xd", 13],
    [-3, "0b1100", "0xc", 12],
    [-2, "0b1011", "0xb", 11],
    [-1, "0b1010", "0xa", 10],
    [0, "0b0000", "0x0", 0],
    [+1, "0b0001", "0x1", 1],
    [+2, "0b0010", "0x2", 2],
    [+3, "0b0011", "0x3", 3],
    [+4, "0b0100", "0x4", 4],
    [+5, "0b0101", "0x5", 5],
    [+6, "0b0110", "0x6", 6],
    [+7, "0b0111", "0x7", 7]
]
*/


```