---
layout: default
redirect_to: 
 - http://globalfishingwatch.org/datasets-and-code/
---

# Processing architecture

We start with raw AIS data. This data contains both positional and
indentity information for vessels. However, as it is voluntarily
transmitted by the vessels, information might both be missing and
incorrect.

## Vessel identification

We try to match the MMSI (station identity in AIS) with vessel
identities in fishing registries. When that fails, we manually classify
vessel and gear type information based on online sources as well as
ship tracks. This information is used to train a neural net model to
predict vessel and gear type from movement patterns. We maintain lists
of known fishing vessels and likely fishing vessels.

## Fishing estimation

Given the vessel and gear type from the step above, and the shape of
the track, we estimate where fishing is happening using a regression
model trained on a hand-labeled dataset of tracks.

## Visualization

We visualize the tracks with their fishing detections by generating a
tileset - a pyramid of temporal and spatial tiles, each containing
individual events, or cluster points representing multiple events
(when you zoom out). This tileset is then rendered by a WebGL-based
web client as both a heatmap and as individual tracks.

<object type="image/svg+xml" data="{{ site.url }}{{site.baseurl}}/images/Architecture-overview.svg">Architecture overview image</object>

