---
title: "Analysis of soil carbon controls across the Pacific Northwest"
author: "Anthony Stewart"
output:
  html_document:
    df_print: paged
---

<style type="text/css">
pre {
  max-height: 300px;
  overflow-y: auto;
}

h1, h3, h4 {
  text-align: center;
}
</style>







```
## 'data.frame':	481 obs. of  25 variables:
##  $ X                   : int  1 2 3 4 5 6 7 8 9 10 ...
##  $ sample_ID           : chr  "H-C-01-DNR-WET" "H-C-01-DNR-WET" "H-C-01-DNR-WET" "H-C-01-DNR-WET" ...
##  $ site                : chr  "HOH" "HOH" "HOH" "HOH" ...
##  $ depth_cm            : int  13 40 76 104 11 30 45 75 9 27 ...
##  $ helper              : chr  "H-C-01-DNR-WET|13" "H-C-01-DNR-WET|40" "H-C-01-DNR-WET|76" "H-C-01-DNR-WET|104" ...
##  $ thickness_cm        : int  13 27 36 28 11 19 15 30 9 18 ...
##  $ rock_perc           : num  0 0 5 40 0 15 40 55 0 0 ...
##  $ BD_g_cm3            : num  0.07 0.16 0.51 0.88 0.38 0.49 0.7 0.57 0.72 0.95 ...
##  $ field_texture       : chr  "P" "MP" "MM" "C" ...
##  $ field_texture_binned: chr  "O" "O" "O" "C" ...
##  $ redox               : chr  NA NA NA NA ...
##  $ carbon_perc         : num  39.56 38.31 12.14 2.37 15.65 ...
##  $ carbon_stock_g_cm2  : num  0.376 1.678 2.105 0.352 0.65 ...
##  $ NDYI                : num  0.543 0.543 0.543 0.543 0.579 ...
##  $ Geomorphon_Class    : int  10 10 10 10 10 10 10 10 10 10 ...
##  $ Temp                : num  10.2 10.2 10.2 10.2 10.2 ...
##  $ Precip              : num  3070 3070 3070 3070 3054 ...
##  $ NDVI                : num  0.84 0.84 0.84 0.84 0.862 ...
##  $ MNDWI               : num  -0.477 -0.477 -0.477 -0.477 -0.446 ...
##  $ EVI                 : num  0.455 0.455 0.455 0.455 0.534 ...
##  $ SCI                 : num  0.649 0.649 0.649 0.649 0.648 ...
##  $ GEOLOGIC_AGE        : chr  "Pleistocene" "Pleistocene" "Pleistocene" "Pleistocene" ...
##  $ WIP                 : num  0.873 0.873 0.873 0.873 0.896 ...
##  $ x                   : num  411350 411350 411350 411350 409931 ...
##  $ y                   : num  5295086 5295086 5295086 5295086 5294415 ...
## 'data.frame':	276 obs. of  25 variables:
##  $ X                : int  1 2 3 4 5 6 7 8 9 10 ...
##  $ sample_ID        : chr  "CC_S26_R3" "CC_S26_R3" "CC_S26_R3" "CC_S27_R3" ...
##  $ upper_depth      : int  0 30 60 0 30 60 0 30 60 0 ...
##  $ lower_depth      : int  30 60 100 30 60 100 30 60 100 30 ...
##  $ SOC_stock_spline : num  0.1636 0.0983 0.0531 0.6126 0.6936 ...
##  $ site             : chr  "COL" "COL" "COL" "COL" ...
##  $ geomorphons      : chr  "f" "f" "f" "i" ...
##  $ HLI              : num  0.849 0.849 0.849 0.502 0.502 ...
##  $ Precip           : num  629 629 629 664 664 ...
##  $ Temp             : num  6.66 6.66 6.66 6.03 6.03 ...
##  $ WIP              : num  0.209 0.209 0.209 0.127 0.127 ...
##  $ tree_canopy_cover: num  31 31 31 56 56 ...
##  $ NDVI             : num  0.537 0.537 0.537 0.739 0.739 ...
##  $ MNDWI            : num  -0.517 -0.517 -0.517 -0.554 -0.554 ...
##  $ EVI              : num  0.292 0.292 0.292 0.387 0.387 ...
##  $ SCI              : num  0.511 0.511 0.511 0.616 0.616 ...
##  $ SAVI             : num  0.29 0.29 0.29 0.383 0.383 ...
##  $ EMBI             : num  0.188 0.188 0.188 0.162 0.162 ...
##  $ DSI              : num  0.92 0.92 0.92 0.625 0.625 ...
##  $ DSWI1            : num  1.16 1.16 1.16 1.61 1.61 ...
##  $ NDYI             : num  0.226 0.226 0.226 0.36 0.36 ...
##  $ LSWI             : num  0.0556 0.0556 0.0556 0.2314 0.2314 ...
##  $ ANDWI            : num  -0.539 -0.539 -0.539 -0.643 -0.643 ...
##  $ LITHOLOGY        : chr  "continental glacial outwash, Fraser-age" "continental glacial outwash, Fraser-age" "continental glacial outwash, Fraser-age" "continental glacial outwash, Fraser-age" ...
##  $ GEOLOGIC_AGE     : chr  "Pleistocene" "Pleistocene" "Pleistocene" "Pleistocene" ...
```

Examining covariate predictors using correlation plots

<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-96-1.png" alt="plot of chunk unnamed-chunk-96"  />
<p class="caption">plot of chunk unnamed-chunk-96</p>
</div>

There is weak correlation between `SOC_stock_spline` and the selected covariates. Additionally there is some collinearity between predictors. The spectral predictors such as EVI (Enhanced Vegetation Index) and SCI (Soil Condition Index) are well correlated with each other and also with NDVI (Normalized Difference Vegetation Index). We can remove these based on the correlation coefficient > 0.7.

Now we can begin examining the distribution of carbon stock values in the dataset to choose the appropriate transformation. We also scale and center the numeric predictor variables.


