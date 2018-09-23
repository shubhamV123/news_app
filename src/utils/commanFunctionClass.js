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
    filterCard(arr,keyWord){
         keyWord = keyWord!==null?keyWord.toLowerCase():null;
        let newArray = arr.filter(data => {
            if(data.sectionId.search(keyWord)>=0 || data.fields.bodyText.substr(0,95).search(keyWord)>=0 || data.webTitle.search(keyWord) >= 0){
                return true;
            }
        })
        return newArray;
    }
}

module.exports = {
    CommanFunction
}