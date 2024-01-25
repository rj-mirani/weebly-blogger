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
exports.generateFakeGmail = exports.print = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = __importDefault(require("fs/promises"));
const chance_1 = __importDefault(require("chance"));
const results_json_1 = __importDefault(require("../results.json"));
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
const login = (page, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    print("Loggin in...");
    try {
        const Login = yield page.waitForSelector('#login-button');
        yield (Login === null || Login === void 0 ? void 0 : Login.click());
        const emailInput = yield page.waitForSelector('#weebly-email');
        yield (emailInput === null || emailInput === void 0 ? void 0 : emailInput.type(email));
        yield page.click(`#weebly-lookup > div.email-lookup-action > div > button`);
        yield ((_a = (yield page.waitForSelector('#email'))) === null || _a === void 0 ? void 0 : _a.type(email));
        yield ((_b = (yield page.waitForSelector('#password'))) === null || _b === void 0 ? void 0 : _b.type(password));
        yield ((_c = (yield page.waitForSelector('#login-weebly-submit-btn > span'))) === null || _c === void 0 ? void 0 : _c.click());
        // await page.waitForNavigation()
        const foundConfirmation = yield new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log('Checking confirmation');
                // await page.waitForSelector("#2fa-post-login-promo-sms-remind-me-btn")
                yield page.waitForSelector("body > div.fullscreen > div > main > div > form > div.two-factor-promo-actions > span:nth-child(1)");
                resolve(true);
            }
            catch (error) {
                resolve(false);
            }
        }));
        console.log("confirmation: ", foundConfirmation);
        if (foundConfirmation) {
            yield ((_d = (yield page.waitForSelector("body > div.fullscreen > div > main > div > form > div.two-factor-promo-actions > span:nth-child(1)"))) === null || _d === void 0 ? void 0 : _d.click());
            // @ts-ignore
            yield new Promise(r => setTimeout(r, 5000));
            yield ((_e = (yield page.waitForSelector("#dialog-1 > market-footer > div > span:nth-child(2)"))) === null || _e === void 0 ? void 0 : _e.click());
        }
        if ((yield page.waitForSelector('div.content-wrapper > div.site-overview-wrapper > div > div > div > div > div > div.site-header-image')))
            return true;
        return false;
    }
    catch (e) {
        print(e.message);
        return false;
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    for (const finalData of results_json_1.default) {
        try {
            console.log(`Processing`, finalData);
            // @ts-ignore
            if (finalData.sites.length >= 10)
                continue;
            const browser = yield puppeteer_1.default.launch({ headless: false, args: ['--proxy-server=dc.smartproxy.com:10100'], });
            const page = (yield browser.pages())[0];
            page.authenticate({
                username: "user-cv2career-country-au",
                password: "wspG7q9oJtIutr2z7R"
            });
            page.setViewport({ width: 1680, height: 900 });
            page.setDefaultTimeout(0);
            yield page.goto('https://www.weebly.com/');
            print("Visiting site as", finalData);
            if (yield login(page, finalData)) {
                page.setViewport({ width: 1680, height: 900 });
                print("My sites..");
                const mySites = yield page.waitForSelector("body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.square-online-schooltip-container > div:nth-child(1) > div > div._7s-AfoI\\+SQKqKk7OJ6LcPw\\=\\= > div > div.🚀5-3-12Slsn.🚀5-3-136iv5.pqLoRPfwVT9R8HKI5Rn1hQ\\=\\= > button > span > span > span", { visible: true });
                yield (mySites === null || mySites === void 0 ? void 0 : mySites.click());
                const addSite = yield page.waitForSelector(`body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.🚀5-3-13jDDm.🚀5-3-11fyTq.🚀5-3-12qVF5 > div > div:nth-child(4) > div:nth-child(1) > a`, { visible: true });
                yield (addSite === null || addSite === void 0 ? void 0 : addSite.click());
            }
            else {
                print("Login process failed...");
                yield page.close();
                return;
            }
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
            // @ts-ignore
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
            // @ts-ignore
            finalData.sites.push(yield ((_f = (yield (link === null || link === void 0 ? void 0 : link.getProperty('textContent')))) === null || _f === void 0 ? void 0 : _f.jsonValue()));
            // #siteLocation
            const Publish = yield page.waitForSelector('.btn__header--blue');
            yield (Publish === null || Publish === void 0 ? void 0 : Publish.click());
            print("Closing page...");
            browser.close();
        }
        catch (error) {
            print(error.message);
        }
    }
});
main();
