class ParaPortElement {
  constructor(element, defaultSpeed = 2) {
    this._element = element;
    this._speed = parseFloat(
      this._element.getAttribute("data-para-speed") || defaultSpeed
    );
  }

  isVisible(position) {
    let box = this._element.getBoundingClientRect();

    if (box.top < position && box.bottom > 0) {
      this._element.classList.add("para-visible");
    } else {
      this._element.classList.remove("para-visible");
    }

    this.offset = box.top * 0.1 * this._speed;
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
    this.defaultSpeed = defaultSpeed;
    let elements = document.querySelectorAll(selector);

    if (elements.length < 1) {
      console.warning("No elements found");
      return;
    }

    this.elements = [];
    for (const element of elements) {
      this.elements.push(new ParaPortElement(element, this.defaultSpeed));
    }

    this.window = this.getWindow();

    document.body.classList.add("para-initalized");

    this.onScroll();

    let scrollTimeout = false;
    let lastScrollPosition, scrollPosition;
    let that = this;
    window.addEventListener("scroll", (event) => {
      scrollPosition = Math.floor(scrollPosition);
      if (scrollTimeout === false && scrollPosition !== lastScrollPosition) {
        window.requestAnimationFrame(function () {
          that.onScroll();

          lastScrollPosition = scrollPosition;
          scrollTimeout = false;
        });
        scrollTimeout = true;
      }
    });
  }
  getWindow() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  onScroll() {
    for (const element of this.elements) {
      element.isVisible(this.window.height);
    }
  }
}
