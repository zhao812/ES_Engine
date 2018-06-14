import $ from "$"

import Template from './index.art'
import Stage from '../stage'
import Editor from '../editor'

import './index.less'

export default class MainUI {
    constructor(el) {
        this.el = el || document.body;
        let html = Template()
        this.el.innerHTML = html
        
        let $editorEl = $('.editor-main')
        let $deviceEl = $('.device-main')
        this.stage = new Stage($deviceEl.get(0));
        this.editor = new Editor($editorEl.get(0));
    }

    init(data) {
        this.stage.init(data);
    }
}