

// doc this a bit better please
const scroller = document.querySelector("#scroller");
const scrollerDragger = document.querySelector("#scrollerDragger");
const scroll = document.querySelector("#scroll");


class Utility {
    static mountItems(n, scroller) {
        let item = null;
        // generating content for scroll container
        for (let i = 0; i < n; i++) {
            item = document.createElement("div");
            item.classList.add("item");
            item.style.backgroundColor = colors[random(0, colors.length)];
            item.textContent = "hello world";
            scroller.appendChild(item);
        }
    }

    
}




// some utility colors :)
const colors = [
    "#f4a261",
    "#bde0fe",
    "#e5989b",
    "#cad2c5",
    "#2ec4b6",
    "#99d98c",
    "#6c757d",
    "#1985a1",
    "#fe5f55",
    "#61a5c2",
    "#ee4266",
];
let attach = false;
let counter = 0;

// listen to the scrollable container
scroller.addEventListener("scroll", (e) => {
    const percentage = calcPercentage(e, scrollerDragger, scroll);
    if (!attach) {
    scroll.style.top = percentage + "%";
    }
});


Utility.mountItems(20, scroller);


handleScrollerHeight(scroller, scroll);

// event listeners
scrollerDragger.addEventListener("click", (e) => {
    // TODO: move the bar to the point clicked;
    console.log(e);
});


scrollerDragger.addEventListener("mousemove", (e) => {
    if (check(e, scrollerDragger, scroll)) {
    return;
    }

    if (attach) {
    const max =
        (scrollerDragger.clientHeight - scroll.clientHeight) /
        scrollerDragger.clientHeight;
    const percentage =
        (100 * (e.clientY - scrollerDragger.offsetTop)) /
        scrollerDragger.clientHeight;
    const goTo = (percentage / 100) * scroller.scrollHeight;
    scroller.scrollTo({ top: goTo, behavior: "auto" });
    scroll.style.top =
        e.clientY -
        scrollerDragger.offsetTop -
        scroll.clientHeight / 2 +
        "px";
    }
});


scroll.addEventListener("mousedown", (e) => {
    attach = true;
});


scroll.addEventListener("mouseup", (e) => {
    attach = false;
});

scrollerDragger.addEventListener("mouseup", (e) => {
    attach = false;
});

// utility
function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}


// implementations
function check(e, scrollContainer, scroll) {
    return (
    e.clientY - scrollContainer.offsetTop + scroll.clientHeight / 2 >
        scrollContainer.clientHeight ||
    e.clientY - scrollContainer.offsetTop - scroll.clientHeight / 2 < 0
    );
}
function calcPercentage(e, scroller, scroll) {
    // calculate factor
    handleScrollerHeight(e.target, scroll);
    const maxPerc =
    (scroller.clientHeight - scroll.clientHeight) /
    scroller.clientHeight;

    const percentage =
    (e.target.scrollTop /
        (e.target.scrollHeight - e.target.clientHeight)) *
    100;
    if (percentage > 70) {
    if (counter < 3) {
        console.log("fetch new data");
        // mountItems(4);
        counter++;
    }
    }
    return percentage * maxPerc;
}
function handleScrollerHeight(scrolledContainer, scroll) {
    const factor = scroller.clientHeight / scroller.scrollHeight;
    const minHeight = scroller.clientHeight;
    const currentScrollerHeight = minHeight * factor;
    scroll.style.height = currentScrollerHeight + "px";
}