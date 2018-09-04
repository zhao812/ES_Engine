// import '../../../plungs/spectrum/spectrum-min'
// import '../../../plungs/spectrum/spectrum.css'
import Template from './index.art'
import './index.less'

import $ from '$';


export default class TextEditor {
    constructor(el) {
        this.el = el;
        this.target;

        this.nameInputHandler = this._nameInputHandler.bind(this)
        this.textInputHandler = this._textInputHandler.bind(this)
        this.widthInputHandler = this._widthInputHandler.bind(this)
        this.heightInputHandler = this._heightInputHandler.bind(this)
        this.textAlignHandler = this._textAlignHandler.bind(this)
        this.fontSizeHandler = this._fontSizeHandler.bind(this)
        this.colorHandler = this._colorHandler.bind(this)
    }

    render(d = {}) {
        let data = this.target.toObject()
        console.log(data);
        let html = Template(data)
        this.el.innerHTML = html;

        this.removeEvent();
        this.addEvent();

        // $(".colorPicker").spectrum({
        //     showInput: true,
        //     preferredFormat: "hex",
        //     color: data.color,
        //     change: this.colorHandler
        // });
    }

    init(target) {
        this.target = target;
        this.render()
    }

    addEvent() {
        $(".nameInput").on("change", this.nameInputHandler)
        $(".textInput").on("change", this.textInputHandler)
        $(".widthInput").on("change", this.widthInputHandler)
        $(".heightInput").on("change", this.heightInputHandler)
        $(".bnTextAlign").on("click", this.textAlignHandler)
        $(".fontSizeSelect").on("change", this.fontSizeHandler)
    }

    removeEvent() {
        $(".nameInput").off("change", this.nameInputHandler)
        $(".textInput").off("change", this.textInputHandler)
        $(".widthInput").off("change", this.widthInputHandler)
        $(".heightInput").off("change", this.heightInputHandler)
        $(".bnTextAlign").off("click", this.textAlignHandler)
        $(".fontSizeSelect").off("change", this.fontSizeHandler)
    }

    _nameInputHandler(event) {
        let val = event.target.value
        this.target.setName(val);
    }

    _textInputHandler(event) {
        let val = event.target.value
        this.target.setText(val)
    }

    _widthInputHandler(event) {
        let val = event.target.value
        this.target.width = val;
    }

    _heightInputHandler(event) {
        let val = event.target.value
        this.target.height = val;
    }

    _textAlignHandler(event) {
        let type = event.target.dataset.type
        this.target.setTextAlign(type)
        $(event.target).addClass('actived').siblings().removeClass('actived');
    }

    _fontSizeHandler(event) {
        let val = event.target.value;
        this.target.setFontSize(val)
    }

    _colorHandler(value) {
        let val = $(".colorPicker").val();
        this.target.setColor(val)
    }
}