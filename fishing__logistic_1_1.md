---
layout: default
---

# Logistic regression model 1.1

* [Source code for the algorithm](https://github.com/GlobalFishingWatch/vessel-scoring)
* [Training data for the algorithm](anonymized.html)
* [Jupyter notebook describing the model in depth](https://github.com/GlobalFishingWatch/vessel-scoring/blob/master/notebooks/Model-Descriptions.ipynb)
* [Introduction to precision and recall (Wikipedia)](https://en.wikipedia.org/wiki/Precision_and_recall)

We use a logistic regression model to predict the likelihood that a
vessel is fishing based on its average-speed, speed-deviation and
course-deviation. In addition to the six hour window discussed above,
these features were computed over one-half, one, three, twelve and
twenty-four hour windows. Using multiple windows increases the overall
accuracy of the model at a modest cost in computational resources.

We also use feature augmentation to increase the expressiveness of the
model. Logistic regression essentially divides the space defined by
its features in half, with one half being classified as fishing.
However, dividing the space shown in Figure 2 in half would not split
the fishing and non-fishing regions apart very effectively. To
overcome this we add powers of the base features. So in addition to
the average speed, we also include the square of the average speed, as
well as the cube all the way up to the sixth power. This gives the
logistic regression model the ability to fit curved regions in the
above space and thus identify fishing more accurately.

The model is trained using data that has been hand labeled as fishing
or non-fishing by Kristina Boerder at Dalhousie University.
Three-quarters of the data is used for training while the remaining
quarter is used for validating the model. In addition to the data from
Dalhousie, crowdsourced data is used for additional model validation.
As seen in Table 1 below, the model performs well for longliners and
trawlers, but relatively poorly on purse seine vessels.

<table><tbody><tr><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="2" rowspan="1"><p><span>Dalhousie </span></p></td><td colspan="2" rowspan="1"><p><span>SkyTruth</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="1" rowspan="1"><p><span>False Positives / Predicted Fishing</span></p></td><td colspan="1" rowspan="1"><p><span>Percent &nbsp;Fishing Captured</span></p></td><td colspan="1" rowspan="1"><p><span>False Positives / Predicted Fishing</span></p></td><td colspan="1" rowspan="1"><p><span>&nbsp;Percent Fishing Captured</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Longliner</span></p></td><td colspan="1" rowspan="1"><p><span>3%</span></p></td><td colspan="1" rowspan="1"><p><span>78%</span></p></td><td colspan="1" rowspan="1"><p><span>18%</span></p></td><td colspan="1" rowspan="1"><p><span>73%</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Trawler</span></p></td><td colspan="1" rowspan="1"><p><span>7%</span></p></td><td colspan="1" rowspan="1"><p><span>91%</span></p></td><td colspan="1" rowspan="1"><p><span>18%</span></p></td><td colspan="1" rowspan="1"><p><span>90%</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Purse Seine</span></p></td><td colspan="1" rowspan="1"><p><span>89%</span></p></td><td colspan="1" rowspan="1"><p><span>73%</span></p></td><td colspan="1" rowspan="1"><p><span>29%</span></p></td><td colspan="1" rowspan="1"><p><span>56%</span></p></td></tr></tbody></table>
Table 1: Comparison between SkyTruths model and Dalhousies

The large number of false positives for purse seiners as well as the
differences between Dalhousie and SkyTruth for this gear type call for
further discussion. There are three factors at work here: the first is
that purse seiners only spend only a small amount of their total time
(about 4% in our training data) at sea with their gear in the water.
The false positive rate for purse seiners, that is the fraction of
non-fishing points classified as fishing is 22%, but because of small
number of fishing points, this translates to 89% of the points
classified as fishing actually being non-fishing. Second, we are
currently using a single model for all three gear types. Switching to
a model for each gear type, decreases the fraction of falsely
classified fishing points to about 75% and the false positive rate to
10%. Finally, in part because the small fraction of time spent with
gear in the water, it is simply more difficult to accurately model
purse seine vessels. We are in the process of developing more
sophisticated models that we hope will allow more accurate
classification for purse seiners.

### VERSION II

Table 1, below, shows how the model performs on various gear types.
The first column shows what fraction of the test data points that the
model classifies as fishing are actually fishing (precision), the
second columns shows what fraction of the total fishing present the
model correctly classifies as fishing (recall) and the third column
shows the fraction of the non-fishing points incorrectly classified as
fishing (false positive rate). The table shows that the model does
well predicting fishing for longliners and trawlers, with high
precision and recall and low false positive rates. However, the model
performs poorly on purse seiners, as indicated by the the very low
precision.

<table><tbody><tr><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="1" rowspan="1"><p><span>Predicted fishing classified correctly (precision) </span></p></td><td colspan="1" rowspan="1"><p><span>Fishing captured</span></p><p><span>(recall)</span></p></td><td colspan="1" rowspan="1"><p><span>Non-fishing classified as fishing (false positive rate)</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Longliner</span></p></td><td colspan="1" rowspan="1"><p><span>97%</span></p></td><td colspan="1" rowspan="1"><p><span>78%</span></p></td><td colspan="1" rowspan="1"><p><span>9%</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Trawler</span></p></td><td colspan="1" rowspan="1"><p><span>93%</span></p></td><td colspan="1" rowspan="1"><p><span>91%</span></p></td><td colspan="1" rowspan="1"><p><span>10%</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Purse Seine</span></p></td><td colspan="1" rowspan="1"><p><span>11%</span></p></td><td colspan="1" rowspan="1"><p><span>73%</span></p></td><td colspan="1" rowspan="1"><p><span>22%</span></p></td></tr></tbody></table>
Table 2:precision, recall and false positive rate for various gear types.

The low precision for purse seiners is a result of two factors. The
first is simply that fishing for purse seiners is difficult to model
and capture based on AIS tracks. Purse seiners spend only a small
amount of time with their gear in the water, which makes detecting
fishing events more difficult and results in the lower recall and
higher false positive rate shown in the table. The second factor is
that the small amount of actual fishing means that even a small
percentage of non-fishing classified as fishing can overwhelm the true
fishing, hence the low precision. In addition, we are currently using
a single model for all three gear types, which limits the accuracy on
any given gear type. Based on early experiments, we expect the
precision for purse seiners to roughly double and the false positive
rate to halve when we move to one model per gear type.


## Training Data

The training data from Dalhousie consists of hand-classified AIS data
for 29 unique vessels with complete tracks classified as fishing (gear
in the water) or non-fishing over long periods. These vessels are
divided between the different gear types as shown in the table below.
There are also a larger number vessels classified in-house at
SkyTruth, where shorter track segments are classified for each vessel.

In addition, data from two vessels performing slow transits is added
to the training data to help the model learn to avoid classifying
these transits as fishing.

<table><tbody><tr><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="2" rowspan="1"><p><span>Dalhousie </span></p></td><td colspan="2" rowspan="1"><p><span>Crowdsourced</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="1" rowspan="1"><p><span>Vessels</span></p></td><td colspan="1" rowspan="1"><p><span>Points</span></p></td><td colspan="1" rowspan="1"><p><span>Vessels</span></p></td><td colspan="1" rowspan="1"><p><span>Points</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Longliner</span></p></td><td colspan="1" rowspan="1"><p><span>16</span></p></td><td colspan="1" rowspan="1"><p><span>569,504</span></p></td><td colspan="1" rowspan="1"><p><span>131</span></p></td><td colspan="1" rowspan="1"><p><span>653921</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Trawler</span></p></td><td colspan="1" rowspan="1"><p><span>6</span></p></td><td colspan="1" rowspan="1"><p><span>828,162</span></p></td><td colspan="1" rowspan="1"><p><span>35</span></p></td><td colspan="1" rowspan="1"><p><span>299932</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Purse Seine</span></p></td><td colspan="1" rowspan="1"><p><span>7</span></p></td><td colspan="1" rowspan="1"><p><span>398,897</span></p></td><td colspan="1" rowspan="1"><p><span>12</span></p></td><td colspan="1" rowspan="1"><p><span>83685</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span>Slow Transits</span></p></td><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="1" rowspan="1"><p><span></span></p></td><td colspan="1" rowspan="1"><p><span>2</span></p></td><td colspan="1" rowspan="1"><p><span>4,430</span></p></td></tr></tbody></table>
Table 3: Number of vessels and AIS points available for model training and validation.

The vessels for each class are divided between the training and test
sets so that roughly three-quarters of the points from each class are
in the training set, with the remainder in the test set for that
class. Fifteen thousand points are randomly sampled from the training
points for each class. The training data for each class along with
with the slow transit data is combined to create a training set of
49,430 points. Five thousand randomly selected vessels from the test
set for each vessel are used for testing.
