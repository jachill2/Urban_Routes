module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardNumber: '#number',
    creditCardCode: '#code.card-input',
    messageToDriver: '#comment.input',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'div=Supportive',
    paymentButton: '.pp-text',
    addCard: 'div=Add card',
    linkCardButton: 'button=Link',
    orderRequirements: 'div.reqs',
    blanketAndHandkerchiefs: 'div.r-sw',
    addIceCreamButton: 'div.counter-plus',
    orderButton: 'button.smart-button',

    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '.order-body',
    driverInfoModal: 'div.order-subbody',
    driverInfoModalDetail: '.order-button',


    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
 
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    inputCardInformation: async function(cardNumber, cardCode) {
        const creditCardNumber = await $(this.creditCardNumber);
        await creditCardNumber.waitForDisplayed();
        await creditCardNumber.setValue(cardNumber);

        const creditCardCode = await $(this.creditCardCode);
        await creditCardCode.waitForDisplayed();
        await creditCardCode.setValue(cardCode);

        const linkCard = await $(this.linkCardButton);
        await linkCard.waitForDisplayed();
        await linkCard.click();
        await browser.pause(2000);

       
    },

    writeMessage: async function(message) {
        const messageToDriver = await $(this.messageToDriver);
        await messageToDriver.waitForDisplayed();
        await messageToDriver.setValue(message);
        await browser.pause(1000);
    },

    blanketAndHandkerchiefSelect: async function() {
        const blanketAndHandkerchiefs = await $(this.blanketAndHandkerchiefs);
        await blanketAndHandkerchiefs.waitForDisplayed();
        await blanketAndHandkerchiefs.click();
        expect (blanketAndHandkerchiefs).toBeExisting;
        await browser.pause(1000);
    },

    iceCreamSelect: async function() {
        const addIceCreamButton = await $(this.addIceCreamButton);
        await addIceCreamButton.waitForDisplayed();
        await addIceCreamButton.click();
        await browser.pause(500);
        await addIceCreamButton.click();

    },
};