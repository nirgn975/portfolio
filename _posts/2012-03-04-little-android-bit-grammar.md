---
title: A little bit of Android Grammar
author: nirgn
layout: post
summary: ""
category: Android
---
בפוסט הזה אסקר ואסביר כמה מהמושגים (או Grammar)  היותר מתקדמים של מערכת ההפעלה Android.

> יש לציין כי רוב התמונות והמידע המתוארך נלקח מ Wikipedia.

<!--more-->

&nbsp;

### Android כמערכת הפעלה

**השכבה האדומה: Linux Kernel – (אנדרואיד היא לא לינוקס)**

ליבת לינוקס (<a href="http://en.wikipedia.org/wiki/Linux_kernel" target="_blank">Linux kernel</a>) היא הליבה המשמשת במערכות הפעלה ממשפחת לינוקס. השם "לינוקס" מתייחס אל ליבת המערכת, הקרנל (ליבה = בסיס המערכת), ז"א אלפי שורות קוד המהוות את הבסיס של מערכת ההפעלה.  
<img class="alignleft wp-image-775" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Layer.png" alt="Red_Layer" width="500" height="85" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Layer.png 1042w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Layer-300x51.png 300w" sizes="(max-width: 500px) 100vw, 500px" />כיום מקובל להשתמש בשם לינוקס למשפחה שלמה של מערכת הפעלה תואמות יוניקס, המשלבות את ליבת לינוקס עם ספריות וכלים מפרויקט גנו (<a href="http://en.wikipedia.org/wiki/GNU" target="_blank">GNU</a>). לפעמים גם מדובר על הפצות לינוקס שלמות (מערכות הפעלה שלמה הכוללות שרתי אינטרנט דוגמת <a href="http://en.wikipedia.org/wiki/Apache_HTTP_Server" target="_blank">Apache</a>, סביבות עבודה גרפיות דוגמת <a href="http://en.wikipedia.org/wiki/GNOME" target="_blank">Gnome</a> וחבילות ישומיים משרדיים דוגמת <a href="http://en.wikipedia.org/wiki/LibreOffice" target="_blank">Libre Office</a>).

בגלל שה Linux Kernel נמצא תחת רישיון GPL, כש Google או יצרני OEM (כמו <a href="http://en.wikipedia.org/wiki/HTC" target="_blank">HTC</a>, <a href="http://en.wikipedia.org/wiki/Samsung" target="_blank">SAMSUNG</a>, <a href="http://en.wikipedia.org/wiki/Motorola" target="_blank">MOTOROLA</a> וכ'ו) או יצרני המעבדים (כמו <a href="http://en.wikipedia.org/wiki/Qualcomm" target="_blank">Qualcomm</a> וכ'ו) משלבים את הקוד שלהם ב Kernel (המיועד לשימוש תחת מערכת ה Android), הם חייבים לדחוף את הקוד גם חזרה למעלה. וזה אומר, שכל קוד ש Google וכד' רוצות לשלב ב Kernel הן תשלב אותו גם כן בפרויקט המקורי, ולכן לכלום תיהיה גישה לקטע הקוד החדש ב Kernel (במילים אחרות: גוגל לא יכולה לבצע שימוש ב Linux Kernel, לשפצ'ר אותו, ולשמור את השיפוצ'רים החדשים רק לעצמה &#8211; היא חייבת לשתף את השאר).

&nbsp;

<span style="text-decoration: underline;">למה לינוקס קרנל?</span>

  * המחיר, לינוקס קרנל הינה חינמית.
  * המטרה הייתה ליצור פלטפורמת מובייל שתרוץ על כמה שיותר מכשירים, וההתאמה של לינוקס קרנל לרוץ על מעבדי <a href="http://en.wikipedia.org/wiki/ARM_architecture" target="_blank">ARM</a> של Nvidia,TI, Qualcomm וכ'ו, הינה קלה יחסית (מכיוון שמודל הדרייברים בלינוקס מובן מאוד).
  * הקרנל מספק ניהול תהליכים, ניהול זיכרון, קישוריות ועוד מוכנים מראש.
  * לינוקס קרנל מאובטחת ברמה גבוהה יחסית ומספקת בסיס טוב.

