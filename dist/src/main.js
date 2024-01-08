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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeGmail = exports.print = exports.saveFinal = exports.randomChoice = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const chance_1 = __importDefault(require("chance"));
const unique_names_generator_1 = require("unique-names-generator");
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}
exports.randomChoice = randomChoice;
function saveFinal(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield promises_1.default.readFile('results.json', 'utf-8');
            const existingJson = JSON.parse(file);
            existingJson.push(data);
            yield promises_1.default.writeFile('results.json', JSON.stringify(existingJson), 'utf-8');
        }
        catch (_a) {
            yield promises_1.default.writeFile('results.json', JSON.stringify([data]), 'utf-8');
        }
    });
}
exports.saveFinal = saveFinal;
function print(...messages) {
    `Log message to the console,  track all logs in a file`;
    console.log(Date().toString(), ...messages);
    promises_1.default.appendFile('./logs.log', JSON.stringify(messages)).catch(() => console.log("Could not save log to file..."));
}
exports.print = print;
function generateFakeGmail() {
    const username = new chance_1.default().word() + new chance_1.default().word() + Math.floor(Math.random() * 1000); // Generate a random username
    const domain = 'gmail.com';
    return `${username}@${domain}`;
}
exports.generateFakeGmail = generateFakeGmail;
const email = generateFakeGmail();
const password = generateFakeGmail().replace('gmail.com', '');
const firstName = (0, unique_names_generator_1.uniqueNamesGenerator)({
    dictionaries: [unique_names_generator_1.names],
    length: 1
});
const lastName = (0, unique_names_generator_1.uniqueNamesGenerator)({
    dictionaries: [unique_names_generator_1.names],
    length: 1
});
const middleName = (0, unique_names_generator_1.uniqueNamesGenerator)({
    dictionaries: [unique_names_generator_1.adjectives],
    length: 1
});
const finalData = {
    firstName, lastName, middleName, email, password, sites: []
};
const confirmPhoneNumber = (browser) => __awaiter(void 0, void 0, void 0, function* () {
    const _page = yield browser.newPage();
    yield _page.goto('');
});
const signUp = (page) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        // Start sign up process
        const createWebButton = yield page.waitForSelector('a[data-track-category="signup_button"]>span');
        yield (createWebButton === null || createWebButton === void 0 ? void 0 : createWebButton.click());
        yield page.waitForNavigation();
        yield page.waitForSelector('#ember16 > div > div > div:nth-child(2) > button');
        print("Signing up...");
        yield ((_a = (yield page.waitForSelector("#first-name"))) === null || _a === void 0 ? void 0 : _a.type(firstName));
        yield ((_b = (yield page.waitForSelector("#last-name"))) === null || _b === void 0 ? void 0 : _b.type(lastName));
        yield ((_c = (yield page.waitForSelector("#email"))) === null || _c === void 0 ? void 0 : _c.type(email));
        yield ((_d = (yield page.waitForSelector("#email-confirmation"))) === null || _d === void 0 ? void 0 : _d.type(email));
        yield ((_e = (yield page.waitForSelector("#password"))) === null || _e === void 0 ? void 0 : _e.type(password));
        yield ((_f = (yield page.waitForSelector("#ember14 > label"))) === null || _f === void 0 ? void 0 : _f.click());
        // Wait 10 seconds
        yield new Promise(r => setTimeout(r, 10 * 1000));
        yield ((_g = (yield page.waitForSelector("#ember16 > div > div > div:nth-child(2) > button"))) === null || _g === void 0 ? void 0 : _g.click());
        // Confirm that sign up was successful
        yield new Promise(r => setTimeout(r, 60 * 1000));
        yield page.waitForSelector("body > div.fd-main-wrapper.🚀5-3-1GadL4.🚀5-3-11fyTq > main > div > div.funnel-header > div.header-question.🚀5-3-123dz1.🚀5-3-11R-_A.🚀5-3-1UlGqH", { timeout: 180 });
        return true;
    }
    catch (error) {
        print(error.message);
        return false;
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    // Launching browser
    print("Launching browser...");
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = (yield browser.pages())[0];
    page.setDefaultTimeout(0);
    yield page.goto('https://www.weebly.com/');
    print("Visiting site as", finalData);
    if (yield signUp(page)) {
        print("Signed up succesfully");
        // await page.goto('https://example.com/')
        // await page.deleteCookie()
        // await page.goto('https://www.weebly.com/')
        saveFinal(finalData);
        // browser.close()
    }
    else {
        print("Sign up process failed...\nMoving on...");
        yield browser.close();
        // return
        return;
    }
    while (true) {
        // try {
        if (finalData.sites.length >= 9)
            break;
        // Load "https://www.weebly.com/app/front-door/users/148094029/getting-started#/"
        yield page.goto('https://www.weebly.com/');
        // const mySites = await page.waitForSelector("body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.square-online-schooltip-container > div:nth-child(1) > div > div._7s-AfoI\\+SQKqKk7OJ6LcPw\\=\\= > div > div.🚀5-3-12Slsn.🚀5-3-136iv5.pqLoRPfwVT9R8HKI5Rn1hQ\\=\\= > button > span > span > span", { visible: true })
        // await mySites?.click()
        // const addSite = await page.waitForSelector(`body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.🚀5-3-13jDDm.🚀5-3-11fyTq.🚀5-3-12qVF5 > div > div:nth-child(4) > div:nth-child(1) > a`, { visible: true })
        // await addSite?.click()
        // Resize window to 1600 x 773
        yield page.setViewport({ width: 1600, height: 773 });
        // Click on <div> "I just need a website"
        yield page.waitForSelector('div:nth-child(1) > .funnel-experience > .\\1F680 5-3-1T7O2i');
        yield Promise.all([
            page.click('div:nth-child(1) > .funnel-experience > .\\1F680 5-3-1T7O2i'),
            page.waitForNavigation()
        ]);
        // Click on <div> .\1F680 5-3-13ZCYy
        yield page.waitForSelector('.\\1F680 5-3-13ZCYy');
        yield page.click('.\\1F680 5-3-13ZCYy');
        // Click on <button> "Start Editing"
        // body > div.fd-main-wrapper.🚀5-3-1GadL4.🚀5-3-11fyTq > div.🚀5-3-1iKamA.🚀5-3-11NqI2.🚀5-3-12Inp9.🚀5-3-1DzQOo > div > div > header > div > div > div.🚀5-3-13OF_h > div.🚀5-3-11SAr6 > div > button
        yield page.waitForSelector('.\\1F680 5-3-11Ofuz');
        yield Promise.all([
            page.click('.\\1F680 5-3-11Ofuz'),
            page.waitForNavigation()
        ]);
        yield page.reload();
        // Fill "oiohomoiufuytuv... on <input> #domain-search-input
        yield page.waitForSelector('#domain-search-input:not([disabled])');
        yield page.type('#domain-search-input', `${finalData === null || finalData === void 0 ? void 0 : finalData.firstName}${finalData === null || finalData === void 0 ? void 0 : finalData.lastName}${generateFakeGmail().replace('@gmail.com', '')}`);
        // Click on <button> "Search"
        yield page.waitForSelector('.search-button');
        yield page.click('.search-button');
        // Click on <a> "Choose rightarrowsmall"
        yield page.waitForSelector('.subdomain-row [href="#"]');
        yield Promise.all([
            page.click('.subdomain-row [href="#"]'),
            page.waitForNavigation()
        ]);
        // Click on <a> "Done"
        // await Done?.click()
        const link = yield page.waitForSelector('#subdomain-complete > p:nth-child(2) > strong > a');
        finalData.sites.push(yield ((_h = (yield (link === null || link === void 0 ? void 0 : link.getProperty('textContent')))) === null || _h === void 0 ? void 0 : _h.jsonValue()));
        const Publish = yield page.waitForSelector('.btn__header--blue');
        yield (Publish === null || Publish === void 0 ? void 0 : Publish.click());
        print(finalData, "Saving...");
        // await browser.close();
    }
    saveFinal(finalData);
});
// This will run in a pm2 instace
process.on("uncaughtException", () => {
    saveFinal(finalData);
    process.exit();
});
main();
