---
title: Analyze an Apk file
author: nirgn
layout: post
categories:
  - How-To
tags:
  - Analyze
  - Android
  - apk
  - ApkTool
  - build
  - debug
  - decompile
  - file
  - jarsinger
  - key
  - keytool
  - recompile
  - SDK
  - sign
  - אנדרואיד
  - אפליקציה
  - אפליקציות
  - בנייה
  - "ג'אווה"
  - הסבר
  - הרשאות
  - חבילה
  - חתימה
  - לבנות
  - לעורך
  - מאמר
  - מדריך
  - ספרייה
  - עריכה
  - פיתוח
  - פתיחה
  - קובץ
  - רוט
  - שינוי
  - שלד
---
[<img class="alignleft wp-image-849" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools.png" alt="Android Tools" width="200" height="199" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools.png 282w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools-150x150.png 150w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools-300x297.png 300w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools-1024x1024.png 1024w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools-144x144.png 144w" sizes="(max-width: 200px) 100vw, 200px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Android_Tools.png)אחד הדברים השימושיים (והמגניבים) באנדרואיד הוא לדעת לפתוח ולחתום קבצי Apk וכמובן כתוצאה מכך היכולת לערוך אותם.

כמו שזכור לנו, אנדרואיד בנויה כולה מקבצי Apk ולכן בפוסט הזה נלמד כיצד לפתוח אותם, לבצע בהם שינויים, ולבסוף לבנות ולחתום אותם מחדש. בפוסט אדגים על קובץ Apk של אפליקציה מה Play, אך כמובן שאתם יכולים לעשות את זה עם כל אפליקציה (כולל אלו המגיעות בצורה מובנת במערכת).

קודם כל על מנת לדעת מהו קובץ Apk ועל איך הוא בנוי קראו את הפוסט <a title="A little bit of Android Grammar" href="http://www.lifelongstudent.net/2012/03/little-android-bit-grammar/" target="_blank">A little bit of Android Grammar</a>. בנוסף אתם צריכים להתקין JDK ו JRE <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank">מפה</a>.

<!--more-->

&nbsp;

## <span style="text-decoration: underline;"><strong>הכנות</strong></span>

בשביל לפתוח את קבצי ה Apk ואחר כך לבנות אותם מחדש, ניעזר בתוכנה ApkTool (הורידו את הקובץ <a href="https://android-apktool.googlecode.com/files/apktool1.5.2.tar.bz2" target="_blank">apktool1.5.2.tar.bz2</a>).

ובנוסף, את הקובץ <a href="https://android-apktool.googlecode.com/files/apktool-install-windows-r05-ibot.tar.bz2" target="_blank">apktool-install-windows-r05-ibot.tar.bz2</a> (אם אתם משתמשים ב Windows), או את הקובץ <a href="https://android-apktool.googlecode.com/files/apktool-install-linux-r05-ibot.tar.bz2" target="_blank">apktool-install-linux-r05-ibot.tar.bz2</a> (אם אתם משתמשים ב Linux).

לאחר מכן, חלצו את הקובץ Jar שנמצא בתיקייה הנמצאת בתוך הקובץ הראשון שהורדנו (apktool1.5.2.tar.bz2) לתיקייה שהגיעה מתוך הקובץ השני (של ה Windows או ה Linux). יש לציין כי אתם יכולים למקם את התיקייה הנל איפה שנוח לכם, אני ממליץ על הנתיב <span style="color: #ff0000;">usr/local/bin/</span> ב Linux, או ב Windows בנתיב <span style="color: #ff0000;">C:\Program Files\Android\android-sdk\platform-tools</span>.

&nbsp;

## <span style="text-decoration: underline;"><strong>Decompile</strong></span>

  1. העבירו את האפליקציה (קובץ ה Apk), לתיקייה apktool.
  2. פתחו את ה ה Terminal (או את ה Cmd), נווטו למיקום בו מיקמתם את התיקייה, apktool.
  3. כדי לפתוח / לשבור את הקובץ נכתוב <span style="color: #00ff00;">apktool d namOfTheApp.apk nameOfTheFolder</span>. 
      * את ה namOfTheApp החליפו בשם הקובץ, ואת ה nameOfTheFolder החליפו בשם שבו אתם רוצים לקבל את התיקייה (היא תיווצר בתוך התיקייה apktool).
      * ב Linux הוסיפו /. לפני הפקודה.
      * האות d שנמצאת לאחר ה apktool בפקודה, הינה קיצור של decompile.

דוגמה (ב Linux): אם שם הקובץ אותו נרצה לשבור הוא HelloWorld.apk, נכתוב: <span style="color: #00ff00;">apktool d HelloWorld.apk appOne/.</span> , תיווצר לנו תיקייה בשם appOne (בתוך התיקייה apktool).

&nbsp;

## **<span style="text-decoration: underline;">Build</span>**

כדי לבנות את האפליקציה מחדש אנו נדרשים (בשלב האחרון) לחתום אותה. כל אפליקציה נדרשת להיות חתומה בצורה דיגיטלית, המפתח של החתימה הינו פרטי ונמצא בידי מפתח האפליקציה.

החתימה, או במילים אחרות התעודה הדיגיטלית, מספקת למערכת האנדרואיד אמצעי לזהוי המפתח של האפליקציה, ולביסוס קשר אמין בין אפליקציות.

הנקודות החשובות שצריך להבין לגבי חתימות הן:

  * כל האפליקציות נדרשות להיות חתומות. המערכת לא תתקין אפליציות לא חתומות על המכשיר, או על האמולטור.
  * כדי לבחון ולדבג את האפליקציות שהמפתחים בונים, ה Android SDK חותם אותם באופן אוטומטי על ידי מפתח גנרי שהוא מחולל, המיוחד בשביל לביצוע Debug.
  * כשהמפתח משחרר את הגרסה ל Play היא חייבת להיות חתומה על ידי מפתח פרטי, לא ניתן לשחרר את האפליקציה כשהיא חתומה על ידי המפתח שה Android SDK מחולל.
  * לכל תעודה יש תאריך תפוגה, כשעבר תאריך זה המערכת לא תתקין אפליקציות החתומות על ידי תעודה זו. אך יש לציין כי המערכת בודקת את התאריך הנל רק בעת התקנת האפליקציה, ואם התאריך עבר לאחר שהאפליקציה הותקנה, האפליקציה תמשיך לתפקד כרגיל.
  * ניתן להשתמש בכלים רגילים (כמו Keytool ו Jarsigner) כדי לחולל (לייצר) מפתח בשביל לחתום את האפליקציה.

&nbsp;

**<span style="text-decoration: underline;">נתחיל בבניה:</span>**

  1. בשביל לבנות את האפליקציה, נכתוב את הפקודה הבאה <span style="color: #00ff00;">apktool b nameOfTheFolder nameOfTheApp.apk</span>. 
      * את הפקודה יש לכתוב, כמובן, בטרמינל (או ב Cmd) ולהיות בנתיב של התיקייה apktool.
      * את nameOfTheFolder החליפו כמובן בשם התיקייה בה נמצאים הקבצים, ואת nameOfTheApp החליפו בשם שתרצו לקרוא לאפליקציה.
      * ב Linux הוסיפו /. לפני הפקודה.
      * האות b שנמצאת לאחר ה apktool בפקודה, הינה קיצור של build (או recompile).
  2. בשביל לייצר מפתח איתו נוכל לחתום את הקובץ apk, יש להתקין את ה Android SDK, נפתח את הטרמינל (או Cmd) ונכתוב <span style="color: #00ff00;">keytool -v -genkey -v -keystore nameOfKey.keystore -alias aliasName -keyalg RSA -validity 10000</span>. 
      * genkey הינו קיצור של generate key.
      * v הינו קיצור של verbose mode (מצב מפורט).
      * nameOfKey, יהיה שם המפתח (ניתן להחליף לכל מה שבא לכם).
      * aliasName יוצר כינוי (שם אחר) למפתח (ניתן להחליף לכל מה שבא לכם).
      * keyalg מפרט את האלגוריתם הצפנה המשמש לחולל את המפתח (קרי <a href="http://en.wikipedia.org/wiki/RSA_(cryptosystem)" target="_blank">RSA</a>, <a href="http://en.wikipedia.org/wiki/Digital_Signature_Algorithm" target="_blank">DSA</a> וכד').
      * validity מתאר בימים לכמה זמן המפתח תקף (במקרה זה כתבתי 10,000 ימים).
      * כחלק מהיצירה של המפתח תצטרכו למלא פרטים אישיים, ולבחור סיסמה למפתח.
  3. כעת נחתום את האפליקציה, ובשביל קיצור הפקודה, העבירו את הקובץ apk ואת המפתח לאותה תיקייה, וכתבו בטרמינל (או ב Cmd) את הפקודה <span style="color: #00ff00;">jarsigner -verbose -keystore myKeyName.keystore appName.apk aliasName</span>. 
      * myKeyname זהו שם המפתח שיצרנו בסעיף לעיל.
      * appName זהו שם הקובץ apk.
      * aliasName זה הכינוי של המפתח שכתבו בסעיף לעיל.
      * יש לציין כי בעת החתימה תצטרכו להכניס את הסיסמה של המפתח.

&nbsp;

## **<span style="text-decoration: underline;">Framework</span>**

בתכנות מונחה עצמים ישנה ספרייה המחברת את כל חלקי המערכת למערכת אחת, הספרייה הזאת מכונה Framework (או בעברית, שלד).

מערכת ה Android כתובה ב Java שהינה שפה מונחת עצמים, לכן גם ל Android יש Framework. ה Framework של Android AOSP מגיע מובנה בספרייה של apktool, אך כחלק מהשינויים שהיצרניות השונות מבצעות במערכת, הן מבצעות שינוים גם ב Framework, לכן אם נרצה לפתוח קבצי Apk של סמסונג או HTC וכד', נצטרך לעדכן את קבצי ה Framework שלהם.

בשביל לעדכן, יש לחלץ את הקובץ framework-res.apk (מהספרייה system/framework/).

  * במכשירים של סמסונג, נצטרך את הקובץ framework-res.apk ואת הקובץ twframework-res.apk.
  * במכשירים של HTC, נצטרך את הקובץ com.htc.resources.apk בלבד.

את הקבצים נמקם בתקייה apktool, וכדי להתקינם נכתוב ב Cmd (או בטרמינל) <span style="color: #00ff00;">apktool if framework-res.apk</span>.

  * במידה והפקודה נכתבת בלינוקס יש להוסיף /. לפני ה apktool.
  * if זהו קיצור של install framework.

במידה וה Framework הותקן בהצלחה, נקבל את התוצאה: <span style="color: #ff0000;">I: Framework installed to yourPath 1.apk</span>

&nbsp;

## **<span style="text-decoration: underline;">Look Inside</span>**

[<img class="alignleft wp-image-854" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Notepad-.png" alt="Notepad" width="325" height="201" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Notepad-.png 911w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Notepad--300x185.png 300w" sizes="(max-width: 325px) 100vw, 325px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Notepad-.png)כעת, כשפתחנו את קובץ ה Apk אנו יכולים לבצע מגוון שינויים. לדוגמה, בתיקיית ה res נמצאים המשאבים של האפליקציה, כמו תמונות, קבצי xml וכד'.

בדוגמה מצד שמאל, פתחתי את האפליקציה של Youtube ונכנסתי לתיקייה res ומשם לתקייה values ופתחתי את הקובץ settings עם תוכנת ה <a href="http://notepad-plus-plus.org/" target="_blank">++Notepad</a> (מי שמשתמש בהפצת לינוקס כלשהי, אני ממליץ על העורך S<a href="http://www.sublimetext.com/2" target="_blank">ublime Text 2</a>), ותרגמתי כמה מהלחצנים (שימו לב שאתם מתרגמים את מה שבשחור, בין ה >< , ניתן לראות את הסימן בתמונה.

בנוסף, אפליקציות מורכבות מתמונות, אם זה רקע, לחצנים וכד'. ניתן לערוך אותם בעזרת ה Photoshop (או Gimp), בדוגמה מצד ימין פתחתי את האפליקציה של Shazam וצבעתי את הרקע המוכר של האפליקציה (שהינה תמונה) באדום (למה? כי אני יכול (; ).

[<img class="alignleft wp-image-855" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Background_Shazam.png" alt="Red Background Shazam" width="180" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Background_Shazam.png 480w, http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Background_Shazam-300x500.png 300w" sizes="(max-width: 180px) 100vw, 180px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/Red_Background_Shazam.png)והרי כמו שאמרנו, המערכת מורכבת מקבצי Apk, לכן, ניתן לתרגם כך את כל המערכת (אפליקציית החייגן, הודעות, אנשי קשר, הגדרות וכד'), אם תפתחו (בעזרת Winrar או 7Zip) את ה Rom שהורדתם (שבעצם הינו קובץ zip) תשימו לב שישנה תיקייה בשם system, ובתוכה תיקייה בשם app ובה נמצאים כל קבצי ה Apk שדיברנו עליהם.

  * בנוסף, בתיקיית ה fonts נמצאים הפונטים (החל מגרסת Android 2.2 קיימים פונטים בעברית, אך ניתן להחליף אותם לפונט אחר במידה ותרצו).
  * בתיקיית ה media נמצאים ההתראות, רינגטונים, וקבצי מערכת (כמו הקליק של המצלמה וכד').
  * בפוסט "<a title="ליצור Boot animation ב-5 שלבים" href="http://www.lifelongstudent.net/2012/04/%d7%9c%d7%99%d7%a6%d7%95%d7%a8-boot-animation-%d7%91-5-%d7%a9%d7%9c%d7%91%d7%99%d7%9d/" target="_blank">ליצור Boot animation ב-5 שלבים</a>" ישנו הסבר מעמיק, כיצד לבנות ולהחליף את אנימציית ההפעלה של המכשיר (bootAnimation).
  * בתיקייה framework נמצא הקובץ framework.res.apk שאחראי על התרגום של שאר המערכת (במקומות שלא שייכים לקבצי Apk ספצייפים כמו החייגן), לדוגמה: תפריט הכיבוי, כפתורי אישור, מסך נעילה וכד'.

&nbsp;

## <span style="text-decoration: underline;"><strong>סיכום</strong></span>

אני מקווה שהמדריך היה מובן והצלחתם לבצע את שרציתם ללא שגיאות. אני מאוד ממליץ לשתף את התוצאות בפורומים השונים (תוכלו לחסוך זמן למי שרוצה לבצע את אותו השינוי). במידה ויש שאלות או שנתקלתם בשגיאה כלשהי אשמח לנסות לעזור בתגובות.