import $ from "$"

import Template from './index.art'
import { MenuList } from '../../config'
import Sortable from '../../plungs/sortable'
// import DragList from '../../plungs/dragList'

import './index.less'

export default class Menu {
    constructor(el) {
        this.el = el || document.body;
        let html = Template({list: MenuList});
        this.el.innerHTML = html;

        this.init();
    }

    init() {
        let el = $(this.el).find(".menu-list").get(0)
        this.sortable = Sortable.create(el, {
            group: {
                name: "menu",
                pull: "clone"
            },
            sort: false
        }) 
        // this.sortable = new DragList(el, {
        //     sort: false,
        //     dragEl: "li",
        //     onDragStart: function (event){
        //         event.dataTransfer.setData("Text", JSON.stringify({type: "menu", id: event.target.dataset.id}));
        //     },
        //     onDrop: function (event){
        //         console.log(event);
        //         let { type, id } = JSON.parse(event.dataTransfer.getData("Text"));
        //         let target = event.target

        //     }
        // })
    }
}