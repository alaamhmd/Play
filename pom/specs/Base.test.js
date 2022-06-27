const { chromium} = require ('playwright');
const HomePage = require ('../models/Home.page');
const LoginPage = require ('../models/Login.page');
const testData = require ('../data/testData.json');

    
    
    
describe ('This is the test base page', ()=>{

    jest.setTimeout(30000);
        let browser = null;
        let page = null;
        let context = null;
        let loginPage = null;
        let homePage = null;

    beforeAll( async()=>{
        browser = await chromium.launch({headless:false, slowMo:600});
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage (page);
        homePage = new HomePage (page);
        await loginPage.navigation();
    });
    afterAll(async()=>{
        await context.close();
        await browser.close();
    });
    it ('User login successfully',async()=>{
        await loginPage.login(testData.username,testData.password);
        expect (await page.title()).not.toBeNull();
});
it ('You should login as Jack Gomez',async()=>{
   expect ( await homePage.getUserName()).toBe(testData.loggedUsername);
});
it ('Total balance should be 350$',async()=>{
    expect ( await homePage.getBalance('total')).toBe(testData.totalBalance);
 });
 it ('Credit balance should be 17,800$',async()=>{
    expect ( await homePage.getBalance('credit')).toBe(testData.creditBalance);
 });
 it ('Due balance should be 180$',async()=>{
    expect ( await homePage.getBalance('due')).toBe(testData.dueBalance);
 });
});
    


