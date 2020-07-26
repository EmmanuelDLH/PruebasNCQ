import { browser, by, element, protractor } from 'protractor';

const datosPruebas = [];
const globalTimeout = 1000;
const shortGlobalTimeout = 50;

const fs = require('fs');
const csvData = fs.readFileSync('src/data/pruebasFactun.csv', 'utf8');
const textLines = csvData.split('\r\n');
// tslint:disable-next-line: only-arrow-functions
textLines.forEach(function(row) {
  datosPruebas.push(row.split(';'));
});
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

    // tslint:disable-next-line: only-arrow-functions
    datosPruebas.forEach(function(datos) {
      it(datos[1], async () => {
        browser.sleep(2000);
        element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css(datos[2])).click(); // Tipo Código Comercial
        browser.sleep(shortGlobalTimeout);
        element(by.name('codigo')).sendKeys(datos[3]); // Código Comercial
        browser.sleep(shortGlobalTimeout);
        element(by.name('codigo_hacienda')).sendKeys(datos[4]); // Código Hacienda
        browser.sleep(shortGlobalTimeout);
        element(by.name('descripcion')).sendKeys(datos[5]); // Descripción
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css(datos[6])).click(); // Unidad
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="moneda_id"]')).element(by.css(datos[7])).click(); // Moneda
        browser.sleep(shortGlobalTimeout);
        element(by.name('partida_arancelaria')).sendKeys(datos[8]); // Partida Arancelaria
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="impuesto_id"]')).element(by.css(datos[9])).click(); // Impuesto
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css(datos[10])).click(); // Impuesto Prorrata
        browser.sleep(shortGlobalTimeout);
        element(by.name('costo')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[11]); // Costo
        browser.sleep(shortGlobalTimeout);
        element(by.name('utilidad')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[12]); // Utilidad
        browser.sleep(shortGlobalTimeout);
        element(by.name('precio_sin_impuesto')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[13]); // Precio Sin Impuesto
        browser.sleep(shortGlobalTimeout);
        element(by.name('PrecioFinal')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[14]); // Precio Final
        browser.sleep(shortGlobalTimeout);
        element(by.name('base_imponible')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos[15]); // Base Imponible
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="activo"]')).element(by.css(datos[16])).click();
        browser.sleep(globalTimeout); // Activo

        element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => { // Boton Crear
            browser.sleep(globalTimeout);
            expect(element(by.xpath(datos[17])).getText()).toEqual(datos[18]); // Error o respuesta esperada
        });
      });
    });
  });
