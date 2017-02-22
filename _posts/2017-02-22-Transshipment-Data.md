---
layout: post
title: Transshipment Data and Report are Now Released 
author: David Kroodsma
tags: [Transshipment]
category: [Transshipment]
comments: True
---

Today we have published our initial research into transshipment in our global database. You can download a copy of our report via [this link]() (you will have to register on Global Fishing Watch to download).

![transship]({{ site.url }}{{site.baseurl}}/images/globalfootprinttransshpments.png).

The image above was created by our data scientist Nate Miller, who has spent the past few months reviewing events across the globe. 

In our database, we identified _likely_ and _potential_ transshipments. Likely events are where we see a regrigerated cargo vessel meet up with a fishing vessel while more than 20 nautical miles from shore. Most likely, they are transshiping _something_. The potential events are when we see refrigerated cargo vessels, or reefers, loitering at sea for enough time to receive a transshipment. For a full description, see the report. 

The data used to make the map above is now freely available. You can [download a csv file with every one of the points on the map above here](). In fact, you can run an R script that Nate ran to generate the plot above with [this code](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/2/global_footprint_map_code.R) 

If you prefer Python, I wrote [a quick Python script](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/2/GFW_Transshipment_Data.ipynb) to make a slightly similar map the the one Nate developed above. If you download our data, and you have the right python libraries installed, you can run this script.

Instead of Nate's map, which shows each point seperately, I made a raster of points. It is just another way to display the data.

![transship]({{ site.url }}{{site.baseurl}}/images/potential_transshipments.png).

![transship]({{ site.url }}{{site.baseurl}}/images/likely_transshipments.png).
