# zaravand-jallali-date
calculate gregorian date to jallali date and reverse

<p dir="rtl">
تاریخ جلالی زراوند یک کتابخانه براساس زبان جاوااسکریپت در محیط اجرایی نود است، که جهت تبدیل تاریخ میلادی به شمسی و بلعکس می‌توان از آن استفاده کرد.
</p>

<div dir="rtl">
    از آنجایی که بیشتر کاربران این کتابخانه فارسی زبان هستند، تا حد امکان سعی شده اسناد آن به زبان فارسی تهیه شود.
</div>



## <div dir="rtl" >نصب</div>

<p dir="rtl">
    برای نصب این کتابخانه می‌توانید از سیستم مدیرت بسته نود (npm) استفاده کنید:
</p>

```javascript
    npm install zaravand-jallali-date
```

<p dir="rtl">
    درصورتی که از  yarn برای نصب استفاده می‌کنید:
</p>

```javascript
    yarn add zaravand-jallali-date
```





## <div dir="rtl" id="usage">استفاده سریع</div>

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
<div dir="rtl">
    جدا کننده‌های زیر برای تاریخ ورودی قابل قبول‌اند
    <br/><br/>
</div>

seprator | exampele
--- | ---
/ | 1398/01/01
\ | 1398\01\01
[space] | 1398 01 01
( - ) | 1398-01-01
 ( _ ) | 1398_01_01


## <div dir="rtl" id="steptosetp">آموزش قدم به قدم</div>

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
    در شی تعریف شده یک متد با نام convert وجود دارد که وظیفه تبدیل تاریخ به عهده آن است
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
    جدول آرگومان‌های ورودی به متد convert
</div>

Name | type | amount | deafult 
--- | --- | --- | ---
date | string | - | -
kind | string | "fa" or "en" | -
output format | string | - | "yyyy/mm/dd"


<div dir="rtl">
    لیست کامل فرمت‌ها : 
    <br/>
    فرمت‌های زیر قابل استفاده برای آرگومان date  و output format   می‌باشند - توجه داشته باشید که فرمت‌های ستاره دار فقط مخصوص آرگومان output format  هستند
    <br/><br/>
</div>

number|formats| example
--- | --- | ---
1|YYYY/MM/DD| 2019/07/12 
2|DD/MM/YYYY|12/07/2019 
3|YYYY/MMM/DD|2019/July/12 
4|DD/MMM/YYYY|12/July/2019 
5|MMM/YYYY|July/2019 
6|YYYY/MMM |2019/July 
7|YYYY/MM/DD/WW|2019/07/12 - Friday 
8|YYYY/MMM/DD/WW|2019/July/12 - Friday 
9|YYYY/MM/DDTHH:MM:SS|2019/07/12T12:20:30
10|DD/MM/YYYYTHH:MM:SS|2019/07/12T12:20:30
11|YYYY/MM/DDTHH:MM:SS.S|2019/07/12T12:20:30.134 
12|DD/MM/YYYYTHH:MM:SS.S|2019/07/12T12:20:30.134
13|HH:MM:SS *|00:00:00 
14|HH:MM *|00:00 
15|RAW *|object 

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
 _date.convert("2019/7/12T22:22:22.12", "fa" , "YYYY/MM/DDTHH:MM:SS") | "YYYY/MM/DDTHH:MM:SS" | 1398/04/21T22:22:22
 _date.convert("2019/7/12T22:22:22.12", "fa" , "DD/MM/YYYYTHH:MM:SS") | "DD/MM/YYYYTHH:MM:SS" | 21/04/1398T22:22:22
 _date.convert("2019/7/12T22:22:22.12", "fa" , "YYYY/MM/DDTHH:MM:SS.S") | "YYYY/MM/DDTHH:MM:SS.S" | 1398/04/21T22:22:22.12
 _date.convert("2019/7/12T22:22:22.12", "fa" , "DD/MM/YYYYTHH:MM:SS.S") | "DD/MM/YYYYTHH:MM:SS.S" | 21/04/1398T22:22:22.12
 _date.convert("2019/7/12T22:22:22.12", "fa" , "HH:MM:SS") | "HH:MM:SS" * | 22:22:22
 _date.convert("2019/7/12T22:22:22.12", "fa" , "HH:MM") | "HH:MM" * | 22:22
 _date.convert("2019/7/12T22:22:22.12", "fa" , "RAW") | "RAW" * | {Month: "تیر",day: 21,dweek: "جمعه",hour: 22,minute: 22,month: 4,second: 22.12,year: 1398,numeric: 1562953942120}


<div dir="rtl">
    4. استفاده از متدهای خاص<br/><br/>
    ممکن است شما بخواهید از یک تاریخ ورودی فقط سال، ماه، روز یا نام هفته را بیرون بکشید. در این صورت کافی است از متدهای زیر استفاده کنید
    <br/>
</div>
<div dir="rtl">
    آرگومان‌های ورودی در این متدها کاملا شبیه متد convert بوده با این تفاوت که آرگومان سوم در این توابع وجود ندارد. 
    <br/><br/>
</div>


method name | syntax | result
--- | --- | ---
year | _date.year(Date(),"fa") | 1398
Month | _date.Month(Date(),"fa") | تیر
month | _date.month(Date(),"fa") | 4
day | _date.day(Date(),"fa") | 21
week | _date.week(Date(),"fa") | جمعه
numeric | _date.numeric(Date(),"fa") | 1563203865000



## <div dir="rtl" id="usage">خطا یابی</div>
<div dir="rtl">
    در این کتابخانه در صورتی که خطایی در آرگومان‌های ورودی موجود باشد، نوع خطا در لاگ نمایش داده می‌شود.
</div>

## <div dir="rtl" id="usage">پیوند</div>
[read-more](https://zaravand.com/zaravand-jallali-date)