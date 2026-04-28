---
layout: page
title: Programs
permalink: /programs/
---

{% assign all_programs = "" | split: "" %}
{% for post in site.posts %}
  {% for program in post.programs %}
    {% unless all_programs contains program %}
      {% assign all_programs = all_programs | push: program %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign all_programs = all_programs | sort %}

<ul class="tags-box">
{% if site.posts != empty %}
{% for program in all_programs %}
{% assign program_posts = site.posts | where_exp: "post", "post.programs contains program" %}
<a href="#{{ program }}" title="{{ program }}" rel="{{ program_posts.size }}">{{ program }}<span class="size"> {{ program_posts.size }}</span></a>
{% endfor %}
</ul>

<ul class="tags-box">
{% for program in all_programs %}
{% assign program_posts = site.posts | where_exp: "post", "post.programs contains program" %}
<li id="{{ program }}">{{ program }}</li>
{% for post in program_posts %}
<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time> &raquo;
<a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a><br />
{% endfor %}
{% endfor %}
{% else %}
<span>No posts</span>
{% endif %}
</ul>
