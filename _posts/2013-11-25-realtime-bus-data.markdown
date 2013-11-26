---
layout: post
title:  Real Time Bus Data In Mobile UW
author: "Brad Leege"
date:   2013-11-25 16:01:48
categories: mobile
author_url: https://twitter.com/bradleege
tags: [mobileuw, data, opendata, smsmybus, api, opengov, civichacking]
lede: "Community Powered Data"
---

The Real Time Bus data integration is one of the most popular features in Mobile UW.  On cold and snowy Wisconsin days there's an especially good reason for this!  What isn't as well known is how the real time bus data gets into Mobile UW.

### Until Now...

The Mobile UW team has been working with [Madison Metro](http://www.cityofmadison.com/metro/]) since the original launch of Mobile UW in December 2010 to provide conveniant access to bus stop, route, and schedule data for the UW and greater Madison communities.  Metro has always made their [scheduled data](http://www.cityofmadison.com/metro/Apps/developers.cfm) available to the community, but they've never had a real time data service outside their [Transit Tracker](http://www.cityofmadison.com/Metro/planyourtrip/transitTracker.cfm) public facing web site.  Sadly the data in Transit Tracker isn't available in a programmable form that can be used by developers.

<img class="img-responsive" width="272" height="350" src="/img/posts/2013-11-25-realtime-bus-data/okay_guy.png" />

### Enter The Community

Local civic minded software developer [Greg Tracy](https://twitter.com/gregtracy) had also noticed this problem and independently started building [SMSMyBus](http://www.smsmybus.com) as a way to get real time bus data delivered to people's phones via SMS as this was in the time (2010-2011) before widespread smartphone adoption.  His solution involved screen scraping the Transit Tracker Web site for the real time data.  Over time he refactored the code into a developer friendly service called [SMSMyBus API](http://api.smsmybus.com/) so that others could also benefit by having an easy way to access Metro's data without having to reinvent the wheel as well as potentially overwhelm Metro's servers.

<img class="img-responsive" src="/img/posts/2013-11-25-realtime-bus-data/toystory-buzz-woody.jpg" />

### Partnership

Working together, Greg and I were able to first integrate Metro's real time data into Mobile UW in 2011.  Since then we've continued to collaborate and work on ways to improve SMSMyBus API and transit data within Mobile UW.  The use of SMSMyBus API at UW has also continued to grow over the years as it's now also used the new [Campus Map](http://map.wisc.edu) as well as the many different [UW Transportation](http://transportation.wisc.edu/) kiosks around campus.  In addition to serving the needs of the UW community it's also benefited the larger Madison community.  Metro even cited it as a contributing factor to their winning the [2012 APTA Outstanding Public Transportation Award](http://www.cityofmadison.com/metro/award/index.cfm).

<img class="img-responsive" src="/img/posts/2013-11-25-realtime-bus-data/success_baby.jpg" />
