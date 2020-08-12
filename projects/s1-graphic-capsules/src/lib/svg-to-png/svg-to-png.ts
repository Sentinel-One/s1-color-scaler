import { defer, Observable } from 'rxjs';

type Dimensions = { width: number; height: number };

export function svgToPng$(node: SVGGraphicsElement, { width, height }: Dimensions): Observable<unknown> {
  return defer(() => svgToPng(node, { width, height }));
}

export function svgToPng(node: SVGGraphicsElement, { width, height }: Dimensions): Promise<void> {
  return svgStrToImage(getSVGString(node), { width, height });
}

function getSVGString(svgNode: SVGGraphicsElement) {
  svgNode.setAttribute('xlink', 'xmlns="http://www.w3.org/2000/svg"');
  appendCSS(getCSSStyles(svgNode), svgNode);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgNode);
}

function getCSSStyles<
  T extends {
    SVGGraphicsElement;
    getElementsByTagName: (arg: string) => T;
    [Symbol.iterator];
    matches;
  }
>(parentElement: SVGGraphicsElement) {
  // Add all the different nodes to check including parent
  const nodesToCheck = [parentElement];
  const childNodes = parentElement.getElementsByTagName('*');
  for (const node of childNodes[Symbol.iterator]) {
    nodesToCheck.push(node);
  }

  // Extract CSS Rules
  const extractedCSSRules = [];
  const iterableStyleSheets = document.styleSheets[Symbol.iterator]();
  for (const stylesheet of iterableStyleSheets) {
    try {
      if (!stylesheet.cssRules) {
        continue;
      }
    } catch (e) {
      if (e.name !== 'SecurityError') {
        throw e;
      } // for Firefox
      continue;
    }

    const cssRules = stylesheet.cssRules as any;
    for (const rule of cssRules) {
      // First add all fonts rules to the extracted rules
      if (rule.cssText.includes('@font-face')) {
        extractedCSSRules.push(rule.cssText);
      }
      // If the node includes the css rule push it to the extracted rules
      const ruleMatches = nodesToCheck.some((r) => r.matches(rule.selectorText));
      if (ruleMatches) {
        extractedCSSRules.push(rule.cssText);
      }
    }
  }
  return extractedCSSRules.join(' ');
}

function appendCSS(cssText: string, element: SVGGraphicsElement) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = cssText;
  const refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore(styleElement, refNode);
}

function svgStrToImage(svgString: string, { width, height }: Dimensions): Promise<any> {
  return new Promise((resolve, reject) => {
    const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

    const image = new Image();
    image.width = width;
    image.height = height;
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob: any) => {
        resolve(blob);
      });
    };

    image.onerror = (err) => {
      reject(err);
    };
    image.src = imgsrc;
  });
}