```
## 'data.frame':	276 obs. of  25 variables:
##  $ X                : num [1:276, 1] -1.72 -1.71 -1.7 -1.69 -1.67 ...
##   ..- attr(*, "scaled:center")= num 138
##   ..- attr(*, "scaled:scale")= num 79.8
##  $ sample_ID        : chr  "CC_S26_R3" "CC_S26_R3" "CC_S26_R3" "CC_S27_R3" ...
##  $ upper_depth      : num [1:276, 1] -1.1849 0.0492 1.2833 -1.1849 0.0492 ...
##   ..- attr(*, "scaled:center")= num 28.8
##   ..- attr(*, "scaled:scale")= num 24.3
##  $ lower_depth      : int  30 60 100 30 60 100 30 60 100 30 ...
##  $ SOC_stock_spline : num  0.1636 0.0983 0.0531 0.6126 0.6936 ...
##  $ site             : chr  "COL" "COL" "COL" "COL" ...
##  $ geomorphons      : chr  "f" "f" "f" "i" ...
##  $ HLI              : num [1:276, 1] 1.264 1.264 1.264 -0.907 -0.907 ...
##   ..- attr(*, "scaled:center")= num 0.647
##   ..- attr(*, "scaled:scale")= num 0.16
##  $ Precip           : num [1:276, 1] -1.21 -1.21 -1.21 -1.18 -1.18 ...
##   ..- attr(*, "scaled:center")= num 1870
##   ..- attr(*, "scaled:scale")= num 1022
##  $ Temp             : num [1:276, 1] -1.09 -1.09 -1.09 -1.48 -1.48 ...
##   ..- attr(*, "scaled:center")= num 8.42
##   ..- attr(*, "scaled:scale")= num 1.62
##  $ WIP              : num [1:276, 1] -0.801 -0.801 -0.801 -1.08 -1.08 ...
##   ..- attr(*, "scaled:center")= num 0.443
##   ..- attr(*, "scaled:scale")= num 0.292
##  $ tree_canopy_cover: num [1:276, 1] -2.25 -2.25 -2.25 -0.264 -0.264 ...
##   ..- attr(*, "scaled:center")= num 59.3
##   ..- attr(*, "scaled:scale")= num 12.6
##  $ NDVI             : num [1:276, 1] -3.5 -3.5 -3.5 -1.1 -1.1 ...
##   ..- attr(*, "scaled:center")= num 0.832
##   ..- attr(*, "scaled:scale")= num 0.0843
##  $ MNDWI            : num [1:276, 1] -0.324 -0.324 -0.324 -1.105 -1.105 ...
##   ..- attr(*, "scaled:center")= num -0.502
##   ..- attr(*, "scaled:scale")= num 0.0475
##  $ EVI              : num [1:276, 1] -1.932 -1.932 -1.932 -0.953 -0.953 ...
##   ..- attr(*, "scaled:center")= num 0.48
##   ..- attr(*, "scaled:scale")= num 0.0972
##  $ SCI              : num [1:276, 1] -2.81 -2.81 -2.81 -0.8 -0.8 ...
##   ..- attr(*, "scaled:center")= num 0.658
##   ..- attr(*, "scaled:scale")= num 0.0526
##  $ SAVI             : num [1:276, 1] -2.17 -2.17 -2.17 -1.02 -1.02 ...
##   ..- attr(*, "scaled:center")= num 0.466
##   ..- attr(*, "scaled:scale")= num 0.0811
##  $ EMBI             : num [1:276, 1] 1.52 1.52 1.52 1.3 1.3 ...
##   ..- attr(*, "scaled:center")= num 0.00762
##   ..- attr(*, "scaled:scale")= num 0.119
##  $ DSI              : num [1:276, 1] 3.03 3.03 3.03 1.2 1.2 ...
##   ..- attr(*, "scaled:center")= num 0.432
##   ..- attr(*, "scaled:scale")= num 0.161
##  $ DSWI1            : num [1:276, 1] -1.99 -1.99 -1.99 -1.36 -1.36 ...
##   ..- attr(*, "scaled:center")= num 2.58
##   ..- attr(*, "scaled:scale")= num 0.714
##  $ NDYI             : num [1:276, 1] -2.215 -2.215 -2.215 -0.683 -0.683 ...
##   ..- attr(*, "scaled:center")= num 0.419
##   ..- attr(*, "scaled:scale")= num 0.0874
##  $ LSWI             : num [1:276, 1] -2.61 -2.61 -2.61 -1.33 -1.33 ...
##   ..- attr(*, "scaled:center")= num 0.413
##   ..- attr(*, "scaled:scale")= num 0.137
##  $ ANDWI            : num [1:276, 1] 2.92 2.92 2.92 1.08 1.08 ...
##   ..- attr(*, "scaled:center")= num -0.703
##   ..- attr(*, "scaled:scale")= num 0.0564
##  $ LITHOLOGY        : chr  "continental glacial outwash, Fraser-age" "continental glacial outwash, Fraser-age" "continental glacial outwash, Fraser-age" "continental glacial outwash, Fraser-age" ...
##  $ GEOLOGIC_AGE     : chr  "Pleistocene" "Pleistocene" "Pleistocene" "Pleistocene" ...
```

<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-97-1.png" alt="plot of chunk unnamed-chunk-97"  /><img src="All_WA_SOC_shared_spline//unnamed-chunk-97-2.png" alt="plot of chunk unnamed-chunk-97"  />
<p class="caption">plot of chunk unnamed-chunk-97</p>
</div>

### Explicit parameter model building 


Now build models using log transformed carbon stock data. We need to specify that `sample_ID` is a random effect because of the multiple samples at one location. `depth` can be a random slope to adjust model based on how it is affected by depth. We could use a Generalized Linear Model or a Generalized Linear Mixed Model here too but they often fail to converge. I am starting with the log-transformed linear mixed model first to test the hypotheses


```r
# Full model with hypothesized parameters
mod1 <- lmer(log10(SOC_stock_spline) ~ WIP * Precip * Temp *
    ANDWI * NDYI + (GEOLOGIC_AGE) + lower_depth + (lower_depth ||
    sample_ID), data = wa_spl_dat_scale, REML = F)
# No interactions
mod2 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    ANDWI + NDYI + (GEOLOGIC_AGE) + lower_depth + (lower_depth ||
    sample_ID), data = wa_spl_dat_scale, REML = F)
# No spectral
mod3 <- lmer(log10(SOC_stock_spline) ~ WIP * Precip * Temp +
    (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
# No geology
mod4 <- lmer(log10(SOC_stock_spline) ~ WIP * Precip * Temp +
    ANDWI + NDYI + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
# No WIP w/ interaction
mod5 <- lmer(log10(SOC_stock_spline) ~ Precip * Temp + ANDWI +
    NDYI + (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 1.5562 (tol = 0.002, component
## 1)
# No WIP w/o interaction
mod6 <- lmer(log10(SOC_stock_spline) ~ Precip + Temp + ANDWI +
    NDYI + (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
# No climate
mod7 <- lmer(log10(SOC_stock_spline) ~ WIP + +ANDWI + NDYI +
    (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
# No climate No spectral
mod8 <- lmer(log10(SOC_stock_spline) ~ WIP + (GEOLOGIC_AGE) +
    lower_depth + (lower_depth || sample_ID), data = wa_spl_dat_scale,
    REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.0035401 (tol = 0.002,
## component 1)
# Just WIP
mod9 <- lmer(log10(SOC_stock_spline) ~ WIP + lower_depth + (lower_depth ||
    sample_ID), data = wa_spl_dat_scale, REML = F)
# NULL
mod10 <- lmer(log10(SOC_stock_spline) ~ lower_depth + (lower_depth ||
    sample_ID), data = wa_spl_dat_scale, REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.431569 (tol = 0.002, component
## 1)
```

