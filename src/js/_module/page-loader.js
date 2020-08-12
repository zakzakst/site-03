import { gsap } from "gsap";

export function pageLoader() {
  window.onload = () => {
    const el = document.getElementById('js-page-loader');
    gsap.to(el, {
      duration: .5,
      opacity: 0,
      onComplete: () => {
        el.parentNode.removeChild(el);
      }
    });
  }
}
