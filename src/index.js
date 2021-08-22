function eval() {
    // Do not use eval!!!
    return;
}




function expressionCalculator(expr) {
    let exprString = expr.trim().split(" ").join("");
    let arr = [];
    let brackets = 0;

    for (let i = 0; i < exprString.length; i++) {
        for (let j = 0; j < exprString.length; j++) {
            if (!isNaN(+exprString[i + j])) continue;
            if (j) {
                arr.push(+exprString.slice(i, i + j));
            }
            if (i + j < exprString.length) {
                arr.push(exprString[i + j])
                if (exprString[i + j] === "(") {
                    brackets++;
                }
                if (exprString[i + j] === ")") {
                    brackets--;
                }
                if ((exprString[i + j] === "/") && (exprString[i + j + 1] === "0")) {
                    throw "TypeError: Division by zero.";
                }
            }
            i += j;
            break;
        }
    }
    if (brackets) {
        throw "ExpressionError: Brackets must be paired";
    }

    const priority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }

    const arrExit = [];
    const stack = [];
    arr.forEach((el, index) => {
        if (!isNaN(el)) {
            arrExit.push(el);

        } else {

            if (el !== ")") {
                if (priority[el] <= priority[stack[stack.length - 1]])
                    arrExit.push(stack.pop());
                stack.push(el);
            } else {
                while (stack[stack.length - 1] !== "(") {
                    arrExit.push(stack.pop());
                }
                stack.pop();
            }
        }
    });

    while (stack.length) {
        arrExit.push(stack.pop());
    }

    const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
    }

    const result = [];

    arrExit.forEach(el => {
        if (el in operators) {
            let [y, x] = [result.pop(), result.pop()];
            result.push(operators[el](x, y))
        } else {
            result.push(el);
        }
    })


    return result.pop();
    console.log(expr);
    console.log(arrExit);




}

module.exports = {
    expressionCalculator
}