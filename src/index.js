import './static/reset.less'
import './index.less'

import MainUI from './views/mainUI'
import Stage from './views/stage'

class Engine {
    constructor(elementId){
        this.scale = 0.6
        this.el = document.getElementById(elementId)
    }

    init(data) {
        this.mainUI = new MainUI(this.el);
        this.mainUI.init(data)
    }
}

var engine = new Engine("#app");
let data = [
    {
        type: 1,
        value: "1111",
        value_type: 1,
        style: "left: 100px; right: 20px; width: 100px"
    },
    {
        type: 2,
        value: "2222",
        value_type: 1,
        style: 'width: 100px;'
    },
    {
        type: 3,
        value: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58",
        value_type: 1,
        style: 'width: 100px; height: 100px; left: 10px; top: 10px'
    },
    {
        name: "文本框",
        type: 4,
        value: "4444",
        value_type: 1,
        style: "left: 200px; top: 90px; width: 400px; height: 50px; font-size: 42px; color: #ff0000; text-align: center;"
    }
]
engine.init(data);