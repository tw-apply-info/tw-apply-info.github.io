---
layout: page
title: Degrees
permalink: /degrees/
---

{% assign all_degrees = "" | split: "" %}
{% for post in site.posts %}
  {% for degree in post.degrees %}
    {% unless all_degrees contains degree %}
      {% assign all_degrees = all_degrees | push: degree %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign all_degrees = all_degrees | sort %}

<ul class="tags-box">
{% if site.posts != empty %}
{% for degree in all_degrees %}
{% assign degree_posts = site.posts | where_exp: "post", "post.degrees contains degree" %}
<a href="#{{ degree }}" title="{{ degree }}" rel="{{ degree_posts.size }}">{{ degree }}<span class="size"> {{ degree_posts.size }}</span></a>
{% endfor %}
</ul>

<ul class="tags-box">
{% for degree in all_degrees %}
{% assign degree_posts = site.posts | where_exp: "post", "post.degrees contains degree" %}
<li id="{{ degree }}">{{ degree }}</li>
{% for post in degree_posts %}
<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time> &raquo;
<a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a><br />
{% endfor %}
{% endfor %}
{% else %}
<span>No posts</span>
{% endif %}
</ul>
