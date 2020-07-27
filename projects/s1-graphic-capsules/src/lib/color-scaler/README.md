# S1ColorScaler


S1ColorScaler - a dominant colors grabber lib that scales!

[HIT THE DEMO](https://clever-khorana-d8489f.netlify.app/)

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
```

Promise based API:
```ts
    scaler.getMainColorsScale(5).then((colors) => {
      this.colors = colors;
    });
```

Angular grabber directive:

```html
  <img width="200" height="200" src="assets/s1_bg.jpg" s1ColorGrabber (mainColors)="getMainColors($event)">
```

Angular using main color as background:

```ts
    this.mainColor$ = scaler.getMainColor$();
```

```html
<div class="header" [style.background]="mainColor$ | async"></div>
```

