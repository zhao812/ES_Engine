import '../../event/ElementEvent'
import * as utils from '../../utils'
import { SCALE } from '../../config'

export default class ES_Base {
    constructor(data) {
        this.data = data;
        this.dom = null;
        this.el = null;
        this.selectEl = null;
        this.type = "";
        this.value_type = "";
        this.init()
    }

    get selected() {
        return this._selected
    }

    set selected(val) {
        if(val){
            this.selectEl.setAttribute("style", "display: block")
        } else {
            this.selectEl.setAttribute("style", "display: none")
        }
        
        this._selected = val
    }

    get position() {
        return { 
            x: this.el.offsetLeft,
            y: this.el.offsetTop
        }
    }

    set position(p) {
        this.el.style.left = p.x + "px"
        this.el.style.top = p.y + "px"
    }

    get width() {
        return this.el.offsetWidth
    }

    set width(val) {
        this.el.style.width = val + "px"
    }

    get height() {
        return this.el.offsetHeight
    }

    set height(val) {
        this.el.style.height = val + "px"
    }

    getName() {
        return this.name
    }

    setName(val) {
        this.name = val
    }

    init() {
        this.el = document.createElement('div')
        this.el.className = "element"
        this.selectEl = document.createElement("div")
        this.selectEl.className = "selected"
        this.selectEl.setAttribute("style", "display: none")
        this.el.appendChild(this.selectEl)

        this.name = this.data.name
        this.style = this.data.style
        this.value = this.data.value
        this.valueType = this.data.value_type
        this.child = this.data.child
        this.el.setAttribute("style", this.style);

        this.onClickHandler = this._onClickHandler.bind(this)
        this.onMouseDownHandler = this._onMouseDownHandler.bind(this);
        this.onMouseUpHandler = this._onMouseUpHandler.bind(this);
        this.onMouseMoveHandler = this._onMouseMoveHandler.bind(this);
        this.addEvent();
    }

    addEvent() {
        this.el.addEventListener("mousedown", this.onMouseDownHandler)
        this.el.addEventListener("mouseup", this.onMouseUpHandler)
        this.el.addEventListener("click", this.onClickHandler)
    }

    _onClickHandler(event) {
        window.topEvent.dispatch("click", this)
    }

    _onMouseDownHandler(event) {
        if(!this.selected) return
        //获取边界到鼠标的距离  
        this.startPoint = {x: event.clientX, y: event.clientY};
        document.body.addEventListener("mousemove", this.onMouseMoveHandler)
    }

    _onMouseUpHandler(event) {
        document.body.removeEventListener("mousemove", this.onMouseMoveHandler)
    }

    _onMouseMoveHandler(event) {
        let p = this.position
        let left = p.x + (event.clientX - this.startPoint.x) / SCALE;
        let top = p.y + (event.clientY - this.startPoint.y) / SCALE;
        this.position = {x: left, y: top}

        //获取边界到鼠标的距离  
        this.startPoint = {x: event.clientX , y: event.clientY};
    }

    getElement() {
        return this.el
    }

    toObject() {
        let p = this.position;
        return {
            name: this.getName(),
            left: p.x,
            top: p.y,
            width: this.width,
            height: this.height
        }
    }

    toJson() {
        return {
            type: this.type,
            value: this.value_type,
            style: this.el.style,
        }
    }
}