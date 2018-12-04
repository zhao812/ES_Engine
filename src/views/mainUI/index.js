import $ from "$"

import Template from './index.art'
import Stage from '../stage'
import Editor from '../editor'
import Menu from '../menu'

import './index.less'

export default class MainUI {
    constructor(el) {
        this.el = el || document.body;
        let html = Template()
        this.el.innerHTML = html
        
        const $editorEl = $('.editor-main')
        const $deviceEl = $('.device-main')
        const $menuEl = $('.menu-main')
        this.stage = new Stage($deviceEl.get(0));
        this.editor = new Editor($editorEl.get(0));
        this.menu = new Menu($menuEl.get(0));
    }

    init(data) {
        this.stage.init(data);
    }
}