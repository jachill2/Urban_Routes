const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    //setting the address
    it('should fill in the address', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await browser.pause(2000);
    })

    //selecting supportive car plan
    it('should select the supportive plan option', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await browser.pause(5000);
    }) 

    //filling in the phone number
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
        await browser.pause(2000);
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await browser.pause(2000);
    })

    //adding a credit card
    it('should add the card number along with the CVV in the payment modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const paymentButton = await $(page.paymentButton);
        await paymentButton.waitForDisplayed();
        await paymentButton.click();

        const addCard = await $(page.addCard);
        await addCard.waitForDisplayed();
        await addCard.click();
        await page.inputCardInformation('1234 0000 4321','123');
        await browser.pause(3000);
    })

    //write a message for the driver
    it('should write a message to driver', async ()=> {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.writeMessage('I hope you have a wonderful day!');
        await browser.pause(5000);
    })

    //order a blanket and handkerchief
    it('should order a blanket and handkerchiefs', async ()=> {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.blanketAndHandkerchiefSelect();  
        await browser.pause(5000);
    })

    //order two ice creams
    it('should order 2 ice creams', async ()=> {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.iceCreamSelect();
        
        await browser.pause(5000);
    })
    //waiting for the car modal to appear
    it('should wait for the car modal to appear', async ()=> {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();

        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        expect(page.carSearchModal).toBeDisplayed();

        await browser.pause(5000);
    })
})

