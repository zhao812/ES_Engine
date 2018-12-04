import Parse from "../../parse"
import { SCALE } from '../../config'
import Sortable from '../../plungs/sortable'
import DragList from '../../plungs/dragList'

export default class Stage {
    constructor(dom){
        this.dom = dom;
        this.el = document.createElement("section");
        this.el.className = 'device-app';
        this.el.style.transform = "scale("+SCALE+")"
        this.el.style['-webkit-transform'] = "scale("+SCALE+")";
        this.dom.appendChild(this.el)
        
        this.bgColor = "#000"

        this.onSelectedHandler = this._onSelectedHandler.bind(this);
        
        this.stageSortable = Sortable.create(this.el, {
            group: {
                name: "stage",
                put: "menu"
            },
        }) 

        // this.stageSortable = new DragList(this.el, {
        //     dragEl: "div",
        //     onDrop: function (event){
        //         var { type, id } = JSON.parse(event.dataTransfer.getData("Text"));
        //         if(id === 0 && type === "menu") {

        //         }
        //     }
        // })

    }

    set backgroundColor(val) {
        this.bgColor = val
        this.el.style.backgroundColor = val;
    }

    get backgroundColor() {
        return this.bgColor
    }

    init(data) {
        this.parse = new Parse(data)
        let elements = this.parse.getElements();
        // elements.map(element => {
        //     this.el.appendChild(element.getElement())
        // })

        
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