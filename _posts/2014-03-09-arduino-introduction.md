---
title: 'ארדואינו (Arduino) - הקדמה'
author: nirgn
layout: post
category: Arduino
---
אז לפני שנתחיל, קצת הקדמה אישית: לפני כמה חודשים התחלתי להתעניין במיקרו בקר קטן בשם ארדואינו ([Arduino](http://arduino.cc/)), לאחר חקירה מעמיקה באינטרנט הגעתי לכמה מסקנות: 1.אין עליו הרבה חומר באינטרנט בעברית (לא שזה מפריע, אך מכאן נולד הרעיון לכתוב עליו בבלוג). 2.הגיע הזמן לשחק עם אחד כדי לראות אם זה באמת מה שאני רוצה.

בהתחשב בכך שלא הכרתי אף אחד עם הבקר וכל המידע שהיה לי היה ממאמרים ותמונות באינטרנט, ניגשתי ל [Meetup](http://www.meetup.com/) (פלטפורמה לתכנון פגישות / מועדונים / יצירת קהילות) כדי לבדוק האם ישנה קבוצה העוסקת בזה, בה אוכל להתנסות בבקר ולפגוש אנשים מהם ניתן ללמוד עוד יותר. לשמחתי מצאתי את [XLN תל אביב](http://www.meetup.com/XLNXLN/) (חברה נהדרים המקיימים סדנאות makers). שמח ומרוצה נרשמתי למפגש ארדואינו הבא, וכשהגעתי התגלה בפני עולם חדש. (יש לציין כי לפני כן לא התעסקתי באלקטרוניקה מיימי והתעניינתי יותר בצד התוכנה מאשר בחומרה) אך מהר מאוד, ובעזרת כמה מושגים בסיסיים אותם נלמד היום, הבנתי כמה קל, פשוט וכיף זה יכול להיות.

<!--more-->

&nbsp;

אחרי שעשינו יישור קו, אני מקוה שהפחד מאלקטרוניקה (אם היה) נמוג. בנוסף, אציין כי סדרת הפוסטים (ההסברים והפרויקטים הראשונים) מובססים על [אלו מאתר ארדואינו](http://arduino.cc/en/Tutorial/HomePage). בנוסף, הפוסט הזה יהיה תאורטי בלבד, אציג בו את הרכיבים האקלטרוניים השונים (בהם נשתמש בסדרת הפרוייקטים בפוסטים הבאים), הבקר עצמו (קצת היסטוריה והסבר על מהו הבקר ואיך הוא בנוי וכ'ו).

&nbsp;

### נתחיל ברכיבים השונים:

**Arduino Uno**

<img class="alignleft wp-image-1232" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Arduino_Uno.png" alt="Arduino Uno" width="220" height="154" />

זהו לוח הפיתוח שיהיה בלב הפרויקטים שלנו, גרסת הלוח נקראת Uno (שינם עוד גרסאות אדרואינו, כל אחת בנויה אחרת ובעלת פיצ'רים שונים, אך הקוד כמובן יתאים לכולן). האדרואינו זה בעצם מחשב פשוט החשוף לכל וככזה אנו יכולים לחבר אליו חלקים על מנת לבנות מעגלים אלקטרונים. בנוסף, אנו יכולים לכתוב אליו על מנת לגרום לו להתממשק ולבצע אינטראקציה מול אותם רכיבים.

&nbsp;

**לוח מטריצה - Breadboard**

<img class="alignleft wp-image-1233" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Breadboard.png" alt="Breadboard" width="220" height="136" />

לוח עליו אנו יכולים לבנות מעגלים אלקטרוניים. הוא משמש בעיקר לפרויקטים ואבי-טיפוס מכיוון שהוא משחרר אותנו מהצורך להלחים חוטים ורכיבים יחד. כל החריצים בשורה מחוברים יחדיו, מה שמאפשר לנו לחבר רכיבים על ידי חיבור כבלים מהם ואל אותם חריצים בשורה (שוב, במקום להלחימם יחד).

&nbsp;

**לחצן סוללה - Battery Snap**

<img class="alignleft wp-image-1234" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/BatterySnap.png" alt="Battery Snap" width="220" height="57" />

משמש לחיבור סוללה 9V לארדואינו או ללוח המטריצה (הארדואינו יכול להיות מחובר לחשמל גם דרך כבל ה USB ולקבל כוח מהמחשב).

 <img class="alignleft wp-image-1237 size-full" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Capacitors.png" alt="Capacitors" width="186" height="146" />

**קבלים - Capacitors**

רכיבים אלה מאחסנים ומשחררים (אוגרים ופורקים) אנרגיה חשמלית. כאשר המתח במעגל גבוהה יותר ממה שמאוחסן בקבלים, הם מאפשרים לזרום לזרום פנימה, מה "שטוען" את הקבלים. כשהמתח במעגל נמוך יותר, האנרגיה המאוחסנת בו משחוררת. לעתים קרובות הקבלים מונחים על פני חריצים של "כוח" ו"אדמה" בקרבה לחיישן או למנוע כדי לעזור למנוע תנודות במתח (לייצב את המתח).

&nbsp;

**>מנוע DC**

<img class="alignleft wp-image-1238" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/DC_Motor.png" alt="DC Motor" width="220" height="92" /

ממיר את האנרגיה החשמלית לאנרגיה מכנית ,סלילי התיל בתוך המנוע הופכים לממוגנטים כאשר זורם דרכם זרם. השדות המגנטים האלו מושכים והודפים את המגנטים וגורמים למוט להסתובב (או להסתחרר). כשהכיוון של החשמל הפוך, המנוע יסתובב בכיוון ההפוך.

&nbsp;

**דיודה - Diode**

[<img class="alignleft size-full wp-image-1240" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Diode.png" alt="Diode" width="258" height="27" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Diode.png)הדיודה מבטיחה שהחשמל זורם רק בכיוון אחד (שימושי כאשר יש לנו מנוע או מתח/עומס גבוה אחר במעגל). דיודות הן מקוטבות, כלומר הכיוון שהן ממוקמות במעגל משנה. אם נניח אותן בדרך אחת, הן יאפשרו לזרם לעבור, נניח אותן הפוך, הן יחסמו אותו. הקוטב החיובי (אנודה) בדר"כ מתחברת לנקודה בה האנרגיה במעגל שלנו גבוהה. בעוד הקתודה בדר"כ מתחברת לנקודה בה האנרגיה נמוכה יותר או לקרקע. הקתודה היא בדר"כ עם הסימן של הלקה בצד אחד של גוף הרכיב (פס לקה).

&nbsp;

<img class="alignleft wp-image-1241" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Cellophane.png" alt="Cellophane" width="220" height="95" />

**נייר צלופן (בצבעים אדום, ירוק, כחול)**

בעזרתם נסנן את אורכי הגל השונים של האור. כשהם פועלים ביחד עם נגד תלוי אור הם גורמים לחיישן (של הנגד תלוי האור) להגיב רק לכמות האור בצבע המסונן.

&nbsp;

<img class="alignleft size-full wp-image-1242" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/H-Bridge.png" alt="H-Bridge" width="157" height="63" />

**גשר אייצ'- H Bridge**

מעגל המאפשר לשלוט בעומס ע"י שליטה בקוטביות המתח, בדר"כ מדובר על מנוע. הגשר בו אנו נשתמש היא מעגל משולב, אך ניתן לבנות גשר כזה גם אם מספר רכיבים בדידים.

 <img class="alignleft wp-image-1245" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Jumper_Wires.png" alt="Jumper Wires" width="400" height="155" />

**חוטי גישור - Jumper Wires**

נשתמש בחוטים האלו כדי לחבר רכיבים מ/ו לאנדרואינו בעזרת לוח המטריצה.

&nbsp;

**דיודות פולטות אור - LEDs**

[<img class="alignleft wp-image-1246" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/LEDs.png" alt="LEDs" width="320" height="130" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/LEDs.png)סוג של דיודה המאירה כאשר חשמל זורם בכיוון אחד בלבד (דרכה). בטח נתקלתם בכאלו במגוון של מכשירים אלקטרונים (בדר"כ לסימון שהמוצר דולק וכד'). הקוטב החיובי (האנודה) שבדר"כ מחוברת לכוח / זרם / חשמל היא הרגל הארוכה יותר, הקתודה היא הרגל הקצרה יותר.

&nbsp;

**תצוגת גביש נוזלי - LCD**

[<img class="alignleft wp-image-1248" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/LCD.png" alt="LCD" width="260" height="116" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/LCD.png)סוג של תצוגה אלפא נומרית או גרפית המבוססת על גבישים נוזליים. צגי LCD זמינים בגדלים, צורות וסגנונות רבים וניתן לרכוש כאלו בכל חנות אלקטרוניקה. אני משתמש בכזה עם 2 שורות, כשבכל שורה יש 16 תווים.

&nbsp;

**סיכות כותרת זכר - Male Header Pins**

<img class="alignleft size-full wp-image-1249" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Male_Header_Pins.png" alt="Male Header Pins" width="300" height="85" />סיכות אלה משתלבות בשקעי נקבה, כמו אלו שעל לוח הלחם. הסיכות מסייעות להפוך את החיבור של הדברים לקל ופשוט הרבה יותר.

&nbsp;

**מצמד אופטי - Optocoupler**

[<img class="alignleft size-full wp-image-1250" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Optocoupler.png" alt="Optocoupler" width="60" height="62" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Optocoupler.png)מאפשר לחבר שני מעגלים שאינם חולקים אספקת חשמל משותפת. בתוכו יש נורת LED קטנה שכאשר מוארת גורמת לקולטי אור הנמצאים בתוכו לסגור מתג פנימי. כשנעביר זרם לפין ה+, הנורה תואר והמתג הפנימי ייסגר. שתי היציאות מחליפות מתג במעגל השני.

&nbsp;

**חיישן פיזואלקטריים - Piezo**

<img class="alignleft wp-image-1251" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Piezo.png" alt="Piezo" width="110" height="96" />

רכיב חשמלי שניתן להשתמש בו כדי לזהות תנודות וליצור רעשים.

&nbsp;

**נגד תמונה - Photoresistor**

<img class="alignleft wp-image-1252" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Photoresistor.png" alt="Photoresistor" width="32" height="94" />

מכונה גם תא פוטואלקטרי או נגד תלוי אור. זהו נגד משתנה המשנה את ההתנגדות שלו על בסיס כמות האור שנופל על שטח הפנים שלו.

&nbsp;

**פוטנציומטר - Potentiometer**

<img class="alignleft wp-image-1255" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Potentiometer.png" alt="Potentiometer" width="42" height="109" />נגד משתנה בעל שלושה פינים. שניים מהפינים מחוברים לקצוות של הנגד באופן קבוע. הפין (רגל) שבאמצע נעה על פני הנגד, ומחלקת אותו לשני חצאים. כאשר הרגלים בצדדים החיצוניים של הפוטנציומטר מחוברות למתח ולקרקע, הרגל האמצעית נותנת את ההבדל במתח (כמו לסובב ידית).

&nbsp;

**לחצנים**

[<img class="alignleft size-full wp-image-1257" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Button.png" alt="Button" width="61" height="50" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Button.png)מתגים רגעיים שסוגרים מעגל כשלוחצים עליהם. הם נצמדים בקלות ללוח המטריצה ומשמשים להפעלה/כיבוי של אותות.

&nbsp;

**נגדים - Resistors**

<img class="alignleft size-full wp-image-1258" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Resistors.png" alt="Resistors" width="143" height="100" />

נגדים מתנגדים לזרימה של האנרגיה החשמלית במעגל, ומשנים את המתח והזרם כתוצאה מכך. ערכי הנגד נמדדים באוהם ומסומנים ע"י האות היוונית אומגה &#8211; Ω. הפסים הצבעוניים הנמצאים עליהם מצביעים על ערכם.  
להלן טבלת הערכים של הצבעים:

[<img class="aligncenter wp-image-1262" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Resistor_Table.png" alt="Resistor Table" width="580" height="657" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Resistor_Table.png)

**מנוע סרוו (Servo)**

<img class="alignleft wp-image-1264" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Servo_Engine.png" alt="Servo Engine" width="240" height="139" />

סוג של מנוע מכוון שיכול להסתובב רק 180 מעלות. הוא נשלט ע"י שליחת פולסים חשמליים מהארדואינו, הפולסים האלה אומרים למנוע לאיזה כיוון הוא צריך לזוז.

&nbsp;

**חיישן טמפרטורה**

<img class="alignleft wp-image-1266" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Temperature_Sensor.png" alt="Temperature Sensor" width="45" height="101" />החיישן משנה את תפוקת המתח שלו בהתאם לטמפרטורה של הרכיב. הרגליים החיצוניות מתחברות לכוח ולאדמה, והמתח על הפין המרכזי משתנה בהתאם בהתאם לחום או לקור.

&nbsp;

**חיישן הטיה**

[<img class="alignleft wp-image-1267" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Tilt_Sensor.png" alt="Tilt Sensor" width="30" height="90" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Tilt_Sensor.png)סוג של מתג שנפתח ונסגר בהתאם לאוריינטציה שלו. בדר"כ הם כלילים וחלולים עם כדור מתכת בפנים שיוצר חיבור של שני מוליכים כשהוא מוטה בכיוון הנכון.

&nbsp;

**טרנזיסטור**

[<img class="alignleft wp-image-1270" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Transistors.png" alt="Transistors" width="120" height="106" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Transistors.png)מכשיר בעל שלוש רגליים שיכול לפעול כמתג אלקטרוני. שימושי לשליטה ברכיבים בעלי זרם / מתח גבוהה כמו מנועים. סיכה אחת מתחברת לאדמה, האחרת לרכיב, והשלישית לארדואינו. כאשר הרכיב מקבל מתח על הפין שמחובר לארדואינו הוא סוגר את המעגל בין האדמה לבין הרכיב האחר.

&nbsp;

**כבל USB**

[<img class="alignleft wp-image-1271" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/USB.png" alt="USB" width="250" height="143" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/USB.png)הארדואינו מתחבר בכבל USB סוג B, ולכן הכבל בו נשתמש יהיה כבל USB מסוג B לסוג A (הסוג הרגיל שיש לנו במחשב). הכבל יאפשר לנו לחבר את מכשיר הארדואינו אונו למחשב לתכנות ובנוסף כדי לקבל חשמל.

&nbsp;

### קצת על הארדואינו (Arduino)

לאחר שהכרנו בקצרה כל אחד מהרכיבים, נדבר קצת על הארדואינו, הארדואינו הוא רכיב חומרה שהתחיל את דרכו בשנת 2005 כפרויקט לסטודנטים המתמחים באינטראקציות בתחום העיצוב, במכון lvrea שבאיטליה. לוח הארדואינו מורכב מ [מיקרו-בקר](http://en.wikipedia.org/wiki/Microcontroller) בעל 8 סיביות מסדרת AVR של חברת Atmel, ותכונתנו העקרית הינה הדרך הסטנדרטית בה הלוח וכל המחברים שלו חשופים. בנוסף, ניתן לחבר ללוח מגוון רחב של מודלים נוספים הנקראים Shileds (מגנים), כשכל אחד מהם מספק בדר"כ יכולת שונה (כגון בקרה מוטורית, GPS, אתרנט, תצוגת LCD וכד').

נכון להיום ישנם 16 גרסאות של חומרת ארדואינו המיוצרות באופן מסחרי (להלן [הרשימה](http://en.wikipedia.org/wiki/List_of_Arduino_boards_and_compatible_systems)). החברה המקורית המייצרת את חומרת הארדואינו היא Italian company Smart Projects, וישנם גם כאלו של SparkFun Electronics האמריקאית (וכמובן מגוון העתקים סינים ב eBay ו Aliexpress). כדי לכתוב ללוח יש להתקין את סביבת הפיתוח הייעודית אליו, אותה ניתן להוריד מאתר ארדואינו [כאן](http://arduino.cc/en/Main/Software#toc1) (הורידו את הגרסה המתאימה למערכת ההפעלה שלכם והשלימו את ההוראות).

&nbsp;

**כיצד הלוח בנוי:**

[<img class="aligncenter wp-image-1272" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Arduino_Broad.png" alt="Arduino Broad" width="500" height="738" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Arduino_Broad.png)

**בדיקה**

[<img class="alignleft wp-image-1273" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Serial_Port.png" alt="Serial Port" width="250" height="132" />](http://www.lifelongstudent.net/wp-content/uploads/2014/03/Serial_Port.png)על מנת לבדוק שהכל קשורה והמכשיר מזוהה פתחו את ה IDE (סביבת העבודה של ארדואינו &#8211; Sketch), כנסו ל `File` ומשם ל `Examples`, כאן נמצא דוגמאות לקטעי קוד המבצעים פעולות כלשהן כולל הסברים (הערות) בתוך הקוד. כדי לבצע בדיקה פשוטה נבחר ב `Basics` וב `Blink`. יפתח לנו חלון חדש (את הישן ניתן לסגור).

לא נעבור על הקוד כעת אלה רק נעלה אותו ללוח הארדואינו שלנו, לכן ניכנס ל `Tools` ואז ל `Serial Port` ונבדק שה v נמצא על החיבור שהארדואינו נמצא עליו (כשנבחר את הלוח תקפוץ לנו הודעה קטנה באיזה חיבור הוא נמצא, וככלל אצבע בווינדוס הוא יהיה על ה COM עם <img class="alignleft wp-image-1274" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Tools-Board.png" alt="Tools Board" width="250" height="109" />המספר הגבוה ביותר). לאחר מכן נוודא שהוא מזהה שיש לנו את הלוח הנכון ע"י כניסה ל `Tools` ול `Board` ובחירת הלוח המתאים (אני משתמש ב Arduino Uno ועליו אבצע את כל הפרויקטים בעתיד).

כעת נלחץ על החצן המצביע לכיוון ימין (כשנעבור מעליו נראה הודעה של Upload) ולאחר מכן נראה שהקוד שלנומתקמפל ועולה אל הלוח (בבר התחתון שיופיע). לאחר שהעלינו את הקוד, בלי לבצע כל דבר מעבר לכך, <img class="alignleft wp-image-1275" src="http://www.lifelongstudent.net/wp-content/uploads/2014/03/Upload.png" alt="Upload" width="200" height="240" />הארדואינו שלנו צריך להתחיל להפעיל את הקוד, ונראה שהנורה של פין מס' 13 מהבהבת, זה כל מה שהקוד צריך לעשות. (ניתן לנסות לעבור עליו לבד ולהבין למה, בעתיד נכתוב את הקוד לבד ואסביר אותו).

&nbsp;

### לסיכום

אני יודע שהפוסט הזה היה עמוס במידע תיאורטי, אך הוא נועד להיות בתור קופסא אליה תוכלו לחזור כל פעם שאזכיר רכיב אלקטרוני כלשהו בפרויקטים העתידיים. וכמובן שאין מה להתאמץ לזכור הכל על כל רכיב. אני מקווה שלא נתקלתם בבעיות במהלך הבדיקה, אך במידה וכן, כתבו בתגובות ואנסה לעזור כמידת האפשר.
