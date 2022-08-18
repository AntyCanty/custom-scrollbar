import CustomScrollbar, { Utility } from "../src";


const Container = new CustomScrollbar(document.body).init();
const Another = new CustomScrollbar(document.body).init();


Utility.mountItems(10, Container);
Utility.mountItems(10, Another);