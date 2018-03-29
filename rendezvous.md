---
layout: default
---

# Rendezvous

Rendezvous were identified from AIS data as locations where two vessels were
continuously within 500 meters for at least 2 hours, while at least 10 km from
a coastal [anchorage](anchorages.html). These parameters balance the need to
detect vessel pairs in close proximity for extended periods of time while
recognizing that incomplete satellite coverage and inconsistent AIS transmission
rates may limit our ability to identify long periods in which vessels are in
immediate contact. We exclude rendezvous that occur in port or commonly used
anchorages, because 1) transshipment at port is generally better regulated
than at sea and 2) it would be challenging to determine if vessels were
rendezvousing at a commonly used anchorage, or if they were just both using
the same anchorage.

# Likely Transhipments

The [transshipments dataset](transshipment.html) and the
[Global Fishing Watch map](http://globalfishingwatch.org/map/) 
encounters layer use the subset of rendezvous where one of the
vessels is identified a fish carrier and the other as
a fishing vessel. We refer to these rendezvous as likely 
transhipments.

## Fish Carriers

A database of refrigerated cargo vessels capable of receiving catch was
compiled using three complementary methods. First, vessels classified as
"refrigerated cargo" vessels, "fish carriers," and "fish tender" vessels--
vessels we collectively refer to as "transshipment vessels"--were identified
using lists from the International Telecommunications Union and major Regional
Fisheries Management Organizations (RFMOs). Second, if we found a vessel
participated in multiple encounters with fishing vessels, we conducted a web
search and reviewed RFMO registries using information from the vessel's AIS to
determine if the vessel was a transshipment vessel. Finally, we used a
convolutional neural network, which  predicts vessel class from vessel
movement patterns (network described in Kroodsma et al. 2018), to identify
possible transshipment vessels. Vessels that were identified as likely
transshipment vessels by the neural network were manually validated through
web searches and RFMO registries. Vessel identities were further corroborated
via the IMO as nearly all vessels could be matched to an IMO registry number.

## Fishing Vessels

Fishing vessels were identified by combining vessels that
consistently self identify as fishing vessels with those identified as
fishing vessels by the the convolutional
neural network mentioned above. This list is available 
[HERE](https://github.com/GlobalFishingWatch/treniformis/tree/master/treniformis/_assets/GFW/FISHING_MMSI/KNOWN_AND_LIKELY).
