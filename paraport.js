class ParaportElement {
  constructor(element, defaultSpeed = 2) {
    this._element = element;

    this._speed =
      parseFloat(
        this._element.getAttribute("data-para-speed") || defaultSpeed
      ) * 0.05;

    this._centerPoint =
      (window.innerHeight - this._element.getBoundingClientRect().height) * 0.5;

    this._visible = undefined;
    this._lastVisible = undefined;
  }

  isVisible() {
    let box = this._element.getBoundingClientRect();

    this.offset = -(this._centerPoint - box.top) * this._speed;

    this._visible = box.y < window.innerHeight && box.bottom > 0;

    if (this._visible === this._lastVisible) return;

    if (this._visible === true) {
      this._element.classList.add("para-visible");
    } else {
      this._element.classList.remove("para-visible");
    }
    this._lastVisible = this._visible;
  }

  onResize() {
    this._centerPoint =
      (window.innerHeight - this._element.getBoundingClientRect().height) * 0.5;
  }

  get speed() {
    return this._speed;
  }

  set offset(offset) {
    this._element.style.transform = `translateY(${offset}px)`;
  }
}

class Paraport {
  constructor(selector = ".para", defaultSpeed = 2) {
    let elements = document.querySelectorAll(selector);

    if (elements.length < 1) {
      console.warn(`No elements found matching ${selector}`);
      return;
    }

    this._elements = [];
    for (const element of elements) {
      this._elements.push(new ParaportElement(element, defaultSpeed));
    }

    document.body.classList.add("para-initalized");

    this.onScroll();

    let context = this;

    window.addEventListener(
      "scroll",
      () => {
        window.requestAnimationFrame(() => {
          context.onScroll();
        });
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        window.requestAnimationFrame(() => {
          context.onResize();
        });
      },
      { passive: true }
    );
  }

  onScroll() {
    for (let i = this._elements.length - 1; i >= 0; i--) {
      this._elements[i].isVisible();
    }
  }

  onResize() {
    for (let i = this._elements.length - 1; i >= 0; i--) {
      this._elements[i].onResize();
    }
  }
}
