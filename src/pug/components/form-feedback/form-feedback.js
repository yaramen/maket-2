import Vue from 'vue';

const VALID = 0;
const ERROR_MIN_LENGTH = 1;
const ERROR_FORMAT = 2;

const validateSettings = {
  name: {
    minLength: 5,
  },
  email: {
    minLength: 5,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  message: {
    minLength: 10,
  },
};

new Vue({
  el: "#form-feedback-component",
  template: '#form-feedback',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      validation: {},
      errors: []
    };
  },
  methods: {
    submit() {
      this.validateData();
      if(this.isValidAll()) {
        console.log('valid all');
      }
    },
    onChangeData(e) {
      const fieldName = e.target.id;
      this[fieldName] = e.target.value;
      this.validateField(fieldName);
    },
    validateData() {
     Object.keys(validateSettings).forEach(fieldName => {
       this.validateField(fieldName);
      });
    },
    initValidateData() {
      Object.keys(validateSettings).map(fieldName => {
        this.validation[fieldName] = VALID;
      });
    },
    validateField(fieldName) {
      this.validation = {
        ...this.validation,
        [fieldName]: this.isValid(fieldName)
      };
    },
    isValid(fieldName) {
      const validSetting = validateSettings[fieldName];
      const checkingField = this[fieldName];
      if(checkingField.length < validSetting.minLength) {
        return ERROR_MIN_LENGTH;
      }

      return (!validSetting.reg || (validSetting.reg && validSetting.reg.test(checkingField))) ?
            VALID:
            ERROR_FORMAT;
    },
    isValidAll() {
      return Object.values(this.validation).every(el => el === VALID);
    }
  },
  created() {
    this.initValidateData();

    this.errors[ERROR_MIN_LENGTH] = "Короткий текст!";
    this.errors[ERROR_FORMAT] = "Неверный формат!";
  }
});
