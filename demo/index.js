import CustomScrollbar, { Utility } from "../scripts/app.js";


const Container = new CustomScrollbar(document.body).init();

Utility.mountItems(100, Container);