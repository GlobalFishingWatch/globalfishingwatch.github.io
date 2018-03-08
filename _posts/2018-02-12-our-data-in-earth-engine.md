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

Today, with our publication in [_Science_](http://science.sciencemag.org/cgi/doi/10.1126/science.aao1118), we are releasing fishing effort data for 2012 to 2016. One of the ways we are releasing it is through Google's Earth Engine. If you have not used Earth Engine, it is easy to start, although you will have to write scripts in JavaScript or Python. Go to [earthengine.google.com](https://earthengine.google.com/) and click on `sign up.` Google provides an introduction and tutorial [here](https://developers.google.com/earth-engine/tutorial_api_01).

Earth Engine is a fantastic tool for analyzing big, geospatial, remote-sensed data. It has been used to analyze [deforestation](http://earthenginepartners.appspot.com/science-2013-global-forest) across all the world's forests, or measure the [extent of all the planet's lakes, rivers, and reservoirs](https://www.nature.com/articles/nature20584). It also has an increasing amount of oceanographic data, and now, also our fishing effort data.  

You can read about our data in Earth Engine on this [blog post](https://medium.com/google-earth) on the Google Earth and Earth Engine Medium Blog.

Below are a few links to scripts that can run using our data in EarthEngine. We will be adding to this list as we develop more applications. 


### Make a Global Image
Here is an [example of a script](https://code.earthengine.google.com/ff4f05aebf86829ecc9809e7ddd64ff4) that loads one year of fishing into the map, and [here's a similar one](https://code.earthengine.google.com/9a873d94cb94d5630c46e9272972d197) that shows vessel presence. Modify these scripts to stylize the global map of fishing as you like, and export it as an image to your Google Drive folder. You can make an image like this one:

![high_res_ee]({{ site.url }}{{site.baseurl}}/images/high_res_global_ee.jpg)

### Compare Temperature and Drifting Longlines
One of the powers of earth engine is the ability to compare sea surface temperature to fishing effort. Here is [a script](https://code.earthengine.google.com/5bfea0ba920226a6a1780b02de502f92) that creates a video for an entire year, showing changes in sea surface temperature and the fishing activity of drifting longlines. Below is an image created from this script.
 
![anchorages]({{ site.url }}{{site.baseurl}}/images/global_temp_and_longlines2016.gif)

We will be adding more examples here as we explore the data in Earth Engine.