Pairwise comparisons between the top, global model and the rest. Note the table contains mod1 multiple times and has been encoded with an additional number 

<table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;"> Models </th>
   <th style="text-align:right;"> npar </th>
   <th style="text-align:right;"> AIC </th>
   <th style="text-align:right;"> BIC </th>
   <th style="text-align:right;"> logLik </th>
   <th style="text-align:right;"> deviance </th>
   <th style="text-align:right;"> Chisq </th>
   <th style="text-align:right;"> Df </th>
   <th style="text-align:right;"> Pr(&gt;Chisq) </th>
   <th style="text-align:left;"> Significant </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 36.52080 </td>
   <td style="text-align:right;"> 26 </td>
   <td style="text-align:right;"> 0.0824988 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod3 </td>
   <td style="text-align:right;"> 17 </td>
   <td style="text-align:right;"> 223.7913 </td>
   <td style="text-align:right;"> 285.3381 </td>
   <td style="text-align:right;"> -94.89564 </td>
   <td style="text-align:right;"> 189.7913 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 35.88615 </td>
   <td style="text-align:right;"> 24 </td>
   <td style="text-align:right;"> 0.0562988 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod4 </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> 227.0389 </td>
   <td style="text-align:right;"> 277.7245 </td>
   <td style="text-align:right;"> -99.51945 </td>
   <td style="text-align:right;"> 199.0389 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 45.13377 </td>
   <td style="text-align:right;"> 27 </td>
   <td style="text-align:right;"> 0.0157401 </td>
   <td style="text-align:left;"> * </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod5 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 229.4435 </td>
   <td style="text-align:right;"> 283.7495 </td>
   <td style="text-align:right;"> -99.72175 </td>
   <td style="text-align:right;"> 199.4435 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 45.53837 </td>
   <td style="text-align:right;"> 26 </td>
   <td style="text-align:right;"> 0.0102674 </td>
   <td style="text-align:left;"> * </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod6 </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> 229.4083 </td>
   <td style="text-align:right;"> 280.0939 </td>
   <td style="text-align:right;"> -100.70415 </td>
   <td style="text-align:right;"> 201.4083 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 47.50318 </td>
   <td style="text-align:right;"> 27 </td>
   <td style="text-align:right;"> 0.0087196 </td>
   <td style="text-align:left;"> ** </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod7 </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> 230.4420 </td>
   <td style="text-align:right;"> 277.5072 </td>
   <td style="text-align:right;"> -102.22099 </td>
   <td style="text-align:right;"> 204.4420 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 50.53685 </td>
   <td style="text-align:right;"> 28 </td>
   <td style="text-align:right;"> 0.0056307 </td>
   <td style="text-align:left;"> ** </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod8 </td>
   <td style="text-align:right;"> 11 </td>
   <td style="text-align:right;"> 247.7352 </td>
   <td style="text-align:right;"> 287.5596 </td>
   <td style="text-align:right;"> -112.86760 </td>
   <td style="text-align:right;"> 225.7352 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 71.83007 </td>
   <td style="text-align:right;"> 30 </td>
   <td style="text-align:right;"> 0.0000275 </td>
   <td style="text-align:left;"> *** </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod9 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:right;"> 245.6252 </td>
   <td style="text-align:right;"> 267.3476 </td>
   <td style="text-align:right;"> -116.81262 </td>
   <td style="text-align:right;"> 233.6252 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 79.72011 </td>
   <td style="text-align:right;"> 35 </td>
   <td style="text-align:right;"> 0.0000243 </td>
   <td style="text-align:left;"> *** </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod10 </td>
   <td style="text-align:right;"> 5 </td>
   <td style="text-align:right;"> 247.8359 </td>
   <td style="text-align:right;"> 265.9379 </td>
   <td style="text-align:right;"> -118.91797 </td>
   <td style="text-align:right;"> 237.8359 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod18 </td>
   <td style="text-align:right;"> 41 </td>
   <td style="text-align:right;"> 235.9051 </td>
   <td style="text-align:right;"> 384.3416 </td>
   <td style="text-align:right;"> -76.95256 </td>
   <td style="text-align:right;"> 153.9051 </td>
   <td style="text-align:right;"> 83.93081 </td>
   <td style="text-align:right;"> 36 </td>
   <td style="text-align:right;"> 0.0000107 </td>
   <td style="text-align:left;"> *** </td>
  </tr>
</tbody>
</table>


From the ANOVAs it looks like `model 2` & `model 3` performed just as well as `model 1`meaning we should proceed with these. `model 2` removed interactions and `model 3` removed all the spectral metrics but kept interaction. However, `model 2` has 2 less parameters than `model 3` which gives it a lower AIC when compared together. 

<table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;">   </th>
   <th style="text-align:right;"> npar </th>
   <th style="text-align:right;"> AIC </th>
   <th style="text-align:right;"> BIC </th>
   <th style="text-align:right;"> logLik </th>
   <th style="text-align:right;"> deviance </th>
   <th style="text-align:right;"> Chisq </th>
   <th style="text-align:right;"> Df </th>
   <th style="text-align:right;"> Pr(&gt;Chisq) </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod3 </td>
   <td style="text-align:right;"> 17 </td>
   <td style="text-align:right;"> 223.7913 </td>
   <td style="text-align:right;"> 285.3381 </td>
   <td style="text-align:right;"> -94.89564 </td>
   <td style="text-align:right;"> 189.7913 </td>
   <td style="text-align:right;"> 0.6346545 </td>
   <td style="text-align:right;"> 2 </td>
   <td style="text-align:right;"> 0.7280925 </td>
  </tr>
</tbody>
</table>





```r
# No ANDWI
mod2.1 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    NDYI + (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
# No ANDWI, No NDYI
mod2.2 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.0070341 (tol = 0.002,
## component 1)
# No NDYI
mod2.3 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    ANDWI + (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.00238014 (tol = 0.002,
## component 1)
# No Geology
mod2.4 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    ANDWI + NDYI + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.171981 (tol = 0.002, component
## 1)
# No NDYI or Geology
mod2.5 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    ANDWI + lower_depth + (lower_depth || sample_ID), data = wa_spl_dat_scale,
    REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.0427664 (tol = 0.002,
## component 1)
# No ANDWI or Geology
mod2.6 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    NDYI + lower_depth + (lower_depth || sample_ID), data = wa_spl_dat_scale,
    REML = F)
# No spectral or Geology
mod2.7 <- lmer(log10(SOC_stock_spline) ~ WIP + Precip + Temp +
    lower_depth + (lower_depth || sample_ID), data = wa_spl_dat_scale,
    REML = F)
```

