/**
 * Screenshot list of websites.
 */

const fs = require('fs');
const puppeteer = require('puppeteer');


// Config.
const width = 1180;
const height = 650;
const output_dir = 'screenshots';
const sites_file = 'sites.txt';


/**
 * Screenshot list of websites.
 */
async function screenshot_sites(sites, output_dir, width, height) {

  // Launch Chrome.
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height,
  });

  if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir);
  }

  // Screenshot each site.
  for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    const filename = site
      .replace(/\/$/, '')
      .replace(/(^\w+:|^)\/\//, '')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase() + '.png';

    if (fs.existsSync(output_dir + '/' + filename)) {
      continue;
    }

    try {
      try {
        // Try to wait for the page to be fully loaded.
        await page.goto(site, {
          waitUntil: 'networkidle0',
          timeout: 10000,
        });
      } catch (e) {
        if (e instanceof puppeteer.TimeoutError) {
          // If it times out, try to wait for the page to load.
          await page.goto(site, {
            waitUntil: 'load',
            timeout: 30000,
          });
        }
        else {
          throw e;
        }
      }

      await page.screenshot({ path: output_dir + '/' + filename });
    } catch (e) {
      console.log(`Error: ${site} - ${e}`);
    }
  }

  // Close Chrome.
  await browser.close();
}

/**
 * Load sites from a file into an array.
 */
function load_sites(filename) {
  let sites = fs.readFileSync(filename)
    .toString('UTF8')
    .split('\n');
  sites = sites.filter(site => site !== '');

  return sites;
}


// Screenshots sites
const sites = load_sites(sites_file);
screenshot_sites(sites, output_dir, width, height);
