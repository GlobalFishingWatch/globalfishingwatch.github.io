---
layout: post
title: Global Anchorage Database
author: Nate Miller
tags: [Anchorages]
category: [Anchorages]
comments: False
---
<style>
table {
  padding: 0; }
  table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0; }
    table tr:nth-child(2n) {
      background-color: #f8f8f8; }
    table tr th {
      font-weight: bold;
      border: 1px solid #cccccc;
      text-align: left;
      margin: 0;
      padding: 6px 13px; }
    table tr td {
      border: 1px solid #cccccc;
      text-align: left;
      margin: 0;
      padding: 6px 13px; }
    table tr th :first-child, table tr td :first-child {
      margin-top: 0; }
    table tr th :last-child, table tr td :last-child {
      margin-bottom: 0; }
</style>

Today Global Fishing Watch releases the first version of our global database of anchorages. This database contains over 100,000 locations where AIS transmitting vessels congregated and represents large industrial ports, smaller fishing harbors, and individual docks/piers.

![anchorages]({{ site.url }}{{site.baseurl}}/images/anchorages_map.png)

For more information regarding the development of this dataset, ways in which you can contribute to its further improvement, and to access the datafiles please visit [globalfishingwatch.io](http://globalfishingwatch.io/anchorages.html)

<br>
<h3> First steps </h3>
These data represent the first steps toward identifying not just the movement of vessels at sea, where they fish or rendezvous, but their ultimate destinations, such as these anchorages in the Canary Islands, Portugal, or Spain. We encourage you to download the dataset, examine areas that are of interest to you, and please provide feedback regarding anchorages that may be missing or anchorage points that could be more accurately named.
![esp_anchorages]({{ site.url }}{{site.baseurl}}/images/esp_anchorages_map.png)

<br>
The resolution of this dataset is exciting, as it has the potential to identify not only which port a vessel may visit, but which pier, berth, or processor, as shown by this subset of anchorages (in red) within Dutch Harbor, USA. Each anchorage point is assigned a broader `port` label, but there is the potential to apply a individual `sublabel` to each point, identifying very specific locations, sometimes within a port. If you have specific knowledge or expertise within a particular region or port and can provide these more detailed sublabels, we would greatly appreciate your contributions.
![dutch_harbor]({{ site.url }}{{site.baseurl}}/images/dutch_harbor_anchorages.png)

Details for how to contribute to the dataset are provided at [globalfishingwatch.io](http://globalfishingwatch.io/anchorages.html)


