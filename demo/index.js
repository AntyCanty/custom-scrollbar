import CustomScrollbar, { Utility } from "../src";


const Container = new CustomScrollbar(document.body).init();


Utility.mountItems(2, Container);
