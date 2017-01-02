---
layout: post
title: Updated Fishing Lists - Version 0.2
author: David Kroodsma
tags: [AIS, Data]
category: [Vessel_Activity]
---

For the first release Global Fishing Watch, we included only vessels that had more than 1000 positions in a given year, and we included only vessels that broadcast that they were fishing vessels 100 percent of the time in their AIS identity messages. The list of these mmsi can be [seen here](https://github.com/GlobalFishingWatch/treniformis/tree/0.1/).

However, many vessels have fewer than 1000 position messages in a year, and some vessels only broadcast that they are fishing vessels 90 percent of the time. Should we include these vessels in analyses and visualizations?

It turns out there are *a lot* of vessels that broadcast only a few positions per year. For instance, the chart below shows the number of vessels that had a given number of positions in 2015. This is grouped by every 50 positions, so the first point on the graph is the number of vessels that have between 0 and 50 points in 2015, while the second is the number that have between 50 and 100, and so on.

![pos_per_year.]({{ site.url }}{{site.baseurl}}/images/pos_per_year.png)

In other analyses, we've found that the mmsi with very few points are mostly noise -- that is, bad data -- and we should ignore them. But most of the vessels with more than 100 positions in a year are real vessels. If we exclude the vessels that have fewer than 1000 points, as we did in the original release of Global Fishing Watch, we end up eliminating about half of all the likely fishing vessels. Below is a chart of the number of vessels by year that self report as fishing, divided up between those with more and fewer than 1000 positions (and excluding vessels with fewer than 100 positions). 

![1000_pos_cutoff]({{ site.url }}{{site.baseurl}}/images/above_below_1000_positions.png)

Vessels with only a few hundred positions, though, contribute very little to the total effort, and they are also extremely difficult to analyze. Also, we've found that many vessels with many points sit in port all the time, and that a better measure is the number of "active points" -- that is, points where the speed is greater than 0 (or 0.1 knots, to be more exact). 

We also found that our criteria was too strict in other ways. Sometimes, due largely to errors in AIS, a fishing vessel might accidentally broadcast that it is a different type of vessel -- say, a tug boat or a tanker. That means that we eliminate some fishing vessels if we include only vessels say they are fishing vessels 100 percent of the time. We found that we could add another few hundred boats if we instead required the vessels to identify as fishing 99 percent of the time. 

We also found that if we include vessels with at least 500 active positions -- positions with a speed greater than 0.1 knots -- we add a few thousand more fishing vessels per year to our lists, and we also include about 95 percent of the global fishing effort in AIS data according to our current algorithms. 

![old_vs_new]({{ site.url }}{{site.baseurl}}/images/old_vs_new_12222016.png)

These lists of mmsi can be downloaded [here](https://github.com/GlobalFishingWatch/treniformis/tree/0.2/treniformis/_assets/GFW/FISHING_MMSI/KNOWN_AND_LIKELY)

Also note that some vessels that were on the old lists are no longer on the new ones. These are mostly vessels that just sat in port most of the year, broadcasting AIS. They had very few "active" points. So, we've removed some very inactive vessels, and added a few thousand more. 

Why not just include all vessels? We plan to do so in the future, and we are already doing so for several scientific analyses. These vessels, though, tend to be more difficult to identify and are more likely to have errors -- for now, we are not including them on the Global Fishing Watch public map. Check back soon, though, for us to add more vessels and publish more information about these vessels. 

The charts for this post were created [here](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2016/12/Fishing_Vessels_Pos_Per_Year.ipynb) and [here](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2016/12/Positions-per-Year.ipynb).
