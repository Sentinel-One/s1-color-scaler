# S1ColorScaler

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Sentinel-One/lottie/blob/master/LICENSE)

<p align="center">
  <img width="400" alt="placeholder" src="https://github.com/Sentinel-One/s1-color-scaler/blob/master/t_logo.png" />
</p>

S1ColorScaler - a dominant colors grabber lib that scales!

[HIT THE DEMO](https://distracted-pike-a06858.netlify.app/)

TBD 

## How to use

Import the S1ColorScaler into your typescript project and get the scaler instance by supplying 
the path to the wanted image source.
 
```ts
    const scaler = S1ColorScaler.from('assets/logo.png');
```

RXJS API:
```ts
    scaler.getMainColorsScale$(5).subscribe((colors) => {
      this.colors = colors;
    });
    scaler.getMainColorsTheme$(5).subscribe((colors) => {
      this.theme = colors;
    });
```

Promise based API:
```ts
    scaler.getMainColorsScale(5).then((colors) => {
      this.colors = colors;
    });
    scaler.getMainColorsTheme(5).then((colors) => {
      this.theme = colors;
    });
```

Angular grabber directive:

```html
  <img width="200" height="200" src="assets/s1_bg.jpg" s1ColorGrabber (mainColors)="getMainColors($event)">
```

```ts
    this.mainColor$ = scaler.getMainColor$();
```

```html
<div class="header" [style.background]="mainColor$ | async"></div>
```

## License

MIT &copy; Liron Hazan

