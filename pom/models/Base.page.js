class BasePage{
    constructor(page){
        this.page =page;

    }
    async navigation (path){
        await this.page.goto('https://demo.applitools.com/',path);
        

    }
}
module.exports=BasePage; // make the module accessible for all files