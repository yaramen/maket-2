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

test('Показывается загрузка при отправке данных', () => {
  return client
    .setValue('.auth__field.-login', 'yara')
    .setValue('.auth__field.-password', 'yara')
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
