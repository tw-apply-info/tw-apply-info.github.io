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

<ul class="tags-box" id="tag-filter-list">
{% if site.posts != empty %}
{% for cat_name in cat_names %}
{% assign cat_posts = site.categories[cat_name] %}
<a href="#{{ cat_name }}" class="tag-filter-link" data-tag="{{ cat_name }}" title="{{ cat_name }}" rel="{{ cat_posts.size }}">{{ cat_name }}<span class="size"> {{ cat_posts.size }}</span></a>
{% endfor %}
{% endif %}
</ul>

<ul class="tags-box" id="tag-posts-list">
{% if site.posts != empty %}
{% for cat_name in cat_names %}
{% assign cat_posts = site.categories[cat_name] %}
<li class="tag-section" id="{{ cat_name }}" data-tag="{{ cat_name }}">
  {{ cat_name }}
  {% for post in cat_posts %}
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
