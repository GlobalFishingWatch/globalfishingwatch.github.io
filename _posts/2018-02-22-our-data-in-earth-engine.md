---
layout: post
title: Our Data in Earth Engine
author: David Kroodsma
tags: [fishing effort, Earth Engine]
category: [EarthEngine]
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

Today, with our publication in _Science_, we are releasing fishing effort data for 2012 to 2016. One of the ways we are releasing it is through Google's Earth Engine. There is a bit of a steep learning curve on Earth Engine -- you have to be able to code in JavaScript or Python. But once you learn the basics, it is an incredibly powerful way to explore geospatial data. 

If you have not used Earth Engine, it is easy to sign up. Go to [earthengine.google.com](https://earthengine.google.com/) and click on `sign up.`

Here is an [example of a script](https://code.earthengine.google.com/443e6a6067eda953101d77db3717446a) that loads one year of fishing into the map, and [here's a similar one](https://code.earthengine.google.com/3da7e980c09352963d5c3447646b4a68) that shows vessel presence. These scripts allow you to stylize the global map of fishing as you like, and export it as an image. 

One of the powers of earth engine is the ability to compare sea surface temperature to fishing effort. Here is [an example of a script](https://code.earthengine.google.com/5bfea0ba920226a6a1780b02de502f92) that creates a video for an entire year, showing changes in sea surface temperature and the movements of drifting longlines. Below is an image created from this script.
 
You can also read more about Earth Engine and Global Fishing Watch on the [Google Earth and Earth Engine Medium Blog](https://medium.com/google-earth).

![anchorages]({{ site.url }}{{site.baseurl}}/images/global_temp_and_longlines2016.gif)



