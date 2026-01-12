---
title: 'Welcome to My Blog'
date: 2026-01-11
permalink: /posts/2026/01/Finding-NY-BC/
tags:
  - Backcountry Skiing
  - Google Earth Engine
---

I knew there were going to be limits for backcountry skiing in my first winter back to NY since finishing my PhD in Washington State. Ithaca, NY definitely has winter snow and there is plenty of cross-country skiing or even downhill skiing at Greek Peak. But finding areas for ski touring is difficult since there isn't a consistent snow pack. There aren't really mountains in Central NY and much of the area is privately owned. Even more, you can't just expect to go to any wooded hill and find areas to ski down. The dominantly deciduous forests here are often thick and crowded compared to the western U.S. conifers and I've found they contain much more downed-woody-debris that would require a couple feet at least to cover.

So I settled on 3 criteria a given place would need in order to have potential for ski touring with a healthy amount of snow:

1.  Steep-ish slopes probably over 20^o^
2.  Not too much forest cover so there are potential gaps to ski through
3.  Probably above 1000ft elevation to gain some additional snowfall

There are plenty of mapping products and apps that can provide the means to sift through areas that can meet these criteria such as CalTopo, Gaia, OnX, or even Strava. But for such a narrow task I decided to try building a screening tool using Google Earth Engine (GEE).

GEE lets academics have access to their tools and datasets and I use it for work quite frequently to download and process satellite imagery. For data I decided to use:

-   NASADEM: NASA 30m Digital Elevation Model - Provides elevation
-   USFS TreeMap v2020 - Provides canopy cover as a %

We can calculate slope from the NASADEM and use it with the Tree Canopy Cover and NASADEM elevation to set up our screening tool. I went a bit further with the help of Claude AI to create the application code that allows users to toggle the values for the different criteria.

[A link to the code is here](https://code.earthengine.google.com/752156a77e972cf2b0d66d4b5b7bb22a) but unfortunately you need to be a GEE user to run it. However, [you can view the application at this link here](https://ajstewart04.users.earthengine.app/view/nys-slps) or if the iframe html works down below

<iframe src="https://ajstewart04.users.earthengine.app/view/nys-slps" width="800" height="600" frameborder="0" style="border:0" allowfullscreen>

</iframe>
