import { browser, by, element, protractor } from 'protractor';

var globalTimeout = 1000;
var shortGlobalTimeout = 100;
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
var PrecioFinal = '-1';
var baseImponible = '-1';
var activo = 'option[value=\'S\']';
var seccionResultado = '/html/body/div[3]/form/div/div[1]/div[2]/div[4]/div/span';
var resultado = 'El costo no puede ser menor a cero.';

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

  it(titulo, async () => {
    browser.sleep(2000);
    element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css(tipoCodigo)).click();
    browser.sleep(shortGlobalTimeout);
    element(by.name('codigo')).sendKeys(codigo);
    browser.sleep(shortGlobalTimeout);
    element(by.name('codigo_hacienda')).sendKeys(codigoHacienda);
    browser.sleep(shortGlobalTimeout);
    element(by.name('descripcion')).sendKeys(descripcion);
    browser.sleep(shortGlobalTimeout);
    element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css(productoUnidad)).click();
    browser.sleep(shortGlobalTimeout);
    element(by.xpath('//*[@id="moneda_id"]')).element(by.css(moneda)).click();
    browser.sleep(shortGlobalTimeout);
    element(by.name('partida_arancelaria')).sendKeys(partidaArancelaria);
    browser.sleep(shortGlobalTimeout);
    element(by.xpath('//*[@id="impuesto_id"]')).element(by.css(impuesto)).click();
    browser.sleep(shortGlobalTimeout);
    element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css(impProrrata)).click();
    browser.sleep(shortGlobalTimeout);
    element(by.name('costo')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   costo);
    browser.sleep(shortGlobalTimeout);
    element(by.name('utilidad')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   utilidad);
    browser.sleep(shortGlobalTimeout);
    element(by.name('precio_sin_impuesto')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   precioSinImpuesto);
    browser.sleep(shortGlobalTimeout);
    element(by.name('PrecioFinal')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   PrecioFinal);
    browser.sleep(shortGlobalTimeout);
    element(by.name('base_imponible')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   baseImponible);
    browser.sleep(shortGlobalTimeout);
    element(by.xpath('//*[@id="activo"]')).element(by.css(activo)).click();
    browser.sleep(globalTimeout);

    element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
        browser.sleep(globalTimeout);
        expect(element(by.xpath(seccionResultado)).getText()).toEqual(resultado);
    });
  });