<table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;"> Models </th>
   <th style="text-align:right;"> npar </th>
   <th style="text-align:right;"> AIC </th>
   <th style="text-align:right;"> BIC </th>
   <th style="text-align:right;"> logLik </th>
   <th style="text-align:right;"> deviance </th>
   <th style="text-align:right;"> Chisq </th>
   <th style="text-align:right;"> Df </th>
   <th style="text-align:right;"> Pr(&gt;Chisq) </th>
   <th style="text-align:left;"> Significant </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> mod2.1 </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> 218.8356 </td>
   <td style="text-align:right;"> 269.5212 </td>
   <td style="text-align:right;"> -95.41779 </td>
   <td style="text-align:right;"> 190.8356 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 0.409648 </td>
   <td style="text-align:right;"> 1 </td>
   <td style="text-align:right;"> 0.5221482 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.2 </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> 219.4581 </td>
   <td style="text-align:right;"> 266.5234 </td>
   <td style="text-align:right;"> -96.72907 </td>
   <td style="text-align:right;"> 193.4581 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 3.032215 </td>
   <td style="text-align:right;"> 2 </td>
   <td style="text-align:right;"> 0.2195649 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.3 </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> 221.3225 </td>
   <td style="text-align:right;"> 272.0082 </td>
   <td style="text-align:right;"> -96.66127 </td>
   <td style="text-align:right;"> 193.3225 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 2.896615 </td>
   <td style="text-align:right;"> 1 </td>
   <td style="text-align:right;"> 0.0887658 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.4 </td>
   <td style="text-align:right;"> 10 </td>
   <td style="text-align:right;"> 221.4128 </td>
   <td style="text-align:right;"> 257.6168 </td>
   <td style="text-align:right;"> -100.70639 </td>
   <td style="text-align:right;"> 201.4128 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 10.986856 </td>
   <td style="text-align:right;"> 5 </td>
   <td style="text-align:right;"> 0.0516412 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.5 </td>
   <td style="text-align:right;"> 9 </td>
   <td style="text-align:right;"> 227.2392 </td>
   <td style="text-align:right;"> 259.8228 </td>
   <td style="text-align:right;"> -104.61960 </td>
   <td style="text-align:right;"> 209.2392 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 18.813263 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:right;"> 0.0044909 </td>
   <td style="text-align:left;"> ** </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.6 </td>
   <td style="text-align:right;"> 9 </td>
   <td style="text-align:right;"> 220.0621 </td>
   <td style="text-align:right;"> 252.6457 </td>
   <td style="text-align:right;"> -101.03105 </td>
   <td style="text-align:right;"> 202.0621 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 11.636166 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:right;"> 0.0705954 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.7 </td>
   <td style="text-align:right;"> 8 </td>
   <td style="text-align:right;"> 226.0611 </td>
   <td style="text-align:right;"> 255.0243 </td>
   <td style="text-align:right;"> -105.03055 </td>
   <td style="text-align:right;"> 210.0611 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 19.635164 </td>
   <td style="text-align:right;"> 7 </td>
   <td style="text-align:right;"> 0.0064141 </td>
   <td style="text-align:left;"> ** </td>
  </tr>
</tbody>
</table>


Model 2.2 and 2.3 are the lowest AIC and not significantly different from the fit in Model 2. The choice is either between `MNDWI` or `NDYI` to be included in the model with `WIP`, `Precip`, `Temp`, and `Geology.` To test , I want to see if `WIP` interacts with these variables. 


```r
# Interaction
mod2.1.1 <- lmer(log10(SOC_stock_spline) ~ Precip + Temp + WIP:NDYI +
    (GEOLOGIC_AGE) + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F)
## Warning in checkConv(attr(opt, "derivs"), opt$par, ctrl = control$checkConv,
## : Model failed to converge with max|grad| = 0.0620781 (tol = 0.002,
## component 1)
```

<table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;">   </th>
   <th style="text-align:right;"> npar </th>
   <th style="text-align:right;"> AIC </th>
   <th style="text-align:right;"> BIC </th>
   <th style="text-align:right;"> logLik </th>
   <th style="text-align:right;"> deviance </th>
   <th style="text-align:right;"> Chisq </th>
   <th style="text-align:right;"> Df </th>
   <th style="text-align:right;"> Pr(&gt;Chisq) </th>
   <th style="text-align:left;"> Significant </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> mod2.1.1 </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> 232.6320 </td>
   <td style="text-align:right;"> 279.6972 </td>
   <td style="text-align:right;"> -103.31599 </td>
   <td style="text-align:right;"> 206.6320 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 220.4259 </td>
   <td style="text-align:right;"> 274.7319 </td>
   <td style="text-align:right;"> -95.21296 </td>
   <td style="text-align:right;"> 190.4259 </td>
   <td style="text-align:right;"> 16.20606 </td>
   <td style="text-align:right;"> 2 </td>
   <td style="text-align:right;"> 0.0003026 </td>
   <td style="text-align:left;"> *** </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.1.11 </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> 232.6320 </td>
   <td style="text-align:right;"> 279.6972 </td>
   <td style="text-align:right;"> -103.31599 </td>
   <td style="text-align:right;"> 206.6320 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;"> mod2.1 </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> 218.8356 </td>
   <td style="text-align:right;"> 269.5212 </td>
   <td style="text-align:right;"> -95.41779 </td>
   <td style="text-align:right;"> 190.8356 </td>
   <td style="text-align:right;"> 15.79641 </td>
   <td style="text-align:right;"> 1 </td>
   <td style="text-align:right;"> 0.0000705 </td>
   <td style="text-align:left;"> *** </td>
  </tr>
</tbody>
</table>



Doesn't look like there are any significant interactions that improve model fit

Now we can look at the table of all models and compare AICs



