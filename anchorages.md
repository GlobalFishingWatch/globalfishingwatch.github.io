---
layout: default
redirect_to:
  - http://globalfishingwatch.org/datasets-and-code/anchorages/
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

# Anchorages

Large, ocean-going vessels routinely carry a device that transmits position and identity information in a near continuous stream, called the Automatic Identification System, or AIS. This system was originally designed as a collision avoidance system, with vessels sharing information about their speed, course, and position with their neighbors so as to avoid collision. In recent years, these same transmissions can be detected by receivers in low-orbit satellites and by terrestrial installations, allowing us to monitor vessel movements. Global Fishing Watch and its research partners have used these data to provide insights into the movements of individual fishing vessels and it has allowed us to understand patterns of fishing around the globe. These data can also show us locations where vessels congregate, and thus identify the locations of anchorages and ports.  
  
Using AIS vessel positions from 2012 to 2017, we developed an anchorages/ports database based on identifying locations where vessels congregate. The actual logic works like this:
  
1. We applied a grid to the surface of the globe. Without special care, such a grid would have cells at the poles that encompassed different areas than cells at the equator. However, using a type of grid made up of what are called s2 cells, we can produce an gridded overlay in which all grid cells have the roughly the same area. _(For more details on the s2 concept, see links at the bottom of the page)_. The area of each s2 cell is specified by a level, from 0 (grid cells that are 9220km on a side) to 30 (grid cells 1cm on a side). We used a s2 level of 14, which resulted in each grid cell being roughly 0.5km on a side. Each s2 cell in the grid has a unique identifier (`s2id`) which corresponds to the spatial location of that cell.    
  
    ![s2cell]({{ site.url }}{{site.baseurl}}/images/s2cell_example.png)


