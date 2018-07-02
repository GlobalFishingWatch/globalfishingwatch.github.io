---
layout: default
redirect_to:
  - http://globalfishingwatch.org/datasets-and-code/fishing-detection-models/
---

# Neural Net Vessel Classifier

In addition to identifying vessels using information in the AIS data and matching this data to vessel registries (which comprise our [`self-reported` and `known` vessel lists]({{ site.url }}{{site.baseurl}}/vessels.html)), we are using a convolutional neural network to identify the geartypes associated with different vessels.

The methods of this classifier are described in detail in our paper, [Tracking the global footprint of fisheries]({{ site.url }}{{site.baseurl}}/global-footprint-of-fisheries.html)). We have also open sourced the code, which you can access at [this github repo](https://github.com/GlobalFishingWatch/vessel-classification).

Page last updated: Feb 22, 2018
