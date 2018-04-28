var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder().
    forBrowser('chrome').
    build();


driver.get('http://localhost:3000/signup/admin').then(function(){
    driver.findElement(By.className('cname')).sendKeys('QQQQQ');
    driver.findElement(By.className('id')).sendKeys('5006');
    driver.findElement(By.className('name')).sendKeys('Robert');
    driver.findElement(By.className('password')).sendKeys('admin');   

    driver.wait(function(){
        return driver.findElement(By.className('password')).getAttribute('value');
}, 10000).then(function(value){ console.log(value)});

//console.info( await driver.manage().getTimeouts() );
driver.findElement(By.className('register')).click();

driver.wait(function(){
    return driver.findElement(By.className('username'));
}, 10000).then(function(){

    driver.findElement(By.className('username')).sendKeys('5001');
});


});

/*driver.get('http://localhost:3000')
driver.findElement(By.className('username')).sendKeys('3')
driver.findElement(By.className('password')).sendKeys('abc3pqr');
driver.findElement(By.className('submit')).click();*/