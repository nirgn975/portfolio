---
title: לשנות את כפתורי המגע במכשיר ב-5 שלבים
author: nirgn
layout: post
summary: ""
category: Android
---
בפוסט הזה אסביר כיצד לשנות את התמונה של כפתורי המגע במכשיר ה Android שלכם (הכפתורים שעל המכשיר). כמו בפוסט בו הסברתי כיצד [ליצור Boot Animation ב5 שלבים](http://www.lifelongstudent.net) גם כאן נעשה את זה ב-5 שלבים.

<!--more-->

&nbsp;

הפעם אין מה להכין מראש, אז יאללה ניגש לעבודה:

  1. במידה ומדובר על ROM חדש, שהורדתם כרגע, חלצו מתוך ה RAR את הקובץ SystemUI.apk שנמצא בנתיב: system/app. במידה ומדובר על ROM שמותקן כרגע, תמיד תוכלו לחלץ את הקובץ (SystemUI.apk) בעזרת מנהל קבצים כזה או אחר (דוגמת <a href="https://play.google.com/store/apps/details?id=com.metago.astro&hl=en" target="_blank">Astro</a> / <a href="https://play.google.com/store/apps/details?id=com.estrongs.android.pop" target="_blank">ES File Explorer</a> / <a href="https://play.google.com/store/apps/details?id=pl.solidexplorer" target="_blank">Solid</a> / <a href="https://play.google.com/store/apps/details?id=com.speedsoftware.explorer&hl=en" target="_blank">Root Explorer</a> וכד').
  2. כעת יש לבחור מקשים, בפוסט <a href="http://forum.xda-developers.com/galaxy-nexus/themes-apps/softkeys-softkey-collection-t1413582" target="_blank">הזה</a> ב XDA יש המון אפשרויות הניתנות להורדה (בחינם), במידה ואתם רוצים ליצור לעצמכם משהו יחודי, בפוסט <a title="Analyze an Apk file" href="http://www.lifelongstudent.net/2012/06/848/" target="_blank">Analyze an APK file</a> הסברתי כיצד לפתוח קןבץ Apk ובעתיד אכתוב כיצד להתאים את התמונות הנמצאות באפליקציה (Apk) (מיקום התמונות בתוך סביבת האפליקציה) בעזרת התוכנה draw9patch.
  3. כאן מגיע טריק קטן, במקום לשבור ולבנות את קובץ ה Apk מחדש, פתחו את הקובץ שחילצנו (SystemUI.apk) בעזרת התוכנה <a href="http://www.rarlab.com/download.htm" target="_blank">Winrar</a> (**אל תחלצו את הקבצים שבתוכו, רק פתחו את ה Apk**), ונווטו לנתיב <span style="color: #ff0000;">res/drawable-xhdpi</span> (שוב, אל תחלצו את הקבצים אלא רק תנווטו בתוך תוכנת ה Winrar אל הנתיב).
  4. כעת תגררו את הקבצים שאותם הורדנו / יצרנו בסעיף 2 לתוך התיקייה הפתוחה ב Winrar (בנתיב <span style="color: #ff0000;">res/drawable-xhdpi</span>), תתבקשו לאשר את השינוי, וכמובן תאשרו אותו
  5. כעת, החזירו את הקובץ (SystemUI.apk) למיקום בו היה ב ROM (בנתיב <span style="color: #ff0000;">system/app</span>).
      * במידה וה ROM כבר מותקן, יש להחזיר את הקובץ בעזרת מנהל קבצים כלשהו.
      * במידה ואינו מותקן, יש לפתוח את ה ROM בעזרת התוכנה Winrar ושוב, לא לחלץ את הקבצים בתוך ה ROM אלא רק לפתוח אותו ולגרור את SystemUI.apk החדש במקום הישן (וכמובן לאשר את השינוי).
      * במידה וה ROM כבר מותקן ואין לכם אפליקציית מנהל קבצים, או שאתם רוצים להעלות לפורומים השונים את הקובץ כדי לחלוק אותו עם אחרים (דבר מבורך!), אתם צריכים להכין קובץ לצריבה דרך הריקברי (recovery). במקרה כזה, תצטרכו לחכות לפוסט הבא, בו אכתוב כיצד להכין קובץ לצריבה דרך הריקברי (קובץ כללי, תוכלו לשים בו כל אפליקציה / מוד שתבחרו).

<img class="alignleft wp-image-948" src="http://www.lifelongstudent.net/wp-content/uploads/2012/11/Buttons.png" alt="Buttons" width="300" height="108" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/11/Buttons.png 640w, http://www.lifelongstudent.net/wp-content/uploads/2012/11/Buttons-300x107.png 300w" sizes="(max-width: 300px) 100vw, 300px" />מקווה שהכל הלך חלק, ללא תקלות / שגיאות / חפירות מיותרות (; ושמצאתם את הפוסט מועיל.
