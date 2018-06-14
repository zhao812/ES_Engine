import Parse from "../../parse"
import { SCALE } from '../../config'

export default class Stage {
    constructor(el){
        this.el = el;
        this.dom = document.createElement("div");
        this.dom.className = 'device-app';
        this.dom.style.transform = "scale("+SCALE+")"
        this.dom.style['-webkit-transform'] = "scale("+SCALE+")";
        this.el.appendChild(this.dom)
        
    }

    init(data) {
        this.parse = new Parse(data)
        let elements = this.parse.getElements();
        elements.map(element => {
            this.dom.appendChild(element.getElement())
        })

        this.onSelectedHandler = this._onSelectedHandler.bind(this);
        this.addEvent();
    }

    addEvent() {
        window.topEvent.addEventListener("click", this.onSelectedHandler)
    }

    _onSelectedHandler(target) {
        if(this.currentTarget === target) return;

        if(this.currentTarget) {
            this.currentTarget.selected = false
        }
        this.currentTarget = target
        this.currentTarget.selected =  true
    }
}