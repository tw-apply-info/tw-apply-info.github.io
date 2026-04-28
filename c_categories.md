---
layout: page
title: Categories
permalink: /categories/
---

{% assign cat_names = "" | split: "" %}
{% for cat in site.categories %}
  {% assign cat_names = cat_names | push: cat[0] %}
{% endfor %}
{% assign cat_names = cat_names | sort | reverse %}

<ul class="tags-box">
{% if site.posts != empty %}
{% for cat_name in cat_names %}
{% assign cat_posts = site.categories[cat_name] %}
<a href="#{{ cat_name }}" title="{{ cat_name }}" rel="{{ cat_posts.size }}">{{ cat_name }}<span class="size"> {{ cat_posts.size }}</span></a>
{% endfor %}
</ul>

<ul class="tags-box">
{% for cat_name in cat_names %}
{% assign cat_posts = site.categories[cat_name] %}
<li id="{{ cat_name }}">{{ cat_name }}</li>
{% for post in cat_posts %}
<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time> &raquo;
<a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a><br />
{% endfor %}
{% endfor %}
{% else %}
<span>No posts</span>
{% endif %}
</ul>
