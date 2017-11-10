---
layout: default
---

# Neural Net Vessel Classifier

In addition to identifying vessels using information in the AIS data and matching this data to vessel registries (which comprise our [`known` and `likely` vessel lists]({{ site.url }}{{site.baseurl}}/vessels.html)), we are using a convolutional neural network to identify the geartypes associated with different vessels.

We will be releasing initial results of this neural net here soon. We have also open sourced the code, which you can access at [this github repo](https://github.com/GlobalFishingWatch/vessel-classification).