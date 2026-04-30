---
layout: page
title: Schools
permalink: /schools/
---

<ul class="tags-box">
{% if site.posts != empty %}
{% assign tag_names = "" | split: "" %}
{% for tag in site.tags %}
  {% assign tag_names = tag_names | push: tag[0] %}
{% endfor %}
{% assign tag_names = tag_names | sort %}
{% for tag_name in tag_names %}
{% assign tag_posts = site.tags[tag_name] %}
<a href="#{{ tag_name }}" title="{{ tag_name }}" rel="{{ tag_posts.size }}">{{ tag_name }}<span class="size"> {{ tag_posts.size }}</span></a>
{% endfor %}
</ul>

<ul class="tags-box">
{% for tag_name in tag_names %}
{% assign tag_posts = site.tags[tag_name] %}
<li id="{{ tag_name }}">{{ tag_name }}</li>
{% for post in tag_posts %}
<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time> &raquo;
<a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a><br />
{% endfor %}
{% endfor %}
{% else %}
<span>No posts</span>
{% endif %}
</ul>
