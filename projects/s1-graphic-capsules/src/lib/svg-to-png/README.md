# SVG to PNG

Util functions for rasterizing and downloading d3 SVG charts 

[HIT THE DEMO](https://sleepy-blackwell-9736e8.netlify.app/export-svg-to-png)

## How to use

RXJS API:
 
```ts    
      onClick() {
        svgToPng$(this.svgElement, 'svg2pbg', { width: 900, height: 900 })
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((result) => {
          console.log(result);
        });
      }
```

Promise based API:
```ts
  onClick() {
    svgToPng(this.svgElement, 'svg2pbg', { width: 900, height: 900 })
      .then((result) => {
      console.log(result);
    });
  }
```
