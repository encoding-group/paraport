# paraport

Minimalist and butter smooth parallax scrolling effect relative to the browsers viewport.

[Live Demo](https://encoding-group.github.io/paraport/)

## Usage

```js
Paraport( /* string */ selector = '.para', /* float */ defaultSpeed = 2);
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
  const paraport = new Paraport('.lala');
</script>
```

Custom base speed
```html
<script>
  const paraport = new Paraport('.para',4);
</script>
```

Custom speed for single elements (`float`, default is `2`)
```html
<div class="para" data-para-speed="4"></div>
```

## Events
All `.para` elements visible within the viewport will be added the class `.para-visible`.

## Development
Compile SCSS for demo page
```
sass --watch styles.scss:styles.css
```

## Contributing
We are happy for all issues opened, pull requests sent, ideas shared.

## Licence
This software is open source, use it for free. We appreciate if you give credit or share your results.
