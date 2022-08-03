// DOC THIS
const scroller = document.querySelector("#scroller"); // the scrollable container
const scrollerDragger = document.querySelector("#scrollerDragger"); // the custom scrollbar container
const scroll = document.querySelector("#scroll"); // the scrollbar which is inside the custom scrollbar Container

let counter = 0;



// FIXME: utility function This is not for prod
class Utility {
    static colors = [
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

    static mountItems(n, scroller) {
        let item = null;
        // generating content for scroll container
        for (let i = 0; i < n; i++) {
            item = document.createElement("div");
            item.classList.add("item");
            item.style.backgroundColor = this.colors[Utility.random(0, this.colors.length)];
            item.textContent = "hello world";
            scroller.appendChild(item);
        }
    }

    static random(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
}

class CustomScrollbar {
    constructor() {
        this.scroller = document.querySelector("#scroller");
        this.scrollerDragger = document.querySelector("#scrollerDragger");
        this.scroll = document.querySelector("#scroll");
        this.attach = false;
    }

    handleScrollerHeight() {
        const factor = this.scroller.clientHeight / this.scroller.scrollHeight;
        const minHeight = this.scroller.clientHeight;
        const currentScrollerHeight = minHeight * factor;
        this.scroll.style.height = currentScrollerHeight + "px";
    }

    calcPercentage(e) {
        this.handleScrollerHeight(e.target, this.scroll);
        const maxPerc =
        (this.scroller.clientHeight - this.scroll.clientHeight) /
        this.scroller.clientHeight;
    
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

    init() {
        Utility.mountItems(20, this.scroller);


        this.scroller.addEventListener('scroll', (e) =>  {
            const percentage = this.calcPercentage(e);
            if (!this.attach) this.scroll.style.top = percentage + "%";
        });

        this.scrollerDragger.addEventListener("mousemove", (e) => {
            if (this.check(e)) {
                return;
            }
        
            if (this.attach) {
            const max =
                (this.scrollerDragger.clientHeight - this.scroll.clientHeight) /
                this.scrollerDragger.clientHeight;
            const percentage =
                (100 * (e.clientY - this.scrollerDragger.offsetTop)) /
                this.scrollerDragger.clientHeight;
            const goTo = (percentage / 100) * this.scroller.scrollHeight;
            this.scroller.scrollTo({ top: goTo, behavior: "auto" });
            this.scroll.style.top =
                e.clientY -
                scrollerDragger.offsetTop -
                scroll.clientHeight / 2 +
                "px";
            }
        });

    }

    check(e) {
        return (
            e.clientY - this.scrollerDragger.offsetTop + this.scroll.clientHeight / 2 >
                this.scrollerDragger.clientHeight ||
            e.clientY - this.scrollerDragger.offsetTop - this.scroll.clientHeight / 2 < 0
        );
    }
}





// happens all here 
new CustomScrollbar().init();





scroll.addEventListener("mousedown", (e) => {
    attach = true;
});


scroll.addEventListener("mouseup", (e) => {
    attach = false;
});

scrollerDragger.addEventListener("mouseup", (e) => {
    attach = false;
});
