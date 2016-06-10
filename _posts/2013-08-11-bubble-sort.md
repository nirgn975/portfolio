---
title: מיון בועות (Bubble Sort)
author: nirgn
layout: post
categories:
  - Algorithms
tags:
  - Algorithm
  - Algorithms
  - Bubble
  - Code
  - for
  - Pseudo
  - Sort
  - while
  - אלגוריתם
  - אלגוריתמים
  - בועות
  - הסבר
  - זמן
  - מאמר
  - מדריך
  - מיון
  - מקום
  - סיבוכיות
  - פסאודו
  - קוד
  - ריצה
---
[<img class="alignleft wp-image-1172" src="http://www.lifelongstudent.net/wp-content/uploads/2014/12/The_Friendship_Algorithm.png" alt="The Friendship Algorithm" width="300" height="209" />](http://www.lifelongstudent.net/wp-content/uploads/2014/12/The_Friendship_Algorithm.png)Bubble Sort &#8211; מיון בועות, ידוע גם בתור מיון החלפה, בסיסו, הוא מיון השוואתי בין 2 מספרים.

**עקרון האלגוריתם:**

  * נשווה את האיבר האחרון עם האיבר שלפניו.
  * במידה והוא קטן ממנו נחליף בינהם, אחרת נמשיך הלאה.
  * בסיום הלולאה הפנימית (השוואת כל האיברים מול אלה שלפניהם), נעלה, ונבצע שוב את שלבים 1+2 על כל האיברים למעט האיבר הראשון במערך.
  * המשך כך עד שכל האיברים יהיו בחלק השמאלי של המערך (החלק הממויין).

<!--more-->

&nbsp;

שימו לב: האלגוריתם בדרך כלל בנוי קצת אחרת ומבצע "בעבוע" למעלה של האיבר בעל הערך הגדול ביותר (בדיוק כמו באנימציה בצד שמאל), אך הקוד שאני כתבתי כאן מבצע את זה בצורה הפוכה &#8211; הוא "מבעבע" למטה את האיבר בעל הערך הקטן ביותר.

**הקוד של האלגוריתם (ב<a href="http://en.wikipedia.org/wiki/Pseudocode" target="_blank">פסאודו קוד</a>):**

<pre class="lang:default decode:true ">BUBBLE-SORT(A)
for (i &lt;- 1 to length[A]) do
    for (j &lt;- length[A] downto i + 1) do
        if (A[j] &lt; A[j - 1]
            exchange A[j] &lt;-&gt; A[j - 1]</pre>

[<img class="alignleft size-full wp-image-1083" src="http://www.lifelongstudent.net/wp-content/uploads/2013/08/Bubble-sort.gif" alt="Bubble Sort" width="300" height="180" />](http://www.lifelongstudent.net/wp-content/uploads/2013/08/Bubble-sort.gif) להלן אנימציה (בצד שמאל) של האלגוריתם בפעולה על מערך, כשהמערך ההתחלתי הוא {4 ,2, 7, 8, 1, 3, 5, 6}, והמערך המתקבל בסוף הוא {8, 7, 6, 5, 4, 3, 2, 1}.

&nbsp;

**הסבר מופשט:**  
האלגוריתם בודק את האיבר האחרון במערך מול האיבר שלפניו, ובמידה והוא קטן ממנו הופך בניהם, במידה ולא (ז"א שהאיבר האחרון במערך גדול מזה שלפניו) הוא ממשיך הלאה לאיבר שלפניו (זה שלפני האחרון) ובודק אותו עם האיבר שלפניו (השני לפני האחרון).

בסיום סדרת הבדיקות הזאת נמצא הערך הקטן ביותר במערך וכעת הוא במקום הראשון במערך. כעת נבצע שוב את סדרת הפעולות על כל האיברים הנותרים (כל איברי המערך למעט האיבר הראשון).

&nbsp;

**הרצה של הקוד לשם המחשה של השלבים המתבצעים:**

  1. נקבל מערך: { 5, 7, 1, 3 }.
  2. שורה 2: נתחיל לולאת for, מהתא הראשון עד לתא האחרון ונבצע: <ul style="list-style-type: circle;">
      <li>
        שורה 3: נתחיל לולאת for, מהתאר האחרון ועד ל i +1 (במקרה הזה התא השני) ונבצע: <ul style="list-style-type: disc;">
          <li>
            שורה 4: אם האיבר j (כרגע האחרון, 5) קטן מהאיבר שלפניו (7). <ul style="list-style-type: square;">
              <li>
                שורה 5: נחליף את 5 ו 7.
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        כרגע המערך יראה כך: { 7, 5, 1, 3 }.
      </li>
      <li>
        שורה 3: j ירד ל 3, ונבצע: <ul style="list-style-type: disc;">
          <li>
            שורה 4: אם האיבר j (שהוא 5) קטן מהאיבר שלפניו (1). <ul style="list-style-type: square;">
              <li>
                שורה 5: ה if לא מתבצע, כי 5 אינו קטן מ 1.
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        המערך עדיין יראה כך: { 7, 5, 1, 3 }.
      </li>
      <li>
        שורה 3: j ירד ל 2, ונבצע: <ul style="list-style-type: disc;">
          <li>
            שורה 4: אם האיבר j (עכשיו 1) קטן מהאיבר שלפניו (3). <ul style="list-style-type: square;">
              <li>
                שורה 5: נחליף את 3 ו 1.
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        המערך יראה כך: { 7, 5, 3, 1 }.
      </li>
    </ul>

  3. נגיע שוב לשורה 2: ה i יעלה ל 2 ונבצע: <ul style="list-style-type: circle;">
      <li>
        שורה 3: נתחיל לולאת for, מהתא האחרון ועד ל i +1 (במקרה הזה התא ה 3) ונבצע: <ul style="list-style-type: disc;">
          <li>
            שורה 4: אם האיבר j (כרגע האחרון, 7) קטן מהאיבר שלפניו (6). <ul style="list-style-type: square;">
              <li>
                שורה 5: ה if לא מתבצע, כי 7 לא קטן מ5.
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        המערך עדיין יראה כך: { 7, 5, 3, 1 }.
      </li>
      <li>
        שורה 3: j ירד ל 3, ונבצע: <ul style="list-style-type: disc;">
          <li>
            שורה 4: אם האיבר j (עכשיו 5) קטן מהאיבר שלפניו (3). <ul style="list-style-type: square;">
              <li>
                שורה 5: ה if לא מתבצע, כי 5 לא קטן מ 3.
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        המערך עדיין יראה כך: { 7, 5, 3, 1 }.
      </li>
    </ul>

  4. נגיע שוב לשורה 2: הפעם i יעלה ל 3 ונבצע: <ul style="list-style-type: circle;">
      <li>
        שורה 3: נתחיל לולאת for" מהתא האחרון ועד ל i + 1 (עכשיו זה שווה ל 4) ונבצע: <ul style="list-style-type: disc;">
          <li>
            שורה 4: אם האיבר j (האחרון, 7) קטן מהאיבר שלפניו (5). <ul style="list-style-type: square;">
              <li>
                שורה 5: ה if לא מתבצע, כי 7 לא קטן מ 5.
              </li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li>
        המערך עדיין יראה כך: { 7, 5, 3, 1 }.
      </li>
    </ul>

  5. נגיע שוב לשורה 2: הפעם i יעלה ל 4, הגענו למספר האיברים במערך ( [length[A ), ולכן נצא מהלולאה, וסיימנו את המעבר על האלגוריתם.

**סיבוכיות זמן ריצה: (O(n^2**.  
**סיבוכיות מקום: (O(1**.