---
layout: post
title: Transshipment Data and Report Update
author: David Kroodsma
tags: [Transshipment]
category: [Transshipment]
comments: True
---

Based on a lengthly review of refrigerated cargo vessels, We have just updated our transshipment data. You can read about the update [here](http://blog.globalfishingwatch.org/2017/08/transshipment-report-refined/) or download the slightly updated report and data [here](http://globalfishingwatch.org/data).

One thing I was curious about was how transshipments vary in time. What does it look like to plot our data in time? Using [this ipython notebook](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/8/http://localhost:8888/notebooks/data-blog-code/2017/8/GFW_Transshipment_Data-20170306.ipynb), I explored some of the temporal patterns in our data. The annimated gif below shows our `potential rendezvous` for every month in 2016. 

[![transship_annimated_gif]({{ site.url }}{{site.baseurl}}/images/transshipments_by_month_2016.gif)]({{ site.url }}{{site.baseurl}}/images/transshipments_by_month_2016.gif)

Some interesting patterns: Reefers are active off the coast of Argentina mostly during the first half of the year; Transshipment behavior moves north and south off the coast of Peru, likely following the Chinese squid fleet; transshipment appears to be most common in the winter months in the Sea of Okhotsk in Russia (cold!); and transshipment off the coast of Japan appears to be most common between May and October.

Visualizing this another way, we can sum the loitering behavior of reefers by latitude and see how it varies by time:

[![transship_annimated_gif]({{ site.url }}{{site.baseurl}}/images/trans_effort_by_lat.png)]({{ site.url }}{{site.baseurl}}/images/trans_effort_by_lat.png)

The seasonal "heatbeats" of transshipment are visible in the northern and southern hemisphere, while equatorial transshipment appears, unsurprisingly, to be more constant in time. [Download the data](http://globalfishingwatch.org/data) yourself and take a look.
