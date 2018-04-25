import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
 
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
 
import org.junit.Assert;

import com.google.common.*;
 
class Example  {
  public static void main(String[] args) {
 
    // Create an instance of the driver
    WebDriver driver = new FirefoxDriver();
 
    // Navigate to a web page
    driver.get("http://localhost:3000");
 
    // Perform actions on HTML elements, entering text and submitting the form
    WebElement usernameElement     = driver.findElement(By.name("username"));
    WebElement passwordElement     = driver.findElement(By.name("password"));
    WebElement formElement        = driver.findElement(By.id("loginForm"));
 
    usernameElement.sendKeys("26");
    passwordElement.sendKeys("abc26pqr");
 
    //passwordElement.submit(); // submit by text input element
    formElement.submit();        // submit by form element
 
 
    // Anticipate web browser response, with an explicit wait
    /*WebDriverWait wait = new WebDriverWait(driver, 10);
    WebElement messageElement = wait.until(
           ExpectedConditions.presenceOfElementLocated(By.id("na"))
            );
 
    // Run a test
    String message                 = messageElement.getText();
    String successMsg             = "Welcome to foo. You logged in successfully.";
    Assert.assertEquals (message, successMsg);*/
 
    // Conclude a test
    driver.quit();
 
  }
}