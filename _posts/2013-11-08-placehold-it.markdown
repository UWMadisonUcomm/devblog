---
layout: post
title:  "Placehold.it: generate sample images on the fly"
date:   2013-11-08 09:00:00
author: Vidal Quevedo
author_url: https://twitter.com/vidalquevedo
categories: [webdev]
tags: [tools, images, preview, timesaver]
lede: "Quick sample images"
---

Working with Bootstrap 2 a while ago, I noticed they were using an amazing web app for quickly creating placeholder images for their sample layouts: [http://placehold.it](http://placehold.it)

## What it does

[Placehold.it](http://placehold.it) helps you generate sample images on the fly by simply adding a URL to `img` tags in your page. 

## Examples

---

### Generate a 400x200 pixel image

The code below:

```html

<img src="http://placehold.it/400x200"/>

```
Generates this:

<img src="http://placehold.it/400x200"/>

Simple, huh? And really cool too!

---

### Add some text

Placehold.it supports not only sizes, but also text:

```html

<img src="http://placehold.it/400x200&text=Image+of+orangutan+here."/>

```
<img src="http://placehold.it/400x200&text=Image+of+orangutan+here."/>


---


### Add color

If you want a different background and/or text color, add them in that sequence right after the dimensions:

```html

<img src="http://placehold.it/400x200/FF3300/FFFFFF&text=Strawberry+fields+forever."/>

```
<img src="http://placehold.it/400x200/FF3300/FFFFFF&text=Strawberry+fields+forever."/>


---

### Specify the format you want

Placehold.it can generate either .gif, .jpeg, .jpg, or .png files

#### Generate a .gif

```html

<img src="http://placehold.it/400x200/0033CC/FFFFFF/gif&text=This+is+a+.gif"/>

```
<img src="http://placehold.it/400x200/0033CC/FFFFFF/gif&text=This+is+a+.gif"/>


#### Generate a .jpg

```html

<img src="http://placehold.it/400x200/0033CC/FFFFFF/jpg&text=This+is+a+.jpg"/>

```
<img src="http://placehold.it/400x200/0033CC/FFFFFF/jpg&text=This+is+a+.jpg"/>

---

## This tool is super helpful

Placehold.it is one of those tools that, once you find them, it becomes essential in your development process. 5 stars!