---
layout: default
---

# Other Data

We have developed and are using several GIS datasets that are not directly
related to fishing but that are necessary to properly identify
fishing. These datasets are [available here](https://github.com/GlobalFishingWatch/ancillary-gis-data).
 
### Distance to Shore
This dataset provides, at one kilometer resolution, the distance from
shore of every point in the ocean. We use this raster to calculate the
distance from shore for every AIS position message in our database.

### Distance to Port
This dataset is the same as the distance to shore raster, but instead
includes the distance to port. This dataset is still under
development, largely because we are still developing our port
database.

### Port Database
We are developing a port database based on where vessels with AIS
anchor for longer than 48 hours. We plan to combine this data with the
[World Port
Index](http://msi.nga.mil/NGAPortal/MSI.portal?_nfpb=true&_pageLabel=msi_portal_page_62&pubCode=0015).
