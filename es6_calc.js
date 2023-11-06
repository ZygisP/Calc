// Kintamieji
let operator_value;
let last_btn;
let calc_operator;
let total;
let displayed_num = null;
let operation_history = null;
let operator = null;
let equal_sign = null;
let dot = null;
let firstNum = true;

// Skaiciu masyvas vartotojo operacijoje
let nums = [];

// Kopijavimui
const key_combination = [];
// Loginiai operatoriai
const operators = ["+", "-", "/", "*"];

// Gauname mygtuko skaiciu arba operatoriu
const get_btn_num = (button) =>
{
    last_btn = button;
    operator = document.getElementsByClassName("operator");
    displayed_num = document.getElementById("box");
    operation_history = document.getElementById("last_operation_history");
    equal_sign = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    if (!operators.includes(button) && button !== equal_sign)
    {
        if (firstNum)
        {
            if (button === dot)
            {
                displayed_num.innerText = "0" + dot;
            } else
            {
                displayed_num.innerText = button;
            }
            firstNum = false;
        } else
        {
            if (displayed_num.innerText.length === 1 && displayed_num.innerText === "0")
            {
                if (button === dot)
                {
                    displayed_num.innerText += button;
                }
                return;
            }
            if (displayed_num.innerText.includes(dot) && button === dot)
            {
                return;
            }
            if (displayed_num.innerText.length === 20)
            {
                return;
            }
            if (button === dot && displayed_num.innerText === "-")
            {
                displayed_num.innerText = "-0" + dot;
            } else
            {
                displayed_num.innerText += button;
            }
        }
    } else
    {
        if (operator_value !== null && button === operator_value)
        {
            return;
        }

        if (button === "-" && displayed_num.innerText === "0")
        {
            displayed_num.innerText = button;
            firstNum = false;
            operator_value = button;
            showSelectedOperator();
            return;
        } else if (operators.includes(button) && displayed_num.innerText === "-")
        {
            return;
        } else if (button === "-" && operator_value === "-" && operation_history.innerText.includes("="))
        {
            return;
        }

        if (operators.includes(button))
        {
            if (typeof last_operator !== "undefined" && last_operator !== null)
            {
                calc_operator = last_operator;
            } else
            {
                calc_operator = button;
            }
            if (button === "*")
            {
                last_operator = "×";
            } else if (button === "/")
            {
                last_operator = "÷";
            } else
            {
                last_operator = button;
            }
            operator_value = button;
            firstNum = true;
            showSelectedOperator();
        }

        if (nums.length === 0)
        {
            nums.push(displayed_num.innerText);
            if (typeof last_operator !== "undefined" && last_operator !== null)
            {
                operation_history.innerText = displayed_num.innerText + " " + last_operator;
            }
        } else
        {
            if (nums.length === 1)
            {
                nums[1] = displayed_num.innerText;
            }
            let temp_num = displayed_num.innerText;

            if (button === equal_sign && calc_operator !== null)
            {
                const total = calculate(nums[0], nums[1], calc_operator);
                displayed_num.innerText = total;

                if (!operation_history.innerText.includes("="))
                {
                    operation_history.innerText += " " + nums[1] + " =";
                }

                temp_num = nums[0];

                nums[0] = total;
                operator_value = null;
                showSelectedOperator();

                const history_arr = operation_history.innerText.split(" ");
                history_arr[0] = temp_num;
                operation_history.innerText = history_arr.join(" ");
            } else if (calc_operator !== null)
            {
                operation_history.innerText = temp_num + " " + last_operator;
                calc_operator = button;
                nums = [];
                nums.push(displayed_num.innerText);
            }
        }
    }
};

// Nustatomas operatorius
const showSelectedOperator = () =>
{
    const elements = document.getElementsByClassName("operator");

    for (let i = 0; i < elements.length; i++)
    {
        elements[i].style.backgroundColor = "#2600e6";
    }

    switch (operator_value)
    {
        case "+":
            document.getElementById("addition").style.backgroundColor = "#2600e6";
            break;
        case "-":
            document.getElementById("subtraction").style.backgroundColor = "#2600e6";
            break;
        case "*":
            document.getElementById("multiplication").style.backgroundColor = "#2600e6";
            break;
        case "/":
            document.getElementById("division").style.backgroundColor = "#2600e6";
            break;
    }
};

// Apskaiciuojama suma
const calculate = (num1, num2, operator) =>
{
    switch (operator)
    {
        case "+":
            return parseFloat(num1) + parseFloat(num2);
        case "-":
            return parseFloat(num1) - parseFloat(num2);
        case "*":
            return parseFloat(num1) * parseFloat(num2);
        case "/":
            return parseFloat(num1) / parseFloat(num2);
        default:
            return parseFloat(displayed_num.innerText);
    }
};

// C mygtukas, perkrauna puslapį
const button_clear = () =>
{
    window.location.reload();
};

