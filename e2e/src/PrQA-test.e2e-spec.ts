import { browser, by, element, protractor } from 'protractor';

var datosPruebas = [];
var globalTimeout = 1000;
var shortGlobalTimeout = 50;

const fs = require('fs');
const csvData = fs.readFileSync('src/data/pruebasFactun.csv', 'utf8');
var textLines = csvData.split('\r\n');
textLines.forEach(function(row) {
  datosPruebas.push(row.split(';'));
})
datosPruebas.shift();
datosPruebas.pop();

  describe('Pruebas para Factun:', () => {
    let originalTimeout;

    beforeEach(async () => {
      await browser.waitForAngularEnabled(false);
      await browser.get('https://dev.erp.factun.com/account/administrador');

      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

      // browser.sleep(2000);
      element(by.name('Compania')).element(by.css('option[value=\'181\']')).click();
      // browser.sleep(2000);
      element(by.name('Usuario')).element(by.css('option[value=\'121\']')).click();
      // browser.sleep(2000);
      element(by.name('Password')).sendKeys('123456');
      browser.sleep(globalTimeout);
      element(by.xpath('/html/body/div[3]/div/form/div/div[5]/div/input')).click().then(() => {
          browser.sleep(globalTimeout);
          element(by.xpath('/html/body/div[2]/div/div[2]/ul/li[8]')).click();
          browser.sleep(globalTimeout);
          // tslint:disable-next-line: max-line-length
          element(by.xpath('/html/body/div[2]/div/div[2]/ul/li[8]/ul')). element(by.xpath('/html/body/div[2]/div/div[2]/ul/li[8]/ul/li[2]/a')).click();
          browser.sleep(globalTimeout);
          element(by.xpath('/html/body/div[3]/div[1]/div/a')).click();
        });
    });

    afterEach(() => {
      browser.restart();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    
    datosPruebas.forEach(function (datos) {
      it(datos[1], async () => {
        browser.sleep(2000);
        element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css(datos[2])).click();
        browser.sleep(shortGlobalTimeout);
        element(by.name('codigo')).sendKeys(datos[3]);
        browser.sleep(shortGlobalTimeout);
        element(by.name('codigo_hacienda')).sendKeys(datos[4]);
        browser.sleep(shortGlobalTimeout);
        element(by.name('descripcion')).sendKeys(datos[5]);
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css(datos[6])).click();
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="moneda_id"]')).element(by.css(datos[7])).click();
        browser.sleep(shortGlobalTimeout);
        element(by.name('partida_arancelaria')).sendKeys(datos[8]);
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="impuesto_id"]')).element(by.css(datos[9])).click();
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css(datos[10])).click();
        browser.sleep(shortGlobalTimeout);
        element(by.name('costo')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[11]);
        browser.sleep(shortGlobalTimeout);
        element(by.name('utilidad')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[12]);
        browser.sleep(shortGlobalTimeout);
        element(by.name('precio_sin_impuesto')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[13]);
        browser.sleep(shortGlobalTimeout);
        element(by.name('PrecioFinal')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[14]);
        browser.sleep(shortGlobalTimeout);
        element(by.name('base_imponible')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[15]);
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="activo"]')).element(by.css(datos[16])).click();
        browser.sleep(globalTimeout);

        element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
            browser.sleep(globalTimeout);
            expect(element(by.xpath(datos[17])).getText()).toEqual(datos[18]);
        });
      });
    });
  });
