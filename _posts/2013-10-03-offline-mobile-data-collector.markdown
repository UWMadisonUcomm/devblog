---
layout: post
title:  "Offline Mobile Research Study Data Collector"
date:   2013-10-03 14:17:00
author: Brad Leege
categories: Mobile
tags: mobile ios ipod mobileweb jquery jquerymobile research datacollection webdev appcache html5 javascript
lede: "Mobile Web"
---

The [Waisman Center](http://www.waisman.wisc.edu) is conducting a study this Fall on the effects of childhood autism on parents.  Parents that are participating in this study are asked to complete a daily survey for 14 days about their interactions with their child and spouse that day as well as how they are feeling.  The daily survey can be completed via the Web, but a major problem for the Research Team is that not all the families participating in the study have reliable access to the Internet or had no access at all.  To solve this problem the Research Team collaborated with the [Web and Mobile Solutions (WAMS)](https://www.doit.wisc.edu/about/departments/#adi) group at [DoIT](http://www.doit.wisc.edu).

The solution that the teams came up with was to build a Mobile Web based application that would be distributed to families on an [iPod Touch](http://www.apple.com/ipod-touch/).  While iPod Touch devices are capable of connecting to the Internet via WiFi, these devices were distributed with WiFi disabled and more importantly setup to only allow the device to be used for completing the daily surveys.  This helped ensure that the iPod Touch would only be used for the survey as well as increase the likelihood of the device being returned at the end of the study as it's other features could not be used.  Once the study has been completed and the device is returned to the Waisman Research Team, the iPod Touch is unlocked, connected to the center's WiFi network, and then the Researcher is able to export the survey data from the iPod Touch using a Web form.  The data is then emailed to the Research Team as an attached CSV file.  The CSV formatted data allows the Research Team to then import it into their preferred data retention and analysis tools.

The daily survey Mobile Web application is a [Single Page App](http://en.wikipedia.org/wiki/Single-page_application) and was built using common freely available open source Web development libraries (see below).  The Mobile Web application is able to "run" locally on the iPod Touch without Internet access by using the [Cache Manifest in HTML5](http://en.wikipedia.org/wiki/Cache_manifest_in_HTML5) (aka "appcache").  The daily survey data is persisted locally on the iPod Touch using Mobile Safari's built in Web SQL Database.  When the device is returned the Research Team exports the data as previously described and erases Mobile Safari's cache.  Once the cache is erased the device is ready to be used by another study participant.

* [jQuery](http://jquery.com)
* [jQuery Mobile](http://jquerymobile.com)
* [Knockout.js](http://knockoutjs.com)
