const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use('/download', express.static('pdfs'));
app.use('/html', express.static('files'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API Works');
})

app.post('/', (req, res) => {
    let html = req.body.html;
    // let html = body.html;

    fs.writeFile('files/my.html', html, (err) => {
        if(err) {
            return console.log(err);
        } else {
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                const options = {
                    waitUntil: 'networkidle2'
                }
    
                await page.goto('http://localhost:3000/html/my.html', options);
                await page.pdf({
                    path: 'pdfs/website.pdf',
                    format: 'A4'
                })
    
                await browser.close();

                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Expires': new Date().toUTCString()
                });
                res.end('http://localhost:3000/download/website.pdf');
            })();
        }
    });

    // res.writeHead(200, {
    //     'Content-Type': 'text/html',
    //     'Content-Length': html.length,
    //     'Expires': new Date().toUTCString()
    // });
    // res.end(html);
})

app.listen(PORT, () => {
    console.log('Server running on http://localhost:'+PORT);
})

const generatePDF = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        waitUntil: 'networkidle2'
    }

    await page.goto('http://ashishpatel.ml', options);
    await page.pdf({
        path: 'pdfs/website.pdf',
        format: 'A4'
    })

    await browser.close();
}


// const takeScreenshot = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const options = {
//         path: 'images/screen.png',
//         fullPage: true,
//         omitBackground: true
//     };

//     await page.goto('http://ashishpatel.ml');
//     await page.waitForSelector('.social-me');
//     await page.screenshot(options);

//     await browser.close();
// }

// takeScreenshot();