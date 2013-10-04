---
layout: post
title:  Basic Jekyll
author: "Vidal Quevedo"
date:   2013-09-30 12:01:48
categories: webdev
tags: jekyll cms markdown
featured_image: "http://jekyllrb.com/img/logo-2x.png"
---

And so, in the world of bloated CMSs (we're looking at you, [WordPress](http://www.wordpress.org)), a new alternative (re)emerges: plain-text driven static websites.

Enter [Jekyll](http://jekyllrb.com/), a ruby-based, light-weight, markdown-friendly framework for creating static blogs and sites right in your favorite text editor.

## So what is it?
In a few words, Jekyll is an open-source framework that helps you generate the static files you need for your site (HTML, CSS and JavaScript). By doing this, you avoid having your site build pages on the fly (like WordPress and Drupal), which can add processing time, make your site slow, and overall, run a bunch of crap that can make your site vulnerable. Also, by having your site be static, you free yourself from the hassle of having to constantly upgrade your CMS or platform (e.g., Rails).

## Features


- Markdown
  - You can use [Markdown](http://daringfireball.net/projects/markdown/), a text-to-html converter, to write your posts. The beauty of markdown isn't only that it frees you from having to deal with HTML tags, but it makes your text editor become, well, a _text editor_.

- Basic templating
  - Jekyll supports (in fact, enforces) the use of templates to simplify the management of your files. It also neatly separates your posts, so you can focus on your content right away.

- Liquid Markup
  - Need to generate some lists, include files, and add some conditionals? No problem: Jekyll uses [Liquid Markup](http://wiki.shopify.com/Liquid), a simple markup language that allows you to build simple structures and display content.

- No databases
  - Since your content is stores in static text files, you don't need to use databases. Isn't that neat?


## Getting started

### Install Jekyll
- Open Terminal in your computer
- Install the Jekyll gem

>     ~ $ gem install jekyll

### Create your first site

- Go to a directory where you want your site to reside (e.g. ~/Sites/)
- Create your jekyll site

>     ~ $ jekyll new mysite

- A new **mysite/** directory appears in the new directory. cd into it.


### Familiarize yourself with the structure

- Take a look at the basic structure of a Jekyll site (**\_mysite/** in this example). There are three directories and three files:
  - **_layouts/**: this is the directory where the templates of your site are stored
  - **_posts/**: the directory where your posts are stored
  - **css/**: the directory where your CSS stylesheets reside
  - **.gitignore**: Jekyll is git-ready, and includes this file to tell git right away what directories to ignore
  - **_config.yml**: your site's main configuration file. Here's where many options (such as the title, permalinks, custom includes and excludes, etc.) are set.
  - **index.html**: your site's main index.html file

> Note that some directories and files are preceded by an underscore \(\_). This lets Jekyll know that these directories and files should be _excluded_ from the final site. 

### Generate your site
As you may have noticed, the .html files on the site are all just bits and templating pieces so far. To put them together, you need to build the site.

- On your console, tell Jekyll to build the site:

>     ~ $ jekyll build


- This adds a new  **\_site/** directory to your project. **This is the actual static site your users will see**. Let's check out its contents:
  - **css/**: here's where your CSS files are stored.
  - **jekyll/**: this is where Jekyll stores your posts by default, using an _/update/yyyy/mm/dd/post-title.html_ permalink format. You can change this permalink format in the _config.yml file if you'd like. More on that later.
  - **index.html**: the fully generated index.html.

- To see your site, go to File > Open in your browser, and select _site/index.html Your new Jekyll site should look like this:

<img class="col-sm-12" src="/img/posts/2013-09-30-basic-jekyll/home.png" />

- Click to see the "Welcome to Jekyll" post:

<img class="col-sm-12" src="/img/posts/2013-09-30-basic-jekyll/post.png" />


### Write your first post

For now, let's use the default template to create your first post in Jekyll using markdown.

- In your text editor, create a new document, "My first post," and save it in your **\_posts/** directory with a name following the _yyyy-mm-dd-post-title.markdown_ structure, which is required by Jekyll. For example: 

<div class="row text-center">
  <img src="/img/posts/2013-09-30-basic-jekyll/save_as.png">
</div>

- Configure your post by adding a [YAML front-matter](http://jekyllrb.com/docs/frontmatter/) header. This is required by Jekyll to process the post as a special file, and also serves as an area for your to create custom variables to be used in the body of your post and throughout the site.

>     ---
      layout: default
      title: My First Post
    ---

### Make your first template

### Configure it


## References

