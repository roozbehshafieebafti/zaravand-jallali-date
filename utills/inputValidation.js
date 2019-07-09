const Validator = (date, convertKind ,outputFormat) => {
    if(!dateValidator(date)){
        errorMessage(['تاریخ باید استرینگ باشد',date]);
        return false;
    }

    if(!convertKindValidator(convertKind)){
        errorMessage(['نوع تبدیل اشتباه است',convertKind]);
        return false;
    }

    if(!outputValidator(outputFormat)){
        errorMessage(['فرمت تاریخ خروجی باید از نوع استرینگ باشد',outputFormat]);
        return false;
    }

    return true;
}


const dateValidator = (date) => {
    return typeof(date) === 'string' ? true : false;
}

const convertKindValidator = (convertKind) => {
    return convertKind=== 'fa'  || convertKind === 'en'
}

const outputValidator = (outputFormat) => {
    return typeof(outputFormat) === 'string' ? true : false;
}


const errorMessage = (errorMessage) =>{
    console.log('Zaravand Message :' ,...errorMessage);
}


const DataValidator =(year,month,day)=>{
    if(typeof (year) === "number" && typeof (month) === "number" && typeof (day) === "number"){
        return true;
    }

    errorMessage('تاریخ ورودی شما قابل فهم برای برنامه نیست');
    return false
}


module.exports = {DataValidator , Validator}