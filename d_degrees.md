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

<ul class="tags-box" id="tag-filter-list">
{% if site.posts != empty %}
{% for degree in all_degrees %}
{% assign degree_posts = site.posts | where_exp: "post", "post.degrees contains degree" %}
<a href="#{{ degree }}" class="tag-filter-link" data-tag="{{ degree }}" title="{{ degree }}" rel="{{ degree_posts.size }}">{{ degree }}<span class="size"> {{ degree_posts.size }}</span></a>
{% endfor %}
{% endif %}
</ul>

<ul class="tags-box" id="tag-posts-list">
{% if site.posts != empty %}
{% for degree in all_degrees %}
{% assign degree_posts = site.posts | where_exp: "post", "post.degrees contains degree" %}
<li class="tag-section" id="{{ degree }}" data-tag="{{ degree }}">
  {{ degree }}
  {% for post in degree_posts %}
  <br /><time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time> &raquo;
  <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  {% endfor %}
</li>
{% endfor %}
{% else %}
<span>No posts</span>
{% endif %}
</ul>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('.tag-filter-link');
  var sections = document.querySelectorAll('.tag-section');
  var active = null;

  function applyFilter(tag) {
    tag = tag ? tag.trim() : '';
    if (!tag || active === tag) {
      active = null;
      sections.forEach(function (s) { s.style.display = ''; });
      links.forEach(function (l) { l.classList.remove('tag-filter-active'); });
    } else {
      active = tag;
      sections.forEach(function (s) {
        s.style.display = s.getAttribute('data-tag').trim() === tag ? '' : 'none';
      });
      links.forEach(function (l) {
        l.classList.toggle('tag-filter-active', l.getAttribute('data-tag').trim() === tag);
      });
    }
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      applyFilter(this.getAttribute('data-tag'));
    });
  });

  function applyHashFilter() {
    var hash = decodeURIComponent(window.location.hash.replace('#', '').replace(/\+/g, ' '));
    if (hash) applyFilter(hash);
  }

  applyHashFilter();
  window.addEventListener('hashchange', applyHashFilter);
});
</script>

<style>
.tag-filter-active {
  background: #2a7ae2;
  color: #fff !important;
  border-radius: 3px;
  padding: 1px 5px;
}
.tag-filter-active:visited { color: #fff !important; }
</style>
