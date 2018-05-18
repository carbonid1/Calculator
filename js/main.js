function Calculator() {
  this.currentNumber = "";
  this.expression = "";
  this.finalNum = 0;
  this.prevTokenIsEquals = false;
  this.prevTokenIsAction = true;
}

Calculator.prototype.token = function(token) {
  if (this.prevTokenIsAction && token == "/" ||
    this.prevTokenIsAction && token == "*" ||
    this.prevTokenIsAction && token == "+" ||
    this.prevTokenIsAction && token == "-") {
    // do nothing
  } else if (token == "/" || token == "*" || token == "+" || token == "-") {
    this.currentNumber = `${token}`;
    this.expression += `${token}`;
    this.updateScreen();
    this.prevTokenIsEquals = false;
    this.prevTokenIsAction = true;
  } else if (token == "=") {
    this.finalNum = this.evaluate();
    this.currentNumber = this.finalNum;
    this.expression += "=" + this.finalNum;
    if (this.currentNumber.length > 8 || this.expression.length > 20) {
      upperScreenP.textContent = "0";
      lowerScreenP.textContent = "digit limit met";
      this.currentNumber = "";
      this.expression = "";
    } else {
      upperScreenP.textContent = this.finalNum;
      lowerScreenP.textContent += "=" + this.finalNum;
      this.currentNumber = "";
      this.expression = this.finalNum;
    }
    this.prevTokenIsEquals = true;
    this.prevTokenIsAction = false;
  } else if (token == "AC") {
    this.prevTokenIsAction = true;
    this.currentNumber = "";
    this.expression = "";
    upperScreenP.textContent = "0";
    lowerScreenP.textContent = "0";
  } else if (token == "CE") {
    if (this.expression == "") {
      upperScreenP.textContent = "0";
      lowerScreenP.textContent = "0";
    } else if (this.prevTokenIsEquals) {
      this.currentNumber = "";
      this.expression = "";
      upperScreenP.textContent = "0";
      lowerScreenP.textContent = "0";
    } else if (this.prevTokenIsAction && this.expression != "0") {
      this.expression = this.expression.slice(0, -1);
      this.currentNumber = this.evaluate();
      upperScreenP.textContent = this.currentNumber;
      lowerScreenP.textContent = this.expression;
      this.prevTokenIsAction = false;
    } else {
      if (this.findNumbersAndDots() == this.expression.length) {
        this.currentNumber = "";
        this.expression = "";
        upperScreenP.textContent = "0";
        lowerScreenP.textContent = "0";
      } else {
        let lastNumbers = this.findLastNumber();
        this.expression = this.expression.slice(0, -(lastNumbers.length) - 1);
        this.currentNumber = this.evaluate();
        upperScreenP.textContent = this.currentNumber;
        lowerScreenP.textContent = this.expression;
      }
    }
  } else if (token == "." && this.findDotsAmount() >= 1) {
    //do nothing
  } else {
    if (this.prevTokenIsEquals) {
      this.currentNumber += `${token}`;
      this.expression = `${token}`;
      this.prevTokenIsEquals = false;
      this.updateScreen();
    } else if (this.prevTokenIsAction) {
      this.currentNumber = `${token}`;
      this.expression += `${token}`;
      this.updateScreen();
    } else {
      this.currentNumber += `${token}`;
      this.expression += `${token}`;
      this.updateScreen();
    }
    this.prevTokenIsAction = false;
  }
}

Calculator.prototype.evaluate = function() {
  return eval(this.expression);
}

Calculator.prototype.findLastNumber = function() {
  let str = this.expression;
  let arr = str.match(/\d+$/);
  return arr[0];
}

Calculator.prototype.findNumbersAndDots = function() {
  let str = this.expression;
  let arr = str.match(/[.0-9]/g);
  return arr.length;
}

Calculator.prototype.findDotsAmount = function() {
  let str = this.currentNumber;
  let arr = str.match(/\./g);
  if (arr == null) {
    return 0;
  } else {
    return arr.length;
  }
}

Calculator.prototype.updateScreen = function() {
  if (this.currentNumber.length > 8 || this.expression.length > 20) {
    upperScreenP.textContent = "0";
    lowerScreenP.textContent = "digit limit met";
    this.currentNumber = "";
    this.expression = "";
  } else {
    upperScreenP.textContent = this.currentNumber;
    lowerScreenP.textContent = this.expression;
  }
}

let calculator = new Calculator;

let upperScreenP = document.querySelector(".screen #currentNumber");
let lowerScreenP = document.querySelector(".screen #expression");
const uiContainer = document.querySelector(".ui-container");

uiContainer.addEventListener("click", function(event) {
  if (event.target.dataset.token) {
    let token = event.target.dataset.token;
    calculator.token(token);
  }
});

//keybord support
document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case "NumpadMultiply":
      calculator.token("*");
      break;
    case "NumpadDivide":
    case "Slash":
      calculator.token("/");
      break;
    case "NumpadSubtract":
    case "Minus":
      calculator.token("-");
      break;
    case "NumpadAdd":
      calculator.token("+");
      break;
    case "Period":
      calculator.token(".");
      break;
    case "Equal":
    case "Enter":
    case "NumpadEnter":
      calculator.token("=");
      break;
    case "Escape":
      calculator.token("AC");
      break;
    case "Backspace":
      calculator.token("CE");
      break;
    case "Digit0":
    case "Numpad0":
      calculator.token("0");
      break;
    case "Digit1":
    case "Numpad1":
      calculator.token("1");
      break;
    case "Digit2":
    case "Numpad2":
      calculator.token("2");
      break;
    case "Digit3":
    case "Numpad3":
      calculator.token("3");
      break;
    case "Digit4":
    case "Numpad4":
      calculator.token("4");
      break;
    case "Digit5":
    case "Numpad5":
      calculator.token("5");
      break;
    case "Digit6":
    case "Numpad6":
      calculator.token("6");
      break;
    case "Digit7":
    case "Numpad7":
      calculator.token("7");
      break;
    case "Digit8":
    case "Numpad8":
      calculator.token("8");
      break;
    case "Digit9":
    case "Numpad9":
      calculator.token("9");
      break;
  }
});
