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

#### Querying Fishing Effort

You can begin exploring and slicing our fishing effort data in a number of different ways using the public BigQuery fishing effort table `global_footprint_of_fisheries.fishing_effort`.
Its important to note that these dataset do not detail individual vessels, but shows an aggregate fishing effort within 0.01 x 0.01 grid cells for each day from 2012 to 2017. It is possible to have more than 24 hours of fishing hours within a grid cell, if more than one vessel was identified as fishing within that grid cell on a given day.

While the data are aggregated by 0.01 x 0.01 grid cell per day, you still have a lot of control over additional aggregation(as shown below from coursest to finest): 
1. fishing hours for all vessels within a grid cell across all 5 years of data, or...
2. fishing hours by flag state, per grid cell, or...
3. fishing hours per flag state, per fishing gear type, per grid cell or...
4. fishing hours, per flag state, per gear type, per time period (day, month year), per grid cell.  
 
Clearly, there are many different ways to slice the data depending upon how you query the data.  
The purpose here is to provide a few simple queries to demonstrate how these public data can best processed to answer your question of interest.  

##### Fishing Hours by Flag State
As a simple example, the following query can be used to determine (for 2016), the total number of hours spent fishing by vessels from each country in our dataset. We can use the `SUM` function to aggregate the fishing hours and `GROUP BY flag` to apply this aggregation to each flag separately. In the database the `flag` field represents each country using the alpha ISO3 designation, so China is represeted as `CHN`, Spain as `ESP`, or Peru as `PER`.

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
From the above query, it looks like China had the greatest number of fishing hours in 2016 followed by Taiwan, Spain, Italy, and France.  

##### Fishing Hours by Geartype for a Specific Flag State
Perhaps we wish to determine the hours of fishing by Norwegian fishing vessels by fishing gear (trawler, drifting longliner, fixed gear). We can adapt the query above to aggregate by gear type rather than flag and then add an additional entry to the `WHERE` clause `AND flag = 'NOR'` which will limit the results to just those vessels that have the iso3 value for Norway.

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
It appears that for Norwegian-flagged vessels, trawlers exihibit the greatest number of fishing hours, followed by vessels operating fixed gear and then purse seines.   

##### Fishing Hours By Flag State and Geartype within a Specified Timerange and Region
Perhaps we wish to identify the number of fishing hours by flag state and gear type in a particular region we are interested in. In this example, we consider a small region off the coast of Chile and we'll just look at August of 2016. Here we aggregated the fishing hours by BOTH geartype and flag, but limit the time duration to just that time between `"2016-08-01"` and `"2016-09-01"` as well as, adding a bounding box in the `WHERE` clause. The bounding box identifies our region of interest by requiring all the data have a latitude greater than `-39.8` and less than `-36.6` and a longitude greater than `-83.9` and less than `-77.8`.

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

##### Fishing Hours By Flag State, Geartype, and Month within a Region (Timeseries)
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

From this example it is clear that this small region is most heavily fished by trawlers in July and August, with less activity the remainder of the year. If we broadened the query to look at multiple years, added `YEAR(date) AS year` to the SELECT statement, and `year` to the `GROUP BY` clause we could assess shifts in this pattern across years. We could even generate a daily timeseries of fishing effort and plot fishing hours over time.  

#### Querying Fishing Effort by Vessel  

A second fishing effort dataset is also available, `global_footprint_of_fisheries.fishing_effort_byvessel`. Note that this dataset, while gridded is gridded at 0.1 x 0.1 degrees, and thus identifies the number of hours a vessel fished within a given 0.1 x 0.1 grid cell. As above, a grid cell may be identified with more than 24 hours of fishing per day if multiple vessels fish within that grid cell, however, a single vessel (MMSI) cannot fishing more than 24 hours in a day, though its fishing effort may be distributed across multiple grid cells if the vessel moves between them and is identified as fishing in each.

Using this dataset it is possible identify vessels that may be fishing in or near areas of interest at a particular time. Using our example from above `Fishing Hours By Flag State and Geartype within a Specified Timerange and Region`, we can rerun the query using this dataset and identify the unique vessel identifiers for the vessels fishing in this region in August, 2016.

```
SELECT
  SUM(fishing_hours) AS total_fishing_hours,
  mmsi
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_effort_byvessel] 
WHERE
  _PARTITIONTIME >= "2016-08-01 00:00:00"
  AND _PARTITIONTIME < "2016-09-01 00:00:00"
  AND lat_bin/10 > -39.8
  AND lat_bin/10 < -36.6
  AND lon_bin/10 > -83.9
  AND lon_bin/10 < -77.8
GROUP BY
  mmsi
ORDER BY
  total_fishing_hours DESC
```

From this query we can identify the six(6) vessels that were fishing within this region during August, 2016. If we wish to identify the specific grid cells in which they were fishing could extract that data in several different ways. Here is one simple method.

```
SELECT
  date,
  mmsi,
  lat_bin/10 AS lat_bin,
  lon_bin/10 AS lon_bin
FROM
  [global-fishing-watch:global_footprint_of_fisheries.fishing_effort_byvessel] 
WHERE
  _PARTITIONTIME >= "2016-08-01 00:00:00"
  AND _PARTITIONTIME < "2016-09-01 00:00:00"
  AND lat_bin/10 > -39.8
  AND lat_bin/10 < -36.6
  AND lon_bin/10 > -83.9
  AND lon_bin/10 < -77.8
  and fishing_hours > 0
```


#### Querying Fishing Vessels  

If you want to get a understanding of the fishing vessels in our vessel database or want to generate some summaries of the dataset its best to query the fishing vessel table, `global_footprint_of_fisheries.fishing_vessels`. Using the following query we can quickly identify the total number of vessels of various geartypes that exist in our fishing vessel database, broken out by flag state.  

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

Similar analyses can be performed to estimate the fleet size by country or calculate the average size or engine power of fishing vessels. What countries have the largest fleets or have vessels that appear underpowered for their size in comparison to others? 

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


#### Querying All Vessels

The remaining table `global_footprint_of_fisheries.vessels` is useful as a 'look-up' to identify the vessel type for specific MMSI (not just fishing vessels).

```
SELECT
  mmsi,
  shipname,
  callsign,
  flag,
  imo,
  registry_geartype,
  inferred_geartype,
  registry_length,
  inferred_length,
  source
FROM
  [global-fishing-watch:global_footprint_of_fisheries.vessels]
WHERE
  mmsi = 520234000
```

In this manner we can identify this vessel as the RISING 28, flagged to FIJI, with this identity supported by both AIS identity messages and the FFA. Additionally, we find a close match between the registered geartype (`drifting longlines|set longlines`) and the inferred geartype ( `drifting longlines`, based from GFW's classification neural network), as well as the registered and inferred vessels lengths, `42.6` meters and `43.6`, respectively.  

#### Conclusion
The simple analyses here are simply meant to begin illustrating what can be done with this new dataset. The possibilities are enormous and we hope that you build upon these simple examples to identify new and interesting insights into the global footprint of commercial fishing.

