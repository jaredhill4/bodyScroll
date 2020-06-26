/**
 * Inspired by the body-scroll-toggle npm package
 * https://www.npmjs.com/package/body-scroll-toggle
 */

const scrollContainer = document.scrollingElement || document.documentElement;
let scrollTop = null;
let originalDocumentStyles = null;
let originalBodyStyles = null;

const disable = () => {
  const bodyHeight = getBodyHeight;

  scrollTop = scrollContainer.scrollTop;
  originalDocumentStyles = scrollContainer.style.cssText;
  originalBodyStyles = document.body.style.cssText;

  scrollContainer.style.cssText = `
    ${originalDocumentStyles};
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100%;
  `;

  document.body.style.cssText = `
    ${originalBodyStyles};
    position: fixed;
    width: 100%;
    height: ${bodyHeight}px;
    overflow: hidden;
    top: -${scrollTop}px;
  `;
};

const enable = () => {
  scrollContainer.style.cssText = originalDocumentStyles;
  document.body.style.cssText = originalBodyStyles;
  scrollContainer.scrollTop = scrollTop;
};

const toggle = () => (scrollTop ? disable() : enable());

function getBodyHeight() {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return height;
}

export default {
  disable,
  enable,
  toggle
};
