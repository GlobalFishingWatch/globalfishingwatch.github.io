---
layout: post
title: "Acessing GFW Data in BigQuery Using R"
author: David Kroodsma
tags: [fishing effort, BigQuery]
category: [fishingeffort]
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


One of the ways we have released our data is through Google's BigQuery. BigQuery allows one to easily aggregate the data or select only the region or time period of interest. We have posted some example queries [here](http://globalfishingwatch.io/bigquery/2018/02/22/our-data-in-bigquery.html).

One our colleagues, Juan Mayorga of UCSB and National Geographic Pristine Seas, recently worte a tutorial on his website for how to connect this BigQuery datset using R, which you can read here: [jsmayorga.com/post/getting-global-fishing-watch-from-google-bigquery-using-r/](http://jsmayorga.com/post/getting-global-fishing-watch-from-google-bigquery-using-r/). This post is a fantastic resource for all researchers who want to access our data, and we highly recommend it. 
