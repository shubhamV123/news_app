//Guardian news secret api key
const secret_key = '494c4b7f-dbbf-49da-b9e1-802d88379c1c';
export default class URL{
    constructor(page){
        this.page = page
    }
    fetchAllPostURL(){
        return `https://content.guardianapis.com/search?api-key=${secret_key}&show-fields=thumbnail,bodyText&page=${this.page}`
    }
    fetchSpecificPostURL(){
        return `https://content.guardianapis.com/${this.id}?api-key=${secret_key}&show-fields=thumbnail,headline,byline,bodyText`
    }
    
}
