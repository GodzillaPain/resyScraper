"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
require("chromedriver");
function openResy() {
    return __awaiter(this, void 0, void 0, function* () {
        let driver = yield new selenium_webdriver_1.Builder().forBrowser('chrome').build();
        try {
            // Navigate to Resy website
            yield driver.get('https://resy.com/');
            yield driver.wait(selenium_webdriver_1.until.titleContains('Resy'), 15000);
            console.log('Resy homepage opened successfully!');
            let locationsContainer = yield driver.findElement(selenium_webdriver_1.By.css('resy-locations-container'));
            yield locationsContainer.click();
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('input#locationSearch')), 10000);
            let searchInput = yield driver.findElement(selenium_webdriver_1.By.css('input#locationSearch'));
            yield searchInput.click();
            yield searchInput.sendKeys('New York', selenium_webdriver_1.Key.RETURN);
            console.log('Search submitted successfully!');
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('div.CitiesList')), 10000);
            let firstCity = yield driver.findElement(selenium_webdriver_1.By.css('ul.CitiesList__list li.CitiesList__item'));
            yield firstCity.click();
            console.log('First city item clicked successfully!');
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('input.react-autosuggest__input')), 10000);
            let placeSearchInput = yield driver.findElement(selenium_webdriver_1.By.css('input.react-autosuggest__input'));
            yield placeSearchInput.click();
            yield placeSearchInput.sendKeys('Sushi Saikou', selenium_webdriver_1.Key.RETURN);
            console.log('Search submitted successfully!');
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('div.SearchResult__title--container a.Link')), 15000);
            let sushiSaikouResult = yield driver.findElement(selenium_webdriver_1.By.css('div.SearchResult__title--container a.Link'));
            yield sushiSaikouResult.click();
            console.log('Sushi Saikou search result clicked successfully!');
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('div.ReservationButtonList')), 15000);
            let reservationButtons = yield driver.findElements(selenium_webdriver_1.By.css('div.ReservationButtonList .ReservationButton'));
            if (reservationButtons.length === 0) {
                console.log('No reservation buttons found.');
            }
            let reservations = [];
            for (let button of reservationButtons) {
                try {
                    let timeElement = yield button.findElement(selenium_webdriver_1.By.css('.ReservationButton__time'));
                    let typeElement = yield button.findElement(selenium_webdriver_1.By.css('.ReservationButton__type'));
                    let time = yield timeElement.getText();
                    let type = yield typeElement.getText();
                    reservations.push({ time, type });
                }
                catch (error) {
                    console.error('Error extracting reservation details:', error);
                }
            }
            console.log('Reservation details:', reservations);
        }
        finally {
            setTimeout(() => driver.quit(), 5000);
        }
    });
}
openResy();
