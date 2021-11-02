# OKLab color space

*A color space by [Björn Ottosson](https://twitter.com/bjornornorn)*

```cpp 
struct RGB {float r; float g; float b;};

Lab linear_srgb_to_oklab(RGB c) 
{
    float l = 0.4121656120f * c.r + 0.5362752080f * c.g + 0.0514575653f * c.b;
    float m = 0.2118591070f * c.r + 0.6807189584f * c.g + 0.1074065790f * c.b;
    float s = 0.0883097947f * c.r + 0.2818474174f * c.g + 0.6302613616f * c.b;

    float l_ = cbrtf(l);
    float m_ = cbrtf(m);
    float s_ = cbrtf(s);

    return {
        0.2104542553f*l_ + 0.7936177850f*m_ - 0.0040720468f*s_,
        1.9779984951f*l_ - 2.4285922050f*m_ + 0.4505937099f*s_,
        0.0259040371f*l_ + 0.7827717662f*m_ - 0.8086757660f*s_,
    };
}

RGB oklab_to_linear_srgb(Lab c) 
{
    float l_ = c.L + 0.3963377774f * c.a + 0.2158037573f * c.b;
    float m_ = c.L - 0.1055613458f * c.a - 0.0638541728f * c.b;
    float s_ = c.L - 0.0894841775f * c.a - 1.2914855480f * c.b;

    float l = l_*l_*l_;
    float m = m_*m_*m_;
    float s = s_*s_*s_;

    return {
        + 4.0767245293f*l - 3.3072168827f*m + 0.2307590544f*s,
        - 1.2681437731f*l + 2.6093323231f*m - 0.3411344290f*s,
        - 0.0041119885f*l - 0.7034763098f*m + 1.7068625689f*s,
    };
}
```
## CIE 1931 color space
https://bottosson.github.io/posts/colorwrong/#what-can-we-do%3F

https://en.wikipedia.org/wiki/CIE_1931_color_space
```cpp
float f(float x)
{
    if (x >= 0.0031308)
        return (1.055) * x^(1.0/2.4) - 0.055
    else
        return 12.92 * x
}

float f_inv(float x)
{
    if (x >= 0.04045)
        return ((x + 0.055)/(1 + 0.055))^2.4
    else 
        return x / 12.92
}
```

Converting from XYZ to Oklab 

Given a color in $XYZ$ coordinates, with a D65 whitepoint, Oklab coordinates can be computed like this:

First the $XYZ$ coordinates are converted to an approximate cone responses:

$\begin{pmatrix} l \\ m \\ s \end{pmatrix} = \mathbf{M_1} \times \begin{pmatrix} X \\ Y \\ Z \end{pmatrix}$

A non-linearity is applied:

$\begin{pmatrix} l' \\ m' \\ s' \end{pmatrix} = \begin{pmatrix} l^{\frac 1 3} \\ m^{\frac 1 3} \\ s^{\frac 1 3} \end{pmatrix}$

Finally, this is transformed into the $Lab$-coordinates:
$\begin{pmatrix} L \\ a \\ b \end{pmatrix} = \mathbf{M_2} \times \begin{pmatrix} l' \\ m' \\ s' \end{pmatrix}$

with the following values for $M1$ and $M2$ :

$\mathbf{M_1} = \begin{bmatrix} +0.8189330101 & +0.3618667424 & -0.1288597137 \\ +0.0329845436 & +0.9293118715 & +0.0361456387 \\ +0.0482003018 & +0.2643662691 & +0.6338517070 \end{bmatrix}$

$\mathbf{M_2} = \begin{bmatrix} +0.2104542553 & +0.7936177850 & -0.0040720468 \\ +1.9779984951 & -2.4285922050 & +0.4505937099 \\ +0.0259040371 & +0.7827717662 & -0.8086757660 \end{bmatrix}$

The inverse operation, going from Oklab to XYZ is done with the following steps:

$\begin{pmatrix} l' \\ m' \\ s' \end{pmatrix} = \mathbf{M_2}^{-1} \times \begin{pmatrix} L \\ a \\ b \end{pmatrix},\qquad \begin{pmatrix} l \\ m \\ s \end{pmatrix} = \begin{pmatrix} {(l')}^{3} \\ {(m')}^{3} \\ {(s')}^{3} \end{pmatrix},\qquad \begin{pmatrix} X \\ Y \\ Z \end{pmatrix} = \mathbf{M_1}^{-1} \times \begin{pmatrix} l \\ m \\ s \end{pmatrix}$



##  note to self

$`\sqrt{2}`$

$$e^{i \pi} = -1$$ 

$$\begin{vmatrix} a & b \\ c & d \end{vmatrix}$$



$\begin{bmatrix}1 \\ 5 \\ -4 \\ 0\end{bmatrix}$
 

$\vec{A}$

```math
SE = \frac{\sigma}{\sqrt{n}}
```

$$\left[ {\begin{array}{cccc} 1 & 2 & 3 & 4 \\ 5 & 6 & 7 & 8 \\8&10&11&12\\13&14&15&16 \\ \end{array} } \right]$$

```
$$\usepackage{tikz}
\usetikzlibrary{datavisualization}
\usetikzlibrary{datavisualization.formats.functions}
\begin{document}
\begin{tikzpicture}
\datavisualization [school book axes,
                    visualize as smooth line,
                    y axis={label={$y=x^2$}},
                    x axis={label} ]

data [format=function] {
      var x : interval [-1.5:1.5] samples 7;
      func y = \value x*\value x;
      };
\end{tikzpicture}

\begin{tikzpicture}
\datavisualization [scientific axes=clean,
                    y axis=grid,
                    visualize as smooth line/.list={sin,cos,tan},
                    style sheet=strong colors,
                    style sheet=vary dashing,
                    sin={label in legend={text=$\sin x$}},
                    cos={label in legend={text=$\cos x$}},
                    tan={label in legend={text=$\tan x$}},
                    data/format=function
                    ]
data [set=sin] {
  var x : interval [-0.5*pi:4];
  func y = sin(\value x r);
}
data [set=cos] {
  var x : interval [-0.5*pi:4];
  func y = cos(\value x r);
}
data [set=tan] {
  var x : interval [-0.3*pi:.3*pi];
  func y = tan(\value x r);
};
\end{tikzpicture}$$

```


https://github.com/georges-gomes/katex-element
```
<!DOCTYPE html>
<html>
  <head>
    <script src="dist/katex-element.umd.js" type="module"></script>
  </head>
  <body>
    <katex-element>\sqrt{x}</katex-element>
  </body>
</html>
```


todo 

https://www.intmath.com/cg3/asciisvg-im-js-demo.php


```math
\begin{pspicture}(-2,-2)(2,2)
\psframe(-2,-2)(2,2)
\userline[linewidth=1.5 pt]{->}(0,0)(2,2)
\end{pspicture}
```


\userline[linewidth=2pt,linecolor=green]{->}(0,0)(2,2){-x}{-y}
\userline[linewidth=2pt,linecolor=red]{->}(0,0)(2,2){0}{y}
\userline[linewidth=2pt,linecolor=purple]{->}(0,0)(2,2){-x}{cos(y)}
\userline[linewidth=2pt,linecolor=lightblue]{->}(0,0)(2,2)(sin(x)}{-y}