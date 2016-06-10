---
title: ליצור קובץ update.zip ב-5 שלבים
author: nirgn
layout: post
categories:
  - How-To
tags:
  - Android
  - Change
  - Code
  - Google
  - rom
  - Testsign.jar
  - Update
  - Zip
  - אנדרואיד
  - גוגל
  - הסבר
  - זיפ
  - מאמר
  - מדריך
  - עדכון
  - צריבה
  - קובץ
  - קוד
  - רום
  - ריקברי
---
[<img class="alignleft wp-image-954" src="http://www.lifelongstudent.net/wp-content/uploads/2012/12/android_found.png" alt="Android" width="290" height="288" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/12/android_found.png 473w, http://www.lifelongstudent.net/wp-content/uploads/2012/12/android_found-150x150.png 150w, http://www.lifelongstudent.net/wp-content/uploads/2012/12/android_found-300x298.png 300w, http://www.lifelongstudent.net/wp-content/uploads/2012/12/android_found-144x144.png 144w" sizes="(max-width: 290px) 100vw, 290px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/12/android_found.png)אז מה זה בכלל קובץ update.zip? זהו קובץ שנועד לצריבה דרך הריקברי (Recovery), אם זה רום (Rom), או כמה אפליקציות שהורדנו מהאינטרנט, או סתם שינויים קטנים שברצוננו להתקין.

אני מניח שהדוגמה הנפוצה והקלילה ביותר היא מוד הסוללה. באנדרואיד משום מה (תהרגו אותי, אני לא יודע למה) הסוללה הינה ללא אחוזים, אלא רק ציור שנותן לנו הערכה (דיי גסה) באיזה מצב הסוללה שלנו (למרות שהמערכת יודעת בידיוק כמה אחוזים, הם פשוט לא מוצגים בבר העליון). לכן הקובץ הפופולרי ביותר שאנשים צורבים הינו מוד "סוללה בעלת אחוזים" (ולפעמים גם ציור סוללה שונה).

<!--more-->

&nbsp;

בפוסט <a title="ליצור Boot animation ב-5 שלבים" href="http://www.lifelongstudent.net/2012/04/%d7%9c%d7%99%d7%a6%d7%95%d7%a8-boot-animation-%d7%91-5-%d7%a9%d7%9c%d7%91%d7%99%d7%9d/" target="_blank">ליצור Boot animation ב-5 שלבים</a> הסברתי כיצד ליצור אנימציה שפועלת בזמן ההפעלה / הכיבוי המכשיר, ובפוסט <a title="לשנות את כפתורי המגע במכשיר ב-5 שלבים" href="http://www.lifelongstudent.net/2012/11/%d7%9c%d7%a9%d7%a0%d7%95%d7%aa-%d7%90%d7%aa-%d7%9b%d7%a4%d7%aa%d7%95%d7%a8%d7%99-%d7%94%d7%9e%d7%92%d7%a2-%d7%91%d7%9e%d7%9b%d7%a9%d7%99%d7%a8-%d7%915-%d7%a9%d7%9c%d7%91%d7%99%d7%9d/" target="_blank">לשנות את כפתורי המגע במכשיר ב-5 שלבים</a> הסברתי כיצד לשנות את המקשים הרכים או הלחצנים הווירטואלים (תקראו לזה איך שתרצו) במכשיר (דרך שינוי בקובץ SystemUI.apk) והבטחתי באותו הפוסט לכתוב מדריך שיסביר איך להכין קובץ לצריבה דרך הריקברי. אז הנה, אני עומד בהבטחתי (:

יש לציין כי ניתן לראות בפוסט <a title="Analyze an Apk file" href="http://www.lifelongstudent.net/2012/06/848/" target="_blank">Analyze an Apk file</a> קצת יותר מידע לגבי פתיחה ושינוי של אפליקציות (קבצי Apk). ובנוסף, אציין כי המדריך הינו כללי, ניתן להכניס בתוך קובץ ה zip אנימציית הפעלה, apk ששינינו, מוד לשינוי תצוגת הסוללה ובקיצור כל דבר. במקרה הזה אדגים עם קובץ BootAnimation שייצרתי לעצמי.

&nbsp;

## <span style="text-decoration: underline;"><strong>איך בונים קובץ zip הניתן לצריבה בריקברי?</strong></span>

**<span style="text-decoration: underline;">שלב ראשון, הכנות:</span>**

  * הדבר הראשון שאנחנו צריכים זה את הקובץ / קבצים שאנחנו רוצים להוסיף ל Rom (במקרה שלי זה הקובץ שהכנתי לעצמי: BootAnimation.zip).
  * עכשיו אנחנו צריכים להוריד את הקובץ Testsign.jar שיעזור לנו לחתום את הzip, ואותו ניתן להוריד <a href="https://code.google.com/p/zen-droid/downloads/detail?name=testsign.jar&can=2&q=label%3AType-Executable" target="_blank">מכאן</a>.
  * ואחרון, אנחנו צריכים להחליט לאן (לאיזה נתיב) הקבצים שאנחנו רוצים להוסיף ילכו (במקרה שלי לנתיב <span style="color: #ff0000;">system/media/</span>).

&nbsp;

**<span style="text-decoration: underline;">לעבודה (3 שלבים):</span>**

  1. יש לפתוח תיקייה בשם שאליה היא הולכת. בדוגמה הזאת יש להכין תקייה בשם media, ובתוכה להכניס את הקובץ BootAnimation.zip. יש לציין שלא משנה היכן אנו מכינים את התיקייה, ניתן לפתוח תיקייה חדשה בכל מקום שתרצו, אפילו סתם בשולחן העבודה.
  2. כעת אנחנו צריכים להכין עוד כמה תיקיות, לפי הנתיב <span style="color: #ff0000;">META-INF/com/google/android</span>, ובתוכו לפתוח קובץ טקסט חדש ב <a href="http://www.sublimetext.com/2" target="_blank">Sublime</a> (או ב <a href="http://notepad-plus-plus.org/" target="_blank">Notepad++</a>) ולקרוא לו <span style="color: #00ff00;">update-script</span>. לנתיב הזה הריקברי הולך כדי לחפש את קובץ ה update-script, והוא יקרא את הקובץ הזה בשביל ההוראות או "מה לעשות".
  3. יש לפתוח את הקובץ ולהעתיק לתוכו: 

<pre class="lang:default decode:true">ui_print("Applying New Bootanimation");
run_program("/sbin/busybox", "mount", "/system");
delete("/system/media/bootanimation.zip");
package_extract_dir("media", "/system/media");
run_program("/sbin/busybox", "umount", "/system");
ui_print("New Bootanimation Installed");  </pre>

והשלב החמישי הוא להבין מה כתבנו, בשביל זה נפרק את הקוד לשורות ונסביר מה הולך כאן:

  * **השורה ראשונה:** <span style="color: #00ff00;">;("ui_print("Applying New Bootanimation</span> מדפיסה את מה שבתוך הגרשיים (שנמצאים בתוך הסוגריים). השורה לא הכרחית, הקובץ יעבוד גם בלעדיה, אך זה יותר אלגנטי, נקי, ונותן למי שמתקין את הסקריפט להבין מה קורה כעת.
  * **השורה השניה:** <span style="color: #00ff00;">;("run_program("/sbin/busybox", "mount", "/system</span> מפעילה את ה busybox שהופך את התיקייה <span style="color: #ff0000;">system/</span> להיות כתיבה (שנוכל לכתוב אליה).
  * **השורה השלישית:** <span style="color: #00ff00;">;("delete("/system/media/bootanimation.zip</span> מוחקת את הקובץ bootAnimation.zip שנמצא בנתיב <span style="color: #ff0000;">system/media/</span> (כדי שנוכל לכתוב את הקובץ החדש).
  * **בשורה הרביעית:** <span style="color: #00ff00;">;("package_extract_dir("media", "/system/media</span> אנחנו אומרים למכשיר למצוא בתוך הקובץ שלנו (החבילה &#8211; Package) את התיקייה <span style="color: #ff0000;">media</span> (בתוך התיקייה שמתי את הקובץ bootAnimation.zip) ואת התוכן שלה להעביר לנתיב <span style="color: #ff0000;">system/media/</span>.
  * **בשורה החמשית:** <span style="color: #00ff00;">;("run_program("/sbin/busybox", "umount", "/system</span> אנחנו מפעילים שוב את ה busybox ונותונים לו את הפקודה umount על התיקייה <span style="color: #ff0000;">system/</span>.
  * **השורה השישית:** <span style="color: #00ff00;">;("ui_print("New Bootanimation Installed</span> כמו השורה הראשונה, מדפיסה הודעה למשתמש.

&nbsp;

**<span style="text-decoration: underline;">טיפ:</span>** בחור ב XDA כתב תוכנה קטנה שיכולה לבצע את כל התהליך בשבילכם. תמיד עדיף לדעת כיצד הכל מתבצע ואת שורות הקוד אבל מדובר על פעולה די טכנית, והתוכנה בהחלט עוזרת לחסוך זמן ולפשט את התהליך (במיוחד לאנשים שמבצעים את זה כל יום). בנוסף, בתוכנה יש עוד כמה אפשרויות שיכולות לעזור. להלן <a href="http://forum.xda-developers.com/showthread.php?t=1248486" target="_blank">הקישור לפוסט ב XDA</a>.

&nbsp;

## **<span style="text-decoration: underline;">לסיכום</span>**

ב-5 שלבים הכנתם קובץ שניתן לצריבה דרך ה Recovery ובו אתם יכולים לשים כל דבר שתרצו (קבצי Apk חדשים לצריבה, החלפה של קבצי Apk קיימים, מודים שונים, תוספות, רום חדש וכד').

שימו לב, שכשאתם משנים משהו קיים, לדוגמה קובץ Apk יש למחוק את קובץ הישן קודם כל, ורק לאחר מכן להעתיק את קובץ ה Apk החדש (כמו שהדגמתי במקרה הזה, שורת המחיקה לפני שורת ההעתקה של הקובץ). במידה ומדובר על קבצים חדשים צריך פשוט להעתיק אותם ולא לכתוב את השורה של המחיקה.