import fs from 'fs/promises';
import puppeteer, { Browser, Page } from "puppeteer";
import chance from "chance"
import { uniqueNamesGenerator, names, adjectives } from "unique-names-generator";

export function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())];
}

export async function saveFinal(data: object) {
    try {
        const file = await fs.readFile('results.json', 'utf-8')
        const existingJson = JSON.parse(file)
        existingJson.push(data);
        await fs.writeFile('results.json', JSON.stringify(existingJson), 'utf-8');
    } catch {
        await fs.writeFile('results.json', JSON.stringify([data]), 'utf-8');
    }
}

export function print(...messages: any[]) {
    `Log message to the console,  track all logs in a file`
    console.log(Date().toString(), ...messages);
    fs.appendFile('./logs.log', JSON.stringify(messages)).catch(() => console.log("Could not save log to file..."))
}
export function generateFakeGmail() {
    const username = new chance().word() + new chance().word() + Math.floor(Math.random() * 1000); // Generate a random username
    const domain = 'gmail.com';

    return `${username}@${domain}`;
}


const email = generateFakeGmail()
const password = generateFakeGmail().replace('gmail.com', '')
const firstName = uniqueNamesGenerator({
    dictionaries: [names],
    length: 1
})
const lastName = uniqueNamesGenerator({
    dictionaries: [names],
    length: 1
})
const middleName = uniqueNamesGenerator({
    dictionaries: [adjectives],
    length: 1
})
const finalData: { firstName: string, lastName: string, middleName: string, email: string, sites: any[], password?: string } = {
    firstName, lastName, middleName, email, password, sites: []
}

const confirmPhoneNumber = async (browser: Browser) => {
    const _page = await browser.newPage()
    await _page.goto('')
}

const signUp = async (page: Page): Promise<boolean> => {
    try {

        // Start sign up process
        const createWebButton = await page.waitForSelector('a[data-track-category="signup_button"]>span')
        await createWebButton?.click()
        await page.waitForNavigation()
        await page.waitForSelector('#ember16 > div > div > div:nth-child(2) > button')

        print("Signing up...")

        await (await page.waitForSelector("#first-name"))?.type(firstName)
        await (await page.waitForSelector("#last-name"))?.type(lastName)
        await (await page.waitForSelector("#email"))?.type(email)
        await (await page.waitForSelector("#email-confirmation"))?.type(email)
        await (await page.waitForSelector("#password"))?.type(password)

        await (await page.waitForSelector("#ember14 > label"))?.click()
        // Wait 10 seconds
        await new Promise(r => setTimeout(r, 10 * 1000))
        await (await page.waitForSelector("#ember16 > div > div > div:nth-child(2) > button"))?.click()

        // Confirm that sign up was successful
        await new Promise(r => setTimeout(r, 60 * 1000))
        await page.waitForSelector("body > div.fd-main-wrapper.🚀5-3-1GadL4.🚀5-3-11fyTq > main > div > div.funnel-header > div.header-question.🚀5-3-123dz1.🚀5-3-11R-_A.🚀5-3-1UlGqH", { timeout: 180 })

        return true
    } catch (error: any) {
        print(error.message)
        return false
    }
}


const main = async () => {
    // Launching browser
    print("Launching browser...")
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0]
    page.setDefaultTimeout(0)
    await page.goto('https://www.weebly.com/')
    print("Visiting site as", finalData)

    if (await signUp(page)) {
        print("Signed up succesfully")
        // await page.goto('https://example.com/')
        // await page.deleteCookie()
        // await page.goto('https://www.weebly.com/')
        saveFinal(finalData)
        // browser.close()
    } else {
        print("Sign up process failed...\nMoving on...")
        await browser.close()
        // return
        return
    }

    while (true) {
        // try {
        if (finalData.sites.length >= 9) break;
        // Load "https://www.weebly.com/app/front-door/users/148094029/getting-started#/"
        await page.goto('https://www.weebly.com/');


        // const mySites = await page.waitForSelector("body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.square-online-schooltip-container > div:nth-child(1) > div > div._7s-AfoI\\+SQKqKk7OJ6LcPw\\=\\= > div > div.🚀5-3-12Slsn.🚀5-3-136iv5.pqLoRPfwVT9R8HKI5Rn1hQ\\=\\= > button > span > span > span", { visible: true })
        // await mySites?.click()
        // const addSite = await page.waitForSelector(`body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.🚀5-3-13jDDm.🚀5-3-11fyTq.🚀5-3-12qVF5 > div > div:nth-child(4) > div:nth-child(1) > a`, { visible: true })
        // await addSite?.click()




        // Resize window to 1600 x 773
        await page.setViewport({ width: 1600, height: 773 });

        // Click on <div> "I just need a website"
        await page.waitForSelector('div:nth-child(1) > .funnel-experience > .\\1F680 5-3-1T7O2i');
        await Promise.all([
            page.click('div:nth-child(1) > .funnel-experience > .\\1F680 5-3-1T7O2i'),
            page.waitForNavigation()
        ]);

        // Click on <div> .\1F680 5-3-13ZCYy
        await page.waitForSelector('.\\1F680 5-3-13ZCYy');
        await page.click('.\\1F680 5-3-13ZCYy');

        // Click on <button> "Start Editing"
        // body > div.fd-main-wrapper.🚀5-3-1GadL4.🚀5-3-11fyTq > div.🚀5-3-1iKamA.🚀5-3-11NqI2.🚀5-3-12Inp9.🚀5-3-1DzQOo > div > div > header > div > div > div.🚀5-3-13OF_h > div.🚀5-3-11SAr6 > div > button
        await page.waitForSelector('.\\1F680 5-3-11Ofuz');
        await Promise.all([
            page.click('.\\1F680 5-3-11Ofuz'),
            page.waitForNavigation()
        ]);

        await page.reload();

        // Fill "oiohomoiufuytuv... on <input> #domain-search-input
        await page.waitForSelector('#domain-search-input:not([disabled])');
        await page.type('#domain-search-input', `${finalData?.firstName}${finalData?.lastName}${generateFakeGmail().replace('@gmail.com', '')}`);

        // Click on <button> "Search"
        await page.waitForSelector('.search-button');
        await page.click('.search-button');

        // Click on <a> "Choose rightarrowsmall"
        await page.waitForSelector('.subdomain-row [href="#"]');
        await Promise.all([
            page.click('.subdomain-row [href="#"]'),
            page.waitForNavigation()
        ]);

        // Click on <a> "Done"
        // await Done?.click()
        const link = await page.waitForSelector('#subdomain-complete > p:nth-child(2) > strong > a');
        finalData.sites.push(await (await link?.getProperty('textContent'))?.jsonValue())


        const Publish = await page.waitForSelector('.btn__header--blue');
        await Publish?.click()


        print(finalData, "Saving...");

        // await browser.close();
    }
    saveFinal(finalData);
}

// This will run in a pm2 instace
process.on("uncaughtException", () => {
    saveFinal(finalData)
    process.exit()
})
main()