/*
  it('Crear un producto o servicio sin costo', async () => {
    browser.sleep(2000);
    element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css('option[value=\'01\']')).click();
    browser.sleep(2000);
    element(by.name('codigo')).sendKeys('123456678');
    browser.sleep(2000);
    element(by.name('codigo_hacienda')).sendKeys('5546312');
    browser.sleep(2000);
    element(by.name('descripcion')).sendKeys('Esto es un producto');
    browser.sleep(2000);
    element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css('option[value=\'1\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="moneda_id"]')).element(by.css('option[value=\'7\']')).click();
    browser.sleep(2000);
    element(by.name('partida_arancelaria')).sendKeys('');
    browser.sleep(2000);
    element(by.xpath('//*[@id="impuesto_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="activo"]')).element(by.css('option[value=\'S\']')).click();
    browser.sleep(2000);
    element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
        browser.sleep(2000);
        expect(element(by.xpath('//*[@id="toast-container"]/div/div[2]')).getText()).toEqual('La acción ha sido realizada con éxito');
    });
  });

  it('Creación de un producto o servicio con utilidad negativa', async () => {
    browser.sleep(2000);
    element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css('option[value=\'01\']')).click();
    browser.sleep(2000);
    element(by.name('codigo')).sendKeys('123456678');
    browser.sleep(2000);
    element(by.name('codigo_hacienda')).sendKeys('5546312');
    browser.sleep(2000);
    element(by.name('descripcion')).sendKeys('Esto es un producto');
    browser.sleep(2000);
    element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css('option[value=\'1\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="moneda_id"]')).element(by.css('option[value=\'7\']')).click();
    browser.sleep(2000);
    element(by.name('partida_arancelaria')).sendKeys('');
    browser.sleep(2000);
    element(by.xpath('//*[@id="impuesto_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.name('costo')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '58');
    browser.sleep(2000);
    element(by.name('utilidad')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.name('precio_sin_impuesto')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.name('PrecioFinal')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '58');
    browser.sleep(2000);
    element(by.name('base_imponible')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.xpath('//*[@id="activo"]')).element(by.css('option[value=\'S\']')).click();
    browser.sleep(2000);

    element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
        browser.sleep(2000);
        expect(element(by.xpath('/html/body/div[3]/form/div/div[1]/div[2]/div[5]/div/span')).getText()).toEqual('La utilidad no puede ser menor a cero.');
    });
  });

  it('Creación de un producto o servicio con remuneración negativa', async () => {
    browser.sleep(2000);
    element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css('option[value=\'01\']')).click();
    browser.sleep(2000);
    element(by.name('codigo')).sendKeys('123456678');
    browser.sleep(2000);
    element(by.name('codigo_hacienda')).sendKeys('5546312');
    browser.sleep(2000);
    element(by.name('descripcion')).sendKeys('Esto es un producto');
    browser.sleep(2000);
    element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css('option[value=\'1\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="moneda_id"]')).element(by.css('option[value=\'7\']')).click();
    browser.sleep(2000);
    element(by.name('partida_arancelaria')).sendKeys('');
    browser.sleep(2000);
    element(by.xpath('//*[@id="impuesto_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.name('costo')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '490000');
    browser.sleep(2000);
    element(by.name('utilidad')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.name('precio_sin_impuesto')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.name('PrecioFinal')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.name('base_imponible')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.xpath('//*[@id="activo"]')).element(by.css('option[value=\'S\']')).click();
    browser.sleep(2000);

    element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
        browser.sleep(2000);
        expect(element(by.xpath('/html/body/div[3]/form/div/div[1]/div[2]/div[5]/div/span')).getText()).toEqual('La utilidad no puede ser menor a cero.');
    });
  });

  it('Creación de un producto o servicio con valores negativos y positivos', async () => {
    browser.sleep(2000);
    element(by.xpath('//*[@id="tipo_codigo"]')).element(by.css('option[value=\'01\']')).click();
    browser.sleep(2000);
    element(by.name('codigo')).sendKeys('123456678');
    browser.sleep(2000);
    element(by.name('codigo_hacienda')).sendKeys('5546312');
    browser.sleep(2000);
    element(by.name('descripcion')).sendKeys('Esto es un producto');
    browser.sleep(2000);
    element(by.xpath('//*[@id="producto_unidad_id"]')).element(by.css('option[value=\'1\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="moneda_id"]')).element(by.css('option[value=\'7\']')).click();
    browser.sleep(2000);
    element(by.name('partida_arancelaria')).sendKeys('');
    browser.sleep(2000);
    element(by.xpath('//*[@id="impuesto_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.xpath('//*[@id="imp_prorrata_asociado_id"]')).element(by.css('option[value=\'1191\']')).click();
    browser.sleep(2000);
    element(by.name('costo')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '99999998');
    browser.sleep(2000);
    element(by.name('utilidad')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.name('precio_sin_impuesto')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '99999998');
    browser.sleep(2000);
    element(by.name('PrecioFinal')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '0');
    browser.sleep(2000);
    element(by.name('base_imponible')).sendKeys('text was',
                   protractor.Key.CONTROL, 'a', protractor.Key.NULL,
                   '-1');
    browser.sleep(2000);
    element(by.xpath('//*[@id="activo"]')).element(by.css('option[value=\'S\']')).click();
    browser.sleep(2000);

    element(by.xpath('/html/body/div[3]/form/div/div[2]/div/input')).submit().then(() => {
        browser.sleep(2000);
        expect(element(by.xpath('/html/body/div[3]/form/div/div[1]/div[2]/div[5]/div/span')).getText()).toEqual('La utilidad no puede ser menor a cero.');
    });
  });*/


});
