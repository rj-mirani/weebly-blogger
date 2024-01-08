import puppeteer, { Page } from 'puppeteer';
import fs from 'fs/promises';
import chance from 'chance';
import results from '../results.json';

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

const login = async (page: Page, { email, password }: { email: string, password: string }): Promise<boolean> => {
    print("Loggin in...")
    try {
        const Login = await page.waitForSelector('#login-button')
        await Login?.click()
        const emailInput = await page.waitForSelector('#weebly-email')
        await emailInput?.type(email)
        await page.click(`#weebly-lookup > div.email-lookup-action > div > button`)

        await (await page.waitForSelector('#email'))?.type(email)
        await (await page.waitForSelector('#password'))?.type(password)
        await (await page.waitForSelector('#login-weebly-submit-btn > span'))?.click()

        // await page.waitForNavigation()
        const foundConfirmation = await new Promise(async (resolve) => {
            try {
                console.log('Checking confirmation')
                // await page.waitForSelector("#2fa-post-login-promo-sms-remind-me-btn")
                await page.waitForSelector("body > div.fullscreen > div > main > div > form > div.two-factor-promo-actions > span:nth-child(1)")
                resolve(true)
            } catch (error) {
                resolve(false)
            }
        })
        console.log("confirmation: ", foundConfirmation)
        if (foundConfirmation) {
            await (await page.waitForSelector("body > div.fullscreen > div > main > div > form > div.two-factor-promo-actions > span:nth-child(1)"))?.click()
            // @ts-ignore
            await new Promise(r => setTimeout(r, 5000))

            await (await page.waitForSelector("#dialog-1 > market-footer > div > span:nth-child(2)"))?.click()
        }

        if ((await page.waitForSelector('div.content-wrapper > div.site-overview-wrapper > div > div > div > div > div > div.site-header-image'))) return true

        return false
    } catch (e: any) {
        print(e.message)
        return false
    }
}


const main = async () => {
    for (const finalData of results) {
        try {
            console.log(`Processing`, finalData)
            // @ts-ignore
            if (finalData.sites.length >= 10) continue

            const browser = await puppeteer.launch({ headless: false, args: ['--proxy-server=dc.smartproxy.com:10100'], });
            const page = (await browser.pages())[0]
            page.authenticate({
                username: "user-cv2career-country-au",
                password: "wspG7q9oJtIutr2z7R"
            })
            page.setViewport({ width: 1680, height: 900 })
            page.setDefaultTimeout(0)
            await page.goto('https://www.weebly.com/')
            print("Visiting site as", finalData)

            if (await login(page, finalData satisfies { email: string, password: string })) {
                page.setViewport({ width: 1680, height: 900 })
                print("My sites..")
                const mySites = await page.waitForSelector("body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.square-online-schooltip-container > div:nth-child(1) > div > div._7s-AfoI\\+SQKqKk7OJ6LcPw\\=\\= > div > div.🚀5-3-12Slsn.🚀5-3-136iv5.pqLoRPfwVT9R8HKI5Rn1hQ\\=\\= > button > span > span > span", { visible: true })
                await mySites?.click()
                const addSite = await page.waitForSelector(`body > div.🚀5-3-1GadL4.🚀5-3-11fyTq > div.main-wrapper > div.🚀5-3-1GadL4.🚀5-3-11fyTq.XCPxO-TbkwETCn7mI4Y53Q\\=\\= > div.🚀5-3-13jDDm.🚀5-3-11fyTq.🚀5-3-12qVF5 > div > div:nth-child(4) > div:nth-child(1) > a`, { visible: true })
                await addSite?.click()
            } else {
                print("Login process failed...")
                await page.close()
                return
            }


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
            // @ts-ignore
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
            // @ts-ignore
            (finalData.sites as any[]).push(await (await link?.getProperty('textContent'))?.jsonValue())

            // #siteLocation
            const Publish = await page.waitForSelector('.btn__header--blue');
            await Publish?.click()

            print("Closing page...")
            browser.close()
        } catch (error: any) {
            print(error.message)
        }
    }
}


main()