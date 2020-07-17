# S1ColorScaler

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.1.0&x2=0)](https://www.npmjs.com/package/@sentinel-one/s1-lottie)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Sentinel-One/lottie/blob/master/LICENSE)


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

## License

MIT &copy; Liron Hazan

