# Custom ScrollBar 

This is a simple clone of Custom Scrollbar, feel free to contribute.


## general structure of the Custom Scroller
```html
  <div class="box">
      <div id="scroller"></div>
      <div id="scrollerDragger">
        <div id="scroll"></div>
      </div>
  </div>
```



## Basic Usage
```javascript
  new CustomScrollbar(document.body, 'scoller-layout-grid').init();
```
this return a scrollable container, so we can do something like this

```javascript
  const scrollableContainer = new CustomScrollbar(document.body, 'scoller-layout-grid').init();
```

and append stuff to it



# Things Todo: 

removing some bugs, making CDN for the lib, linting and pre-commit processes
