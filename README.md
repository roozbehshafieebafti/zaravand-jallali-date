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
    let result =  _date.convert("2019/7/12", "fa");  // 2019/07/12 

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

