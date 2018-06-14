import Template from './index.art'

export default class ImageEditor {
    constructor(el) {
        this.el = el
    }

    render(data) {
        let html = Template({})
        this.el.innerHTML = html
    }

    init(data) {
        this.render(data);
    }
}