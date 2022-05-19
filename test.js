const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
const assert = require('assert');


// initiliaze ID or XPATH use in Pages
const LOGIN_MENU_ID = By.id('login2');
const WEB_URL = "https://www.demoblaze.com/";
const MODAL_LOGIN_ID = By.id('logInModal');
const USERNAME_ID = By.id('loginusername');
const PASSWORD_ID = By.id('loginpassword');
const LOG_IN_BTN = By.xpath('//*[@id="logInModal"]/div/div/div[3]/button[2]');
const LOGOUT_ID = By.id('logout2s');
const LOGIN_CLOSE_ID = By.xpath('//*[@id="logInModal"]/div/div/div[3]/button[1]');


// test data
var input_data = [
    { title : 'Login without username and password', username : '',password : '', id:'TC_L-00003' },
    { title : 'Login without username', username : '',password : 'admin', id:'TC_L-00004' },
    { title : 'Login without password!', username : 'admin',password : '', id:'TC_L-00005'},
    { title : 'Login incorrect username!', username : 'admins',password : 'admin', id:'TC_L-00006'},
    { title : 'Login incorrect password!', username : 'admin',password : 'admins', id:'TC_L-00007'}, 
    { title : 'Login with correct username and password!', username : 'admin',password : 'admin', id:'TC_L-00008' },
];

// report 
var collect_result = [];

// log any action
function log(msg) {
    console.info(msg);
}

//start opening browser and test
async function start_test(){
    log("#########################");
    log("## START LOGIN TEST ##");

    let driver = await new Builder().forBrowser("chrome").build();

    //maximize chrome browser
    driver.manage().window().maximize();

    //open url
    await driver.get(WEB_URL);

    try{
        // loop thru each test data
        await input_data.reduce(async (promise, options) => {
            await promise;
            await test_login(driver,options);
          }, Promise.resolve());
    }finally{
        //await driver.quit(); 
    }

    //output result of testing
    log("SUMMARY RESULT");
    collect_result.forEach(element => {
        color = (element.result == 'PASSED') ? "\x1b[32m" : "\x1b[31m";
        log("\x1b[0m "  + element.id + ": "+ color + "'"  + element.result +" \' \x1b[0m ");
    });

    await driver.quit(); 
}

// login action 
async function test_login(driver,options = [],){
    let result_array =  [];

    log('> '  + options.title);
    await driver.sleep(2000); //2seconds

    // validate if login link exist and then click 
    await driver.findElement(LOGIN_MENU_ID).click().then(function(webElement) {
        if(webElement === false){
            log('Login Navigation Unable to Click');
            result_array.push('FAILED');
        }else{
            log('Login Navigation Click');
            result_array.push('PASSED');
        }

    }, function(err) {
        log('Error: ' + err);
        result_array.push('ERROR');
    });

   await driver.sleep(2000); //2second
   
   // validate if modal display
   await driver.findElement(MODAL_LOGIN_ID).isDisplayed().then(function(webElement) {
        if(webElement === false){
            log('Modal Login does not display');
            result_array.push('FAILED');
        }else{
            log('Modal Login display');
            result_array.push('PASSED');
        }
    }, function(err) {
        log('Error: ' + err);
        result_array.push('ERROR');
    });

    // username input
    await driver.findElement(USERNAME_ID).then(function(webElement) {
        if(webElement === false){
            log('Input Username Failed');
            result_array.push('FAILED');
        }else{
            webElement.clear();
            webElement.sendKeys(options.username,Key.RETURN);
            log('Input Username');
            result_array.push('PASSED');
        }
    }, function(err) {
        log('Error: ' + err);
        result_array.push('ERROR');
    });

    // password input
    await driver.findElement(PASSWORD_ID).then(function(webElement) {
        if(webElement === false){
            log('Input Password Failed');
            result_array.push('FAILED');
        }else{
            webElement.clear();
            webElement.sendKeys(options.password,Key.RETURN);
            log('Input Password');
            result_array.push('PASSED');
        }
    }, function(err) {
        log('Error: ' + err);
        result_array.push('ERROR');
    });

    // click login button
    await driver.findElement(LOG_IN_BTN).click().then(function(webElement) {
        if(webElement === false){
            log('Log-in Button Unable to Click');
            result_array.push('FAILED');
        }else{
            log('Login Button Click');
            result_array.push('PASSED');
        }

    }, function(err) {
        log('Error: ' + err);
        result_array.push('ERROR');
    });


    await driver.sleep(2000);

    let login_status = true;

    // Close alert window
    try{
        let alert = await driver.switchTo().alert(); 
        let alertText = await alert.getText();
        log('Alert Message: ' + alertText);
        alert.accept();
        login_status = false;
        log('Alert Accept Click');
        result_array.push('PASSED');

    }catch (Exception){
        
    }

    await driver.sleep(2000);

    // if login success
    if(login_status === true){
        log('Log-in Successfully');

        //click logout button
        await driver.findElement(LOGOUT_ID).click().then(function(webElement) {
            if(webElement === false){
                log('Log-out Button Unable to Click');
                result_array.push('FAILED');
            }else{
                log('Log-out Button Click');
                result_array.push('PASSED');
            }
    
        }, function(err) {
            log('Error: ' + err);
            result_array.push('ERROR');
        });
    }else{

        // close modal
        await driver.findElement(LOGIN_CLOSE_ID).click().then(function(webElement) {
            if(webElement === false){
                log('Close Button Unable to Click');
                result_array.push('FAILED');
            }else{
                log('Close Button Click');
                result_array.push('PASSED');
            }
    
        }, function(err) {
            log('Error: ' + err);
            result_array.push('ERROR');
        });
    }

    //display result for each action
    log(result_array);
    let status = "PASSED";

    //check if error encounter
    if(result_array.includes("ERROR")){
        status = "FAILED";
    }

    //check if having failed action
    if(result_array.includes("FAILED")){
        status = "FAILED";
    }

    let temp  = [];
    temp['id'] = options.id;
    temp['result'] = status;

    //record status of test case
    collect_result.push(temp);

    log("#################################################");
}


//start here
start_test();
