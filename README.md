# Boverlay - get started

Pull requests and ideas are much appreciated.

[Demo on codepen](https://codepen.io/pautomagi/pen/eEBXLP)

`yarn add boverlay`

## Add boverlay to your project.

```
<script src="node_modules/boverlay/src/boverlay.min.js"></script>
<script>
    var boverlay = new boverlay();
    boverlay.init();
</script>
```

## Add menus

`data-name=""` refers to the id of div that also contains the class `overlay`

```
<a class="menu-item trigger-overlay" href="#" data-name="overlay-1">Overlay 1</a>

<div class="overlay overlay-hugeinc" id="overlay-1">
    <a class="trigger-overlay overlay__close" data-name="overlay-1">
        Close
    </a>
    <nav id="nav">
        <h1 class="overlay__title">Heading</h1>
        <ul class="row small-up-1">
            <li class="column"><a href="#">1</a></li>
            <li class="column"><a href="#">2</a></li>
            <li class="column"><a href="#">3</a></li>
            <li class="column"><a href="#">4</a></li>
            <li class="column"><a href="#">5</a></li>
            <li class="column"><a href="#">6</a></li>
        </ul>
    </nav>
</div>
```

## Optional: Add the default stylesheet or copy it to your css.
 `<link rel="stylesheet" href="node_modules/boverlay/dist/boverlay.css">`