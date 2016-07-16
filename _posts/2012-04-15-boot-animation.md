---
title: ליצור Boot animation ב-5 שלבים
author: nirgn
layout: post
category: Android
---
[<img class="alignleft size-full wp-image-833" src="http://www.lifelongstudent.net/wp-content/uploads/2012/04/Android_Rain.png" alt="Android Rain" width="250" height="183" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/04/Android_Rain.png 250w, http://www.lifelongstudent.net/wp-content/uploads/2012/04/Android_Rain-300x219.png 300w" sizes="(max-width: 250px) 100vw, 250px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/04/Android_Rain.png)לאחר שיצרתי לפני כמה ימים אנימציית הפעלה (Boot animation) לרום (ROM) בו אני משתמש כרגע (בדרך כלל אני לא מחליף כי אני בקושי מכבה &#8211; מדליק את המכשיר אבל האנימציה שלהם ממש לא נראתה לי) נשאלתי איך עשיתי, והאמת שזה ממש קל, אז החלטתי לכתוב מדריך קטן שיתאר את סדרת הפעולות.

<!--more-->

&nbsp;

לפני שנתחיל נעשה יישור קו קטן, אנימציה (<a href="http://en.wikipedia.org/wiki/Animation" target="_blank">Animation</a>) הינה הקניית אשליה של תנועה על גבי המסך. ז"א אוסף תמונות (אם תרצו פריימים &#8211; <a href="http://en.wikipedia.org/wiki/Key_frame" target="_blank">Frames</a>) עוקבות שיוצרות אשליה של תנועה.

  1. אז לאחר שהבהרנו שהאנימציה היא אוסף תמונות אתם תצטרכו ליצור לעצמכם אוסף תמונות שידמו תנועה (במילים אחרות אנימציה). ניתן להיעזר בפוטושופ (או <a href="http://en.wikipedia.org/wiki/GIMP" target="_blank">Gimp</a>), אך לעצלנים ניתן לחפש תוכונות שהופכות תמונות <a href="http://en.wikipedia.org/wiki/GIF" target="_blank">gif</a> לסדרת תמונות <a href="http://en.wikipedia.org/wiki/JPEG" target="_blank">jpg</a> ופשוט לחפש אנימציית gif שאהבתם.

<span style="text-decoration: underline;">כמה הגבלות:</span>

  * התמונות צריכות להיות ברזולוציה של המכשיר (ניתן לבדוק <a href="http://www.gsmarena.com/" target="_blank">כאן</a> מה הרזולוציה של מכשירכם, במכשיר שלי (<a href="http://www.gsmarena.com/htc_desire_hd-3468.php" target="_blank">HTC Desire HD</a>) לדוגמה הרזלוציה היא 800&#215;480).
  * בנוסף התמונות צריכות להיות מסודרות לפי שם בסדר קבוע מראש לדוגמה התמונה הראשונה תיקרא כך: frame0001, התמונה השניה תיקרא כך: frame0002 וכ'ו.
  * התמונות חייבות להיות שמורות כ png.

&nbsp;

  2. לאחר שיצרנו את אוסף התמונות נכניס את כל התמונות לתיקיה (תקראו לה איך שתרצו) ואת התיקייה הזאת לתוך תיקייה בשם "BootAnimation". בתוך התיקייה "BootAnimation" ניצור קובץ טקסט בשם desc.txt.

&nbsp;

  3. בתוך הקובץ טקסט נכתוב:

<pre class="lang:default decode:true">20 800 480
P 1 0 nameOfTheFolder</pre>

  * **ה-20** אומר כמה פריימים (או תמונות) יעברו בשניה, ז"א המהירות של האנימציה (ניתן לתת ערכים בין 10-30).
  * **ה 800 וה 480** מתייחסים לרזולוציה של המכשיר.
  * **ה P** אומר להפעיל &#8211; play.
  * **ה-1** אומר להריץ את התמונות שבתיקייה פעם אחת (אם נכתוב 0 הם ירצו כל הזמן &#8211; לולאה אין סופית).
  * **ה-0** אומר לעצור את האנימציה בפריים 0 (הראשון), כשכל התיקייה מסיימת לרוץ (נהוג להשאירו על 0).
  * במקום **nameOfTheFolder** תכתבו את שם התיקייה שלכם.

דוגמה נוספת, הפעם לאנימציה עם 2 תיקיות:

<pre class="lang:default decode:true">30 800 480
p 1 0 intro
p 0 0 repeat</pre>

פה האנימציה תרוץ מהר מאוד (במהירות 30 פריימים לשניה), היא תריץ פעם אחת את התמונות שבתיקייה intro ואז תעבור לתיקייה repeat ותריץ את התמונות הקיימות בה ללא הפסקה (לולאה אין סופית) &#8211; עד שהמכשיר יעלה.

&nbsp;

  4. לאחר שסיימנו אנו נארוז את התיקייה "BootAnimation" כקובץ zip (במידה ואתם מבצעים זאת באמצעות <a href="http://en.wikipedia.org/wiki/WinRAR" target="_blank">WinRAR</a>, שימו לב שאתם בוחרים ב zip ולא ב rar). בנוסף אנו נשנה בקטגוריה "צורת הדחיסה" (באנגלית: compression method) מ"רגיל &#8211; normal" ל"אחסון &#8211; store".

&nbsp;

  5. הקובץ מוכן, כעת יש לשים אותו ברום (ROM) שאנו מעוניינים להתקין (לרוב נמצא בנתיב: system/customize/resource/ ) בו תצטרכו להחליף את הקובץ BootAnimation.zip הקיים. או אם הרום כבר מותקן במכשירנו יש לדחוף אותו באמצעות ה ADB למכשיר, בעזרת הפקודה: 

<pre class="lang:default decode:true">adb remount
adb push bootAnimation.zip /system/customize/resource/bootAnimation.zip
adb reboot</pre>

או בעזרת Root explorer לנתיב: system/customize/resource/.

מקווה שהמדריך הקטן היה מובן והצלחתם ליצור את אנימציית ההפעלה.  
טיפ קטן: כדי שקהילת ה Android הישראלית תגדל (וגם בגלל שאני בעד שיתוף), אני ממש ממליץ לשתף את האנימציות הפעלה שיצרתם בפורום <a href="http://iandroid.co.il/forum/" target="_blank">iAndroid</a>.
