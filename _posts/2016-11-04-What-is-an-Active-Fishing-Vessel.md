---
layout: post
title: What is an 'Active' Fishing Vessel?
tags: [AIS, Data]
category: [Vessel Activity]
---

For the first release of our vessel lists -- [version 0.1](https://github.com/GlobalFishingWatch/treniformis/tree/0.1/) -- we included only vessels that had more than 1000 positions in a given year, and we included only vessels that broadcast that they were fishing vessels 100 percent of the time in their identity messages.

However, many vessels have fewer than 1000 position messages in a year, and some vessels only broadcast that they are fishing vessels 90 percent of the time. Should we include these vessels in analyses and visualizations?

Below is an example of what the tracks of the Jin Sheng No.2, a Chinese fishing vessel, with mmsi number 413270430. Over three weeks in March of 2015, this vessel steamed from the central Pacific to the coast of Japan, Korea, and China. 

While moving, a vessel broadcasts its position via AIS every 2 to 10 seconds, meaning that this vessel was likely broadcasting thousands of messages per day. These messages can be received either by satellites (the blue dots on the map), or by antennas on the shoreline (the red dots, labeled "terrestrial").

On the map below, though, you'll see that the blue dots are clustered, with what look like long gaps in when the data is received. This is because the satellites aren't always overhead. And then you'll see that the blue dots get less and less frequent as the vessel approaches the coast of Asia. 

The red dots show where terrestrial antennas recorded the movement of this vessel. You can see that these antenna can only see so far from shore.

![413270430]({{ site.url }}{{site.baseurl}}/images/413270430.png)

The following chart displays the number or of positions per hour for this vessel over the same time period. You'll see that when satellite reception is good, in the central Pacific, we record more than 50 positions per hour. But each day there are then several hours with no positions. 

![pos_per_hour413270430]({{ site.url }}{{site.baseurl}}/images/pos_per_hour413270430.png)

Also, you'll see how the number of positions per hour decreases as the vessel approaches Asia. The reason is that a satellite can only receive so many AIS messages at once. Close to the coast of Asia, there are so many vessels that each vessel is "seen" less frequently by the overhead satellites.

The terrestrial antennas don't have the same problem as the satellites, partially because they can "see" a much more limited part of the ocean. A satellite can receive messages from a swath of the ocean a few thousand miles wide, so the signals from the entire coast of Asia can interfere with each other. By contrast, a terrestrial receiver is affected by only the vessels close to it.

The upshot is that in parts of the world where there are numerous vessels with AIS, such as near the coast of Asia, satellites provide less reliable coverage of our vessels. Also, with the current satellites in orbit, there will always be gaps, sometimes of several hours, in when we can see a vessel at sea. And finally, terrestrial antennas provide a fairly reliable ability to track vessels, but they are limited in their range.

We'll have another post soon about satellites. One thing to note is that the number of satellites in orbit is increasing, which will both increase the number of positions we see in any given hour and also reduce the gaps in satellite coverage. 

You can see the code used to generate these maps [here](https://github.com/GlobalFishingWatch/data-dashboard/blob/master/forposts/AIS%20Data%20Examples.ipynb). [I will move these posts to a different repo once we are live]

