
function SubmitThis() {
    var res = document.getElementById("strResult");
    var inp = document.getElementById("strInput").value;
    res.value = CountFormula(inp);
}

function CountFormula(input) {
    var formula = "" + input,
    operandSym = /\s*[0-9\.]\s*/,
    operatorSym = /\s*[+\-*/=]\s*/,

    currentOperand = "",
    currentOperator = "",
    //rgxCorrectOperand = /(\[1-9][0-9]*(?:\.[0-9]*)?)|(\0\.[0-9]*[1-9])|0/g,
    rgxCorrectOperand = /[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]*[1-9]|0/g,

    index = 0,
    result = "";
    formula = formula.replace(/\s/g, "");

    //find first operand
    if (operatorSym.test(formula[index])) {
        return "wrong input: formula must start from operand";
    }
    else {
        while ((index < formula.length) && (operandSym.test(formula[index]))) {
            result += formula[index];
            index++;
        }

        if (!result.match(rgxCorrectOperand)) {
            return "wrong input: operand is not a number " + result;
        }// ! check correct operand
        else {
            result = +result;
        }
    }

    while (index < formula.length) {

        if (operatorSym.test(formula[index])) {   // make operator

            while ((index < formula.length) && (operatorSym.test(formula[index]))) {
                currentOperator += formula[index];
                index++;
            }

            if (currentOperator.length > 1) {
                return "wrong input, operator is incorrect: " + currentOperator;
            }

            if ((currentOperator === "=") && (index == formula.length)) {
                return result.toFixed(2);
            }
            else if ((currentOperator === "=") && (index < formula.length)) {
                return "wrong input: '=' must be the last symbol in formula";
            }
        }
        else if (operandSym.test(formula[index])) { // make operand

            while ((index < formula.length) && (operandSym.test(formula[index]))) {
                currentOperand += formula[index];
                index++;
            }

            if (!currentOperand.match(rgxCorrectOperand)) {
                return "wrong input: operand is not a number " + result;
            }// ! check correct operand            

            switch (currentOperator) {
                case "+":
                    result += +currentOperand;
                    break;
                case "-":
                    result -= +currentOperand;
                    break;
                case "*":
                    result *= +currentOperand;
                    break;
                case "/":
                    result /= +currentOperand;
                    break;
                default:
                    return "wrong input: missed operator";
            }

            currentOperator = "";
            currentOperand = "";         
        }
        else {
            return "wrong input:"+ formula[index] +" is not allowed";
        }
    }
}
