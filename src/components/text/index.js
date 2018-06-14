import ES_Base from "../base";

export default class ES_Text extends ES_Base {
    constructor(data) {
        super(data)
        this.type = 4
    }

    init() {
        super.init();
        this.dom = document.createElement("p")
        this.el.appendChild(this.dom)
        this.setText(this.value)
    }

    setText(value) {
        this.dom.innerHTML = value;
        this.value = value
    }

    getText() {
        return this.value
    }

    getTextAlign() {
        return this.el.style.textAlign
    }

    setTextAlign(val) {
        this.el.style.textAlign = val
    }

    getFontFamily() {
        return this.el.style.fontFamily
    }

    setFontFamily(val) {
        this.el.style.fontFamily = val
    }

    getFontSize() {
        return this.el.style.fontSize
    }

    setFontSize(val) {
        this.el.style.fontSize = val + "px"
    }

    toObject() {
        return Object.assign(super.toObject(), {
            value: this.getText(),
            textAlign: this.getTextAlign(),
            fontFamily: this.getFontFamily(),
            fontSize: this.getFontSize()
        })
    }

}