<table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;"> AIC </th>
   <th style="text-align:left;"> formula </th>
   <th style="text-align:left;"> name </th>
   <th style="text-align:right;"> delta </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> 235.91 </td>
   <td style="text-align:left;"> WIP * Precip * Temp * ANDWI * NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod1 </td>
   <td style="text-align:right;"> 17.07 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 220.43 </td>
   <td style="text-align:left;"> WIP + Precip + Temp + ANDWI + NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2 </td>
   <td style="text-align:right;"> 1.59 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 223.79 </td>
   <td style="text-align:left;"> WIP * Precip * Temp + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod3 </td>
   <td style="text-align:right;"> 4.95 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 227.04 </td>
   <td style="text-align:left;"> WIP * Precip * Temp + ANDWI + NDYI + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod4 </td>
   <td style="text-align:right;"> 8.20 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 229.44 </td>
   <td style="text-align:left;"> Precip * Temp + ANDWI + NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod5 </td>
   <td style="text-align:right;"> 10.60 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 229.41 </td>
   <td style="text-align:left;"> Precip + Temp + ANDWI + NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod6 </td>
   <td style="text-align:right;"> 10.57 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 230.44 </td>
   <td style="text-align:left;"> WIP + +ANDWI + NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod7 </td>
   <td style="text-align:right;"> 11.60 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 247.74 </td>
   <td style="text-align:left;"> WIP + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod8 </td>
   <td style="text-align:right;"> 28.90 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 245.63 </td>
   <td style="text-align:left;"> WIP + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod9 </td>
   <td style="text-align:right;"> 26.79 </td>
  </tr>
  <tr>
   <td style="text-align:left;background-color: lightblue !important;"> 218.84 </td>
   <td style="text-align:left;background-color: lightblue !important;"> WIP + Precip + Temp + NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;background-color: lightblue !important;"> mod2.1 </td>
   <td style="text-align:right;background-color: lightblue !important;"> 0.00 </td>
  </tr>
  <tr>
   <td style="text-align:left;background-color: lightblue !important;"> 219.46 </td>
   <td style="text-align:left;background-color: lightblue !important;"> WIP + Precip + Temp + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;background-color: lightblue !important;"> mod2.2 </td>
   <td style="text-align:right;background-color: lightblue !important;"> 0.62 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 221.32 </td>
   <td style="text-align:left;"> WIP + Precip + Temp + ANDWI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2.3 </td>
   <td style="text-align:right;"> 2.48 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 221.41 </td>
   <td style="text-align:left;"> WIP + Precip + Temp + ANDWI + NDYI + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2.4 </td>
   <td style="text-align:right;"> 2.57 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 227.24 </td>
   <td style="text-align:left;"> WIP + Precip + Temp + ANDWI + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2.5 </td>
   <td style="text-align:right;"> 8.40 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 220.06 </td>
   <td style="text-align:left;"> WIP + Precip + Temp + NDYI + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2.6 </td>
   <td style="text-align:right;"> 1.22 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 226.06 </td>
   <td style="text-align:left;"> WIP + Precip + Temp + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2.7 </td>
   <td style="text-align:right;"> 7.22 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 232.63 </td>
   <td style="text-align:left;"> Precip + Temp + WIP:NDYI + (GEOLOGIC_AGE) + lower_depth + ((1 | sample_ID) + (0 + lower_depth | sample_ID)) </td>
   <td style="text-align:left;"> mod2.1.1 </td>
   <td style="text-align:right;"> 13.79 </td>
  </tr>
</tbody>
</table>



Looks like the best model fit to the data according to AIC is the `mod2.2` or `mod2.3` which do not include any interactions. The model $R^2$ for `mod2.2` is 0.892 compared to the $R^2$ for `mod2.2` is 0.894




Confidence intervals calculated with bootstrapping between these two models show that `NDYI` is a significant predictor compared to `MNDWI`. Therefore, we use `mod2.2` as our candidate model


<table style="border-collapse:collapse; border:none;">
<tr>
<th style="border-top: double; text-align:center; font-style:normal; font-weight:bold; padding:0.2cm;  text-align:left; ">&nbsp;</th>
<th colspan="3" style="border-top: double; text-align:center; font-style:normal; font-weight:bold; padding:0.2cm; ">Model 2.1</th>
<th colspan="3" style="border-top: double; text-align:center; font-style:normal; font-weight:bold; padding:0.2cm; ">Model 2.2</th>
</tr>
<tr>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  text-align:left; ">Predictors</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">Estimates</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">CI</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">p</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">Estimates</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">CI</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  col7">p</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">(Intercept)</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.24</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.63&nbsp;&ndash;&nbsp;0.11</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.192</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.21</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.61&nbsp;&ndash;&nbsp;0.16</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.266</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">WIP</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.12</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.05&nbsp;&ndash;&nbsp;0.19</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>&lt;0.001</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.13</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.06&nbsp;&ndash;&nbsp;0.21</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"><strong>&lt;0.001</strong></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Precip</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.18</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.03&nbsp;&ndash;&nbsp;0.32</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.020</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.24</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.12&nbsp;&ndash;&nbsp;0.35</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"><strong>&lt;0.001</strong></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Temp</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.00</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.12&nbsp;&ndash;&nbsp;0.12</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.992</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.02</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.14&nbsp;&ndash;&nbsp;0.10</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.716</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">NDYI</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.07</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.02&nbsp;&ndash;&nbsp;0.16</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.116</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[Miocene-Eocene]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.44</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.90&nbsp;&ndash;&nbsp;0.09</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.108</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.50</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.96&nbsp;&ndash;&nbsp;0.05</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.078</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[Oligocene-Eocene]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.09</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.29&nbsp;&ndash;&nbsp;0.52</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.654</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.09</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.30&nbsp;&ndash;&nbsp;0.52</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.676</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[Pleistocene]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.04</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.33&nbsp;&ndash;&nbsp;0.46</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.844</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.02</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.35&nbsp;&ndash;&nbsp;0.45</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.934</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[pre-Tertiary]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.05</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.56&nbsp;&ndash;&nbsp;0.48</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.846</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.09</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.63&nbsp;&ndash;&nbsp;0.44</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.726</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE [Quaternary]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.28</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.70&nbsp;&ndash;&nbsp;0.20</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.280</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.37</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.80&nbsp;&ndash;&nbsp;0.08</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.130</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">lower depth</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01&nbsp;&ndash;&nbsp;-0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>&lt;0.001</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01&nbsp;&ndash;&nbsp;-0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"><strong>&lt;0.001</strong></td>
</tr>
<tr>
<td colspan="7" style="font-weight:bold; text-align:left; padding-top:.8em;">Random Effects</td>
</tr>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&sigma;<sup>2</sup></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.05</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.05</td>
</tr>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&tau;<sub>00</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.04 <sub>sample_ID</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.04 <sub>sample_ID</sub></td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&tau;<sub>11</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.00 <sub>sample_ID.lower_depth</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.00 <sub>sample_ID.lower_depth</sub></td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&rho;<sub>01</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&rho;<sub>01</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">ICC</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.40</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.41</td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">N</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">96 <sub>sample_ID</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">96 <sub>sample_ID</sub></td>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm; border-top:1px solid;">Observations</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left; border-top:1px solid;" colspan="3">276</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left; border-top:1px solid;" colspan="3">276</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">Marginal R<sup>2</sup> / Conditional R<sup>2</sup></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.554 / 0.731</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.541 / 0.731</td>
</tr>

