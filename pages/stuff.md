---
layout: page
title: Stuff
author: nirgn
---

### Android:

{% for post in site.posts %}
  {% if post.category == "Android" %}
  *  <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}

<br>

---

<br>

### Chrome OS:

{% for post in site.posts %}
  {% if post.category == "Chrome OS" %}
  *  <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}

<br>

---

<br>

### Other Stuff:

{% for post in site.posts %}
  {% if post.category == "Stuff" %}
  *  <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}
