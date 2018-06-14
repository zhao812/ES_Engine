class ElementEvent {
    constructor(){
        this.handlers = {}
    }

    addEventListener(type, handler) {
        if(typeof this.handlers[type] === "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }

    dispatch(type, data) {
        if(this.handlers[type] instanceof Array){
            const handlers = this.handlers[type];
            handlers.forEach((handler)=>{
                handler(data);
            })
        }
    }

    removeEventListener(type, handler) {
        if(this.handlers[type] instanceof Array){
            const handlers = this.handlers[type];
            for(var i = 0,len = handlers.length; i < len; i++){
                if(handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i,1);
        }
    }
}


export default window.topEvent = new ElementEvent();