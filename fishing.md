---
layout: default
---

# The Fishing Detection Models

We have refined and replaced our models multiple times throughout the project. Our most updated version is a neural net classifier, which is described in detail in our paper, [Tracking the Global Footprint of Fisheries]({{ site.url }}{{site.baseurl}}/global-footprint-of-fisheries.html). 

* Neural Net Model 1.0
  * We have developing a convolutional neural net (CNN) model using the same training data as the logistic model. This model is what powers our publicaly available [fishing effort data]({{ site.url }}{{site.baseurl}}/effort.html), and code for this model is available on [this github repo](https://github.com/GlobalFishingWatch/vessel-classification). 

* [Logistic Regresssion Model 1.1](fishing__logistic_1_1.html)
  * A logistic regression model using the same features as the
    heuristic model, and trained using a hand labeled dataset. This model currently powers the [globalfishingwatch.org](http://globalfishingwatch.org) public map.

* [Heuristic Model 1.0](fishing__heuristic_1_0.html)
  * Our first model was a heuristic model based on the intuition of Figure 2 below. A version of this heuristic was used by [McCaulely et al.](http://science.sciencemag.org/content/351/6278/1148) for identifying fishing effort in the Pheonix Islands Protected Area.


# Background to fishing detection
The Global Fishing Watch (GFW) fishing score model computes the
probability that a vessel is fishing based on its AIS track data. The
combined fishing score of all vessels is used to estimate the [fishing
activity worldwide](effort.html).

## Definition of Fishing
The definition of fishing is the subject of a surprising amount of
debate at GFW. We define fishing as the period when a vessel has
fishing gear in the water. However, we also use a more expansive
definition of fishing-related activity, which is the time that a
vessel spends away from shore in which it is not transiting to and
from the fishing grounds. For trawlers and longliners, these two
definitions give similar results, but the same is not true for purse
seiners. They can be quite different since the time they spend with
gear in the water is small relative to the time spend pursuing fish.

## Track Characteristics
An example of an AIS vessel track is shown in Figure 1 below, with the
points where the vessel is fishing shown in red. The job of the
fishing score model is to estimate the probability that a vessel is
fishing at each of the points along the AIS track. The fishing score
at a given point is computed using a model based on three primary
features: a vessel’s average speed, the amount of variation in the
vessel’s speed, and the amount of variation in the vessel’s course.
The “variation” in speed and course is technically the standard
deviation, and we shall refer to these features as the speed deviation
and course deviation. In addition, points within 10 km of shore are
uniformly considered non-fishing. Ordinary vessel behavior near shore
is easily confused with fishing and using this 10 km cutoff avoids a
large number of false positive fishing values.

![AIS example]({{ site.url }}{{site.baseurl}}/images/AISExample.png) 
Figure 1: Example fishing vessel AIS track with fishing shown in red

To see how this works, examine the scatter plot shown in Figure 2.
This shows how these three features computed over a six hour window
relate to whether a vessel is fishing. It is apparent from Figure 2
that fishing activity tends to be clustered in certain regions of
average-speed, speed-deviation and course-deviation.

[![Feature distribution]({{ site.url }}{{site.baseurl}}/images/FeatureDistribution.png)](https://github.com/GlobalFishingWatch/vessel-scoring/blob/master/notebooks/Documentation-Figures.ipynb)
Figure 2: Fishing activity, shown in red, is most common for speeds in
the range of 2 to 5 knots and is also associated with larger deviations in
speed and course.

## External links
* [Introduction to precision and recall (Wikipedia)](https://en.wikipedia.org/wiki/Precision_and_recall)

Page last updated: Feb 22nd, 2018

