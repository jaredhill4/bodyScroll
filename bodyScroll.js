/**
 * Inspired by the body-scroll-toggle npm package
 * https://www.npmjs.com/package/body-scroll-toggle
 */
import { getBodyHeight } from './';

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

export default {
  disable,
  enable,
  toggle
};
