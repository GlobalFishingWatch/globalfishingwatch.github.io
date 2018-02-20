---
layout: post
title: Our Data in BigQuery
author: Nate Miller
tags: [Fishing Effort, BigQuery]
category: [BigQuery]
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

Today, with our publication in _Science_, we are releasing fishing effort data for 2012 to 2016. One of the ways we are releasing it is through Google's BigQuery. https://cloud.google.com/bigquery/public-data/

If you have not used BigQuery, vist [here](https://cloud.google.com/bigquery/) and click on `try it free` to get started. You can query up to one terabyte per month for no charge, which is far more than you will need to analyze our fishing effort data. 

#### Fishing Effort
Within BigQuery you can begin exploring and slicing our fishing effort data in a number of different ways using the public fishing effort table in Big Query `global_footprint_of_fisheries.fishing_effort`.  

As a simple example, the following query can be used to determine for 2016, the total number of hours spent fishing by vessels from each country. We can use the `SUM` function to aggregate the fishing hours and `GROUP BY flag` to apply these aggregation separately to each flag. In our database the `flag` field represents each country using their alpha ISO3 designation, so that China is represeted as `CHN`, Spain as `ESP`, or Peru as `PER`.

```
SELECT
  SUM(fishing_hours) AS total_fishing_hours,
  flag
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_effort]
WHERE
  _PARTITIONTIME >= "2016-01-01 00:00:00"
  AND _PARTITIONTIME < "2017-01-01 00:00:00"
GROUP BY
  flag
ORDER BY
  total_fishing_hours DESC
```
It looks like China (`CHN`) has the greatest number of fishing hours in 2016 followed by Taiwan, Spain, Italy, and France.  


Perhaps we wish to determine the hours of fishing by Norwegian fishing vessels operating different geartypes.  

```
SELECT
  SUM(fishing_hours) AS total_fishing_hours,
  geartype
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_effort]
WHERE
  _PARTITIONTIME >= "2016-01-01 00:00:00"
  AND _PARTITIONTIME < "2017-01-01 00:00:00"
  AND flag = 'NOR'
GROUP BY
  geartype
ORDER BY
  total_fishing_hours DESC
```
It appears that within Norwegian-flagged vessels, trawlers exihibit the greatest number of fishing hours, followed by vessels operating fixed gear and purse seines.   


Perhaps you wish to identify the the amount of fishing hours by flag state and gear type in a region off the coast of Chile in August of 2016. We can again aggregated the fishing hours by geartype and flag, but in this case limit the time duration, as well as, adding a bounding box in the `WHERE` clause.  

```
SELECT
  SUM(fishing_hours) AS total_fishing_hours,
  geartype,
  flag
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_effort]
WHERE
  _PARTITIONTIME >= "2016-08-01 00:00:00"
  AND _PARTITIONTIME < "2016-09-01 00:00:00"
  AND lat_bin/100 > -39.8
  AND lat_bin/100 < -36.6
  AND lon_bin/100 > -83.9
  AND lon_bin/100 < -77.8
GROUP BY
  geartype,
  flag
ORDER BY
  total_fishing_hours DESC
```

The result is that we can see this region is primarily being fished by trawler vessels flagged to China, South Korea, Vanuatu, Germany, and Poland.  

If we modify the query slightly to examine the entire year of 2016, but aggregate the fishing by gear type, flag, AND month we can see how fishing in this region shifts over time.  

```
SELECT
  SUM(fishing_hours) AS total_fishing_hours,
  geartype,
  flag,
  MONTH(date) month
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_effort]
WHERE
  _PARTITIONTIME >= "2016-01-01 00:00:00"
  AND _PARTITIONTIME < "2017-01-01 00:00:00"
  AND lat_bin/100 > -39.8
  AND lat_bin/100 < -36.6
  AND lon_bin/100 > -83.9
  AND lon_bin/100 < -77.8
  AND fishing_hours > 0
GROUP BY
  geartype,
  flag,
  month
ORDER BY
  month
```

From this example it is clear that this small region is most heavily fished by trawlers in July and August, with less activity the remainder of the year. If we broadened the query to look at multiple years and added year to the `GROUP BY` clause we could assess shifts in this pattern across years.  

#### Fishing Vessels  

To get a sense of the vessels that we have in our fishing vessel database we can use query the fishing vessel table `global_footprint_of_fisheries.fishing_vessels`. Using the following query we can quickly identify the total number of vessels of various geartypes that exist in our fishing vessel database, by flag state.  

```
SELECT
  COUNT(*) AS number_of_mmsi,
  flag,
  geartype
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_vessels]
  GROUP BY flag,
  geartype
```

Similar analysese can be performed to estimate the fleet size by countries or calculate the average size or engine power of fishing vessels. What countries have the largest fleets or are some vessels underpowered for their size compared to others? 

```
SELECT
  AVG(engine_power) AS average_engine_power,
  flag,
  geartype
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_vessels]
  GROUP BY flag,
  geartype
```

The simple analyses here are simply meant to begin illustrating what can be done with this new dataset. The possibilities are enormous and we hope that you build upon these simple examples to identify new and interesting insights into the global footprint of commercial fishing.

