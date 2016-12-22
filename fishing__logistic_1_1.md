---
layout: default
---

<style>
table, th, td {
   border: 1px solid black;
   border-collapse: collapse;
   
}
</style>

# Logistic regression model 1.1

## Overview

* [Source code for the algorithm](https://github.com/GlobalFishingWatch/vessel-scoring)
* [Training data for the algorithm](anonymized.html)
* [Jupyter notebook describing the model in depth](https://github.com/GlobalFishingWatch/vessel-scoring/blob/master/notebooks/Model-Descriptions.ipynb)
* [Introduction to precision and recall (Wikipedia)](https://en.wikipedia.org/wiki/Precision_and_recall)

The GFW fishing score is computed using a logistic model with features based
on AIS data. The base features are mean speed, standard deviation of the speed
and standard deviation of course computed over 0.5, 1, 3, 6, 12 and 24 hour
windows.  This model is referred to as the multi-window model to distinguish
it from the previous heuristic and generic models and future models that have
yet to be deployed. Please see the Model-Descriptions notebook for a
discussion of previous and upcoming models.

The model is trained using data that has been hand labeled as fishing or non-fishing 
by Kristina Boerder at Dalhousie University. Three-quarters of the
data is used for training while the remaining quarter is used for validating
the model. In addition to the data from Dalhousie, crowdsourced data for
longliners is used for additional model validation. As seen in the table
below, the model performs well for longliners and trawlers, but poorly on
purse seine vessels.


|               |  Dalhousie<br/>Precison  | Dalhousie<br/>Recall    | Crowd Sourced<br/>Precision       | Crowd Sourced<br/>Recall          |
|---------------|-----------|-----------|---------------|---------------|
| Longliner     | 0.97      | 0.78      | 0.93          | 0.71          |
| Trawler       | 0.93      | 0.91      |               |               |
| Purse Seine   | 0.11      | 0.73      |               |               |

<br/>

The output of the model is the predicted probability that a vessel is fishing
at a given AIS point. The above table uses a probability of 0.5 as a threshold
to consider a point as fishing. However, other threshold values can be chosen,
with higher thresholds generally resulting in higher precision and lower
recall, and vice-versa. 

## Model Details

The features used in the model are based on the speed over ground (SOG) and course over ground (COG) fields of AIS track data. From these, the so-called measure-speed and measure-course are calculated:

    Sm = 1.0 - min(1, SOG / 17)
    Cm = COG / 360

The name and form of these features relates to their use in the original heuristic model. Note however that for the purposes of the logistic model, measure-speed is equivalent to SOG capped at 17 knots and measure-course is equivalent to COG. The mean of Sm and the standard deviation of both Sm and Cm are calculated over 0.5, 1, 3, 6, 12 and 24 hour windows. These quantities constitute the base features used by the model. However, logistic regression is a linear modelling technique and fishing likelihood depends on these base features in a nonlinear manner. For example, fishing is most likely at some low vessel speed, and less likely at both higher and lower speeds. This behaviour cannot be captured with a linear dependence on speed. To address this type of issue, the base features are augmented by adding powers of the base features up to 6, giving the model the ability to capture some nonlinear behaviour. For example, the final features used by the model for the mean measure-speed are: 

    Sm, Sm^2, Sm^3, Sm^4, Sm^5, Sm^6

The other two base features are similarly augmented.

An SKLearn LogisticRegression model is then trained using these features in the standard manner.


## Data Details

The training data from Dalhousie consists of hand-classified AIS data for 29 unique vessels with complete tracks classified over long periods. These vessels are divided between the different gear types as shown in the table below. There are also 118 longliner vessels with crowdsourced classification, where shorter track segments are classified for each vessel. 

In addition, data from two vessels performing slow transits is added to the training data to help the model learn to avoid classifying these transits as fishing.

|               |  Dalhousie<br/>Vessels  | Dalhousie<br/>Points    | Crowd Sourced<br/>Vessels       | Crowd Sourced<br/>Points        |
|---------------|-----------|-----------|---------------|---------------|
| Longliner     | 16        | 569,504   | 118           | 324,166       |
| Trawler       | 6         | 828,162   |               |               |
| Purse Seine   | 7         | 398,897   |               |               |
| Slow Transits |           |           | 2             | 9,038         |

<br/>

The vessels for each class are divided between the training and test sets so
that roughly three-quarters of the points from each class are in the training
set, with the remainder in the test set for that class. Fifteen thousand
points are randomly sampled from the training points for each class. The
training data for each class along with with a subset of the slow transit data
is combined to create a training set of 51,514 points. Five thousand randomly
selected vessels from the test set for each vessel are used for testing.
