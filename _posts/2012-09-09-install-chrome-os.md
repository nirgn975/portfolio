---
title: להתקין Chrome OS
author: nirgn
layout: post
categories:
  - Chrome_OS
tags:
  - Chrome
  - Chrome OS
  - Chromebook
  - Chromebox
  - Chromium
  - Create
  - Download
  - Google
  - Image
  - Install
  - OS
  - VirtualBox
  - גוגל
  - הסבר
  - התקנה
  - ווירטואלית
  - כרום
  - כרומבוק
  - כרומבוקס
  - מאמר
  - מדריך
  - מכונה
  - מערכת הפעלה
  - תמונה
---
[<img class="alignleft wp-image-918" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Chrome_OS_UI.png" alt="Chrome OS UI" width="400" height="225" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Chrome_OS_UI.png 800w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Chrome_OS_UI-300x168.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Chrome_OS_UI.png)אני מניח שכולם שמעו על מערכת ההפעלה החדשה מבית גוגל שעתידה לשנות את פני התחום, הלא היא Chrome OS. המערכת מתנהלת כמעט כולה על גבי הענן ומהווה מוצר משלים (ומרכזי) לשאר השירותים שגוגל מספקת.

כמו כל דבר חדש שיש עליו הרבה סיקורים ודיבורים, אני תמיד רוצה לראות על מה כל המהומה ולהתנסות, אז בהמשך לכך, בפוסט הזה נבצע התקנה של המערכת על גבי מכונה ווירטואלית (שתותקן על מערכת הנוכחית שלנו &#8211; במקרה שלי Windows כרגע) כדי שנוכל להתנסות בה כאילו רכשנו את אחד ממחשבי ה Chrome OS.<!--more-->

&nbsp;

## **<span style="text-decoration: underline;">לפני שנתחיל בפרטים הטכניים, קצת על מערכת ההפעלה</span>**

ביולי 2009 חברת Google יצאה בהכרזה על המערכת (או יותר נכון תחילת העבודה עליה, לדבריה). המערכת (שמבוססת על <a href="http://en.wikipedia.org/wiki/Linux_kernel" target="_blank">לינוקס קרנל</a>), לוקחת את הרעיון שרוב מה שאנחנו עושים במחשב מבוסס על האינטרנט (או בקיצור בענן) ורובנו לא צריכים יותר מהדפדפן. בהמשך לרעיון הזה, המערכת בנויה כדפדפן הכרום (רק גדול יותר).

בשנת 2010 המערכת נחשפה לראשונה לציבור, וכבר ביוני 2011 יצאו מחשבי ה <a href="https://www.google.com/chrome/devices/chromebooks.html" target="_blank">Chromebooks</a> הראשונים (תחילה של <a href="http://en.wikipedia.org/wiki/Samsung" target="_blank">Samsung</a>, ולאחר מכן של <a href="http://en.wikipedia.org/wiki/Acer_Inc." target="_blank">Acer</a>).

&nbsp;

## <span style="text-decoration: underline;"><strong>Chromium OS</strong></span>

בנובמבר 2009 גוגל הכריזה על פרויקט הקוד הפתוח של המערכת, שנקרא <a href="http://www.chromium.org/chromium-os" target="_blank">Chromium OS</a> (כמו בגרסת הדפדפן). ניתן להוריד את קוד המקור של הפרויקט מהאינטרנט, לקפל אותו, ולהתקין אותו על המחשב האישי, אך כמובן חסרים הדרייבים שיתיאמו למחשב שלנו. לכן מה שאנחנו נעשה זה להוריד גרסה מקומפלת המתאימה להרצה על מכונה ווירטואלית, כך לא נצטרך להוריד את קוד המקור, לקמפל, להתקין ואולי להיתקע עם דרייברים שלא עובדים.

אז מאיפה לנו הגרסה הזו? למזלנו,יש מפתח אחד שביצע את העבודה בשבילנו והוא נותן את האפשרות להוריד אותה בחינם. למפתח קוראים Liam McLoughlin ו<a href="http://chromeos.hexxeh.net/" target="_blank">זה האתר</a> ממנו הוא נותן להוריד את הגרסה שלו.

&nbsp;

## <span style="text-decoration: underline;"><strong>לעבודה</strong></span>

[<img class="alignleft wp-image-919" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/New_VirtualBox.png" alt="New VirtualBox" width="400" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/New_VirtualBox.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/New_VirtualBox-300x224.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/New_VirtualBox.png)קודם כל יש להוריד את הגרסה המתאימה למכונה ווירטואלית VirtualBox <a href="http://chromeos.hexxeh.net/download.php?track=vanilla&build=2823.0.2012_08_30_1632-r2ff2f11d&type=virtualbox" target="_blank">מכאן</a>, ולחלץ אותה לאיזה נתיב שתבחרו (לא באמת משנה איזה), ולאחר מכן להוריד את VirtualBox <a href="https://www.virtualbox.org/wiki/Downloads" target="_blank">מכאן</a>. 

אחרי ההתקנה של VirtualBox יש לפתוח את התוכנה וללחוץ על New כדי ליצור מכונה ווירטואלית חדשה.  

&nbsp;

## <img class="alignleft wp-image-920" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Welcome.png" alt="Welcome" width="400" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Welcome.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Welcome-300x224.png 300w" sizes="(max-width: 400px) 100vw, 400px" />

&nbsp;

נפתח מסך ה Welcome, כאן לחצו על next.  

## <img class="alignleft wp-image-921" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Name_For_VirtualBox.png" alt="Name For VirtualBox" width="400" height="299" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Name_For_VirtualBox.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Name_For_VirtualBox-300x223.png 300w" sizes="(max-width: 400px) 100vw, 400px" />

&nbsp;

&nbsp;

תנו שם למכונה הווירטואלית שלכם (אני בחרתי ב Chrome OS אבל זה לא באמת משנה). ולאחר מכן תבחרו את מערכת ההפעלה אותה אתם מתכוונים להריץ, במקרה הזה Linux וגרסת Ubuntu.

&nbsp;

## [<img class="alignleft wp-image-922" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Memory.png" alt="Memory" width="400" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Memory.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Memory-300x224.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Memory.png)

תקצו למערכת כמות זיכרון עליה היא יכולה לעבוד. ככל שתקצו יותר זיכרון המערכת תרוץ מהר יותר, אך תזהרו לא להקצות יותר מידי זיכרון עד שהמחשב יהיה יותר מידי איטי וכך גם המכונה הוירטואלית (ובסוף בעצם תאטו את המערכת במקום להפוך אותה למהירה יותר). 

&nbsp;

## [<img class="alignleft wp-image-923" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Rar.png" alt="Rar File" width="400" height="299" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Rar.png 790w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Rar-300x224.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Rar.png)

כעת תנווטו לקובץ שחילצנו מקובץ ה rar. 

## [<img class="alignleft wp-image-924" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Create.png" alt="Create" width="400" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Create.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Create-300x224.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Create.png)

ולבסוף תעברו על הבחירות שלכם ותוודאו שהכל אכן טוב ולחצו על Create. 

## [<img class="alignleft wp-image-926" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Settings.png" alt="Settings" width="400" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Settings.png 787w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Settings-300x224.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Settings.png)

לפני שנתחיל את המכונה הווירטואלית, נבצע עוד כמה שינויים בהגדרות, תבחרו במכונה הווירטואלית שהרגע יצרנו ולחצו על Settings. 

&nbsp;

##  [<img class="alignleft wp-image-929" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/System.png" alt="System" width="400" height="300" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/System.png 787w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/System-300x225.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/System.png)

כנסו ל System. כעת יש 2 חוצצים, האחד Motherboard בו ניתן לשנות את כמות הזיכרון שהקצנו, והשני Processor בו ניתן להקצות מספר ליבות לעבודה (בשביל המכונה הווירטואלית). 

## [<img class="aligncenter wp-image-930" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Motherboard__Processor.png" alt="Motherboard & Processor" width="900" height="337" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Motherboard__Processor.png 1574w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Motherboard__Processor-300x112.png 300w" sizes="(max-width: 900px) 100vw, 900px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Motherboard__Processor.png)

[<img class="alignleft wp-image-931" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Network.png" alt="Network" width="400" height="299" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Network.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Network-300x223.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Network.png)

עכשיו, כנסו ל Network ובחרו ב Adapter 1 בשביל לבחור בכרטיס הרשת שלכם. כמו שניתן לראות, אצלי כרטיס הרשת הוא אלחוטי ומסוג Ralink. בנוסף, אתחבר ל WIFI כדי שהמערכת תעבוד במלואה, הרי כמו שהזכרנו היא די חייבת אינטרנט (הזכרנו שכמעט כולה נמצא בענן). ולבסוף לחצו על Ok. 

&nbsp;

&nbsp;

## [<img class="alignleft wp-image-932" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Start.png" alt="Start" width="400" height="299" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Start.png 789w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Start-300x223.png 300w" sizes="(max-width: 400px) 100vw, 400px" />](http://www.lifelongstudent.net/wp-content/uploads/2012/09/Start.png) 

וכעת אנחנו מוכנים ללחוץ על Start ולהפעיל את המערכת.

## **<span style="text-decoration: underline;">דרך 2 &#8211; Disk on key</span>**

דרך נוספת (ואולי קלה יותר) היא דרך צריבה של המערכת על גבי Disk on key.  
<img class="alignleft wp-image-934" src="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Win32DiskImager.png" alt="Win32DiskImager" width="300" height="153" srcset="http://www.lifelongstudent.net/wp-content/uploads/2012/09/Win32DiskImager.png 422w, http://www.lifelongstudent.net/wp-content/uploads/2012/09/Win32DiskImager-300x152.png 300w" sizes="(max-width: 300px) 100vw, 300px" />בשביל לבצע זאת, יש להוריד את הגרסה <a href="http://chromeos.hexxeh.net/" target="_blank">הזאת</a> של Chrome OS ותוכנה בעזרתה ניתן יהיה לצרוב את ה image על דיסק און קיי <a href="http://sourceforge.net/projects/win32diskimager/" target="_blank">מכאן</a>.

  1. כעת חלצו את קובץ ה Image שב rar.
  2. פתחו את התוכנה שהורדנו (Image Writer for Windows).
  3. לחצו על אייקון התיקייה ונווטו אל ה Image.
  4. ליד אייקון התיקייה תבחרו את הכונן של הדיסק און קיי.
  5. ולחצו על Write.

לבסוף כבו את המחשב, עלו ל BIOS ותבחרו בעליה דרך הדיסק און קיי, לאחר מכן חברו את הדיסק און קיי והפעילו את המחשב.

&nbsp;

## <span style="text-decoration: underline;"><strong>לסיכום</strong></span>

אני ממליץ להתנסות בדרך הראשונה של התקנת המערכת (דרך VirtualBox) מכייון שדרך המכונה הווירטואלית ניתן להתנסות בהמון סוגי מערוכת הפעלה מבלי להתקין אותן על המחשב, זהו כלי שיכול לעזור לכם המון בהמשך.

אני מקווה שהכל עבר ללא תקלות, אך במידה וכן נתקלתם בשגיאה כלשהי, אל תהססו לכתוב בתגובות ואשתדל לעזור.