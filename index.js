const  Validation = require( "./utills/inputValidation");
const formating = require("./utills/formats");
const prepration =  require( "./prepration");

function ZaravandDate() {
  //  قالب‌های تاریخی پیش‌فرض جهت تایین نوع ورودی
  this.formats = formating.format;

  //تابع تغییر قالب تاریخ
  this.convert = function(date, convertKind, outputFormat = "YYYY/MM/DD") {
    /**
     * @date = تاریخ مورد نظر برای تغییر به شمسی یا میلادی
     * @convertKind = نوع تبدیل --> به شمسی یا میلادی --> fa یا en
     * @outputFormat = تایین فرمت خروجی
     */

    // ارزشیابی داده‌های ورودی از کاربر
    if (!Validation.Validator(date, convertKind, outputFormat)) {
      return null;
    }

    // findInputRegix= در صورتی که تاریخ ورودی با فرمت کارکتری ثبت شده یکسان باشد این مقدار صحیح میشود
    // formatIndex_Input= شاخص آرایه برای فرمت ورودی
    // findOutputFromat =  در صورتی که فرمت خروجی با یکی از فرمت های ثبت شده یکسان باشد این مقدار صحیح میشود
    // formatIndex_Output = شاخص آرایه برای فرمت خروجی
    let findInputRegix = false,
      formatIndex_Input = -1,
      findOutputFromat = false,
      formatIndex_Output = -1;

    // محاسبات جهت تایین فرمت ورودی
    for (let i = 0; i < this.formats.length; i++) {
      if(this.formats[i].dRegix === false) continue;
      if (this.formats[i].dRegix.test(date.trim())) {
        findInputRegix = true;
        formatIndex_Input = i;
        break;
      }
    }

    // محاسبات جهت تایین فرمت خروجی
    for (let i = 0; i < this.formats.length; i++) {
      if (this.formats[i].hRegix.test(outputFormat.trim())) {
        findOutputFromat = true;
        formatIndex_Output = i;
        break;
      }
    }

    // درصورتی که
    // date
    // ساختاری متناسب با فرمت‌های ثبت شده داشته باشد
    if (findInputRegix) {
      // درصورتی که
      // outputFormat
      // در فرمت‌های ثبت شده وجود داشته باشد
      if (findOutputFromat) {
        return prepration(
          date,
          convertKind,
          this.formats[formatIndex_Input],
          this.formats[formatIndex_Output],
          outputFormat
        );
      }
      // درصورتی که
      // outputFormat
      // در فرمت‌های ثبت شده وجود نداشته باشد
      else {
        this.showErrors([
          "فرمت‌های موجود در برنامه، با فرمت وارد شده تناسب ندارد"
        ]);
        this.showErrors(["فرمت خروجی شما = ", outputFormat]);
        this.showErrors(["آدرس گیت هاب میخواهد"]);
        return null;
      }
    }
    // درصورتی که
    // date
    // ساختاری متناسب با فرمت ورودی نداشته باشد
    else {
      this.showErrors(["فرمت‌های موجود با تاریخ وارد شده تناسب ندارد"]);
      this.showErrors(["تاریخ وارد شده= ", date]);
      this.showErrors(["آدرس گیت هاب میخواهد"]);
      return null;
    }
  };

  this.showErrors = errorArray => {
    console.log("Zaravand Message :", ...errorArray);
  };
}

module.exports = ZaravandDate;
