import './static/reset.less'
import './index.less'

import MainUI from './views/mainUI'

class esEngine {
    constructor(elementId){
        this.el = document.getElementById(elementId);
        console.log(this.el);
        this.main = new MainUI(this.el);
    }

    init(data) {
        this.main.init(data)
    }

    set backgroundColor (value) {
        this.stage.backgroundColor = value
    }

    get backgroundColor () {
        return this.stage.backgroundColor
    }
}

window.esEngine = esEngine
export default esEngine