import CustomScrollbar, { Utility } from "../src";



const Container = new CustomScrollbar(document.body, 'scoller-layout-grid').init();
const Another = new CustomScrollbar(document.body, 'scoller-layout-grid').init();


Utility.mountItems(10, Container);
Utility.mountItems(200, Another);