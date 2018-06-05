import Parse from "./parse";

class Engine {
    constructor(el){
        this.$el = el;
    }

    init(data) {
        this.parse = new Parse(data)
        console.log(this.parse.getElements())
    }
}

window.Engine = Engine