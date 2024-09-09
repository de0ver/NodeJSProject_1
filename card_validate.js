import {el, setChildren} from 'redom';
import bootstrap from 'bootstrap';
import * as validator from 'card-validator';
//https://www.npmjs.com/package/card-validator

function checkCardNumber()
{
    let number = document.getElementById('getCardNum');
    let date = document.getElementById('getCardDate');
    let image = document.getElementById('bankLogo');
    let checkDate = validator.expirationDate(date.value, (new Date().getFullYear() % 100)).isValid; //https://www.npmjs.com/package/card-validator?activeTab=readme#:~:text=valid.expirationDate(value%3A%20string%7Cobject%2C%20maxElapsedYear%3A%20integer)%3A%20object
    //в описании написано что expirationDate возвращает object, а в реальности boolean
    let checkNumber = validator.number(number.value);
    let imagesArr = new Map([  //node_modules\credit-card-type\dist\types.d.ts
        ['American Express', 'https://www.svgrepo.com/show/473532/americanexpress.svg'],
        ['Diners Club', 'https://www.svgrepo.com/show/361985/diners-2.svg'],
        ['Discover', 'https://www.svgrepo.com/show/473587/discover.svg'],
        ['Elo', 'https://www.svgrepo.com/show/361992/elo-2.svg'],
        ['Hiper', 'https://www.svgrepo.com/show/328065/hiper.svg'],
        ['Hipercard', 'https://www.svgrepo.com/show/328082/hipercard.svg'],
        ['JCB', 'https://www.svgrepo.com/show/362000/jcb-2.svg'],
        ['Maestro', 'https://www.svgrepo.com/show/362010/maestro-old-1.svg'],
        ['Mastercard', 'https://www.svgrepo.com/show/362017/mastercard-old-1.svg'],
        ['Mir', 'https://www.svgrepo.com/show/328067/mir.svg'],
        ['UnionPay', 'https://i7.uihere.com/icons/631/896/3/unionpay-3989e4b888e59ebbaf3d3e564c3d00f1.png'],
        ['Visa', 'https://www.svgrepo.com/show/473823/visa.svg']
    ]
    )
    const errorMessageN = document.getElementById('errorMessageNum');
    const errorMessageD = document.getElementById('errorMessageDate');
    
    if (!checkDate)
    {
        if ((date.value.substring(3, 5)) < new Date().getFullYear() % 100)
            errorMessageD.textContent = 'Credit Card Date is outdated';
        else
            errorMessageD.textContent = `Date type: mm/yy (${formatDate(new Date())})`;
        errorMessageD.style.color = 'red'; 
    } else {
        errorMessageD.textContent = 'Credit Card Date not outdated!';
        errorMessageD.style.color = 'green'; 
    }
    
    //if (!(/^\d{8,19}$/.test(number.value)))
    if (!checkNumber.isValid) //!1234567891234567 || !1234 5678 9123 4567
    {
        errorMessageN.textContent = 'Enter a valid Credit Card Number (exactly 13-19 digits)';
        errorMessageN.style.color = 'red'; 
    } else {
        errorMessageN.textContent = 'Credit Card Number valid!';
        errorMessageN.style.color = 'green';
    }

    if (!(checkNumber.isValid) || !(checkDate))
        return;

    if (imagesArr.has(checkNumber.card.niceType))
        return image.src = imagesArr.get(checkNumber.card.niceType);

    return console.log(`Type: ${checkNumber.card.niceType}`);
}

function formatDate(date) //https://learn.javascript.ru/datetime#%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D0%B4%D0%B0%D1%82:~:text=formatDate(date)%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%B0%D1%8F%20%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%20%D0%B4%D0%B0%D1%82%D1%83%20date%20%D0%B2%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B5%20%D0%B4%D0%B4.%D0%BC%D0%BC.%D0%B3%D0%B3%3A
{
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return mm + '/' + yy;
}

function createForm()
{
    return el('div', {className: 'container'}, 
                el('form', {className: 'cardCheck', action: ''}, 
                    [
                        el('h1', 'Card validate', {}), 
                        el('div', {className: 'card'}, 
                            [
                                el('label', 'Enter card number: ', {for: 'getCardNum'}), 
                                el('input', {type: 'text', id: 'getCardNum', minlength: '8', maxlength: '19'}), //4 * 4 + 3 пробела = 19 символов https://en.wikipedia.org/wiki/Payment_card_number#:~:text=Payment%20card%20numbers%20are%20composed%20of%208%20to%2019%20digits
                                el('small', {id: 'errorMessageNum', className: 'form-text'}),
                                el('label', 'Enter card date: ', {for: 'getCardDate'}),
                                el('input', {type: 'text', id: 'getCardDate', pattern: '\d{2}\/\d{2}', maxlength: '5', size: '5'}), //mm.yy 09/24
                                el('small', {id: 'errorMessageDate', className: 'form-text'}),
                                el('button', 'Check!', {type: 'button', onclick: checkCardNumber}),
                                el('img', {src: '', id: 'bankLogo'/*, alt: 'Here card bank logo'*/}),
                            ]), 
                    ]
                 )
            );
}

setChildren(window.document.body, createForm());