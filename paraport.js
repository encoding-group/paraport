class ParaPortElement {
    constructor( element ) {

        this.element = element;
        this.speed = this.getSpeed();

        console.log( this.element.getBoundingClientRect() );

    }
    getSpeed(){
        return this.element.getAttribute('data-para-speed');
    }
    isVisible( position ){

        console.log( this.element.getBoundingClientRect() );

        let top = this.element.getBoundingClientRect().top;
        let bottom = this.element.getBoundingClientRect().bottom;
        let height = this.element.getBoundingClientRect().height;

        if( top < position && bottom > 0 ){
            this.element.classList.add('para-visible');
        } else {
            this.element.classList.remove('para-visible');
        }

        this.offset = top * 0.05 * this.speed;

    }
    set offset( offset ){
        this.element.style.transform = `translateY(${offset}px)`;
        this.element.querySelector('span').innerHTML = `${offset}px`;
    }
}

class Paraport {
    constructor( selector = '.para' ) {

        let elements = document.querySelectorAll( selector );

        if( elements.length < 1 ){
            console.warning('No elements found');
            return;
        }

        this.elements = [];
        for (const element of elements) {
            this.elements.push( new ParaPortElement( element ) );
        }

        this.window = this.getWindow();

        document.body.classList.add('para-initalized');
        console.log( this );

        let that = this;
        that.onScroll();

        let scrollTimeout = false;
        let lastScrollPosition, scrollPosition;
        window.addEventListener('scroll', (event)=>{
            scrollPosition = Math.floor( scrollPosition );
            if( scrollTimeout === false && scrollPosition !== lastScrollPosition ) {
                window.requestAnimationFrame(function() {

                    that.onScroll();

                    lastScrollPosition = scrollPosition;
                    scrollTimeout = false;
                });
                scrollTimeout = true;
            }
        });

    }
    getWindow(){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    onScroll(){
        // this.elements[4].isVisible( this.window.height );
        for (const element of this.elements) {
            element.isVisible( this.window.height );
        }
    }
}
