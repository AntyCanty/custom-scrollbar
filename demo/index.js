import CustomScrollbar, { Utility } from "../src";



const Container = new CustomScrollbar(document.body, 'scoller-layout-grid').init();
const Another = new CustomScrollbar(document.body).init();


Utility.mountItems(100, Container);
Another.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed neque dui.
 Integer erat ipsum, aliquet non aliquet at, elementum ut tellus. Nullam lobortis odio ac tincidunt bibendum.
  Cras faucibus pretium augue nec vestibulum. Proin magna velit, consequat eget ligula id, vulputate efficitur arcu.
   Ut vel justo et nibh viverra malesuada. Donec malesuada pellentesque tortor, eu lobortis nibh iaculis a.
    Proin consequat ac ipsum nec laoreet.
     Nam ac sem eget lorem hendrerit dignissim ac vel diam. Aenean vehicula augue lacus, luctus iaculis augue posuere quis.
      Aenean est diam, feugiat at tincidunt et, fringilla et orci.
 In ut interdum justo, hendrerit sagittis mi. In porttitor lectus a mauris condimentum ullamcorper. Curabitur hendrerit quis mauris vel maximus.`;