</table>


--- 

We can now visualize our candidate model 2.2. 

<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-108-1.png" alt="plot of chunk unnamed-chunk-108"  />
<p class="caption">plot of chunk unnamed-chunk-108</p>
</div>

### Dredging for model selection

The `dredge` function can be used to look through multiple combinations of models from a globally defined model. The number of parameters are limited so we run two models: one with the `NDYI` parameter and another with the `MNDWI` parameter included with `Temp`, `Precip`, and `WIP` fully interacting. `GEOLOGIC_AGE` is also included as an additional, non-interaction parameter and random effects are constant.


```r
gmod1 <- lmer(log10(SOC_stock_spline) ~ WIP * Temp * Precip *
    NDYI + GEOLOGIC_AGE + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F, na.action = "na.fail")
gmod2 <- lmer(log10(SOC_stock_spline) ~ WIP * Temp * Precip *
    ANDWI + GEOLOGIC_AGE + lower_depth + (lower_depth || sample_ID),
    data = wa_spl_dat_scale, REML = F, na.action = "na.fail")
dredge1 <- dredge(gmod1, beta = "sd")
dredge2 <- dredge(gmod2, beta = "sd")
```

<div style="border: 1px solid #ddd; padding: 5px; overflow-x: scroll; width:100%; "><table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;">   </th>
   <th style="text-align:right;"> (Intercept) </th>
   <th style="text-align:left;"> GEOLOGIC_AGE </th>
   <th style="text-align:right;"> lower_depth </th>
   <th style="text-align:right;"> NDYI </th>
   <th style="text-align:right;"> Precip </th>
   <th style="text-align:right;"> Temp </th>
   <th style="text-align:right;"> WIP </th>
   <th style="text-align:right;"> NDYI:Precip </th>
   <th style="text-align:right;"> NDYI:Temp </th>
   <th style="text-align:right;"> NDYI:WIP </th>
   <th style="text-align:right;"> Precip:Temp </th>
   <th style="text-align:right;"> Precip:WIP </th>
   <th style="text-align:right;"> Temp:WIP </th>
   <th style="text-align:right;"> NDYI:Precip:Temp </th>
   <th style="text-align:right;"> NDYI:Precip:WIP </th>
   <th style="text-align:right;"> NDYI:Temp:WIP </th>
   <th style="text-align:right;"> Precip:Temp:WIP </th>
   <th style="text-align:right;"> NDYI:Precip:Temp:WIP </th>
   <th style="text-align:right;"> df </th>
   <th style="text-align:right;"> logLik </th>
   <th style="text-align:right;"> AICc </th>
   <th style="text-align:right;"> delta </th>
   <th style="text-align:right;"> weight </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> 24575 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:left;"> NA </td>
   <td style="text-align:right;"> -0.3859947 </td>
   <td style="text-align:right;"> 0.7855336 </td>
   <td style="text-align:right;"> -0.1358170 </td>
   <td style="text-align:right;"> 0.3672985 </td>
   <td style="text-align:right;"> 0.1104673 </td>
   <td style="text-align:right;"> -0.3213815 </td>
   <td style="text-align:right;"> 0.4300134 </td>
   <td style="text-align:right;"> 0.1622869 </td>
   <td style="text-align:right;"> -0.1453279 </td>
   <td style="text-align:right;"> -0.2295751 </td>
   <td style="text-align:right;"> 0.0928943 </td>
   <td style="text-align:right;"> -0.5578764 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.1604055 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 17 </td>
   <td style="text-align:right;"> -90.27224 </td>
   <td style="text-align:right;"> 216.9166 </td>
   <td style="text-align:right;"> 0.000000 </td>
   <td style="text-align:right;"> 0.2995148 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 48 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3836525 </td>
   <td style="text-align:right;"> 0.1317391 </td>
   <td style="text-align:right;"> 0.3088780 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.2106672 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> -95.41784 </td>
   <td style="text-align:right;"> 218.2250 </td>
   <td style="text-align:right;"> 1.308419 </td>
   <td style="text-align:right;"> 0.1557036 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 14335 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:left;"> NA </td>
   <td style="text-align:right;"> -0.3851104 </td>
   <td style="text-align:right;"> 0.7752096 </td>
   <td style="text-align:right;"> -0.0954976 </td>
   <td style="text-align:right;"> 0.3346213 </td>
   <td style="text-align:right;"> 0.0855746 </td>
   <td style="text-align:right;"> -0.1921094 </td>
   <td style="text-align:right;"> 0.2650052 </td>
   <td style="text-align:right;"> 0.1003702 </td>
   <td style="text-align:right;"> -0.1163907 </td>
   <td style="text-align:right;"> -0.1221449 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> -0.5543885 </td>
   <td style="text-align:right;"> 0.1354660 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 16 </td>
   <td style="text-align:right;"> -92.10787 </td>
   <td style="text-align:right;"> 218.3161 </td>
   <td style="text-align:right;"> 1.399547 </td>
   <td style="text-align:right;"> 0.1487683 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 57343 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:left;"> NA </td>
   <td style="text-align:right;"> -0.3860028 </td>
   <td style="text-align:right;"> 0.7545347 </td>
   <td style="text-align:right;"> -0.1191113 </td>
   <td style="text-align:right;"> 0.3462410 </td>
   <td style="text-align:right;"> 0.1768655 </td>
   <td style="text-align:right;"> -0.3177870 </td>
   <td style="text-align:right;"> 0.4410082 </td>
   <td style="text-align:right;"> 0.1212566 </td>
   <td style="text-align:right;"> -0.1486504 </td>
   <td style="text-align:right;"> -0.1461895 </td>
   <td style="text-align:right;"> 0.0151525 </td>
   <td style="text-align:right;"> -0.5340127 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.2205693 </td>
   <td style="text-align:right;"> -0.11752 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 18 </td>
   <td style="text-align:right;"> -89.84743 </td>
   <td style="text-align:right;"> 218.3563 </td>
   <td style="text-align:right;"> 1.439757 </td>
   <td style="text-align:right;"> 0.1458072 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 1072 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3836264 </td>
   <td style="text-align:right;"> 0.1396997 </td>
   <td style="text-align:right;"> 0.2998503 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.2037453 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> -0.0801549 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> -94.51771 </td>
   <td style="text-align:right;"> 218.6446 </td>
   <td style="text-align:right;"> 1.728044 </td>
   <td style="text-align:right;"> 0.1262346 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 32767 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:left;"> NA </td>
   <td style="text-align:right;"> -0.3865633 </td>
   <td style="text-align:right;"> 0.7828342 </td>
   <td style="text-align:right;"> -0.1474136 </td>
   <td style="text-align:right;"> 0.3813838 </td>
   <td style="text-align:right;"> 0.1424312 </td>
   <td style="text-align:right;"> -0.3788402 </td>
   <td style="text-align:right;"> 0.4947691 </td>
   <td style="text-align:right;"> 0.1940555 </td>
   <td style="text-align:right;"> -0.1510079 </td>
   <td style="text-align:right;"> -0.2464318 </td>
   <td style="text-align:right;"> 0.0962508 </td>
   <td style="text-align:right;"> -0.5516318 </td>
   <td style="text-align:right;"> -0.1055494 </td>
   <td style="text-align:right;"> 0.2452163 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 18 </td>
   <td style="text-align:right;"> -90.00966 </td>
   <td style="text-align:right;"> 218.6808 </td>
   <td style="text-align:right;"> 1.764225 </td>
   <td style="text-align:right;"> 0.1239715 </td>
  </tr>