&nbsp;

<span style="text-decoration: underline;">גרסאות ה Android השונות מבוססות על גרסאות Kernel שונות:</span>  
אנדרואיד 1.5 &#8211; מבוססת על ליבת לינוקס 2.6.27.  
אנדרואיד 1.6 &#8211; מבוססת על ליבת לינוקס 2.6.29.  
אנדרואיד 2.0/2.1 &#8211; מבוססת על ליבת לינוקס 2.6.29.  
אנדרואיד 2.2 &#8211; מבוססת על ליבת לינוקס 2.6.32.  
אנדרואיד 2.3 &#8211; מבוססת על ליבת לינוקס 2.6.35.  
אנדרואיד 3.0/3.1 &#8211; מבוססת על ליבת לינוקס 2.6.36.  
אנדרואיד 4.0 &#8211; מבוססת על ליבת לינוקס 3.0.1.  
אנדרואיד 4.1 &#8211; מבוססת על ליבת לינוקס 3.0.31.  
אנדרואיד 4.2 &#8211; מבוססת על ליבת לינוקס 3.4.0.

&nbsp;

## <span style="text-decoration: underline;"><strong>השכבה הירוקה, הרמה השנייה: (Libraries ( + Android Runtime</strong></span>

[<img class="alignleft wp-image-776" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Green_Layer.png" alt="Green Layer" width="441" height="104" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Green_Layer.png 1042w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Green_Layer-300x70.png 300w" sizes="(max-width: 441px) 100vw, 441px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Green_Layer.png)הרמה השנייה (הירוקה), מורכבת כולה מספריות קוד פתוח. הספריות האלו משמשות שירותים שונים של מערכת ההפעלה, ובנוסף גם את המפתחים.

  * **Media Framework –** זוהי ספריה המספקת פיצ'רים חיוניים בתקשורת כגון Codecs, פורמטי וידאו ותמונות שונים (AAC, MP3, H.264, MPEG4, JPG, PNG) וכד'.
  * **SGL –** מנוע גרפי 2D בסיסי.
  * **OpenGL | ES –** קבוצה של תוכנות ויישומים (<a href="http://en.wikipedia.org/wiki/Application_programming_interface" target="_blank">API</a>) של ממשק 3D ומסוגלים לבצע האצת חומרה 3D.
  * **WebKit –** ספריות הדפדפן webkit, דפדפן קוד פתוח התומך בין היתר בג'אווה סקריפט וב CSS.
  * **SSL –** פרוטוקולי תקשורת המאפשרים תקשורת מאובטחת ומוצפנת בין שני יישומים.
  * **Surface Manager &#8211;** ספריה המאפשרת גישה לספריית "הלפני מנהלי ההתקן" של התצוגה במכשיר.
  * **SQLite –** המאפשרת קריאה וכתיבה ישירות ממסד הנתונים בדיסק (בלי שרת מתווך תהליכים).
  * **Bionc &#8211;** זהוי ספריית libc שמותאמת לאנדרואיד (בגלל הרישיון שיש לספרייה libc).

<span style="text-decoration: underline;"><strong>Android Runtime</strong></span>

  * **Core Libes &#8211; **ספרייה המכילה את הקוד המקורי הבסיסי של מערכת ההפעלה אנדרואיד (שנכתב בשפת Java).
  * **Dalvik VM &#8211;** דלביק זהוי מכונה ווירטואלית הנכתבה מאפס במיוחד למערכת האנדרואיד, ומיועדת להרצה של קבצי Apk.

&nbsp;

<span style="text-decoration: underline;">למה ליצור מכונה ווירטואלית חדשה (Dalvik) ולא להשתמש ב Java VM?</span>

  1. Java VM עולה כסף, היא בבעלות Oracle. אם כל יצרנית תידרש "לרוץ" ל <a href="http://en.wikipedia.org/wiki/Oracle_Corporation" target="_blank">Oracle</a> כדי לנהל משא ומתן לגבי העלות לשימוש ב Java VM, פלטפורמת ה Android לא תשיג את המטרה שלה (להיות פלטפורמת מובייל חינמית שתרוץ על כמה שיותר מכשירים).
  2. Java VM עם השנים התפתחה סביב מעבדי אינטל, מכיוון שזה בעיקר מה שהיה במחשבים ובשרתים העסקיים, ולכן לא מתאימה לרוץ על מעבדי ARM (לפחות בתצורה הנוכחית).
  3. Java VM טוענת את התוכנה לזיכרון (מהדיסק הקשיח) ורק אז יוצרת את האובייקט, שזה הגיוני, מכיוון שהדיסק הקשיח הרבה יותר איטי מה <a href="http://en.wikipedia.org/wiki/Random-access_memory" target="_blank">RAM</a>. דלביק לא עושה זאת, מכיוון שבמכשירים ניידים אין דיסק קשיח, ישנו זיכרון RAM ואחסון פלאש (מהיר מאוד להבדיל מהדיסק הקשיח המכני, ולכן אין סיבה לעשות זאת).

<img class="alignleft wp-image-777" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Java_Bytecode__Dalvik_Bytecode.png" alt="Java Bytecode Dalvik Bytecode" width="300" height="393" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Java_Bytecode__Dalvik_Bytecode.png 346w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Java_Bytecode__Dalvik_Bytecode-300x392.png 300w" sizes="(max-width: 300px) 100vw, 300px" />

##  

## <span style="text-decoration: underline;"><strong>Dalvik</strong></span>

**ננתח את המצבים כשאנו כותבים ל Dalvik ול Java VM:**  
כשנכתוב ל Java VM אנו נכתוב בשפת Java, הקומפילר של Java יקמפל לנו את הקוד ל bytecode (שזה הכלאה של חצי שפת תכנות וחצי שפת מחשב) ונקבל קובץ class, והקובץ הזה ירוץ על ה Java VM.  
כשנכתוב ל Dalvik אנו נכתוב בשפת Java, הקומפילר של Java יקמפל לנו את הקוד ל bytecode ונקבל קובץ class, לאחר מכן הקומפילר של Dalvik יקמפל לנו שוב את ה bytecode ונקבל קובץ dex, הקובץ הזה ירוץ על Dalvik VM.

ב Java אנו אוספים את כל קבצי ה class לתוך קובץ Jar ואז אנו מקווצים אותו כקובץ zip. ב Android אנו לא עושים את זה, אבל גם כקוד לא מקווץ, קוד המתאים ל Dalvik יהיה קטן יותר מקוד Java, וזה בגלל שהקומפילר (מהדר) של Dalvik מבצע אופטימיזציה גבוהה מאוד (מזהה קוד כפול, יכול לשנות מבני נתונים וספריות במידת הצורך, משנה את סדר הבייטים וכד'). כתוצאה מכל זה Dalvik משתמשת בפחות זיכרון מאשר Java VM.

למי שמעוניין להרחיב, להלן סירטון בן שעה מ Google I/O 2008 המסביר בהרחבה כיצד Dalvik עובד:



&nbsp;

## <span style="text-decoration: underline;"><strong>השכבה הכחולה: Applications Framework</strong></span>

[<img class="alignleft wp-image-778" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Framework_Layer.png" alt="Framework Layer" width="500" height="86" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Framework_Layer.png 1042w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Framework_Layer-300x51.png 300w" sizes="(max-width: 500px) 100vw, 500px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Framework_Layer.png)הרמה השלישית נקראת Application Framework ובמילים אחרות ניתן גם לקרוא לה API Level.

זהו בעצם שלד המערכת, ה Framework חושף לאפליקציות את יכולות המערכת. כשהמפתח קובע את ה API Level של האפליקציה הוא בעצם קובע מה יהיה אפשרי (או נגיש) בשכבה הזו, וכתוצאה מכך על איזה גרסאות Android האפליקציה תוכל להיות מותקנת. לדוגמה, ב API Level 10 (גרסת אנדרואיד 2.3.3) התאפשר לראשונה לעשות שימוש ברכיב ה <a href="http://en.wikipedia.org/wiki/Near_field_communication" target="_blank">NFC</a>, ורק אפליקציות עם תמיכה מינמלית ב-API Level 10 ומעלה יוכלו לבצע שימוש ברכיב זה.

&nbsp;

## **<span style="text-decoration: underline;">השכבה הכחולה: Applications</span>**

[<img class="alignleft wp-image-779" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apploctions_Layer.png" alt="Apploctions Layer" width="500" height="59" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apploctions_Layer.png 1042w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apploctions_Layer-300x35.png 300w" sizes="(max-width: 500px) 100vw, 500px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apploctions_Layer.png)בשכבה הרבעית והאחרונה נמצא את כל האפליקציות המובנות, הבסיסיות, של המערכת (לדוגמה: החייגן, אנשי הקשר, הודעות, דפדפן, הלאנצ'ר וכ'ו).

קובץ APK (או אפליקציה) זהו בעצם אוסף של קבצי dex (קוד המתאים לרוץ על Dalvik VM), משאבים (קבצי תמונות, קבצי ווידיאו, קבצי אודיו, קבצי XML וכד'), ואולי גם כמה Native libs.

<img class="alignleft wp-image-780" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Architecture.png" alt="Android Architecture" width="600" height="424" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Architecture.png 1044w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Architecture-300x212.png 300w" sizes="(max-width: 600px) 100vw, 600px" />

##  

כל השכבות יחדיו כפי שאנדרואיד מורכבת:

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

## <span style="text-decoration: underline;"><strong>ADB</strong></span>

ADB(ראשי תיבות שלAndroid Debug Bridge) זוהי תוכנית הרצה משורת הפקודה (cmd / terminal) על המחשב ומתקשרת עם המכשיר או האמלוטר (ובמילים אחרות, תכניות adb פותחת שורת פקודה למכשיר).

<img class="alignleft size-full wp-image-781" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_ADB.png" alt="Android ADB" width="498" height="227" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_ADB.png 498w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_ADB-300x136.png 300w" sizes="(max-width: 498px) 100vw, 498px" />ה adb משמש מפתחים לניהול מערכת ה Android הישר מהמחשב. הוא מהווה דרייבר בין המכשיר למחשב ומוסיף פקודות לטרמינל ( / cmd) שנותנות למפתחים את היכולת לבצע פעולות שונות, כמו לתת הוראה למכשיר להיכנס למצבים מסויימים, לתת הוראה להתקין אפליקציה מסוימת (שנמצאת על המחשב ולא על המכשיר) וכד'.

כשאנו פותחים את ה ADB (ניתן לפתוח אותו מתיקיית sdk/platform-tools) הוא קודם כל בודק האם יש תהליך ADB פתוח כבר, במידה ואין הוא מתחיל את התהליך. כאשר ה ADB עולה הוא מתחבר לפורט TCP 5037 ומקשיב לפקודות מה ADB (שורת הפקודה). השרת מחפש ומקים חיבורים לכל אמולטור / מכשיר בטווחי הפורטים 5555 עד 5585. כל אמולטור / מכשיר "רוכש" זוג יציאות, לדוגמה: 

<pre class="lang:sh decode:true" title="adb">Emulator 1, console: 5554
Emulator 1, adb: 5555
Emulator 2, console: 5556
Emulator 2, adb: 5557 </pre>

בעת פתיחת ה ADB וחיבור למכשיר, מה שמתבצע ברקע במכשיר זהו פתיחת Linux Shell, ולכן ניתן לבצע מגוון פעולות ע"י כתיבת פקודות ישירות למכשיר, בדומה לטרמינל ב Linux.  
<a href="http://android-dls.com/wiki/index.php?title=ADB" target="_blank">כאן</a> ניתן למצוא מגוון פקודות הניתנות ליישום בADB (עם הסבר).

&nbsp;

## [<img class="alignleft wp-image-782" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Unlock_Bootloader.png" alt="Unlock Bootloader" width="200" height="342" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Unlock_Bootloader.png 208w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Unlock_Bootloader-300x513.png 300w" sizes="(max-width: 200px) 100vw, 200px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Unlock_Bootloader.png)

## <span style="text-decoration: underline;"><strong>Bootloader<br /></strong></span>

ה <a href="http://en.wikipedia.org/wiki/Booting" target="_blank">Bootloader </a>לא ממש קשור ישירות למערכת ההפעלה של Android , אלא זהו רכיב תוכנה מיוחד שרץ בזמן עליית המערכת (אחרי הדלקת המכשיר ולפני שמערכת האנדרואיד עולה). תפקידו הוא לבצע בדיקות לזיכרון ולהעלות את מערכת ההפעלה (OS) לזיכרון ה RAM ו"להעביר את המושכות" על המכשיר למערכת ההפעלה.

* נוהגים להשוות את ה Bootloader לתוכנת ה Bios שאנחנו מכירים מעולם ה PC שם ה Bios הוא בעצם יחידה נפרדת לגמרי ממערכת ההפעלה שעולה בזמן ה boot לפני עליית המערכת הפעלה (OS).

## [<img class="alignright wp-image-783 size-full" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Bootloader.png" alt="Bootloader" width="274" height="85" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Bootloader.png 274w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Bootloader-300x93.png 300w" sizes="(max-width: 274px) 100vw, 274px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Bootloader.png) 

##  

&nbsp;

&nbsp;

## <span style="text-decoration: underline;"><strong>Recovery</strong></span>

[<img class="alignleft wp-image-785" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Clockworkmod_Recovery.jpg" alt="Clockworkmod Recovery" width="200" height="333" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Clockworkmod_Recovery.jpg 480w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Clockworkmod_Recovery-300x500.jpg 300w" sizes="(max-width: 200px) 100vw, 200px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Clockworkmod_Recovery.jpg)המילה Recovery מתייחסת למחיצה נפרדת בה מותקנת קונסלת הריקברי (שאליה ניתן להגיע ע"י קומבינציה של מספר לחצנים, הקומבינציה תלוית מכשיר). הריקברי הקיים במערכת ה Android, לצערנו, פשוט מאוד באפשרויות שלו, אך בקלות יחסית ניתן להשיג את קוד המקור שלו ולהוסיף (לפתח) אפשרויות נוספות. תודות למפתחים המוכשרים שמציפים את קהילת האנדרואיד ישנם כמה וכמה ריקברי המבצעים זאת. הנפוצים שבינהם הינם: <a href="https://www.clockworkmod.com/" target="_blank">Clockwork Recovery</a>, <a href="http://www.teamw.in/" target="_blank">OpenRecovery</a>.

הריקברי המבונה במערכת האנדרואיד מוגבל בכוונה תחילה. הוא נועד לבצע פעולות ספציפיות ולכן מציע אך ורק את 2 האפשרויות הבאות: למחוק את כל קבצי המערכת והמשתמש, ולהתקין עדכוני מערכת. בעוד הריקברי שפותח ע"י המפתחים השונים לרוב מציע עוד מגוון אפשרויות כגון:

  * אופציית גיבוי ושחזור.
  * מחיקת מחיצות ספציפיות.
  * התקנת חבילות שלא חתומות ע"י גורמים רשמיים.
  * היכולת לבצע mount למחיצות השונות.

&nbsp;

## <span style="text-decoration: underline;"><strong>APK</strong></span>

[<img class="alignleft wp-image-788" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apk.png" alt="Apk" width="386" height="275" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apk.png 410w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apk-300x213.png 300w" sizes="(max-width: 386px) 100vw, 386px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Apk.png)<a href="http://en.wikipedia.org/wiki/Android_application_package" target="_blank">apk</a> זהוי סיומת הקובץ בו נשמרות אפליקציות של מערכת האנדרואיד. ניתן להשוות את הסיומת לסיומת bat, jar, exe וכד'. הקובץ עצמו הינו קובץ zip רגיל לחלוטין (ניתן לשנות לו את הסיומת מ app.apk ל app.zip ולפתוח אותו באופן רגיל).  
במידה ונפתח אותו, נראה מספר תיקיות וקצבים, בואו ננסה להבין מה הולך כאן:

  * **META-INF:** הספרייה מכילה בתוכה את החתימה של קובץ ה zip. ללא חתימת הקובץ לא ניתן להתקין את ה apk (האפליקציה), משום שהחתימה מכילה את 'תעודת הזהות' של הקובץ. בזמן ההתקנה המערכת בודקת אם החתימה מתאימה ונותנת הודעת שגיאה במידה ואחד הקבצים שונה. יש לציין כי ניתן לחתום את הקובץ מחדש.
  * **res:** התיקייה מכילה את המשאבים (קבצים) לשימוש האפליקציה, לדוגמה: תמונות, קבצי xml וכד'.
  * **AndroidManifest.xml:** קובץ הכרחי בשביל הצלחת התקנת האפליקציה על המכשיר. הקובץ מכיל את הפרטים של האפליקציה (שם האפליקציה, גרסה, הרשאות וכד').
  * **classes.dex:** קובץ המכיל את הספריות (class) שבהן השתמש המתכנת על מנת לכתוב את האפליקציה. הקובץ הנל כתוב בשפת Java bytecode (ג'אווה מקומפלת) ומתורגם לגמרי ע"י Dalvik virtual machine.
  * **resources.arsc:** קובץ דחוס (ומקומפל) המכיל את המשאבים.

&nbsp;

<span style="text-decoration: underline;">אפשר להתקין את קובץ הapk בשתי דרכים:</span>

  1. להעתיקו למכשיר (זיכרון פנימי / SD card) ולהיכנס לתיקייה (עם מנהל קבצים דוגמת <a href="https://play.google.com/store/apps/details?id=com.metago.astro&hl=en" target="_blank">Astro</a> או <a href="https://play.google.com/store/apps/details?id=com.estrongs.android.pop&hl=en" target="_blank">ES File Explorer</a>) ולהתקינו (יש לוודא כי "יישומים לא מוכרים" מסומן ב V תחת הגדרות -> יישומים).
  2. להתקינו דרך ה ADB (יש לוודא כי המכשיר מחובר למחשב באמצעות כבל usb ולוודא כי תחת הגדרות -> יישומים -> פיתוח -> usb debugging מסומן ב V).
  3.

## <span style="text-decoration: underline;"><strong>Root</strong></span>

[<img class="alignleft wp-image-789" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root.png" alt="Android Root" width="230" height="230" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root.png 250w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root-150x150.png 150w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root-300x300.png 300w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root-1024x1024.png 1024w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root-144x144.png 144w" sizes="(max-width: 230px) 100vw, 230px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Root.png)מושג: מתן הרשאות של מנהל מערכת במכשיר (SuperUser). כמו Administrator ב windows, על מנת שנוכל לגשת ולשחק עם דברים שאינם בהרשאה של משתמש רגיל (כמו תיקיית ה System במקרה שלנו), (המושג מגיע מעולם הלינוקס בו תקיית המערכת נקראת root &#8211; שורש, ומסומנת ב / ). תיקיית ה System מוגנת וכדי לשנות שם דברים אנו צריכים את אותה הרשאה. בדרך כלל למשתמשים מן השורה אין צורך ב root אך למפתחים, האקרים ושאר סקרנים המעוניינים לשנות דברים, חייבים את ההרשאה הזו.

&nbsp;

<span style="text-decoration: underline;">דוגמאות ללמה צריך את אותה הרשאה (Root):</span>

  1. עד גרסת אנדרואיד 2.2 (Froyo) לא היה באנדרואיד עברית, ובשביל להוסיף פונטים עבריים למכשיר היה נדרש לשנות קבצי מערכת ולכן היו צריכים הרשאות SuperUser ובשביל להשיג את אותן הרשאות היינו צריכים לפרוץ את המכשיר (Root).
  2. כמו כן, ישנן אפליקציות שדורשות Root כמו: צילום מסך (למעט חלק מהמכשירים), המהרת המעבד (over clock), חלוקת מחיצות הזיכרון מחדש, התקנת רום שונה ועוד.
  3. למרות שהזכרנו שהרשאות אלה לרוב לא דרושות למשתמשים מן השורה, התהליך כמעט תמיד קל מאוד, ורוב המשתמשים מבצעים אותו על מנת ל"זכות" בחופש מלא.

&nbsp;

## <span style="text-decoration: underline;"><strong>Rom</strong></span>

Rom = מערכת ההפעלה. (לא ווינדוס פון 7, אנדרואיד או IOS, אלא גרסאות / הפצות שונות של אנדרואיד), (בדומה להפצות השונות של לינוקס).

הרום "מגיע" כקובץ img (הרבה פעמים מגיע עם תוספות כך שארוז בקובץ zip), את הקובץ מעלים לכרטיס הזיכרון ומתקינים אותו דרך ה recovery , (או דרך download mode במכשירי סמסונג). Android היא מערכת הפעלה פתוחה מה שאומר שכולם יכולים להשיג את קוד המקור ולבצע שינויים בהתאם לרצוננו. ובהמשך לכך, קיימות קבוצות מפתחים, שמוציאים את הרומים שלהם (מערכות הפעלה בגרסאות שלהם) אחרי שינויים שהם ביצעו כגון שיפור חיי הסוללה, שיפור הביצועים של המכשיר, הורדת אפליקציות מובנות שאינן בשימוש, החלפת אפליקציות לגרסאות 'קלות' יותר, שינויים גרפיים ועוד.

  * בעבר (ולצערנו עוד קורה היום) היו מקרים בהם היצרניות זנחו מכשירים והפסיקו להוציא להם עידכונים (לדוג' סמסונג עם מכשיר ה-i7500), קהילת המפתחים הרבה פעמים דואגת לאותם משתמשים ומוציאה רומים בהם גרסאות האנדרואיד חדשות יותר או ממשקים חדשים (כמו שקרה עם ממשק הסנס גרסה 3, אצל מכשיר ה Desire של HTC).

&nbsp;

## <span style="text-decoration: underline;"><strong>Odexed & Deodexed</strong></span>

כולנו נתקלנו במושג הזה, אבל מה זה באמת אומר?  
אני מניח שאתם יודעים שלמערכת ה Android ישנם מחיצות שונות, כמו מחיצת ה system/ שמכילה את כל אפליקציות המערכת (שאינן ניתנות לשינוי ומחיקה), ומחיצת ה data/ המכילה את אפליקציות המשתמש (אלה שכן ניתנות לשינוי ומחיקה).  
בעת הפעלת המכשיר, מחיצת ה system/ הינה הראשונה להיטען ובכך ניתנת העדפה להימצאות בזיכרון, לאפליקציות הנמצאות במחיצה זו.

ישנם שני מסלולים לפיהם המערכת תעבוד:

  * **Odexed &#8211;** ה cache של כל אפליקציה מוחזק בקובץ נפרד בשם odex. ונטען למכונה הווירטואלית בזמן עליית המכשיר, וזה מקטין את הזמן הנדרש למכשיר לעלות.
  * **Deodexed &#8211;** ה cache של כל אפליקציה מוחזק בתוך ה Apk עצמו, בקובץ בשם classes.dex ומעלה את זמן טעינת המכשיר.

רוב היצרניות (OEM) בוחרות באופציה הראשונה, שכן היא משפרת את זמני עליית המכשיר, מכיוון שה cache נבנה כחלק מה VM עצמו, בעוד באופציה השניה ה cache יטען בעת פתיחת האפליקציה (ה apk). אך רומים Deodexed, מאפשרים לשנות את המראה ותחושת הפעולה של אפליקציות מובנות במערכת, ולכן זהו אופציה פופלריות מאוד למרות הכל. בנוסף, במציאות, רק זמן העליה של המכשיר בפעם הראשונה (לאחר שניקתם את ה Dalvik cache) הינו ארוך מהרגיל.

&nbsp;

## <span style="text-decoration: underline;"><strong>לסיכום</strong></span>

עברנו על ארכיטקטורת מערכת ה Android והספריות השונות שבשימוש בכל שכבה ושכבה, נתנו הסבר לבחירה בלינוקס קרנל, ובבנית VM יחודיי (Dalvik). משם המשכנו למושגים הבסיסיים של המערכת כמו ADB, Bootloader, Recovery, apk, Root ו Rom. ולבסוף אף נגענו במושג מתקדם יותר והוא ההבדל בין אפליקציות Odexed ו Deodexed.

&nbsp;

במידה וישנם שאלות או מושגים לא מובנים (גם כאלה שלא עברתי עליהם) אשמח לנסות לעזור ולענות בתגובות.
