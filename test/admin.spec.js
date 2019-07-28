const fs = require('fs');
const webdriverio = require('webdriverio');
const options = require('../wdio.conf');
const client = webdriverio.multiremote(options);

jest.setTimeout(30000);

beforeAll(() => {
  return client.init().url('http://localhost:8080/admin#/auth');
});

test('На странице есть кнопка “Авторизоваться”', () => {
  return client
    .isExisting('.auth__send')
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
});

test('Есть форма', () => {
  return client
    .isExisting('.auth__form')
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
});


test('Форма имеет все необходимые поля', () => {
  return client
    .isExisting('.auth__field.-login')
    .isExisting('.auth__field.-password')
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
});


test('Кнопка “Отправить” заблокирована до тех пор, пока не введены все необходимые данные', () => {
  return client
    .isEnabled('.auth__send').then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(false);
      }
    })
    .setValue('.auth__field.-login', 'yara')
    .isEnabled('.auth__send').then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(false);
      }
    })
    .setValue('.auth__field.-password', 'yara')
    .isEnabled('.auth__send').then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .submitForm('.auth__form')
    .isExisting('.main.-lock')
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
});

afterAll(() => {
  return client.end();
});