</tbody>
</table></div>

<div style="border: 1px solid #ddd; padding: 5px; overflow-x: scroll; width:100%; "><table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;">   </th>
   <th style="text-align:right;"> (Intercept) </th>
   <th style="text-align:right;"> ANDWI </th>
   <th style="text-align:left;"> GEOLOGIC_AGE </th>
   <th style="text-align:right;"> lower_depth </th>
   <th style="text-align:right;"> Precip </th>
   <th style="text-align:right;"> Temp </th>
   <th style="text-align:right;"> WIP </th>
   <th style="text-align:right;"> ANDWI:Precip </th>
   <th style="text-align:right;"> ANDWI:Temp </th>
   <th style="text-align:right;"> ANDWI:WIP </th>
   <th style="text-align:right;"> Precip:Temp </th>
   <th style="text-align:right;"> Precip:WIP </th>
   <th style="text-align:right;"> Temp:WIP </th>
   <th style="text-align:right;"> ANDWI:Precip:Temp </th>
   <th style="text-align:right;"> ANDWI:Precip:WIP </th>
   <th style="text-align:right;"> ANDWI:Temp:WIP </th>
   <th style="text-align:right;"> Precip:Temp:WIP </th>
   <th style="text-align:right;"> ANDWI:Precip:Temp:WIP </th>
   <th style="text-align:right;"> df </th>
   <th style="text-align:right;"> logLik </th>
   <th style="text-align:right;"> AICc </th>
   <th style="text-align:right;"> delta </th>
   <th style="text-align:right;"> weight </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> 47 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3835239 </td>
   <td style="text-align:right;"> 0.3925743 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.2366648 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 12 </td>
   <td style="text-align:right;"> -96.79139 </td>
   <td style="text-align:right;"> 218.7691 </td>
   <td style="text-align:right;"> 0.0000000 </td>
   <td style="text-align:right;"> 0.2865913 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 112 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> -0.0257032 </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3836962 </td>
   <td style="text-align:right;"> 0.3443734 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.2064126 </td>
   <td style="text-align:right;"> 0.1209479 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 14 </td>
   <td style="text-align:right;"> -94.93212 </td>
   <td style="text-align:right;"> 219.4734 </td>
   <td style="text-align:right;"> 0.7043450 </td>
   <td style="text-align:right;"> 0.2015192 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 1071 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3834712 </td>
   <td style="text-align:right;"> 0.3890182 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.2318531 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> -0.072221 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> -96.07931 </td>
   <td style="text-align:right;"> 219.5479 </td>
   <td style="text-align:right;"> 0.7788413 </td>
   <td style="text-align:right;"> 0.1941510 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 128 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> -0.0407113 </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3837535 </td>
   <td style="text-align:right;"> 0.4241922 </td>
   <td style="text-align:right;"> -0.1170883 </td>
   <td style="text-align:right;"> 0.1912894 </td>
   <td style="text-align:right;"> 0.1395886 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> -94.42212 </td>
   <td style="text-align:right;"> 220.6904 </td>
   <td style="text-align:right;"> 1.9213171 </td>
   <td style="text-align:right;"> 0.1096615 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 110 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> -0.0537485 </td>
   <td style="text-align:left;"> NA </td>
   <td style="text-align:right;"> -0.3855814 </td>
   <td style="text-align:right;"> 0.2607821 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 0.1815864 </td>
   <td style="text-align:right;"> 0.1699411 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 9 </td>
   <td style="text-align:right;"> -101.03425 </td>
   <td style="text-align:right;"> 220.7452 </td>
   <td style="text-align:right;"> 1.9761163 </td>
   <td style="text-align:right;"> 0.1066976 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> 63 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:left;"> + </td>
   <td style="text-align:right;"> -0.3835387 </td>
   <td style="text-align:right;"> 0.4240789 </td>
   <td style="text-align:right;"> -0.0394235 </td>
   <td style="text-align:right;"> 0.2339897 </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> NA </td>
   <td style="text-align:right;"> 13 </td>
   <td style="text-align:right;"> -96.72907 </td>
   <td style="text-align:right;"> 220.8475 </td>
   <td style="text-align:right;"> 2.0783743 </td>
   <td style="text-align:right;"> 0.1013794 </td>
  </tr>
</tbody>
</table></div>



By using `dredge` we find that there are a few candidate models that fit the data well.

The difference between the model AICs is negligible. The first includes no interactions between the parameters and removes `Temp` as a predictor. The second includes an interaction between `MNDWI` and `Precip` while also excluding `Temp`. 

