export const hasClass = (elements, cName) => { 
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); 
} 

export const addClass = (elements, cName) => { 
    if(!hasClass(elements, cName)){ 
        elements.className += " " + cName; 
    }
}

export const removeClass = (elements, cName) => { 
    if(hasClass(elements, cName)){
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
    }
}