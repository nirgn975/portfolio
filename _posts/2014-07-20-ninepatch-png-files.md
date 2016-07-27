---
title: NinePatch PNG Files
author: nirgn
layout: post
category: Android
---
[<img class="alignleft wp-image-1774" src="http://www.lifelongstudent.net/wp-content/uploads/2014/07/NinePatch_PNG.png" alt="NinePatch PNG" width="200" height="200" srcset="http://www.lifelongstudent.net/wp-content/uploads/2014/07/NinePatch_PNG.png 300w, http://www.lifelongstudent.net/wp-content/uploads/2014/07/NinePatch_PNG-150x150.png 150w, http://www.lifelongstudent.net/wp-content/uploads/2014/07/NinePatch_PNG-1024x1024.png 1024w, http://www.lifelongstudent.net/wp-content/uploads/2014/07/NinePatch_PNG-144x144.png 144w" sizes="(max-width: 200px) 100vw, 200px" />](http://www.lifelongstudent.net/wp-content/uploads/2014/07/NinePatch_PNG.png)draw9patch הוא עורך קבצי NinePatch המגיע באופן מובנה בערכת הSDK של אנדרואיד, ונימצא בנתיב sdk/tools/draw9patch. ה class הנקרא [NinePatch](http://developer.android.com/reference/android/graphics/NinePatch.html) מאפשר לנו לצייר bitmap (מפת סיביות) בתשעה או יותר חלקים. ובקיצור הוא מאפשר לנו ליצור גרפיקה שתשנה את מידותיה באופן מוגדר.

<!--more-->

### למה צריך את זה?

רוב הלחצנים באפליקציות מורכבים מרקע ומטקסט (באופן נפרד, כאשר הטקסט הוא קובץ String בחבילה / באפליקציה). קבצי 9patch מאפשרים לנו לשלב את שניהם באופן שיהיה מוגדר מראש.

&nbsp;

###כיצד להפעיל אותה?

<img class="alignleft wp-image-1776" src="http://www.lifelongstudent.net/wp-content/uploads/2014/07/draw9patch.png" alt="draw9patch" width="400" height="234" />ב Windows הקובץ הוא קובץ bat, ברגע שתלחצו על הקובץ יפתח לכם חלון דוס קטן ולאחר כמה שניות התכנה עצמה (ניתן לראות בתמונה בצד שמאל כיצד היא נראית בעת הפתיחה).

ב Ubuntu פשוט נווט לנתיב בעזרת הטרמינל והפעילו את הקובץ (ע"י כתיבת `draw9patch/.`).

אם אתם רוצים לבצע את זה על תמונה הנמצאת כבר בתוך האפליקציה שאתם בונים, באקליפס פשוט הקליקו עליה מקש ימיני -> open with -> סמנו את Android Draw 9-patch Editor -> ולחצו על ok.

ב Android Studio לחצו על התמונה בעזרת המקש הימני -> Create 9-patch file.

&nbsp;

### איך עורכים?

אוקי, אז יש לנו תמונה, ויש לנו טקסט הנמצא באפליקציה שפתחנו בעזרת apktool ([ישנו פוסט נפרד המסביר כיצד לפתוח, לערוך, ולחתם בחזרה אפליקציות]("http://www.lifelongstudent.net/2012/06/848/)), כעת אנחנו רוצים להגדיר כיצד התמונה תימתח על מנת לשמור על היחס, ואיפה הטקסט יהיה ממוקם.

[<img class="alignleft wp-image-1779" src="http://www.lifelongstudent.net/wp-content/uploads/2014/07/9patch-.png" alt="9patch" width="400" height="293" />](http://www.lifelongstudent.net/wp-content/uploads/2014/07/9patch-.png)* אדגים ואסביר על התכנה הנפרדת, אך העיקרון יהיה בדיוק אותו הדבר ב Eclipse וב Android Studio.

  1. קודם כל יש לגרור את התמונה שיצרתם (או שאתם רוצים לערוך) לתוכנה.
  2. עכשיו כדי שנבין איך אנחנו מעצבים, הוספתי תמונה:
      * אנו צובעים עם העכבר את הפיקסל הצדדי (הוא הופך לשחור) ע"י לחיצה עליו (לחיצה על המקש הימני כדי למחוק).
      * החלק העליון והשמאלי קשורים למבנה של התמונה, הרי באנדרואיד יש המון מכשירים בעלי רזולוציות שונות, והמערכת מבצעת את ההתאמות לבד אך אנו צריכים להגדיר איזה איזור ניתן למתוח בתמונה ואיזה איזור לא.
      * הצד הימני והתחתון שולטים במיקום הטקסט על התמונה, מגדירים את הגבולות שלו מבחינת גבוה ורוחב.
      * בצד הימני של התוכנה אנו רואים את ה'תצוגה המקדימה', אנו רואים כיצד הלחצן שלנו יראה ואיפה הטקסט ימוקם ברזולציות שונות.
      * למטה יש לנו בר שחור עם הגדרות:
          * **zoom -** מאפשר לנו לבצע זום פנימה / החוצה מהאובייקט שלנו.
          * **patch scale -** משנה את היחס בין החלק הימני (התצוגה מקדימה) לחלק השמאלי (האובייקט שבעריכה).
          * **show patches -** מראה תצוגה מקדימה של מבנה הלחצן (היחס של המבנה) בחלק השמאלי על האובייקט עצמו.
          * **show content -** מראה בחלק הימני איפה ימוקם הטקסט על כל אחד מהרזולוציות השונות.
      * לבסוף כדי לשמור את התמונה יש להיכנס ל file -> ואז ל save.

&nbsp;

### xUltimate-d9pc

לפני שנמשיך יש לציין כי את התהליך הזה תבצעו במידה ופתחתם קובץ apk ושיחקתם עם התמונה, במידה והתמונה הולכת ישר לאפליקציה אותה אתם מפתחים, שלב זה אינו נחוץ מכיוון שה Eclipse וה Android Studio מבצעים את הקימפול באופן אוטומטי.

הדרך בה ניתן לעשות זאת בצורה ידנית היא ע"י הורדת התוכנה xUltimate-d9pc [מכאן](http://forum.xda-developers.com/attachment.php?attachmentid=453855&d=1291226013). התוכנה תבצע קימפול לתמונה, ז"א תעלים את הפיקסלים השחורים מהצדדים, וכך יש לבצע זאת:

  * העתיקו את התמונה השמורה לתיקייה `Originals\res\drawable-hdpi\`.
  * כעת יש ללחוץ על היישום: xUltimate-d9pc.exe, יפתח חלון דוס קטן וכשהוא יסיים לרוץ (כמה שניות) תיווצר תיקייה בשם done ובתוכה התמונה המוכנה תמצא.

* בנוסף, לאלו מכם שמייבאים את התמונה לפרויקט שלהם ב Eclipse או ב Android Studio, יש לייבא את התמונה לתיקייה drawable הנמצאת ב res. ניתן לקרוא ולראות דוגמה לקוד ב [API באתר המפתחים של אנדרואיד](http://developer.android.com/guide/topics/graphics/2d-graphics.html#nine-patch).