We can look at the bootstrapped confidence intervals to examine the significance of the predictors between the two models. 
<table style="border-collapse:collapse; border:none;">
<tr>
<th style="border-top: double; text-align:center; font-style:normal; font-weight:bold; padding:0.2cm;  text-align:left; ">&nbsp;</th>
<th colspan="3" style="border-top: double; text-align:center; font-style:normal; font-weight:bold; padding:0.2cm; ">Dredge Model 1</th>
<th colspan="3" style="border-top: double; text-align:center; font-style:normal; font-weight:bold; padding:0.2cm; ">Dredge Model 2</th>
</tr>
<tr>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  text-align:left; ">Predictors</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">Estimates</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">CI</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">p</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">Estimates</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  ">CI</td>
<td style=" text-align:center; border-bottom:1px solid; font-style:italic; font-weight:normal;  col7">p</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">(Intercept)</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.16</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.30&nbsp;&ndash;&nbsp;-0.02</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.014</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.19</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.56&nbsp;&ndash;&nbsp;0.18</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.266</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">lower depth</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01&nbsp;&ndash;&nbsp;-0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>&lt;0.001</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01&nbsp;&ndash;&nbsp;-0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"><strong>&lt;0.001</strong></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">NDYI</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.44</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.24&nbsp;&ndash;&nbsp;0.64</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>&lt;0.001</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Precip</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.07</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.27&nbsp;&ndash;&nbsp;0.12</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.428</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.22</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.16&nbsp;&ndash;&nbsp;0.29</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"><strong>&lt;0.001</strong></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Temp</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.21</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.02&nbsp;&ndash;&nbsp;0.39</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.028</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">WIP</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.06</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01&nbsp;&ndash;&nbsp;0.13</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.074</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.13</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.06&nbsp;&ndash;&nbsp;0.20</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"><strong>&lt;0.001</strong></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">NDYI × Precip</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.20</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.33&nbsp;&ndash;&nbsp;-0.06</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.002</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">NDYI × Temp</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.25</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.08&nbsp;&ndash;&nbsp;0.42</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.006</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">NDYI × WIP</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.09</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.01&nbsp;&ndash;&nbsp;0.18</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.038</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Precip × Temp</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.11</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.26&nbsp;&ndash;&nbsp;0.03</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.104</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Precip × WIP</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.14</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.27&nbsp;&ndash;&nbsp;0.00</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.064</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">Temp × WIP</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.06</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.07&nbsp;&ndash;&nbsp;0.16</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.326</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">(NDYI × Precip) × Temp</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.29</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.47&nbsp;&ndash;&nbsp;-0.11</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.002</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">(NDYI × Temp) × WIP</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.08</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.01&nbsp;&ndash;&nbsp;0.15</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "><strong>0.032</strong></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7"></td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[Miocene-Eocene]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.50</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.98&nbsp;&ndash;&nbsp;0.03</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.072</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[Oligocene-Eocene]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">0.06</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.33&nbsp;&ndash;&nbsp;0.46</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.732</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[Pleistocene]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.01</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.37&nbsp;&ndash;&nbsp;0.38</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.962</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE<br>[pre-Tertiary]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.11</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.63&nbsp;&ndash;&nbsp;0.41</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.676</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; ">GEOLOGIC AGE [Quaternary]</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  "></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.39</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  ">&#45;0.80&nbsp;&ndash;&nbsp;0.03</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:center;  col7">0.060</td>
</tr>
<tr>
<td colspan="7" style="font-weight:bold; text-align:left; padding-top:.8em;">Random Effects</td>
</tr>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&sigma;<sup>2</sup></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.05</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.05</td>
</tr>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&tau;<sub>00</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.02 <sub>sample_ID</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.04 <sub>sample_ID</sub></td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&tau;<sub>11</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.00 <sub>sample_ID.lower_depth</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.00 <sub>sample_ID.lower_depth</sub></td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&rho;<sub>01</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">&rho;<sub>01</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">&nbsp;</td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">ICC</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.32</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.42</td>

<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">N</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">96 <sub>sample_ID</sub></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">96 <sub>sample_ID</sub></td>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm; border-top:1px solid;">Observations</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left; border-top:1px solid;" colspan="3">276</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left; border-top:1px solid;" colspan="3">276</td>
</tr>
<tr>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; text-align:left; padding-top:0.1cm; padding-bottom:0.1cm;">Marginal R<sup>2</sup> / Conditional R<sup>2</sup></td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.611 / 0.735</td>
<td style=" padding:0.2cm; text-align:left; vertical-align:top; padding-top:0.1cm; padding-bottom:0.1cm; text-align:left;" colspan="3">0.540 / 0.731</td>
</tr>

</table>


Dredge Model 1 includes `NDYI`, `Precip`, `WIP`, and `GEOLOGIC_AGE` as significant predictors. Dredge Model 2 does not have significant confidence intervals for the `MNDWI` and `MNDWIxPrecip` parameters. 



There is also minimal differences between the R$^{2}$ between the two models where Dredge Model 1 has R$^{2}$ = 0.897 and Dredge Model 2 has R$^{2}$ = 0.894

We now can examine the plot with the Dredge Model 1
<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-113-1.png" alt="plot of chunk unnamed-chunk-113"  />
<p class="caption">plot of chunk unnamed-chunk-113</p>
</div>


### Random Forest Machine Learning


I also want to try Random Forest in order to see if a more flexible, machine learning model can capture any non-linear relationships with SOC and other variables.

`lower_depth` is included as a predictor here in the data setup




We then use the `tuneRF` to choose the appropriate `mtry` number 

<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-115-1.png" alt="plot of chunk unnamed-chunk-115"  />
<p class="caption">plot of chunk unnamed-chunk-115</p>
</div>



```r
rf_model <- randomForest((SOC_stock_spline) ~ ., ntree = 1000,
    mtry = 4, importance = TRUE, data = full)
plot(rf_model)

rf.full <- predict(rf_model, newdata = full)
vip::vip(rf_model)
```

<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-116-1.png" alt="plot of chunk unnamed-chunk-116"  /><img src="All_WA_SOC_shared_spline//unnamed-chunk-116-2.png" alt="plot of chunk unnamed-chunk-116"  />
<p class="caption">plot of chunk unnamed-chunk-116</p>
</div>


~50% of the out of bag (OOB) variation is explained. Looks like after `lower_depth` `Precip`, `Temp`, `WIP`, and `NDYI` are the big drivers. The RF model does not appear to have the greatest fit... 



<table class=" lightable-classic-2 lightable-hover" style='font-family: "Arial Narrow", "Source Sans Pro", sans-serif; width: auto !important; margin-left: auto; margin-right: auto;'>
 <thead>
  <tr>
   <th style="text-align:left;"> error.variable </th>
   <th style="text-align:right;"> value </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> MAE </td>
   <td style="text-align:right;"> 0.1306526 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> MAE^2 </td>
   <td style="text-align:right;"> 0.0170701 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> RMSE </td>
   <td style="text-align:right;"> 0.1768086 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> RMSE non-log </td>
   <td style="text-align:right;"> 1.1934027 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Stdev of non-log SOC stock </td>
   <td style="text-align:right;"> 0.4999442 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> R^2 on full dataset </td>
   <td style="text-align:right;"> 0.9230161 </td>
  </tr>
</tbody>
</table>




Look at partial dependency plots 


<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-118-1.png" alt="plot of chunk unnamed-chunk-118"  />
<p class="caption">plot of chunk unnamed-chunk-118</p>
</div>





```
## [1] "0.03 mean square error rf model from training"
## [1] "0.902 R^2 rf model from training"
## [1] "0.835 R^2 rf model from testing "
```

Here, we show the fit between sampled and predicted SOC stocks for the full Random Forest Model

<div class="figure" style="text-align: center">
<img src="All_WA_SOC_shared_spline//unnamed-chunk-120-1.png" alt="plot of chunk unnamed-chunk-120"  />
<p class="caption">plot of chunk unnamed-chunk-120</p>
</div>

