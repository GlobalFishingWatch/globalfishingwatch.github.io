---
layout: default
---

# Heuristic Model

* [Source code for the algorithm](https://github.com/GlobalFishingWatch/vessel-scoring)
* [Test data for the model](anonymized.html)
* [Jupyter notebook describing the model in depth](https://github.com/GlobalFishingWatch/vessel-scoring/blob/master/notebooks/Model-Descriptions.ipynb)
* [Introduction to precision and recall (Wikipedia)](https://en.wikipedia.org/wiki/Precision_and_recall)

The first model developed is referred to as the *heuristic model* and
was derived by observing that there were correlations between fishing
behaviour and several of the values present in AIS messages. In
particular, the likelihood that a vessel was fishing tends to increase
with the standard deviation of the speed and course, but to decrease
with mean speed. These features, calculated over a one hour window,
were used to develop the *heursitic model*

The heuristic model performs reasonably well trawlers and
longliners, but poorly for purse seiners.

