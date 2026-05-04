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

<ul class="tags-box" id="tag-filter-list">
{% if site.posts != empty %}
{% for item in all_research %}
{% assign item_posts = site.posts | where_exp: "post", "post.research contains item" %}
<a href="#{{ item }}" class="tag-filter-link" data-tag="{{ item }}" title="{{ item }}" rel="{{ item_posts.size }}">{{ item }}<span class="size"> {{ item_posts.size }}</span></a>
{% endfor %}
{% endif %}
</ul>

<ul class="tags-box" id="tag-posts-list">
{% if site.posts != empty %}
{% for item in all_research %}
{% assign item_posts = site.posts | where_exp: "post", "post.research contains item" %}
<li class="tag-section" id="{{ item }}" data-tag="{{ item }}">
  <strong>{{ item }}</strong>
  {% for post in item_posts %}
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
