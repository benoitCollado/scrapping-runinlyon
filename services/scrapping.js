import puppeteer from 'puppeteer';
import {exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs';

async function scrapping(array_value){
   try{
    const { stdout: chromiumPath } = await promisify(exec)("which chromium")
    const browser = await puppeteer.launch( {headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"],executablePath: chromiumPath.trim()});

    const page = await browser.newPage();

    await page.setViewport({ 
      width: 1920, 
      height: 1500,
      deviceScaleFactor: 1,
      isMobile: false 
    });
    const list_of_people = [];
    for(let part of array_value){
      await page.goto("https://resultscui.active.com/events/RuninLyonbyHarmonieMutuelle2024");
      await delay(1000);
      await page.locator('input').fill(part.Dossard);
      await delay(100);
      await page.focus('input.input');
      await delay(100);
      await page.keyboard.press('Enter');
      await delay(900);
      const people = await page.evaluate((part)=>{
        try{
        const list_dossard = document.querySelectorAll('#root > div.app > div.app__content > div.page-body > div > div > div > div > div:nth-child(1) > ul > li:nth-child(1) > div > div:nth-child(2) > strong' );
        const list_ref = document.querySelectorAll('#root > div.app > div.app__content > div.page-body > div > div > div > div > div:nth-child(1) > ul > li:nth-child(1) > div > div:nth-child(1) > strong > a');
        let match = {};
          match = {nom: part.nom, prenom:part.prenom, categorie:part.categorie,temps:'', dossard : part.Dossard};
        for(let i = 0; i < list_dossard.length; ++i){
          if(part.Dossard === list_dossard[i].innerText){
            match['link'] = list_ref[i].href
          }
        }
        return match
           }catch(err){
            return {'part erreur':part.nom};
           }
      }, part);
      list_of_people.push(people);
    }
    const list_temps = [];
    for(let i = 0; i < list_of_people.length; ++i){
      console.log(list_of_people[i].link);
      try{
        if(list_of_people[i].link){
          await page.goto(list_of_people[i].link);
          await delay(1000);
          const temps = await page.evaluate((people)=>{
            const temporaire = document.querySelector("#root > div.app > div.app__content > div.participant-header--wrapper > div > div > div > div > div.col.col-12.col-md-12.col-xl-6 > div > div.col.col-12.col-sm-6.col-lg-6.column-final > div > div.row.row-gutter.row-align-start.row-justify-start.final-result > div.col.col-8 > div > div > div > div.result-data--data > span")
            people.temps = temporaire.innerText;
            return people;
          }, list_of_people[i])
          list_temps.push(temps);
          }else{
            list_of_people[i].temps = "Pas de temps";
            list_temps.push(list_of_people[i]);
          }
        }catch(err){
        console.log(err);
      }
    }
      console.log(list_temps);
     process.send(list_temps);
    await browser.close() ;
    }catch(e){
      console.log(e);
    }
  }

  async function delay(milliseconds){
      return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
      });
  }

process.on('message', (data)=>{

  scrapping(data.data);
});