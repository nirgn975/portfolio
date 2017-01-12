---
layout: page
title: Open Source
author: nirgn
---

### Git:
גיט (Git) היא מערכת ניהול גרסאות מבוזרת. המערכת נוצרה בשנת 2005 (בידי לינוס טורבאלדס) כדי לנהל את קוד המקור של לינוקס ונעשתה פופולרית בצורה מהירה.

{% for post in site.posts reversed %}
  {% if post.category == "Git" %}
  *  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}

<br>

---

<br>

### Arduino:
ארדואינו הוא חומרת מחשב ברישיון קוד פתוח. פרויקט הארדואינו מבוסס על משפחה של מיקרו בקרים המיוצרים בעיקר ע"י SmartProjects (באיטליה), אך גם ע"י מספר ספקים נוספים. הארדואינו הראשון הוצג בשנת 2005 ונועד לספק דרך זולה וקלה לחובבים, סטודנטים, ואנשי מקצוע ליצור מכשירים המבצעים אינטראקציה עם הסביבה באמצעות חיישנים שונים. הנגישות המתבטאת במחיר הזול ובקלות היחסית בבניה ותכנות של הבקר הביאה אותו להיות פופלרי ביותר, וכבר בשנת 2013 הסטטיסטיקות הצביעו על כך שנמכרו 700 אלף לוחות רשמיים.

{% for post in site.posts reversed %}
  {% if post.category == "Arduino" %}
  *  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}

<br>

---

<br>

### Contribution:

{% for post in site.posts reversed %}
  {% if post.category == "Contribution" %}
  *  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}
