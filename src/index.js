import './static/reset.less'
import './index.less'

import Stage from './views/stage'

class esEngine {
    constructor(elementId){
        this.el = document.getElementById(elementId);
        console.log(this.el);
    }

    init(data) {
        this.stage = new Stage(this.el);
        this.stage.init(data)
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