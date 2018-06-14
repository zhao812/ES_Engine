import ES_Base from "../base";

export default class ES_Image extends ES_Base {
    constructor(data) {
        super(data)
        this.type = 3
    }

    init() {
        super.init();
        this.dom = document.createElement("img");
        this.setImage(this.value)
        this.el.appendChild(this.dom);
    }

    setImage(value) {
        this.dom.src = value
        this.value = value
    }

    getImage() {
        return this.value
    }
}