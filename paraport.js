class ParaportElement {
  constructor(element, defaultSpeed = 2) {
    this._element = element;

    this._speed = parseFloat(
      this._element.getAttribute("data-para-speed") || defaultSpeed
    );

    this._visible = undefined;
    this._lastVisible = undefined;
  }

  isVisible(scrollPosition) {
    let box = this._element.getBoundingClientRect();

    this.offset = box.top * 0.1 * this._speed;

    if (box.top < scrollPosition && box.bottom > 0) {
      this._visible = true;
    } else {
      this._visible = false;
    }

    if (this._visible === this._lastVisible) return;

    if (this._visible === true) {
      this._element.classList.add("para-visible");
    } else {
      this._element.classList.remove("para-visible");
    }
    this._lastVisible = this._visible;
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
      console.warning("No elements found");
      return;
    }

    this._elements = [];
    for (const element of elements) {
      this._elements.push(new ParaportElement(element, defaultSpeed));
    }

    document.body.classList.add("para-initalized");

    this.onScroll();

    let context = this;

    window.addEventListener("scroll", (event) => {
      window.requestAnimationFrame(function () {
        context.onScroll();
      });
    });
  }

  onScroll() {
    for (let i = this._elements.length - 1; i >= 0; i--) {
      this._elements[i].isVisible(window.scrollY);
    }
  }
}
