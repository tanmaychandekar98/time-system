var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder().
    forBrowser('chrome').
    build();


driver.get('http://localhost:3000').then(function(){
    driver.findElement(By.className('username')).sendKeys('2');
    driver.findElement(By.className('password')).sendKeys('abc2pqr');   

    driver.wait(function(){
        return driver.findElement(By.className('password')).getAttribute('value');
}, 10000).then(function(value){ console.log(value)});

//console.info( await driver.manage().getTimeouts() );
driver.findElement(By.className('submit')).click();


});

/*driver.get('http://localhost:3000')
driver.findElement(By.className('username')).sendKeys('3')
driver.findElement(By.className('password')).sendKeys('abc3pqr');
driver.findElement(By.className('submit')).click();*/