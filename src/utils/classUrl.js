//Guardian news secret api key
const secret_key = '494c4b7f-dbbf-49da-b9e1-802d88379c1c';
export default class URL{
    constructor(page){
        this.page = page
    }
    //Fetching list of page according to page cound
    fetchAllPostURL(){
        return `https://content.guardianapis.com/search?api-key=${secret_key}&show-fields=thumbnail,headline,byline,bodyText&page=${this.page}`
    }
    
    
}