// CE mygtukas
const clear_entry = () =>
{
    displayed_num = document.getElementById("box");

    if (nums.length > 0 && typeof last_operator !== "undefined")
    {
        displayed_num.innerText = "0";
        const temp = nums[0];
        nums = [];
        nums.push(temp);
        firstNum = true;
    }
};

// Backspace mygtukas
const backspace_click = () =>
{
    displayed_num = document.getElementById("box");
    const elements = document.getElementsByClassName("operator");

    let last_num = displayed_num.innerText;
    last_num = last_num.slice(0, -1);

    displayed_num.innerText = last_num;

    if (displayed_num.innerText.length === 0)
    {
        displayed_num.innerText = "0";
        firstNum = true;
    }
};

// Kvadratine saknis
const square_root = () =>
{
    displayed_num = document.getElementById("box");
    const square_num = Math.sqrt(displayed_num.innerText);
    displayed_num.innerText = square_num;
    nums.push(square_num);
};

// kelimas laipsniu
const power_of = () =>
{
    displayed_num = document.getElementById("box");
    const square_num = Math.pow(displayed_num.innerText, 2);
    displayed_num.innerText = square_num;
    nums.push(square_num);
};
// PAPILDOMA LOGIKA
// +- operacija
const plus_minus = () =>
{
    displayed_num = document.getElementById("box");

    if (typeof last_operator !== "undefined")
    {
        if (nums.length > 0)
        {
            if (operators.includes(last_btn))
            {
                if (displayed_num.innerText === "-")
                {
                    displayed_num.innerText = "0";
                    firstNum = true;
                    return;
                } else
                {
                    displayed_num.innerText = "-";
                    firstNum = false;
                }
            } else
            {
                displayed_num.innerText = -displayed_num.innerText;
                if (nums.length === 1)
                {
                    nums[0] = displayed_num.innerText;
                } else
                {
                    nums[1] = displayed_num.innerText;
                }
            }
        }
        return;
    }

    if (displayed_num.innerText === "0")
    {
        displayed_num.innerText = "-";
        firstNum = false;
        return;
    }
    displayed_num.innerText = -displayed_num.innerText;
};

// 1/x operacija
const division_one = () =>
{
    displayed_num = document.getElementById("box");
    const square_num = 1 / displayed_num.innerText;
    displayed_num.innerText = square_num;
    nums.push(square_num);
};

// procentų skaičiavimas
const percentage_calc = () =>
{
    const elements = document.getElementsByClassName("operator");
    displayed_num = document.getElementById("box");

    if (nums.length > 0 && typeof last_operator !== "undefined")
    {
        const perc_value = (displayed_num.innerText / 100) * nums[0];
        if (!Number.isInteger(perc_value))
        {
            perc_value = perc_value.toFixed(2);
        }
        displayed_num.innerText = perc_value;
        nums.push(displayed_num.innerText);

        if (!operation_history.innerText.includes("="))
        {
            operation_history.innerText += " " + nums[1] + " =";
        }
    } else
    {
        displayed_num.innerText = displayed_num.innerText / 100;
    }

    nums.push(displayed_num.innerText);
    const res = calculate(nums[0], nums[1], last_operator);
    displayed_num.innerText = res;
    operator_value = "=";
};

// Keyboard input logika. Skaičiuotuvas veikia spaudžiant klaviatūros mygtukus
const keyPressed = (e) =>
{
    e.preventDefault();
    const equal = document.getElementById("equal_sign").value;
    const dot = document.getElementById("dot").value;

    if (e.key === "Delete")
    {
        button_clear();
        return;
    }

    const isNumber = isFinite(e.key);
    let enterPress;
    let dotPress;
    let commaPress = false;

    if (e.key === "Enter")
    {
        enterPress = equal;
    }
    if (e.key === ".")
    {
        dotPress = dot;
    }
    if (e.key === ",")
    {
        commaPress = true;
    }

    if (isNumber || operators.includes(e.key) || e.key === enterPress || dotPress || commaPress || e.key === "Backspace")
    {
        if (e.key === "Enter")
        {
            get_btn_num(enterPress);
        } else if (commaPress)
        {
            get_btn_num(dot);
        } else
        {
            get_btn_num(e.key);
        }
    }

    if (e.key)
    {
        key_combination[e.code] = e.key;
    }
};

// Copy and Paste logika
const keyReleased = (e) =>
{
    if (key_combination['ControlLeft'] && key_combination['KeyV'])
    {
        navigator.clipboard.readText().then(text =>
        {
            displayed_num = document.getElementById("box");
            const isNumber = isFinite(text);
            if (isNumber)
            {
                const copy_number = text;
                firstNum = true;
                get_btn_num(copy_number);
            }
        }).catch(err =>
        {
            console.error('Failed to read clipboard contents: ', err);
        });
    }
    if (key_combination['ControlLeft'] && key_combination['KeyC'])
    {
        displayed_num = document.getElementById("box");
        navigator.clipboard.writeText(displayed_num.innerText);
    }
    key_combination.length = 0;
    e.preventDefault();
};

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);
