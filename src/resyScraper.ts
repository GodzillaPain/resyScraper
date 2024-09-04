import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

async function openResy() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to Resy website
        await driver.get('https://resy.com/');

        await driver.wait(until.titleContains('Resy'), 15000);

        console.log('Resy homepage opened successfully!');

        let locationsContainer = await driver.findElement(By.css('resy-locations-container'));
        await locationsContainer.click();

        await driver.wait(until.elementLocated(By.css('input#locationSearch')), 10000);

        let searchInput = await driver.findElement(By.css('input#locationSearch'));

        await searchInput.click();

        await searchInput.sendKeys('New York', Key.RETURN);

        console.log('Search submitted successfully!');

        await driver.wait(until.elementLocated(By.css('div.CitiesList')), 10000);

        let firstCity = await driver.findElement(By.css('ul.CitiesList__list li.CitiesList__item'));

        await firstCity.click();

        console.log('First city item clicked successfully!');

        await driver.wait(until.elementLocated(By.css('input.react-autosuggest__input')), 10000);

        let placeSearchInput = await driver.findElement(By.css('input.react-autosuggest__input'));

        await placeSearchInput.click();

        await placeSearchInput.sendKeys('Sushi Saikou', Key.RETURN); 

        console.log('Search submitted successfully!');

        await driver.wait(until.elementLocated(By.css('div.SearchResult__title--container a.Link')), 15000);

        let sushiSaikouResult = await driver.findElement(By.css('div.SearchResult__title--container a.Link'));

        await sushiSaikouResult.click();

        console.log('Sushi Saikou search result clicked successfully!');

        await driver.wait(until.elementLocated(By.css('div.ReservationButtonList')), 15000);

        let reservationButtons = await driver.findElements(By.css('div.ReservationButtonList .ReservationButton'));

        if (reservationButtons.length === 0) {
            console.log('No reservation buttons found for location and date combination.');
        }

        let reservations = [];
        for (let button of reservationButtons) {
            try {
                let timeElement = await button.findElement(By.css('.ReservationButton__time'));
                let typeElement = await button.findElement(By.css('.ReservationButton__type'));
                let time = await timeElement.getText();
                let type = await typeElement.getText();
                reservations.push({ time, type });
            } catch (error) {
                console.error('Error extracting reservation details:', error);
            }
        }

        console.log('Reservation details:', reservations);

    } finally {
        setTimeout(() => driver.quit(), 5000);
    }
}

openResy();
