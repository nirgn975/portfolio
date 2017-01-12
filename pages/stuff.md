---
layout: page
title: Stuff
author: nirgn
---

### Android:

{% for post in site.posts reversed %}
  {% if post.category == "Android" %}
  *  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}

<br>

---

<br>

### Other Stuff:

{% for post in site.posts reversed %}
  {% if post.category == "Stuff" %}
  *  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  {% endif %}
{% endfor %}
