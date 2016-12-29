---
layout: page
title: Stuff
author: nirgn
---

### Android:

{% for post in site.posts reversed %}
  {% if post.category == "Android" %}
  *  <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}

<br>

---

<br>

### Other Stuff:

{% for post in site.posts reversed %}
  {% if post.category == "Stuff" %}
  *  <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}
