---
title: 'Install Android SDK - Android-Studio on Ubuntu'
author: nirgn
layout: post
category: Android
---
[<img class="alignleft wp-image-1050" src="http://www.lifelongstudent.net/wp-content/uploads/2013/05/Ubuntu__Android.png" alt="Ubuntu & Android" width="350" height="233" srcset="http://www.lifelongstudent.net/wp-content/uploads/2013/05/Ubuntu__Android.png 394w, http://www.lifelongstudent.net/wp-content/uploads/2013/05/Ubuntu__Android-300x199.png 300w" sizes="(max-width: 350px) 100vw, 350px" />](http://www.lifelongstudent.net/wp-content/uploads/2013/05/Ubuntu__Android.png)פוסט זה יהיה מדריך להתקנת Android SDK (כולל עדכון ה SDK, הגדרה של אמולטור, התקנת Eclipse והתקנה של הפלאגין ADT באקפליס, שבעצם יאפשר לנו לפתח ל Android ב Eclipse). בחלק השני של הפוסט אסביר כיצד להתקין את ה IDE החדש &#8211; Android Studio (כולל הגדרת האמולטור), ובשביל להתחיל להתניע ניצור אפליקציית Hello world קטנטנה בסביבה החדשה.

ראיתי עם הזמן המון מדריכים שמסבירים כיצד לבצע את ההתקנות הללו, אך כולם בסביבת Windows בלבד. ולכן אחרי Google I/O 13 שבו הכריזו על Android Studio חשבתי לכתוב מדריך קטן על התקנה והתחלת הפעולה ב IDE החדש (באובונטו), ועל הדרך גם ב IDE הישן &#8211; הלא הוא Eclipse.

<!--more-->

&nbsp;

## <span style="text-decoration: underline;"><strong>התקנת Android SDK ו Eclipse</strong></span>

  1. יש להוריד את ה SDK מ<a href="http://developer.android.com/sdk/index.html" target="_blank">אתר המפתחים של אנדרואיד</a>. מכיוון שאנו נשתמש ב IDE קיים (Eclipse) בחלק התחתון של העמוד יש לפתוח את הקטגוריה <span style="color: #00ff00;">Use Aa Existing IDE</span> וללחוץ על הכפתור הכחול שאומר <span style="color: #00ff00;">Download the SDK tools for linux</span>.
  2. נחלץ את הקבצים (בשביל הנוחות בשאר הפקודות, העתיקו את הקובץ שירד לתיקיית ה <span style="color: #ff0000;">Home</span> שלכם), פתחו את הטרמינל וכתבו <span style="color: #00ff00;">tar xzvf android-sdk_r22.0.1-linux.tgz</span> (כמובן שהמדריך כנראה יתיישן עם הזמן &#8211; אז התאימו את הפקודה לשם הקובץ, במידה והגרסה גבוהה יותר מ22.0.1 החליפו את המספרים בפקודה כך שיתאימו לשם הקובץ שהורדתם).
  3. **בשביל 64 ביט בלבד:** כתבו את הפקודות הבאות (הקפידו על הסדר) <span style="color: #00ff00;">sudo apt-get update</span> (לאחר הפקודה תדרשו להכניס את הסיסמה של המשתמש), ואחר מכן <span style="color: #00ff00;">sudo apt-get install ia32-libs-multiarch</span>.
  4. **במידה ולא מותקן לכם Java JDK** התקינו על ידי כתיבת הפקודות הבאות: (הקפידו על הסדר) כדי להוסיף את ה PPA כתבו <span style="color: #00ff00;">sudo add-apt-repository ppa:webupd8team/java</span>, וכדי לעדכן את הספריה כתבו <span style="color: #00ff00;">sudo apt-get update</span> ולבסוף כדי להתקין את ה Java JDK גרסה 8 כתבו <span style="color: #00ff00;">sudo apt-get install oracle-java8-installer</span>.
  5. נמשיך בהתקנת ה SDK, כתבו בטרמינל <span style="color: #00ff00;">cd android-sdk-linux/tools</span> כדי לנווט לתיקיית ה <span style="color: #ff0000;">tools</span> ולאחר מכן <span style="color: #00ff00;">android sdk/.</span> כדי לפתוח את ה SDK.
  6. בחרו בחבילות אותן אתם רוצים להתקין (וכמובן ב <span style="color: #339966;">tools</span> וב <span style="color: #339966;">platform-tools</span>) ולחצו על <span style="color: #339966;">install</span> בחלק הימני-תחתון (אשרו את התנאים וחכו עד שההתקנה תסתיים).
  7. **במידה ו Eclipse לא מותקן**, יש 2 שיטות: א. להתקין באופן ידני &#8211; חפשו באינטרנט מדריך, הפעולה לא קשה וקצרה יחסית. ב. כנסו ל <span style="color: #339966;">Ubuntu Software Center</span> (מרכז התוכנות של אובונטו) כתבו בחיפוש <span style="color: #339966;">Eclipse</span> והתקינו.
  8. **כעת נגדיר את ה Adb**, חברו את המכשיר אנדרואיד שלכם למחשב וכתבו (בטרמינל) <span style="color: #00ff00;">lsusb</span> זה יתן לכם רשימה של המכשירים המחוברים למחשב באמצעות ה usb, חפשו את המכשיר שלכם ולידו צריך להיות ID בפורמט xxxx:xxxx, העתיקו / רשמו אותו בקובץ נפרד.
  9. כתבו בטרמינל <span style="color: #00ff00;">cd </span>ולאחר מכן <span style="color: #00ff00;">sudo gedit /etc/udev/rules.d/99-android.rules</span> יפתח לכם קובץ ואליו תעתיקו (בסוף הקובץ) את השורה הבאה:  <pre class="lang:default decode:true ">SUBSYSTEM=="usb", ATTRS{idVendor}=="####:####", SYMLINK+="android_adb", MODE="0666" GROUP="plugdev"TEST=="/var/run/ConsoleKit/database", \RUN+="udev-acl --action=$env{action} --device=$env{DEVNAME}"</pre>

    במקום ####:#### כתבו כמובן את ה ID של המכשיר שלכם, שמרו את הקובץ וצאו ממנו. 

 10. כדי לאתחל את ה Device Manager של אובונטו כתבו (בטרמינל) <span style="color: #00ff00;">sudo service udev restart</span>.
 11. **לבדיקה:** בשביל לבדוק שהמכשיר שלנו אכן מזוהה, כתבו (בטרמינל) <span style="color: #00ff00;">cd android-sdk-linux/platform-tools</span>, ולאחר מכן <span style="color: #00ff00;">adb devices/.</span> &#8211; אתם צריכים לראות את המכשיר שלכם ואת המספר הסידורי שלו.
 12. **כדי שנוכל לכתוב פקודות adb באופן כללי בטרמינל** (ללא הצורך לנווט לנתיב בו מותקן ה adb) כתבו <span style="color: #00ff00;">sudo gedit ~/.bashrc</span> ולקובץ שנפתח העתיקו (בסופו): <pre class="lang:default decode:true">Android tools #
export PATH=${PATH}:~/android-sdk-linux/tools
export PATH=${PATH}:~/android-sdk-linux/platform-tools</pre>

 13. **לבדיקה:** נתקו את המכשיר מהמחשב -> הפעילו מחדש את המחשב -> חברו את המכשיר למחשב -> כתבו בטרמינל <span style="color: #00ff00;">adb devices</span> (הטרמינל אמור לזהות את הפקודה והמכשיר יופיע כמחובר).
 14. **התקנת הפלאגין ADT ב Eclipse:** כדי שנוכל לכתוב אפליקציות לאנדרואיד, יש להגדיר את ה ADT, אז פתחו את האקליפס ובתפריט לחצו על <span style="color: #339966;">help</span> ועל <span style="color: #339966;">Install New Software</span>, בחלון שנפתח לחצו על <span style="color: #339966;">add</span> ובחלון הבא כתבו _ADT Plugin_ ובמיקום (שורה שניה) כתבו את הכתובת _https://dl-ssl.google.com/android/eclipse_ ולחצו על <span style="color: #339966;">ok</span>. בחלון שנפתח סמנו את <span style="color: #339966;">Developer Tools</span> ולחצו על <span style="color: #339966;">next</span>, בחלון הבא גם לחצו על <span style="color: #339966;">next</span> ובחלון אחריו אשרו את תנאי השימוש ולחצו על <span style="color: #339966;">finish</span>.

&nbsp;

## <span style="text-decoration: underline;"><strong>התקנת Android-Studio</strong></span>

  1. הדבר הראשון שיש לבצע הוא הורדה של התוכנה שגם היא נמצאת ב<a href="http://developer.android.com/sdk/index.html" target="_blank">אתר המפתחים</a> של Android.
  2. העתיקו את הקובץ שהורדתם לתיקיית ה <span style="color: #ff0000;">Home</span> (בשביל הנוחות, כדי שלא נצטרך לכתוב כל פעם Download בנתיב של הפקודה). תפתחו את הטרמינל וכתבו <span style="color: #00ff00;">tar xzvf android-studio-bundle-130.687321-linux.tgz</span> (תקנו בהתאם את המספרים בפקודה במידה והגרסה שהורדתם חדשה יותר).
  3. נפתח את ה Android-studio ע"י ניווט דרך הטרמינל לתיקייה עם הפקודה <span style="color: #00ff00;">cd android-studio/bin</span> ולאחר מכן נפתח את התוכנה ע"י כתיבת הפקודה <span style="color: #00ff00;">studio.sh/.</span> .
  4. **במידה ולא מותקן לכם Java JDK** התקינו על ידי כתיבת הפקודות הבאות: (הקפידו על הסדר) כדי להוסיף את ה PPA כתבו <span style="color: #00ff00;">sudo add-apt-repository ppa:webupd8team/java</span>, וכדי לעדכן את הספריה כתבו <span style="color: #00ff00;">sudo apt-get update</span> ולבסוף כדי להתקין את ה Java JDK גרסה 8 כתבו <span style="color: #00ff00;">sudo apt-get install oracle-java8-installer</span>.
  5. **בשביל "זרימת" המדריך אל תבצע עדיין את שלב זה, נחזור אליו אחר כך.** כדי להגדיר את המכשיר כנסו בתפריט העליון ל <span style="color: #339966;">Run</span> ומשם ל <span style="color: #339966;">Edit configurations</span> (התפריט יראה כמו בתמונה בצד שמאל) ותחת חוצץ <span style="color: #339966;">General</span> בקטגוריה האמצעית (_Target Device_) בחרו ב <span style="color: #339966;">USB device</span>. (בהמשך, כדי לספק לכם תצלום מסך, הרצתי את האפליקציה על האמולטור ולא על המכשיר).

&nbsp;

## <span style="text-decoration: underline;"><strong>אפליקציית Hello World</strong></span>

[<img class="alignleft wp-image-1063" src="http://www.lifelongstudent.net/wp-content/uploads/2013/05/Welcome.png" alt="Welcome" width="450" height="341" />](http://www.lifelongstudent.net/wp-content/uploads/2013/05/Welcome.png)נפתח את ה android-studio ובחלון בחירה שיפתח נלחץ על New Project, סלחו לי על כך שהספקתי להעביר את התוכנה לערכת הנושא הכהה שלה (בעוד ברירת המחדל &#8211; מה שכנראה אתם רואים, היא הבהירה), בכל מקרה השינויים היחידים הם וויזואלים ומעבר לכך התפריטים זהים.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

 [<img class="alignleft wp-image-1065" src="http://www.lifelongstudent.net/wp-content/uploads/2013/05/New_Project.png" alt="New Project" width="450" height="360" />](http://www.lifelongstudent.net/wp-content/uploads/2013/05/New_Project.png)

&nbsp;

כעת תנו לאפליקציה שם. יש לכתוב את השם בשדה Application name ובשדה Module name. בשדה Package name יש לתת מזהה ייחודי, (בשביל האפליקציה הזאת, ניתן להשאיר אותו כמו שהוא).

* האפליקציה הזאת כנראה לא תעשה את דרכה מחוץ לכאן אז אל תחשבו יותר מידי (;

##  

&nbsp;

&nbsp;

&nbsp;

&nbsp;

 [<img class="alignleft wp-image-1066" src="http://www.lifelongstudent.net/wp-content/uploads/2013/05/MainActivity.png" alt="MainActivity" width="450" height="322" />](http://www.lifelongstudent.net/wp-content/uploads/2013/05/MainActivity.png)

&nbsp;

אחרי שהסטודיו בנה את הפרויקט, העורך נפתח, וכדי להתחיל לכתוב, נפתח את הקובץ MainActivity שנמצא בנתיב <span style="color: #ff0000;">src -> main -> java</span> ומשם למשיך לשם החבילה, במקרה שלי: <span style="color: #ff0000;">com.example.helloworldapp</span>.

* במידה והעץ לא נפתח לכם, לחצו על הלחצן Project שעומד במאונך, צמוד לחלק השמאלי של החלון, ממש מתחת לשם הפרויקט שלכם.

&nbsp;

&nbsp;

כעת כדי להציג איזשהו תוכן, נייבא TextView ע"י כתיבת הפקודה הבאה בראש המסמך (איפה שכל השורות של הייבוא ספריות).

<pre class="lang:default decode:true">import android.widget.TextView;</pre>

ובתוך המתודה onCreate נוסיף את השורות:

<pre class="lang:default decode:true">TextView tv = new TextView(this);
tv.setText("Hello, Android");
setContentView(tv);</pre>

הקוד כולו אמור להיראות כך בסופו של דבר:

<pre class="lang:default decode:true">package com.example.helloworldapp;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.widget.TextView;

public class MainActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		TextView tv = new TextView(this);
		tv.setText("Hello, Android");
		setContentView(tv);
	}

	@Override  
	public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
	}    
}</pre>

[<img class="alignleft wp-image-1067" src="http://www.lifelongstudent.net/wp-content/uploads/2013/05/Edit_Configurations.png" alt="Edit Configurations" width="450" height="287" />](http://www.lifelongstudent.net/wp-content/uploads/2013/05/Edit_Configurations.png)

לאחר מכן נחזור לשלב 5 בהתקנת Android-studio כדי להגדיר את המכשיר ולהריץ עליו את האפליקציה.  
להלן תמונת מסך של התפריט Edit configurations.

&nbsp;

##  

##  

&nbsp;

##  

&nbsp;

&nbsp;

[<img class="alignleft wp-image-1068" src="http://www.lifelongstudent.net/wp-content/uploads/2013/05/Emulator.png" alt="Emulator" width="350" height="459" />](http://www.lifelongstudent.net/wp-content/uploads/2013/05/Emulator.png)

&nbsp;

לבסוף, נלחץ על כפתור ה <span style="color: #339966;">play</span> הירוק (שנמצא מתחת לתפריט העליון, ממש מתחת ל Tools)כדי לפהעיל את האפליקציה על גבי ה Emulator.

&nbsp;

&nbsp;

## <span style="text-decoration: underline;"><strong>לסיום</strong></span>

מקווה שהצלחתם להתקין ולהגדיר את הכל כמו שצריך, במידה ולא &#8211; כתבו את הבעיה / תקלה בתגובות אשתדל לעזור. בנוסף, אני מקווה שבניית האפליקציה הראשונה שלכם גרמה לכם "לדגדוג" באצבעות וכעת רצו ללמוד Java ולאחר מכן בניית אפליקציות לאנדרואיד.

&nbsp;

* למה כתבתי "<span style="color: #00ff00;">!Hello world</span>" ולא טקסט אחר כלשהו? קיימת אמונה טפלה בקורסים הראשונים לתיכנות שזהו הטקסט הראשון שצריך להיכתב על ידי מתכנתים חדשים, אני לא מאמין גדול באמונות טפלות אבל בהתחשב בזה שזאת שורת הקוד הראשונה שאני כתבתי בזמנו, מי אני שאתווכח.. בכל מקרה, ביצעתי את חלקי בהשרשצ האמונה הטפלה הזו גם אליכם.
