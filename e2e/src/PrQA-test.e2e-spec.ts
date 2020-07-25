import { browser, by, element, protractor } from 'protractor';
import { parse } from 'fast-csv';
//import * as fs from 'fs';

var datosPruebas = [];
var globalTimeout = 2000;
var shortGlobalTimeout = 500;

/*
fs.createReadStream('src/data/pruebasFactun.csv',{flags: 'rs+'})
    .pipe(parse({delimiter: ';', headers: true, quote: null}))
    .on('error', error => console.error(error))
    .on('data', row => datosPruebas.push(row))
    .on('end', () => writeJson());
*/

var fs = require('fs');
// Read the file, and pass it to your callback
fs.readFileSync('src/data/myjsonfile.json', function (err, data) {
  if (err) {
      throw err;
  }
  datosPruebas = JSON.parse(data);
});



/*
var titulo = 'Crear un producto o servicio con costo negativo';
var tipoCodigo = 'option[value=\'01\']';
var codigo = '123456678';
var codigoHacienda = '5546312';
var descripcion = 'Esto es un producto';
var productoUnidad = 'option[value=\'1\']';
var moneda = 'option[value=\'7\']';
var partidaArancelaria = '';
var impuesto = 'option[value=\'1191\']';
var impProrrata = 'option[value=\'1191\']';
var costo = '-1';
var utilidad = '-1';
var precioSinImpuesto = '-1';
var precioFinal = '-1';
var baseImponible = '-1';
var activo = 'option[value=\'S\']';
var seccionResultado = '/html/body/div[3]/form/div/div[1]/div[2]/div[4]/div/span';
var resultado = 'El costo no puede ser menor a cero.';
var temp = [1];
*/


function writeJson(){
  let json = JSON.stringify(datosPruebas);
  let fs = require("fs");
  fs.writeFile('src/data/myjsonfile.json', json, function (err) {
    if (err) return console.log(err);
    console.log('JSON created?');
  });
}


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
      it(datos.titulo, async () => {
        browser.sleep(2000);
        element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css(datos.tipoCodigo)).click();
        browser.sleep(shortGlobalTimeout);
        element(by.name('codigo')).sendKeys(datos.codigo);
        browser.sleep(shortGlobalTimeout);
        element(by.name('codigo_hacienda')).sendKeys(datos.codigoHacienda);
        browser.sleep(shortGlobalTimeout);
        element(by.name('descripcion')).sendKeys(datos.descripcion);
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css(datos.productoUnidad)).click();
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="moneda_id"]')).element(by.css(datos.moneda)).click();
        browser.sleep(shortGlobalTimeout);
        element(by.name('partida_arancelaria')).sendKeys(datos.partidaArancelaria);
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="impuesto_id"]')).element(by.css(datos.impuesto)).click();
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css(datos.impProrrata)).click();
        browser.sleep(shortGlobalTimeout);
        element(by.name('costo')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos.costo);
        browser.sleep(shortGlobalTimeout);
        element(by.name('utilidad')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos.utilidad);
        browser.sleep(shortGlobalTimeout);
        element(by.name('precio_sin_impuesto')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos.precioSinImpuesto);
        browser.sleep(shortGlobalTimeout);
        element(by.name('PrecioFinal')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos.precioFinal);
        browser.sleep(shortGlobalTimeout);
        element(by.name('base_imponible')).sendKeys('text was',
                      protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                      datos.baseImponible);
        browser.sleep(shortGlobalTimeout);
        element(by.xpath('//*[@id="activo"]')).element(by.css(datos.activo)).click();
        browser.sleep(globalTimeout);

        element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
            browser.sleep(globalTimeout);
            expect(element(by.xpath(datos.seccionResultado)).getText()).toEqual(datos.resultado);
        });
      });
    });
  });
