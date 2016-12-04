var vm = new Vue({
  el: '#calculator',
  data: {
    num1: '',
    num2: '',
    displayNum: '0',
    currentNumArr: [],
    currentOperator: ''
  },
  methods: {
    createNumber: function(num) {
      if (this.currentOperator === 'equals') {
        this.num1 = '';
      }
      var self = this;
      var obj = self.currentNumArr;
      if (obj.length > 11) {
        return;
      }
      if (obj.length === 0 && num === '.') {
        obj.push('0');
      }
      obj.push(num);
      self.displayNum = obj.join('');
    },
    clear: function() {
      this.currentNumArr = [];
      this.displayNum = '0';
      this.num1 = '';
      this.num2 = '';
    },
    back: function() {
      var obj = this.currentNumArr;
      obj.pop();
      if (obj.length === 0) {
        this.displayNum = '0';
      } else {
        this.displayNum = obj.join('');
      }
    },
    operate: function(method) {
      if (this.currentNumArr.length > 0) {
        this.num2 = parseFloat(this.currentNumArr.join(''));
        this.currentNumArr = [];
      }
      if (method === 'percent') {
        this.num2 = this.num2 * this.num1/100.0;
        this.displayNum = this.num2;
      } else {
        if (typeof(this.num1) === 'number') {
          this.doMethod(this.currentOperator);
          this.roundNumber();        
        } else {
          this.num1 = this.num2;
        }
      }
        
      if (method === 'equal') {
        this.doMethod(this.currentOperator);
        this.roundNumber();
        this.currentOperator = '';
      } else if (method !== 'percent') {
        this.currentOperator = method;
      }
    },
    add: function() {
      this.num1 = this.num1 + this.num2;
    },
    subtract: function() {
      this.num1 = this.num1 - this.num2;
    },
    multiply: function() {
      this.num1 = this.num1 * this.num2;
    },
    divide: function() {
      this.num1 = this.num1 / this.num2;
    },
    doMethod: function(method) {
      if (method === 'add') {
        this.add();
      } else if (method === 'subtract') {
        this.subtract();
      } else if (method === 'multiply') {
        this.multiply();
      } else if (method === 'divide') {
        this.divide();
      }
    },
    roundNumber: function() {
      var precision = this.precision(this.num1);
      if (precision) {
        this.num1 = this.round(this.num1, precision);
        this.displayNum = this.num1;
      } else {
        this.displayNum = 'Digit Limit Met';
        this.num1 = '';
        this.num2 = '';
      }
    },
    precision: function(num) {
      var parts = num.toString().split('.');
      var wholeNumLength = parts[0].length;
      if (wholeNumLength > 12) {
        return false;
      } else {
        return 12 - wholeNumLength;
      }
    },
    round: function(number, precision) {
      var factor = Math.pow(10, precision);
      var tempNumber = number * factor;
      var roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
    }
  },
  filters: {
    numberWithCommas: function(num) {
      if (isNaN(num)) {
        return 'Error'
      }
      var parts = num.toString().split('.');
      var wholeNum = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (parts.length === 2) {
        return wholeNum + '.' + parts[1];
      } else {
        return wholeNum;
      }
    }
  }
});
