
import "./assets/styles/index.css";


/*
    TODO: Check if the container is scrollable 
    TODO: Solve the resive of scrollbar when something new is inserted 
*/


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
            item.textContent = i + 1;
            scroller.appendChild(item);
        }
    }

    static random(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
}

class CustomScrollbar {
    box = null;
    scroll = null;
    scrollDragger = null;
    scroller = null;



    constructor(container) {

        const box = document.createElement('div');
        box.classList.add('box');


        if(!container)  throw new Error("Pass the container of the scrollableArea");


        this.scroll = document.createElement('div');
        this.scroll.classList.add('scroll');


        this.scroller = document.createElement('div');
        this.scroller.classList.add('scroller');


        this.scrollerDragger = document.createElement('div');
        this.scrollerDragger.classList.add('scrollerDragger');
        this.scrollerDragger.appendChild(this.scroll);


        box.appendChild(this.scroller);
        box.appendChild(this.scrollerDragger);


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

        return percentage * maxPerc;
    }

    init() {
        this.scroller.addEventListener('scroll', (e) =>  {
            const percentage = this.calcPercentage(e);
            if (!this.attach) this.scroll.style.top = percentage + "%";
        });

        this.scrollerDragger.addEventListener("mousemove", (e) => {
            // FIXME: the check made below may be useless, remove it or find another solution
            
            // if (this.check(e)) {
            //     return;
            // }
        
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

        // return the reference to the scrollableContaier
        return this.scroller;
    }


    check(e) {
        return (
            e.clientY - this.scrollerDragger.offsetTop + this.scroll.clientHeight / 2 >
                this.scrollerDragger.clientHeight ||
            e.clientY - this.scrollerDragger.offsetTop - this.scroll.clientHeight / 2 < 0
        );
    }
}

export default CustomScrollbar;
export { Utility };