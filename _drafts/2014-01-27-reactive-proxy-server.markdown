---
layout: post
title:  "Moving To A Reactive Data Server"
author: Brad Leege
author_url: https://twitter.com/bradleege
categories: [mobile, webdev]
tags: [play framework, scala, mongodb, java, asynchronous, functional programming, stateless, geospatial, json, geojson, data, data integration, open source]
lede: "Asynchronous Data Integration"
---

This is an exciting time for [Mobile UW](http://mobile.wisc.edu/).  The continued growth in usage of the apps ([iOS](http://mobile.wisc.edu/itunes) and [Android](http://mobile.wisc.edu/android)) have allowed us to invest time in working on ways that we can make them even more useful to the students, faculty and staff, alumni, and campus visitors.  While the more visible parts will arrive later this year with a brand new version featuring a new UI and access to more campus services, the more mundane but equally critical part went into production in December 2013, namely the new Proxy Server data integration application.

## What's A Proxy Server?

[UW-Madison](http://www.wisc.edu/) is a big place with many different organizations and services that are all managed locally.  In order to bring these services into Mobile UW apps a mechanism is needed to interact with these data services in a consistent and reliable way.  This mechanism is a Web application called the Proxy Server.

## What Was Wrong With The Old One?

Nothing.  Sort of.

The original Proxy Server was written back in 2010 and was a classic Java Web application that made use of many open source technologies, including many of the usual suspects such as Hiberate, Spring, and Tomcat.  It also made use of MySQL for local data persistence.  The problem that it ran into was performance, namely scalability.  The Proxy Server communicates with many different data services, but the original version did so in a _synchronous_, _blocking_ way.  In other words everytime a request for data came in the Proxy Server would then try to load the requested data from the germane service.  The Proxy Server would have to wait for the data to come back from the (often times) remote service before it would be available to handle another data request.  If the remote service was slow returning data it would cause the Proxy Server to be unavailable for longer periods of time.  Granted this is generally milliseconds of time per request, but as the traffic increased every semester those milliseconds added up which ultimately led to a "slower" experience on the app running on people's phones.  Needless to say when it's a cold winter day in Wisconsin this matters when waiting outside for a warm bus to arrive.

## The New Way: Asychnronous Processing

Asychronous Web applications have been growing in popularity over the past few years, most notably ones written in JavaScript using [node.js](http://nodejs.org).  While node.js was certainly an option for the new Proxy Server I chose to use the [Play! Framework](http://www.playframework.com/), which is an open source development framework from [Typesafe](http://www.typesafe.com/).  The big reason for doing so is that Play! apps are written in Java or Scala and run on the Java Virtual Machine (JVM).  This is important for several reasons:

* Can leverage existing battle tested open source Java libraries
* More organizational knowledge of Java and JVM
* Scala supports both functional and object oriented development

Asychronous Processing allows requests to be made to the Proxy Server, and for the Proxy Server to not have to wait for it's subsequent requests to return before it's available to handle more incoming data requests.  This allows for a much more efficient use of threads / processes on the actual server for the processing.  Ultimately helping to reduce request bottlenecks, and keep Mobile UW as responsive as possible on people's phones.

## Q: How Does This Work? A: Stateless, Light Weight Architecture

Much of the overhead of a traditional Java Web application comes from resources being devoted to managing state.  Scala and Play! take the approach of relying on immutable stateless objects.  This allows the much more efficient way of being able to route requests and handle the data when it returns without having to slow everything down to wait.  This applies to HTTP connections as well as database connections.  The new architecture swapped MySQL for MongoDB and by utilizing [ReactiveMongo](http://reactivemongo.org) the Web application can access the data in the database without relying on blocking calls.  It also works entirely in JSON and eliminates the need for traditional ORM tools such as Hibernate which need to translate both data going in and coming out of the database.  The net result is that more, smaller sets of data are able to be passed through quicker than fewer, larger data sets.

## Native Geospatial Support

In addition to speed and native JSON support, the move to [MongoDB](http://www.mongodb.org/) also provides solid Geospatial functionality including GeoJSON.  This allows the Proxy Server to store and query geographic data (e.g. Madison Metro bus stop locations) quickly and accurately.  It's already helped improve the performance of existing geospatial functionality in Mobile UW and will make future geography related features possible.

## Result

The end result with all these changes are more responsive and efficient data source for Mobile UW.  It allows us to meet our current needs as well as provide a solid foundation for the future.



