const calculation =  require('./utills/calculation');
const  Validation =  require('./utills/inputValidation');

// تابع محاسبه تاریخ
function prepration(date,convertKind,InputFormat,OutPutFormat,output){

    // درصورتی که تبدیل تاریخ از میلادی به شمسی باشد
    if(convertKind === 'fa')
    {
        // این تابع در تمامی فرمت‌ها تعریف شده و وظیفه جداسازی سال، ماه، روز و ساعت 
        // را از هم دارد
        let GDate =  InputFormat.date_splicer(date);
        
        // console.log('ff',GDate); return;
        // اعنبار سنجی 
        if(!Validation.DataValidator(Number(GDate[0]),Number(GDate[1]),Number(GDate[2]))){
          return;
        }
        // دریافت اطلاعات زمان
        let Hours = GDate[3] === undefined ? [0,0,0] : GDate[3];

        // تبدیل تاریخ
        let TempJDate = calculation.toJalaali(Number(GDate[0]),Number(GDate[1]),Number(GDate[2]));

        // این تابع در تمامی فرمت‌ها تعریف شده و وظیفه به هم چسباندن سال، ماه، روز و ساعت 
        // را به هم دارد
        return OutPutFormat.date_merger({...TempJDate, hours:Hours},calculation.find_seperator(output),GDate[0]+'/'+GDate[1]+'/'+GDate[2]);
         
    }
    // درصورتی که تبدیل تاریخ از شمسی به میلادی باشد 
    else if (convertKind === 'en'){
      
      // این تابع در تمامی فرمت‌ها تعریف شده و وظیفه جداسازی سال، ماه، روز و ساعت 
      // را از هم دارد
      let GDate =  InputFormat.date_splicer(date);

      // console.log(GDate); return;
      if(!Validation.DataValidator(Number(GDate[0]),Number(GDate[1]),Number(GDate[2]))){
        return;
      }

      // دریافت اطلاعات زمان
      let Hours = GDate[3] === undefined ? [0,0,0] : GDate[3];

      // تبدیل تاریخ
      let TempJDate = calculation.toGregorian(Number(GDate[0]),Number(GDate[1]),Number(GDate[2]));

      // console.log(TempJDate)
      // این تابع در تمامی فرمت‌ها تعریف شده و وظیفه به هم چسباندن سال، ماه، روز و ساعت 
      // را به هم دارد
      return OutPutFormat.date_merger({...TempJDate, hours:Hours},calculation.find_seperator(output));
    }
}

module.exports = prepration;