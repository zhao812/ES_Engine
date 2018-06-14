import ImageEditor from './imageEditor'
import TextEditor from './textEditor'

import './index.less'

export default class Editor {
    constructor(el) {
        this.el = el;
        this.textEditor = new TextEditor(this.el)
        this.imageEditor = new ImageEditor(this.el)

        this.onElementChange = this._onElementChange.bind(this);
        this.render();
        this.addEvent();
    }


    render(target) {
        if(target && target.type === 4) {
            this.textEditor.init(target)
        }else {
            this.imageEditor.init()
        }
    }

    addEvent() {
        window.topEvent.addEventListener("click", this.onElementChange)
    }

    _onElementChange(target) {
        this.render(target)
    }
}