# Paraport.js

Minimalist and butter smooth parallax scrolling effect relative to the browsers viewport.

[Live Demo](https://encoding-group.github.io/paraport/)

## Usage

```js
Paraport( options = {
  selector: ".para",
  defaultSpeed: 2.0,
  visibleClass: "para-visible",
  multiply: 1.0
} );
```

Basic usage
```html
<div class="para"></div>
<script src="paraport.js"></script>
<script>
  const paraport = new Paraport();
</script>
```

Custom selector
```html
<div class="lala"></div>
<script>
  const paraport = new Paraport({
    selector: '.lala'
  });
</script>
```

Custom speed for single elements
```html
<div class="para" data-para-speed="4"></div>
```

Custom base speed as default for all elements that have no individual specification
```js
const paraport = new Paraport({
  defaultSpeed: 3.0
});
```

Multiply all individual speeds to speed up or slown down the whole effect at once
```html
<div class="lala" data-para-speed="2"></div>
<div class="lala" data-para-speed="3"></div>
<script>
  const paraport = new Paraport({
    multiply: 2
  });
</script>
```

## Events
All `.para` elements visible within the viewport will be added the class `.para-visible`.

Custom class
```js
const paraport = new Paraport({
  visibleClass: 'very-very-visible'
});
```

## Development
Compile SCSS for demo page
```
sass --watch assets/demo.scss:assets/demo.css
```

## Contributing
We are happy for all issues opened, pull requests sent, ideas shared.

## Licence
This software is open source, use and fork it for free. We appreciate if you give credit or share your results.
