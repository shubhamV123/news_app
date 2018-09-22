class CommanFunction{
    constructor(stringVal){
        this.stringVal = stringVal
    }

    truncBody(){
        if(this.stringVal.length>95){
            return this.stringVal.substr(0,95)+'...'
        }
        return this.stringVal;
    }
}

module.exports = {
    CommanFunction
}