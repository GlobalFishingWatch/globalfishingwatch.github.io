---
layout: post
title: Transshipment Data and Report 
author: David Kroodsma
tags: [Transshipment]
category: [Transshipment]
comments: True
---

Today we have published our initial research into transshipment in our global database. You can download a copy of our report via [this link](http://globalfishingwatch.org/data) (you will have to register on Global Fishing Watch first).

![transship]({{ site.url }}{{site.baseurl}}/images/globalfootprinttransshpments.png)

The image above was created by our data scientist Nate Miller, who has spent the past few months reviewing transshipment events across the globe, and who developed most of the graphics in the report using R.

In the report, we identify _likely_ and _potential_ transshipments. _Likely_ events are where we see a regrigerated cargo vessel (reefer) meet up with a fishing vessel while more than 20 nautical miles from shore. They are most likely engaged in the transshipment of fish, supplies, or fuel. The _potential_ events are when we see refrigerated cargo vessels, or reefers, loitering at sea for enough time to receive a transshipment. In many cases, the fishing vessel engaged in transshipment will not have AIS, or will not have its AIS on, and so we will only see the movements of the reefer. For a full description, see [the report](http://globalfishingwatch.org/data) (you will have to register on Global Fishing Watch to download). 

The data used to make the map above is now freely available. You can [download a csv file with every one of the points on the map above](http://globalfishingwatch.org/data). In fact, you can run an R script to generate the plot above with [this code](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/2/global_footprint_map_code.R) that Nate wrote. 

If you prefer Python, I wrote [a quick Python script](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/2/GFW_Transshipment_Data.ipynb) to make a slightly similar map to the one Nate developed above. If you download our data, and you have the right Python libraries installed, you can run this script. Instead of Nate's map, which shows each point seperately, I made a raster of the density of the reefer behavoir. It is just another way to display the data.

![transship]({{ site.url }}{{site.baseurl}}/images/potential_transshipments.png)

![transship]({{ site.url }}{{site.baseurl}}/images/likely_transshipments.png)


