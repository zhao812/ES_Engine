export default class ES_Base {
    constructor(data) {
        this.init(data)
    }

    init(data) {
        console.log("base init")
        this.style = data.style
        this.value = data.val,
        this.valueType = data.val_type
        this.child = data.child
    }
}