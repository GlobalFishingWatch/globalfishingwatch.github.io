---
layout: post
title: Transshipment Data and Report 
author: David Kroodsma
tags: [Transshipment]
category: [Transshipment]
comments: True
---

Today we published our initial research on transshipment at sea. Transshipment at sea is where a fishing vessel offloads its catch to a refrigerated cargo vessel (or "reefer") far from port. You can download a copy of our report via [this link](http://globalfishingwatch.org/data).

[![transship]({{ site.url }}{{site.baseurl}}/images/globalfootprinttransshpments.png)]({{ site.url }}{{site.baseurl}}/images/globalfootprinttransshpments.png)

The image above was created by our data scientist Nate Miller, who has spent the past few months reviewing transshipment events across the globe, and who developed most of the graphics in the report using R. Click on the image to see the full resolution version.

In the report, we identify _likely_ and _potential_ transshipments. _Likely_ events are where we see a refrigerated cargo vessel (reefer) meet up with a fishing vessel while more than 20 nautical miles from shore. These vessels are most likely engaged in the transshipment of fish, supplies, or fuel. The _potential_ events are when we see reefers loitering at sea for enough time to receive a transshipment. In many cases, the fishing vessel engaged in transshipment will not have AIS, or will not have its AIS on, and so we will only see the movements of the reefer. For a full description, see [the report](http://globalfishingwatch.org/data). 

The data used to make the map above is now freely available. You can [download csv files with every one of the points on the map above](http://globalfishingwatch.org/data). In fact, you can run an R script to generate the plot above with [this code](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/2/global_footprint_map_code.R) that Nate wrote. 

If you prefer Python, I wrote [a quick Python script](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/2/GFW_Transshipment_Data.ipynb) to make a slightly similar map to the one Nate developed above. If you download our data, and you have the right Python libraries installed, you can run this script. Instead of Nate's map, which shows each point separately, I made a raster of the density of the reefer behavior. It is just another way to display the data. Click on the images to see a higher resolution version.

[![transship]({{ site.url }}{{site.baseurl}}/images/potential__transshipments.png)]({{ site.url }}{{site.baseurl}}/images/potential__transshipments.png)

[![transship]({{ site.url }}{{site.baseurl}}/images/likely_transshipments.png)]({{ site.url }}{{site.baseurl}}/images/likely_transshipments.png)


