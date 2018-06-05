import ES_Header from "../components/header";
import ES_Footer from "../components/footer";
import ES_Image from "../components/image";
import ES_Text from "../components/text";

export default class Parse {
    constructor(data) {
        this.data = data
    }

    getElements() {
        return this.convertToElement(this.data)
    }

    convertToElement(list) {
        return list.map(obj => {
            if(obj.child && obj.child.length) {
                obj.child = this.convertToElement(obj.child)
            }
            return this.getElement(obj);
        })
    }

    getElement(obj) {
        switch (obj.type + "") {
            case "1":
                return new ES_Header(obj)
            case "2":
                return new ES_Footer(obj)
            case "3":
                return new ES_Image(obj)
            case "4":
                return new ES_Text(obj)
        }

        return null
    }
}