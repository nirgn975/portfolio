---
title: ליצור קובץ System Dump
author: nirgn
layout: post
category: How-To
---
[<img class="alignleft wp-image-1026" src="http://www.lifelongstudent.net/wp-content/uploads/2013/03/AndroidSU.png" alt="AndroidSU" width="160" height="167" srcset="http://www.lifelongstudent.net/wp-content/uploads/2013/03/AndroidSU.png 240w, http://www.lifelongstudent.net/wp-content/uploads/2013/03/AndroidSU-300x312.png 300w" sizes="(max-width: 160px) 100vw, 160px" />](http://www.lifelongstudent.net/wp-content/uploads/2013/03/AndroidSU.png)שמתי לב שבשום מקום אין מדריך בעברית לכיצד ליצור קובץ System Dump. מדובר על כמה פעולות פשוטות, וזה עוזר המון! בעיקר כדי לחלוק מידע בקהילה.

לכן, בפוסט הזה אכתוב קצת על מה זה System dump, למה הוא משמש, למה הוא טוב, וכיצד ליצור אחד כזה.

<!--more-->

&nbsp;

## <span style="text-decoration: underline;"><strong>מה זה?</strong></span>

System Dump זהו קובץ שמכיל תמונה של מערכת ההפעלה המותקנת אצלכם כעת. במילים אחרות, ניתן להגיד שזהו גיבוי ל <a href="http://www.pcmag.com/encyclopedia/term/63820/android-rom" target="_blank">Rom</a> הנוכחי שעובד אצלכם במכשיר. הגיבוי הינו גיבוי מלא, הוא מגבה את הכל, מאפליקציות, למידע של האפליקציות, סמסים, יומן שיחות ואפילו ההגדרות הספציפיות שהיו אצלכם במכשיר באותו רגע של הגיבוי (ווליום, בהירות מסך וכד').

&nbsp;

## **<span style="text-decoration: underline;">למה זה טוב?</span>**

הרבה אנשים ממליצים לבצע גיבוי כזה לפני שמתחילים להתעסק עם החלפת רומים ושינויים כאלו ואחרים. למה? בדיוק מאותן הסיבות שאתם מבצעים תמונת גיבוי למערכת ההפעלה במחשב.

בנוסף, נהוג לחלוק קבצי System Dump בקהילת האנדרואיד, כדי להפיץ עדכונים, מודים וכד'. אך יש להיזהר, קובץ System dump מותאם למכשיר ממנו הוא נלקח. ניתן להגיד גם שהוא יעבוד על כל אותם המכשירים מאותו הדגם (גם זה לא בטוח באופן גורף), אך לא על מכשירים מדגם אחר (בשל שינויי רזולוציה, גודל מסך, מעבד, זיכרון ועוד).

אז איך חולקים את המידע? מה שעושים הוא לחלץ קבצים ספציפיים מהגיבוי ולא להתקין את כולו.

&nbsp;

## **<span style="text-decoration: underline;">איך מבצעים את זה בפועל</span>**

<span style="text-decoration: underline;">קודם כל נכין את המחשב</span>

  1. הורידו והתקינו את ה JDK מהאתר של <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank">Oracle</a>.
  2. הורידו והתקינו את ה SDK מאתר המפתחים של <a href="http://developer.android.com/sdk/index.html" target="_blank">Android</a>.
  3. פתחו את ה SDK Manager (ב WIndows, באופן דיפולטיבי הוא נמצא בנתיב: <span style="color: #ff0000;">C:\Program Files\Android\android-sdk</span> (בלינוקס הוא יימצא היכן שחילצתם אותו).
  4. בצד השמאלי של החלון ישנו עץ, אחת החבילות הינה: <span style="color: #00ff00;">Android SDK Platform-tools</span>, סמנו אותה ב V ולחצו על <span style="color: #00ff00;">Install Packages</span> (הלחצן ממוקמם בחלק התחתון בצד ימין), יופיע חלון אישור תנאים, סמנו <span style="color: #00ff00;">Accept All</span> ולחצו על <span style="color: #00ff00;">Install</span>.

<span style="text-decoration: underline;">הכינו את המכשיר</span>

  1. הפעילו את USB Debugging (בנתיב:<span style="color: #ff0000;">Developer options <- Settings</span>).

<span style="text-decoration: underline;">ביצוע הגיבוי</span>

  1. הפעילו את ה cmd (בלינוקס את הטרמינל), ונווטו לתיקייה שבה מותקן ה SDK.
  2. כתבו את הפקודה: <span style="color: #00ff00;">adb.exe shell</span> כדי להפעיל את ה adb (בלינוקס <span style="color: #00ff00;">adb.sh/.</span>).
  3. וכעת את הפקודה: <span style="color: #00ff00;">su dd if=/dev/block/stl6 of=/sdcard/factory.rfs</span>.

* ניתן להחליף את הנתיב (במקרה הזה: <span style="color: #ff0000;">/sdcard/factory.rfs</span>) לכל נתיב שתרצו (בכרטיס SD).

&nbsp;

## **<span style="text-decoration: underline;">לסיכום</span>**

שימו לב, כשאתם מקבלים קובץ System Dump עדיף לחלץ ממנו את העדכון לאפליקציה שאתם צריכים ולהתקינה, ולא לנסות להתקינו באופן מלא על המכשיר שלכם.

כעת, במידה וקיבלתם עדכון כלשהו לפני כולם, צרו קובץ System Dump ותחלקו אותו באינטרנט, המפתחים כבר ידעו מה לעשות איתו (;
