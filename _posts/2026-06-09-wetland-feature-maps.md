---
title: 'Wetland Feature Maps'
date: 2026-06-09
permalink: /posts/2026/06/wetland-feature-maps/
tags:
  - wetlands
  - deep learning
  - remote sensing
---

### Background

In my PhD, I did a lot of wetland mapping with the Wetland Intrisic Potentail (WIP) tool. This tool was a pixel-based appraoch meaning that every pixel was modeled using points that extracted feature information at that location. For example a digital elevation model (DEM) would be used to calculate slope and then a point location would extract that slope value for that pixel (or groups of pixels with some sampling interpolation). With a bunch of features, especially those calculated at different length scales [See the paper here for details](https://hess.copernicus.org/articles/27/3687/2023/), we could confidently map wetlands using a random forest algorithm and produce a continous probability.

<figure>
  <img src="/files/Hoh_WIP_zoom.jpg" alt="Wetland intrinsic potential mapping">
  <figcaption>Wetland intrinsic potential mapping.</figcaption>
</figure>

But one thing that these pixel based approaches find difficult it segmenting groups of pixels into objects. In wetland terms, a group of high wetland probability pixels could be grouped into one "wetland". There are pros/cons to this. Wetlands rarely have sharp boundaries, but often wetland delineators need to establish boundaries for regulations. Segmentation also known as object-based image analysis, can happen before the modeling such as segmenting groups of pixels and then taking a mean of the pixel feature values or other metric to be fed into the model. It can also happen after, which in the WIPs case we could smooth pixel values to remove spottyness and gaps and then create groups above certain thresholds. 

However, deep learning alogorithms are able to complete image segementation without these pre/post processing steps. These algorithms like convolutional neural networks search images for features then group pixels together based on those features giving each pixel a label and a probability. For wetland mapping this was very interesting since we could tackle the problem of the segementation with the algorithm. 

But what are these deep learnign features? In the WIP random forest model, we calculated several of our own features at multiple length scales to capture the spatial variability that might correspond to wetland presence. In convolutional neural networks such as the U-Net, features are captured with convolutions and resampling down to multiple levels of resolution. The features are similar to hot-spots of variation in an image but corresponding to all bands. They might not look anything like the engineered features from terrain that we calculated from WIP. 

So that brings me to this attempt to visualize those featuers as they are built in the deep learning model. 

### The input data 
We'll use is a 256m x 256m image stack that contains multiple bands of information to train on for predicting wetland classes. In total there are 19 predictors: 

| Band # | Band Name | Category | Description |
|--------|-----------|----------|-------------|
| 1 | DEM | Terrain | Digital elevation model; bare-earth surface height (m) from LiDAR, the base layer for all derived terrain metrics. |
| 2 | slope_local | Terrain | Local slope gradient (degrees or %) from the DEM; steepness control on drainage and water retention. |
| 3 | Geomorph_local | Landform (one-hot → 10 channels) | Categorical geomorphon landform class (e.g., flat, slope, valley, depression), expanded to 10 binary channels for the model. |
| 4 | flowacc | Terrain | Flow accumulation; upslope contributing area per cell, indicating water convergence and potential wetness. |
| 5 | twi | Terrain | Topographic wetness index; combines slope and contributing area to estimate soil moisture potential. |
| 6 | CHM | Canopy height | Canopy height model (m); vegetation height from LiDAR (DSM minus DEM). |
| 7 | r | NAIP leaf-on | Red reflectance, leaf-on NAIP imagery (growing season). |
| 8 | g | NAIP leaf-on | Green reflectance, leaf-on NAIP imagery. |
| 9 | b | NAIP leaf-on | Blue reflectance, leaf-on NAIP imagery. |
| 10 | nir | NAIP leaf-on | Near-infrared reflectance, leaf-on NAIP; sensitive to vegetation vigor and water. |
| 11 | r_lo | NAIP leaf-off | Red reflectance, leaf-off NAIP imagery (dormant season; reveals ground/understory). |
| 12 | g_lo | NAIP leaf-off | Green reflectance, leaf-off NAIP imagery. |
| 13 | b_lo | NAIP leaf-off | Blue reflectance, leaf-off NAIP imagery. |
| 14 | nir_lo | NAIP leaf-off | Near-infrared reflectance, leaf-off NAIP; useful for detecting standing water and saturated soils. |
| 15 | pct_below_1m | Veg structure | Proportion of LiDAR returns below 1 m; ground/low-vegetation cover fraction. |
| 16 | pct_1m_to_5m | Veg structure | Proportion of LiDAR returns between 1–5 m; shrub/midstory layer density. |
| 17 | pct_above_5m | Veg structure | Proportion of LiDAR returns above 5 m; overstory canopy density. |
| 18 | MOD_CLASS | Label | Target wetland class label used for supervised training (not a model input). |

And here are some images of what the patch looks like with some of those bands

<figure>
  <img src="/files/patchSatellite.png" alt="">
  <figcaption>Satellite imagery of the patch location</figcaption>
  <img src="/files/patchDEM.png" alt="">
  <figcaption>Digital Elevation Model (DEM) of the patch </figcaption>
  <img src="/files/patchCHM.png" alt="">
  <figcaption>Canopy Height Model (CHM) of the patch </figcaption>
  <img src="/files/patchTWI.png" alt="">
  <figcaption>Topographic Wetness Index of the patch </figcaption>
</figure>

### The deep learning model architecture

We are using a convolutional neural network architecture called a U-Net [originally used for medical images](https://arxiv.org/abs/1505.04597) it has been adapted to other areas included geospatial. Specifically, we are using [U-Net3+](https://arxiv.org/abs/2004.08790) which aims to take advantage of all scales used in the regular U-Net 

<figure>
  <img src="/files/unet3plus.png" alt="">
  <figcaption>The U-Net compared to its further developments (from the original U-Net3+ paper by Huang et al,. 2020)</figcaption>
</figure>

The U-Net architecture has three main components: Encoders, Decoders, and a Bottleneck. Input images from a training dataset enter the model pipeline at the encoder. Encoders are where convolutions take place and the feature maps are created. The convolutions are usually 3x3 kernels that down-sample the resolution (e.g. 256x256 to 128x128). In our U-Net the first encoder starts with 64 convolutions creating 64 feature maps. A ReLU activation function then finds the features based on a threshold (usually 0 since everything is normalized) and a max pooling filter then moves across all of these activated feature maps to downsample (usually by 1/2, e.g. 256x256 -> 128x128) and produce a single feature map that moves to the next encoder. The next encoder doubles to 128 convolutions and then 128 features, which similarly go through ReLU activation max pooling. At each encoder level, the input image gets downsampled until it reaches the bottleneck where the lowest resolution but highest number of feature maps reside. 

### Into the encoders
So once we put our 256m x 256m input image with 19 bands shown above into the encoder, the convolutions and ReLU start to create feature maps. There are tons of these feature maps 64+128+256+512 = 960 total just from the encoders! Because that's so many, I've taken the highest variance feature maps and show them below.

<figure>
  <img src="/files/encoder_top_level.png" alt="">
  <figcaption>Encoder images from the U-Net. Top level variance feature maps were pulled</figcaption>
</figure>

First think I notice as we get down the encoders the resolution gets coarser. But at the same time, the features go from seemingly random patterns to more recognizeable ones from the first image. The road definitely sticks out and same with the forest patch below.

### Into the bottlneck 
At the bottleneck we see the coarsest resolution feature maps and those patterns from late in the encoder stage are really highlighted. Again this is only a sample of the bottleneck images except for the last image which is a mean of all the channels (1024!). You can definitely see the road and forest stick out and there seems to be some light hot spots in the middle-right and middle-top

<figure>
  <img src="/files/bottleneck_features.png" alt="">
  <figcaption>Bottleneck images from the U-Net. Top level variance feature maps were pulled and a mean of all features is shown on the right</figcaption>
</figure>



### Out of the bottleneck and into the decoders

Now the decoders take what was in the bottleneck and start the upsampling process, going from coarse resolution to fine resolution using convolutions and interpolation. 

<figure>
  <img src="/files/decoder_top_level.png" alt="">
  <figcaption>Decoder images from the U-Net. Top level variance feature maps were pulled</figcaption>
</figure>

But instead of just upsampling, the decoder also concatonates features from the same resolution encoder levels. In the original U-Net these were simple skip connections that worked across one level of encoder-decoder. But in U-Net3+ the information from each encoder is shared to each decoder through resampling to a shared resolution.

<figure>
  <img src="/files/decoder_encoder_bottleneck.png" alt="">
  <figcaption>Top level variance from the encoder and decoder which get concatonated. In total there would be 320 channels instead of just two each</figcaption>
</figure>


At the final decoder level a final 1x1 convolution condenses the channels down to 1 at the native resolution. The values for each pixel are called a logit and softmax function then converts these logits into 0-1 probabilities. The top probability value corresponds to the final predicted class

<figure>
  <img src="/files/patch_class_prediction.png" alt="">
  <img src="/files/patch_class_probs.png" alt="">
  <figcaption>final prediction probabilities and classification</figcaption>
</figure>



Visualizing the feature maps learned by a deep learning model for wetland mapping. The interactive notebook is embedded below.

<iframe src="/files/wetland_feature_maps.html" width="100%" height="800" frameborder="0" style="border:0" allowfullscreen></iframe>

[Open the full notebook in a new tab](/files/wetland_feature_maps.html)
