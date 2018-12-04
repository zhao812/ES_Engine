/**!
 * DragList
 * @author	zhao
 * @license MIT
 */
import $ from '$'

class DragList {
    
    constructor(el, options) {
        this.el = el; // root element
        
        let defaultOptions = {
            sort: true,
            dragEl: "li"
        }
        this.options = Object.assign(defaultOptions, options)
        this.supportDraggable = ('draggable' in document.createElement('div')),

        this.init();
    }

    init() {
        console.log($(this.el).find(this.options.dragEl));
        $(this.el).find(this.options.dragEl).attr("draggable", true);
        this.addEvent();
    }

    addEvent() {
        if(this.supportDraggable) {
            this._on(this.el, 'dragover', this._onDragOver.bind(this));
            this._on(this.el, 'drop', this._onDrop.bind(this));

            $(this.el).find(this.options.dragEl).on('dragstart', this._onDragStart.bind(this));
        }
    }

    _onDragStart(event) {
        console.log(event);
        this.options.onDragStart && this.options.onDragStart(event);
    }

    _onDragOver(event){
        event.preventDefault();
    }

    _onDrop(event) {
        this.options.onDrop && this.options.onDrop(event);
    }

    _on(el, event, fn) {
		el.addEventListener(event, fn);
	}


	_off(el, event, fn) {
		el.removeEventListener(event, fn);
    }
}

export default DragList;