2. Across this grid we identified where individual vessels (specifically, individual MMSI) remained stationary (defined as when a vessel moves less than 0.5km over at least 12 hr). If within an s2 cell, at least 20 unique MMSI from 2012-2017 remained stationary, we identified this cell as an anchorage point and we assigned the location (lat/lon) of the anchorage as the mean location of all the stationary periods within that cell. Note that this means an anchorage location is not necessarily in the center of the s2 cell. Also, we excluded anchorages that were inland of the coast, and thus this initial dataset does not include anchorages on rivers or lakes.
3. As there is one anchorage point per s2 cell, each anchorage point was identified uniquely by its `s2id`, along with its position (latitude, longitude) in decimal degrees.
4. The anchorage data set continues to be extended by incorporating user contributed anchorages, as well as regional or country-specific anchorages databases (such as one provided by the Indonesian Ministry of Marine Affairs and Fisheries). All contributed anchorages and their locations(lat/lon) take precedence over AIS derived locations within a given s2 cell.  
5. In some cases, when many anchorages are adjacent, such as in large ports, it may be useful to group anchorages together. We implemented a simple grouping scheme by combining anchorage points located within 4 kilometers of one another, into anchorage groups. The method and code for generating these groupings using BigQuery and Python is described [here](https://github.com/GlobalFishingWatch/data-blog-code/blob/master/2017/11/AssigningAnchorageGroups.ipynb).

Links to the raw dataset, in several formats, are provided at the bottom of this page.  

### Anchorage Naming

The raw anchorage data is useful, but we have also sought to name each anchorage point (_s2id_) by referencing publicly available datasets and provisionally applying names to each anchorage. Often, a single port is made up of a number of different anchorages. We assigned names to anchorages, grouping anchorages into ports using a multistep process and 3 primary data sources:  

1. [World Port Index](http://msi.nga.mil/NGAPortal/MSI.portal?_nfpb=true&_pageLabel=msi_portal_page_62&pubCode=0015). Current data on [Github](https://github.com/GlobalFishingWatch/anchorages_pipeline/blob/master/pipe_anchorages/data/port_lists/WPI_ports.csv).
2. [Geonames 1000](http://download.geonames.org/export/dump/cities1000.zip) database. Current data on [Github](https://github.com/GlobalFishingWatch/anchorages_pipeline/blob/master/pipe_anchorages/data/port_lists/geonames_1000.csv).
3. Top destination as reported in the AIS messages of stationary vessels that defined the anchorage.
4. User contributed names and regional port databases (such as the one from the [Indonesian Ministry of Marine Affairs and Fisheries](http://pipp.djpt.kkp.go.id/)).

To name each anchorage (`s2id`) we used the following process:  

1. First, we apply any names from the manually reviewed/corrected and user-contributed anchorage names (the current list is available on GitHub [HERE](https://github.com/GlobalFishingWatch/anchorages_pipeline/blob/master/pipe_anchorages/data/port_lists/anchorage_overrides.csv))     
2. For any unnamed anchorages, we identify those anchorage points that are within 4 km of a World Port Index (WPI) port (using haversine distance), and assign the unnamed anchorage point the WPI port name.  
3. Next, if an anchorage is provided by a curated regional list and corresponds to an anchorage in our database (occurs within the same s2 cell), we assign the curated anchorage name to the anchorage in our database.  
4. For the remaining unnamed anchorages, we identify those that are within 4 km of a `geoname 1000` city from the geonames database, and assign the anchorage point the `geoname 1000` city name.  
5. For those anchorage points that remained unnamed, we assign the top AIS destination name.
6. The same anchorage groups as described for the unnamed anchorages have been included.  
  
By cloning the public [GitHub repo](https://github.com/GlobalFishingWatch/anchorages_pipeline) for this project, you should be able to run the python script `pipe_anchorages.port_info_finder` to label the `unnamed_anchorages` file following our methods and using the same naming datasets, or any other dataset of anchorage names you have access to.  

The complete named anchorage dataset is also available at the bottom of this page.
  

### Assessment
We have identified anchorages in 2,793 of non-inland ports (as in, not on rivers or lakes) listed in the World Ports Index, a coverage of about 87%. For ports designated in the WPI as *large*, *medium*, and *small* our coverage is 95% (139/147), 98% (339/347), and 91% (817/901) respectively. In the large category, the unidentified anchorages are mostly offshore terminals. Overall, if a WPI anchorage was not identified through our algorithm, that anchorage was likely listed by the WPI as _very small_ and frequented by few vessels.  

The mean number of anchorages per port matched to the World Port Index was roughly 10, and 23,656 anchorages have been assigned World Port Index names. An additional 12,494 anchorages were named using the Geonames 1000 database. Thus, about 35% of the anchorage points have been assigned names using the World Port Index and Geonames 1000 databases. The remaining 66,824, or 65% of anchorage points, were assigned names based upon the most commonly reported destination in the AIS message. 


### Contributing

This database is a work in progress and we actively request user involvement as we seek to refine this open-source resource.  

A significant way to contribute to this dataset is to identify anchorages that are incorrectly named. To contribute, please fork the public [GitHub repo](https://github.com/GlobalFishingWatch/anchorages_pipeline) and create an additional overrides file (similar to the existing `anchorage_overrides.csv`) with your updates. All we need is the following information: 

1. The iso3 country code for the country where the anchorage is located,  
2. Your suggested label (the broader port the anchorage is within).  
3. If warranted, a sublabel (the specific location of the anchorage within the port).  
4. The latitude and longitude (in decimal degrees) of the anchorage.  
  
| iso3 | label   |       sublabel      | latitude  | longitude  |
|------|---------|---------------------|-----------|------------|
| USA  |  KENAI  |PACIFIC STAR SEAFOODS| 60.548381 | -151.22669 |  
{: table}
  
  
For example, for s2id: `56c67ca5`, the label is `KENAI`, which represents the broader port, and the sublabel is `PACIFIC STAR SEAFOODS`, which is a specific location within the port positioned at a dock for Pacific Star Seafoods. If no sublabel is warranted or you don't know of an appropriate sublabel, the sublabel field can be left empty. There is no need to provide an `s2id`, as we calculate that based upon the anchorage latitude and longitude. After updating the overrides file, submit a pull request and we will review the suggested updates and incorporate the revised naming scheme into the database. Use a similar process if you find that an important anchorage is currently missing from the database.  
  

# Data  
  
  
| Unnamed Anchorage Data | Named Anchorage Data   |
|-----------------------|--------------------------|
|   [.CSV](https://storage.googleapis.com/gfw_public_data/unnamed_anchorages_csv_20171120.zip) | [.CSV](https://storage.googleapis.com/gfw_public_data/named_anchorages_csv_20171120.zip)|
[Big Query Table](https://bigquery.cloud.google.com/table/global-fishing-watch:gfw_public_data.unnamed_anchorages_20171120?pli=1)| [Big Query Table](https://bigquery.cloud.google.com/table/global-fishing-watch:gfw_public_data.named_anchorages_20171120?pli=1) |  
[ESRI shapefile](https://storage.googleapis.com/gfw_public_data/unnamed_anchorages_20171120_shp.zip) | [ESRI Shapefile](https://storage.googleapis.com/gfw_public_data/named_anchorages_20171120_shp.zip)| 
[Google Fusion table](https://fusiontables.google.com/data?docid=1ueDQbxhbMgakyPwWDLoCs9xhgEz1YtJqxhDrXUZz#map:id=3)  | | 
[Google Earth Engine](https://code.earthengine.google.com/3766c8b2d8008e823af9745ddd127480) feature collection  | |  
{: table}  
   
We also provide the current mapping between `s2id` and `anchorage names`  in a
[.CSV](https://storage.googleapis.com/gfw_public_data/s2id_label_mapping_20171120_csv.zip) and 
[Big Query table](https://bigquery.cloud.google.com/table/global-fishing-watch:gfw_public_data.s2id_anchoragename_map_20171120?pli=1&tab=schema)  
  
 <br>
 <br>
 <br> 
  
#### _Details regarding s2 quad-tree hierarchies_

[https://docs.google.com/presentation/d/1Hl4KapfAENAOf4gv-pSngKwvS_jwNVHRPZTTDzXXn6Q/view#slide=id.i28](https://docs.google.com/presentation/d/1Hl4KapfAENAOf4gv-pSngKwvS_jwNVHRPZTTDzXXn6Q/view#slide=id.i28)

[http://blog.christianperone.com/2015/08/googles-s2-geometry-on-the-sphere-cells-and-hilbert-curve/](http://blog.christianperone.com/2015/08/googles-s2-geometry-on-the-sphere-cells-and-hilbert-curve/)

[http://schd.ws/hosted_files/user2017/32/talk.html#(4)](http://schd.ws/hosted_files/user2017/32/talk.html#(4))
