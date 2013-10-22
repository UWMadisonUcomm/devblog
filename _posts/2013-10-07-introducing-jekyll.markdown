---
layout: post
title:  Introducing Jekyll
author: "Vidal Quevedo"
date:   2013-10-07 12:01:48
categories: webdev
tags: [jekyll, CMS, markdown]
featured_image: "http://jekyllrb.com/img/logo-2x.png"
lede: "Simple Static Sites"
---

And so, in the world of bloated CMSs (we're looking at you, [WordPress](http://www.wordpress.org)), a new alternative (re-)emerges: plain-text-driven, static websites.

Enter [Jekyll](http://jekyllrb.com/), a light-weight, [Ruby](https://www.ruby-lang.org/en/community/ruby-core/)-based, and [Markdown](http://daringfireball.net/projects/markdown/)-friendly framework for creating static blogs and sites right in your favorite text editor.

## So, what is Jekyll?
In a few words, Jekyll is a framework that generates static sites. By delivering a static site to your users, you avoid having your site dynamically build pages on the fly (like [WordPress](http://wordpress.org/) and [Drupal](https://drupal.org/)), which can add processing time, make your site slow, and overall, run a bunch of crap that can make your site vulnerable. Also, by having your site be static, you free yourself from the hassle of having to constantly upgrade your CMS or framework (e.g. [Rails](http://rubyonrails.org/)). 

### When to use it
Jekyll is especially useful for minimal sites that don't need to be updated often, but would benefit from basic templating to make them more manageable in the back end. Note that we loosely define "often" here, as cases can vary wildly.  

For example, if your site requires heavy templating (see the [Wisconsin Institute for Discovery](http://wid.wisc.edu/) website), and a non-technical user friendly admin area for frequent content management, WordPress or Drupal can be a good fit. But if your site is fairly static and doesn't change often (see this [Lakefront Gateway](http://lakefront.wisc.edu/) "brochure" site), then Jekyll might be a better option. Also, if your goal is optimization and low overhead, Jekyll can be especially useful for building heavy-trafficked sites as well.


## Features

- Markdown
  - You can use [Markdown](http://daringfireball.net/projects/markdown/), a text-to-html converter, to write your posts. The beauty of Markdown isn't only that it frees you from having to deal with HTML tags, but it makes your text editor become, well, a _text editor_.

- Basic templating
  - Jekyll supports (in fact, enforces) the use of templates to simplify the management of your files. It also neatly separates your posts, so you can focus on your content right away.

- Liquid template engine
  - Need to generate some lists, include files, and add some conditionals? No problem: Jekyll uses the [Liquid template engine](http://wiki.shopify.com/Liquid), a simple language that allows you to build simple structures and display content.

- No databases
  - Since your content is stored in static text files, you don't need to use databases. Isn't that neat?

- GitHub integration
  - Jekyll is supported by GitHub Pages. In fact, you can get your own [free site hosted in GitHub using Jekyll as your templating platform](https://help.github.com/articles/using-jekyll-with-pages).


## Getting started

<div class="alert alert-info">
  <strong>Note</strong>: The following instructions are for Max OS X / *nix-based systems, as Jekyll does not officially support documentation for Windows. For instructions on how to use Jekyll on Windows, please see this article on <a class="alert-link" href="http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html" >Running Jekyll on Windows</a> by <a class="alert-link" href="http://www.madhur.co.in/">Madhur Ahuja</a>.
</div>

### Install Jekyll
- Open Terminal in your computer.
- Install the Jekyll gem

```bash
~ $ gem install jekyll
```

### Create your first site

- Go to a directory where you want your site to reside (e.g. ~/Sites/)
- Create your Jekyll site

```bash
~ $ jekyll new mysite
```


- A new `mysite/` directory appears in the new directory. `cd` into it.


### Familiarize yourself with the structure

- Take a look at the basic structure of your Jekyll site. There are three directories and three files:
  - `_layouts/`: this is the directory where the templates of your site are stored
  - `_posts/`: the directory where your post files are stored
  - `css/`: the directory where your CSS stylesheets reside
  - `.gitignore`: Jekyll is git-ready, and includes this file to tell git right away what directories to ignore
  - `_config.yml`: your site's main configuration file. Here's where many options (such as the title, permalinks, custom includes and excludes, etc.) are set.
  - `index.html`: your site's main index.html file

<div class="alert alert-info">
<strong>Note:</strong> some directories and files are preceded by an underscore (e.g. <code>_layouts/</code>). This lets Jekyll know that these directories and files should be excluded from the final site. 
</div>

### Generate your site
As you may have noticed, the .html files on the site are all just templating bits and pieces so far. To put them together, you need to build the site. 

- In your Terminal, type:

```bash
~ $ jekyll build
```

- This adds a new  `_site/` directory to your project. **This is the actual static site your users will see**. Let's check out its contents:
  - `css/`: here's where your CSS files are stored.
  - `jekyll/`: this is a directory for posts categorized as "jekyll" (in this case, containing only the sample post "Welcome to Jekyll") 
  - `index.html`: the fully generated index.html.

Although the `build` command generates the `_site/` directory, you would have to run it every time you make changes in order to regenerate it. Not so fun. But fear not: we'll deal with this with a single command. Read on!


### Speeding up development: build, serve, and track site changes, all at once! 
To speed up development, Jekyll comes bundled with the [WEBrick](http://www.ruby-doc.org/stdlib-2.0/libdoc/webrick/rdoc/WEBrick.html) web server, which allows you to create a temporary local server via the `serve` command. Add the `--watch` option, and Jekyll will also watch your changes and rebuild the `_site/` directory automatically.


- In your Terminal, type:

```bash
~ $ jekyll serve --watch
```

- In your browser, go to [http://localhost:4000](http://localhost:4000) to see your site.

<img class="col-sm-12 img-responsive" src="/img/posts/2013-09-30-basic-jekyll/home.png" />

- Click to see the "Welcome to Jekyll" post:

<img class="col-sm-12 img-responsive" src="/img/posts/2013-09-30-basic-jekyll/post.png" />


- From now on, any changes to your files will rebuild your site. 



### Write your first post

Now that our development environment is set, let's use the default template to create your first post in Jekyll using markdown.

- In your text editor, create a new document and save it in your `_posts/` directory with a name following the _yyyy-mm-dd-post-title.markdown_ structure, which is required by Jekyll. For example: 

<div class="row text-center">
  <img src="/img/posts/2013-09-30-basic-jekyll/save_as.png">
</div>

#### Configure your post

- Configure your post by adding a [YAML front-matter](http://jekyllrb.com/docs/frontmatter/) header. This is required by Jekyll to process the post as a special file, and also serves as an area for you to create custom variables to be used in the body of your post and throughout the site. Let's just add the `layout`, `title`, and `categories` for now:


```markdown
---
layout: default
title: "My first post"
categories: practice test
---
```


- Save your document. Notice how Jekyll rebuilt the `_site/` directory's internal structure to add the `practice/test/` category subdirectories to accommodate your new post.


#### Add some content using Markdown

- Below the front-matter header, add some basic markdown content:

```markdown
---
layout: default
title: "My first post"
---

# This is my first post
I'm alreadys starting to love Jekyll!

```

- Save your document.
- In your browser, go to [http://localhost:4000](http://localhost:4000), and click on the "My first post" link to see your new post:

<img class="col-sm-12 img-responsive" src="/img/posts/2013-09-30-basic-jekyll/my_first_post.png" />

### How templates work

Let's take a look at the templating structure of Jekyll.

- First, recall that we used a Front Matter block to define the basic configuration of our test post (this also applies to pages):

```markdown
---
layout: default
title: "My first post"
categories: practice test
---
```

The `layout: default` line tells Jekyll to use the `layouts/default.html` file as the template for this page. Following this convention, you can create new templates by adding .html files to the `layouts/` directory. For example, by adding a `home.html` template, you could use it in your files by adding `layout: home` line to their Front Matter header.

### Including files
Jekyll supports includes to create smaller pieces of code to display specific parts of your template (e.g. a page header and footer). To do this, you need to create an `_includes/` directory where these files will be stored. 

#### Move the default template's .header element to its own file and include it in the layout

Let's work on an example to see how includes work. Let's say you want to move the default template's "header" containing the navigation bar to its own file, so you don't have to repeat this code in subsequent templates. Here's how you can do it:

- In your project directory, create a new directory, `_includes/`
- In `_includes/`, create a new HTML file, `header.html` and open it
- In your text editor, open the `_layouts/default.html` file
- Find the `<div>` element with class "header" (`div.header` from now on) and cut it.
- Switch to the open `header.html` file and paste `div.header`'s HTML code.
- Save header.html
- Switch back to `_layouts/default.html`. 
- Where the div.header element used to be, use the &#123;&#37; include &#37;&#125; tag to include the `navbar.html` partial:

```
  {{ "{% include header.html "}}%}
```

- Save `_layouts/default.html`
- Go to [http://localhost:4000](http://localhost:4000). It should work exactly as it did before. Congratulations, you have seamlessly included a file.

Separating HTML templates into includes and layout is a great way to make your code more reusable and your site more manageable. You could go all the way and make your template files nothing but a bunch of includes to keep their structure cleaner. For example, the `default.html` file for this website looks like this:

```markdown

  <!-- Example: the default.html template file 
  for the UW-Madison Devblog --> 

  {{ "{% include header.html " }}%}

  {{ "  {% include navbar.html "}}%}

  {{ "  {% include sidebar.html "}}%}

    <div id="content" class="col-sm-12 col-md-10">
      <div class="row">
        {{ "{{ content "}} }}
      </div>
    </div>

  {{ "{% include footer.html "}}%}

```


### Configuring Jekyll

Let's take a look at some configuration options for Jekyll. These are added in the `_config.yml` of your site:


- `permalink:` the default is `/:categories/:year/:month/:day/:title.html`, but you can change it to something more concise, like `/:categories/:title.html`. There are [plenty of options](http://jekyllrb.com/docs/permalinks/) for you to choose from.
- `destination:` defines the location of the resulting site. The default is `_site`.
- `safe:` set to `TRUE` to prevent plugins from running
- exclude: takes a list of files or directories to exclude from the final site (For example, `['_assets', '_submodules', 'Gruntfile.js', 'package.json']`)

See the [configuration options](http://jekyllrb.com/docs/configuration/) page in the project's site for more information.


### Migrating your blog.

As a blogging platform at heart, Jekyll wants to really, _really_ help you blog. So, if you have your blog on a different platform (WordPress, Drupal, MovableType, etc.), there are [several options](http://jekyllrb.com/docs/migrations/) to do so. I migrated one of my blogs from WordPress, and it was pretty seamless (warning though: you may need to still do some cleanup within the body of your posts to allow Markdown to be rendered correctly, especially if yours has heavy use of shortcodes).


## References

Jekyll is a up-and-coming project, and it's just getting started. Here are some resources to further help you get on it:

- [Jekyll's official site](http://jekyllrb.com/)
- [Building Static Sites with Jekyll](http://net.tutsplus.com/tutorials/other/building-static-sites-with-jekyll/)
- [Learning Jekyll by Example: Build a Jekyll Website, Start to Finish](http://www.andrewmunsell.com/tutorials/jekyll-by-example/index.html)
- [Using Twitter Bootstrap with Jekyll](http://brizzled.clapper.org/blog/2012/03/05/using-twitter-bootstrap-with-jekyll/)
- [Using Jekull with GitHub Pages](https://help.github.com/articles/using-jekyll-with-pages)



