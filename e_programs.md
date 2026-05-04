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

<ul class="tags-box" id="tag-filter-list">
{% if site.posts != empty %}
{% for program in all_programs %}
{% assign program_posts = site.posts | where_exp: "post", "post.programs contains program" %}
<a href="#{{ program }}" class="tag-filter-link" data-tag="{{ program }}" title="{{ program }}" rel="{{ program_posts.size }}">{{ program }}<span class="size"> {{ program_posts.size }}</span></a>
{% endfor %}
{% endif %}
</ul>

<ul class="tags-box" id="tag-posts-list">
{% if site.posts != empty %}
{% for program in all_programs %}
{% assign program_posts = site.posts | where_exp: "post", "post.programs contains program" %}
<li class="tag-section" id="{{ program }}" data-tag="{{ program }}">
  {{ program }}
  {% for post in program_posts %}
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
