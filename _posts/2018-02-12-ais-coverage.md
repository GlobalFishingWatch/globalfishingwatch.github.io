---
layout: post
title: AIS Data Coverage - Data Coming Soon
author: David Kroodsma
tags: [ais coverage, data]
category: [ais_coverage]
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


Along with the recent release of our [fishing effort]({{ site.url }}{{site.baseurl}}/effort.html) data, we are also releasing information on how good AIS coverage is for different parts of the world. That is, in some parts of the ocean, an AIS signal sent by a vessel is very likely to be in our database, and in others, it is less likely to be so.

Automatic Identification System (AIS) signals can be received by terrestrial antennas near the shore, and also by a constellation of satellites. A satellite can receive messages from vessels that are thousands of kilometers apart, and, in a crowded part of the world (such as southeast Asia), a single satellite recieves messages from thousands of vessels. These messages can interfer with one another, and thus, in these regions of high vessel density, satellite AIS coverage is not as good as it is in low density parts of the world.

By contract, a terrestrial antenta can only receieve messages from vessels a few dozen kilometers, at most, out to see. As such, they receive fewer messages at once, and have less of a problem with message interference. These antenas can be found along many of the world's coastlines, especially in developed countries. 

We have a database of AIS "coverage" that we will soon be making public, and which can be used to help interpret the regions of world (and time frames) that our data can be best used. 

Below is an image of coverage quality for Class A AIS devices in 2016, and in 2014. What this map does is divide the day into five minute intevals, and then count the number of those five minute intervals in which we receive a message from a vessel. A hundred percent would be receiving a message every five minutes; one percent would mean that only about two signals in two different five minute periods were recieved. Our ability to measure fishing effort deteriorates rapidly below about 10 percent of the day, which translates into about 20 to 30 postions in a given day.

To get updates for when this entire database is available for your use, sign up on [Global Fishing Watch's community page](https://globalfishingwatch.force.com/gfw/s/). We will update this blog posting when it is available. 

![2016_coverage]({{ site.url }}{{site.baseurl}}/images/ais_coverage/coverage_a_2016.png)


![2014_coverage]({{ site.url }}{{site.baseurl}}/images/ais_coverage/coverage_a_2014.png)




