---
layout: post
title:  "Moving To A Reactive Data Server"
author: Brad Leege
author_url: https://twitter.com/bradleege
categories: [mobile, webdev]
tags: [play framework, scala, mongodb, java, asynchronous, functional programming, stateless, gis, data, data integration]
lede: "Asynchronous Data Integration"
---

This is an exciting time for [Mobile UW](http://mobile.wisc.edu/).  The continued growth in usage of the apps ([iOS](http://mobile.wisc.edu/itunes) and [Android](http://mobile.wisc.edu/android)) have allowed us to invest time in working on ways that we can make them even more useful to the students, faculty and staff, alumni, and campus visitors.  While the more visible parts will arrive later this year with a brand new version featuring a new UI and access to more campus services, the more mundane but equally critical part went into production in December 2013, namely the new Proxy Server data integration application.

## What's A Proxy Server?

[UW-Madison](http://www.wisc.edu/) is a big place with many different organizations and services that are all managed locally.  In order to bring these services into Mobile UW apps a mechanism is needed to interact with these data services in a consistent and reliable way.  This mechanism is a Web application called the Proxy Server.

## What Was Wrong With The Old One?

Nothing.  Sort of.

The original Proxy Server was written back in 2010 and was a classic Java Web application that made use of many open source technologies, including many of the usual suspects such as Hiberate, Spring, and Tomcat.  It also made use of MySQL for local data persistence.  The problem that it ran into was performance, namely scalability.  The Proxy Server communicates with many different data services, but the original version did so in a _synchronous_, _blocking_ way.  In other words everytime a request for data came in the Proxy Server would then try to load the requested data from the germane service.  The Proxy Server would have to wait for the data to come back from the (often times) remote service before it would be available to handle another data request.  If the remote service was slow returning data it would cause the Proxy Server to be unavailable for longer periods of time.  Granted this is generally milliseconds of time per request, but as the traffic increased every semester those milliseconds added up which ultimately led to a "slower" experience on the app running on people's phones.  Needless to say when it's a cold winter day in Wisconsin this matters when waiting for a warm bus to arrive.

