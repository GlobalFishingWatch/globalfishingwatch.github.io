---
layout: default
---

<style>
  table, tr, td {
    border: 1px solid;
    border-collapse: collapse;
  }
</style>

# Global Fishing Watch Fishing Algorithm

* [Source code for the algorithm](https://github.com/GlobalFishingWatch/vessel-scoring)
* [Training data for the algorithm](anonymized.html)
* [Jupyter notebook describing the models in depth](https://github.com/GlobalFishingWatch/vessel-scoring/blob/master/notebooks/Model-Descriptions.ipynb)

## Background
The Global Fishing Watch (GFW) fishing score model computes the
probability that a vessel is fishing based on its AIS track data. The
combined fishing score of all vessels is used to estimate the fishing
effort worldwide as shown in Figure 1 below.

The definition of fishing is the subject of surprising amount of
debate at GFW. We define fishing as the period when a vessel has
fishing gear in the water. However, we also use a more expansive
definition of fishing related activity, which is the time that a
vessel spends away from shore in which it is not transiting to and
from the fishing grounds. For trawlers and longliners, these two
definitions give similar results, but the same is not true for purse
seiners they can be quite different, since the time they spend with
gear in the water is small relative to the time spent pursuing fish.

![Effort]({{ site.url }}{{site.baseurl}}/images/AllFishing.png) 
Figure 1: Fishing effort in 2015

An example of an AIS vessel track is shown in Figure 2 below, with the
points where the vessel is fishing are shown in red. The job of the
fishing score model is to estimate the probability that a vessel is
fishing at each of the points along the AIS track. The fishing score
at a given point is computed using a model based on three primary
features: a vessel’s average speed, the amount of variation in the
vessel’s speed, and the amount of variation in the vessel’s course.
The “variation” in speed and course is technically the standard
deviation, and we shall refer to these features as the speed deviation
and course deviation. In addition, points within 10 km of shore are
uniformly considered non-fishing. Ordinary vessel behaviour near shore
is easily confused with fishing and using this 10 km cutoff avoids a
large number of false positive fishing values.

![AIS example]({{ site.url }}{{site.baseurl}}/images/AISExample.png) 
Figure 2: Example fishing vessel AIS track with fishing shown in red.

To see how this works, examine the scatter plot shown in Figure 3.
This shows how these three features, computed over a six hour window,
relate to whether a vessel is fishing. It is apparent from Figure 3,
that fishing activity tends to be be clustered in certain regions of
average-speed, speed-deviation and course-deviation.

[![Feature distribution]({{ site.url }}{{site.baseurl}}/images/FeatureDistribution.png)](https://github.com/GlobalFishingWatch/vessel-scoring/blob/master/notebooks/Documentation-Figures.ipynb)
Figure 3: Fishing activity, shown in red, is most common for speeds in
the range of 2 to 5 knots and is also associated larger deviations in
speed and course.


## The Models
We have refined and replaced our model multiple times through the
project. Below follows a summary of each model

* [Heuristic model 1.0](fishing__heuristic_1_0.md)
  * Our first model was a heuristic model based on the intuition of Figure 3 above.

* [Logistic regresssion model 1.1](fishing__logistic_1_1.html)
  * A logistic regression model using the same features as the
    heuristic model, and trained using a hand labeled dataset.

# External links
* [Introduction to precision and recall (Wikipedia)](https://en.wikipedia.org/wiki/Precision_and_recall)
