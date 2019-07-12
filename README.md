# zaravand-jallali-date
calculate gregorian date to jallali date and reverse

<p dir="rtl">
تاریخ جلالی زراوند یک کتابخانه براساس زبان جاوااسکریپت در محیط اجرایی نود است، که جهت تبدیل تاریخ میلادی به شمسی و بلعکس می‌توان از آن استفاده کرد.
</p>

<div dir="rtl">
    از آنجایی که بیشتر کاربران این کتابخانه فارسی زبان هستند، تا حد امکان سعی شده اسناد آن به زبان فارسی تهیه شود.
</div>



## <div dir="rtl" >فهرست</div>





### <div dir="rtl" >نصب</div>

<p dir="rtl">
    برای نصب این کتابخانه می‌توانید از سیستم مدیرت بسته نود استفاده کنید:
</p>

```javascript
    npm install zaravand-jallali-date
```

<p dir="rtl">
    درصورتی که از  یارن برای نصب استفاده می‌کنید:
</p>

```javascript
    yarn add zaravand-jallali-date
```





### <div dir="rtl" >استفاده سریع</div>

<p dir="rtl">
    جهت استفاده سریع از این کتابخانه و تبدیل تاریخ مورد نظر خود، کافی‌ست دستورالعمل زیر را به کار بگیرید
</p>

```javascript
    const Zaravand = require("zaravand-jallali-date");
    // [or] import Zaravand from "zaravand-jallali-date";

    const _date = new Zaravand();

    //to jallali
    let result =  _date.convert("2019/7/12", "fa");  // 1398/04/21   

    // to gregorian
    let result =  _date.convert("1398/04/21", "en");  // 2019/07/12 

```



### <div dir="rtl" >آموزش قدم به قدم</div>

<div dir="rtl">
    1. فراخوانی کتابخانه - 
    ابتدا با استفاده از دستور زیر کتابخانه را به کدهای خود اضافه کنید
</div>

```javascript
    const Zaravand = require("zaravand-jallali-date");
    // [or] import Zaravand from "zaravand-jallali-date";
```

<div dir="rtl">
    2. ایجاد یک شی از کلاس زراوند
</div>

```javascript
    const _date = new Zaravand();
```

<div dir="rtl">
    3. استفاده از متد convert<br/><br/>
</div>
<div dir="rtl">
    در شی تعریف شده یک متد با نام کانورت وجود دارد که وظیفه تبدیل تاریخ به عهده آن است
    این متد، 3 پارامتر به عنوان ورودی می‌گیرد که سومین پارامتر اختیاری بوده و برحسب نیاز شما وارد می‌شود
    <br/><br/>
</div>
<div dir="rtl">
     آرگومان نخست : تاریخ مورد نظر (اجباری)  <br/>
    این آرگومان از نوع رشته بوده و بایستی ساختاری متناسب با استانداردهای جهانی داشته باشد- در کتابخانه زراوند سعی شده  تمامی ساختارهای رایج نمایش تاریخ و زمان در نظر گرفته شود ازین رو جای نگرانی وجود ندارد(جدول کامل این ساختارها در ادامه آموزش آمده است)  - درصورتی که تاریخ ورودی ساختاری غیر قابل فهم برای کتابخانه داشته باشد خروجی null برگردانده می‌شود.
    <br/><br/>
</div>
<div dir="rtl">
     آرگومان دوم : نوع تبدیل (اجباری) <br/>
    این آرگومان از نوع رشته است و نوع تبدیل تاریخ برای کتابخانه را مشخص می‌کند- تبدیل از میلادی به شمسی یا شمسی به میلادی <br/>
    برای تبدیل به شمسی ---> fa <br/>
    برای تبدیل به میلادی ---> en <br/><br/>
</div>
<div dir="rtl">
     آرگومان سوم : ساختار خروجی (اختیاری) <br/>
    درصورتی که تمایل داشتید ساختار خروجی را خود تایین کنید می‌توانید از این آرگومان استفاده کنید - تمامی ساختار های خروجی در ادامه آمده است می‌توانی از آن‌ها بهره ببرید.
    <br/><br/>
</div>


```javascript
    let result =  _date.convert("date", "kind" , "format");
```

<div dir="rtl">
    جدول اطلاعات ورودی به متد convert
</div>

Name | type | amount | deafult 
--- | --- | --- | ---
date | string | - | -
kind | string | "fa" or "en" | -
format | string | - | "yyyy/mm/dd"


<div dir="rtl">
    لیست کامل فرمت‌ها : 
    <br/>
    فرمت‌های زیر قابل استفاده برای آرگومان date  و format  می‌باشند - توجه داشته باشید که فرمت‌های ستاره دار فقط مخصوص آرگومان فرمت هستند
    <br/><br/>
</div>

1.YYYY/MM/DD : ex. --> 2019/07/12 <br/>
2.DD/MM/YYYY : ex. --> 12/07/2019 <br/>
3.YYYY/MMM/DD : ex. --> 2019/July/12 <br/>
4.DD/MMM/YYYY : ex. --> 12/July/2019 <br/>
5.MMM/YYYY : ex. --> July/2019 <br/>
6.YYYY/MMM : ex. --> 2019/July <br/>
7.YYYY/MM/DD/WW : ex. --> 2019/07/12 - Friday <br/>
8.YYYY/MMM/DD/WW : ex. --> 2019/July/12 - Friday <br/>
9.YYYY/MM/DDTHH:MM:SS.S : ex. --> 2019/07/12 T 00:00:0 <br/>

10.HH:MM:SS *  : ex. --> 00:00:00 <br/>
11.HH:MM * : ex. --> 00:00 <br/>
12.RAW * : ex. --> object <br/>

<div dir="rtl">
    مثال <br/>
    <br/>
</div>

syntax | output format | result
--- | --- | ---
 _date.convert("2019/7/12", "fa" , "DD/MM/YYYY") | "DD/MM/YYYY" | 21/04/1398
 _date.convert("2019/7/12", "fa" , "YYYY/MMM/DD") | "YYYY/MMM/DD" |1398/تیرl/21
 _date.convert("2019/7/12", "fa" , "DD/MMM/YYYY") | "DD/MMM/YYYY" |21/تیرl/1398
 _date.convert("2019/7/12", "fa" , "MMM/YYYY") | "MMM/YYYY" |تیرl/1398
 _date.convert("2019/7/12", "fa" , "YYYY/MMM") | "YYYY/MMM" |تیر/1398
 _date.convert("2019/7/12", "fa" , "YYYY/MM/DD/WW") | "YYYY/MM/DD/WW" |1398/04/21 - جمعه
 _date.convert("2019/7/12", "fa" , "YYYY/MMM/DD/WW") | "YYYY/MMM/DD/WW" |1398/تیرl/21 - جمعه
 _date.convert("2019/7/12T22:22:22.12", "fa" , "YYYY/MM/DDTHH:MM:SS.S") | "YYYY/MM/DDTHH:MM:SS.S" | 1398/04/21 T 22:22:22.12
 _date.convert("2019/7/12T22:22:22.12", "fa" , "HH:MM:SS") | "HH:MM:SS" * | 22:22:22
 _date.convert("2019/7/12T22:22:22.12", "fa" , "HH:MM") | "HH:MM" * | 22:22
 _date.convert("2019/7/12T22:22:22.12", "fa" , "RAW") | "RAW" * | {Month: "تیر",day: 21,dweek: "جمعه",hour: 22,minute: 22,month: 4,second: 22.12,year: 1398,}
