---
layout: page
title: Research
permalink: /research/
---

{% assign all_research = "" | split: "" %}
{% for post in site.posts %}
  {% for item in post.research %}
    {% unless all_research contains item %}
      {% assign all_research = all_research | push: item %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign all_research = all_research | sort %}

<ul class="tags-box">
{% if site.posts != empty %}
{% for item in all_research %}
{% assign item_posts = site.posts | where_exp: "post", "post.research contains item" %}
<a href="#{{ item }}" title="{{ item }}" rel="{{ item_posts.size }}">{{ item }}<span class="size"> {{ item_posts.size }}</span></a>
{% endfor %}
</ul>

<ul class="tags-box">
{% for item in all_research %}
{% assign item_posts = site.posts | where_exp: "post", "post.research contains item" %}
<li id="{{ item }}">{{ item }}</li>
{% for post in item_posts %}
<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time> &raquo;
<a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a><br />
{% endfor %}
{% endfor %}
{% else %}
<span>No posts</span>
{% endif %}
</ul>
