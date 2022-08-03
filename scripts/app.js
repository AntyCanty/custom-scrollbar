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
    constructor(container) {
        
        const box = document.createElement('div');
        box.classList.add('box');


        if(!container)  throw new Error("Pass the container of the scrollableArea");

        this.scroll = document.createElement('div');
        this.scroll.classList.add('scroll');
        this.scroller = document.createElement('div');
        this.scroller.classList.add('scroller');
        this.scrollDragger = document.createElement('div');
        this.scrollDragger.classList.add('scrollDragger');
        this.scrollDragger.appendChild(this.scroll);


        box.appendChild(this.scroller);
        box.appendChild(this.scrollDragger);


        container.appendChild(box);

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

        
        this.scroll.addEventListener("mousedown", (e) => {
            this.attach = true;
        });

        this.scroll.addEventListener("mouseup", (e) => {
            this.attach = false;
        });
        
                
        this.scrollerDragger.addEventListener("mouseup", (e) => {
            this.attach = false;
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
new CustomScrollbar(document.body).init();
