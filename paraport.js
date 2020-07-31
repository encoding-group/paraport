/*
 * paraport.js
 *
 * ©2020 encoding.group
 * https://github.com/encoding-group/paraport
 *
 * v0.1 last modified 2020-07-31
 */

class ParaportElement {
  constructor(element, options) {
    this._options = options;
    this._element = element;

    this._speed =
      parseFloat(this._element.dataset.paraSpeed || options.defaultSpeed) *
      0.05 *
      options.multiply;

    this._centerPoint = this.calculateCenterPoint();

    this._lastVisible = undefined;

    this.update();
  }

  update() {
    this.applyOffset();
    this.updateVisibility();
  }

  applyOffset() {
    const offset =
      -(this._centerPoint - this._element.getBoundingClientRect().top) *
      this._speed;
    this._element.style.transform = `translateY(${offset}px)`;
  }

  updateVisibility() {
    const box = this._element.getBoundingClientRect();

    let isVisible = box.y < window.innerHeight && box.bottom > 0;

    if (isVisible === this._lastVisible) return;

    if (isVisible) {
      this._element.classList.add(this._options.visibleClass);
    } else {
      this._element.classList.remove(this._options.visibleClass);
    }

    this._lastVisible = isVisible;
  }

  recenter() {
    this._centerPoint = this.calculateCenterPoint();
  }

  calculateCenterPoint() {
    return (window.innerHeight - this._element.offsetHeight) * 0.5;
  }
}

class Paraport {
  constructor(options = {}) {
    this._options = Object.assign(
      {
        selector: ".para",
        defaultSpeed: 2,
        visibleClass: "para-visible",
        multiply: 1,
      },
      options
    );

    let elements = [...document.querySelectorAll(this._options.selector)];

    if (elements.length < 1) {
      console.warn(`No elements found matching ${this._options.selector}`);
      return;
    }

    this._elements = elements.map(
      (element) =>
        new ParaportElement(element, {
          defaultSpeed: this._options.defaultSpeed,
          visibleClass: this._options.visibleClass,
          multiply: this._options.multiply,
        })
    );

    document.body.classList.add("para-initalized");

    setTimeout(() => {
      this.updateElements();
    }, 1);

    window.addEventListener(
      "scroll",
      () => {
        window.requestAnimationFrame(() => {
          this.updateElements();
        });
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        window.requestAnimationFrame(() => {
          this.recenterElements();
        });
      },
      { passive: true }
    );
  }

  updateElements() {
    let i = this._elements.length;
    while (i--) {
      this._elements[i].update();
    }
  }

  recenterElements() {
    let i = this._elements.length;
    while (i--) {
      this._elements[i].recenter();
    }
  }
}
