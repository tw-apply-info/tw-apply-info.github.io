---
layout: page
title: Schools
permalink: /schools/
---

<ul class="tags-box" id="tag-filter-list">
{% if site.posts != empty %}
{% assign tag_names = "" | split: "" %}
{% for tag in site.tags %}
  {% assign tag_names = tag_names | push: tag[0] %}
{% endfor %}
{% assign tag_names = tag_names | sort %}
{% for tag_name in tag_names %}
{% assign tag_posts = site.tags[tag_name] %}
<a href="#{{ tag_name }}" class="tag-filter-link" data-tag="{{ tag_name }}" title="{{ tag_name }}" rel="{{ tag_posts.size }}">{{ tag_name }}<span class="size"> {{ tag_posts.size }}</span></a>
{% endfor %}
{% endif %}
</ul>

<ul class="tags-box" id="tag-posts-list">
{% if site.posts != empty %}
{% for tag_name in tag_names %}
{% assign tag_posts = site.tags[tag_name] %}
<li class="tag-section" id="{{ tag_name }}" data-tag="{{ tag_name }}">
  <strong>{{ tag_name }}</strong>
  {% for post in tag_posts %}
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
