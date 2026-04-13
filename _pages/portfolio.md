---
title: "Research"
permalink: /portfolio/
---

My research program strives to improve our knowledge of forested wetland ecosystems, including both mapping their extent and uncovering their function, through a combination of remote sensing and geospatial data analysis, advanced computational modeling, and field data collection.

----

## Forested Wetland Identification

Forested wetlands are diverse habitats that are often difficult to map due to being hidden from aerial photography and satellite imagery by their overstory. This is especially true in the Pacific Northwest where tall and dense conifers cover the landscape year-round. Paradoxically, forested wetlands are the most difficult wetlands to identify and map but are the most widespread, making up approximately 50% of all wetlands (Lang et al., 2024). To identify forested wetlands, I collaborated on developing the Wetland Intrinsic Potential tool (WIP tool) which leverages terrain metrics and machine learning to identify probability patterns of wetlands across a landscape. This work was led by Dr. Meghan Halabisky and has been [published in Hydrology and Earth System Science](https://hess.copernicus.org/articles/27/3687/2023/). Our approach estimated that forested wetland area was nearly three times greater than previous estimates for the Hoh River Watershed on the Olympic Peninsula ([Stewart et al., 2024](https://www.nature.com/articles/s41467-024-44888-x)).

In collaboration with The Nature Conservancy and Washington's Natural Heritage Program, I expanded our model to map peatlands across Washington State, which are ecologically significant for carbon storage and biodiversity. This research also facilitated mentoring two M.S. students on developing computational workflows for remote sensing and machine learning analysis of forested wetlands, who developed thesis projects investigating land ownership effects on forested wetland harvest and how forested wetland mapping models can generate fine resolution soil moisture patterns under forested canopy.

<p align=center>
<img src="/files/Hoh_WIP_zoom.jpg" alt="drawing" width="500"/>
</p>

## Teal Carbon & Cryptic Carbon

**Teal Carbon** : Carbon stored in terrestrial inland wetlands

**Cryptic Carbon** : The hidden soil carbon in unmapped wetlands

Teal carbon differentiates inland wetlands as a significant carbon storing landscape from blue carbon in aquatic/marine environments and green carbon in forests.

In Washington State and the Pacific Northwest of the U.S. perennial forest cover can hide inland wetlands from conventional wetland mapping with aerial photography and spectral remote sensing approaches to mapping wetlands. These wetlands can be soil carbon hot spots due to their saturated soils which accumulate organic matter. Wetlands store 30% of the global soil carbon pool in the currently mapped 6% of the land surface (Poulter et al., 2021), but my research has shown that the wetland carbon pool may be vastly underestimated by up to 5-fold due to the exclusion of forested wetlands.

I was part of the Teal Carbon research team at the University of Washington which collaborated with stakeholders to enhance remote sensing approaches to mapping forested wetlands in order to improve the estimates of soil carbon stocks. We addressed a potential missing pool of soil carbon that may be vulnerable to future climate conditions and land use change and [published our results in Nature Communications](https://www.nature.com/articles/s41467-024-44888-x).

<p align=center>
<img src="/files/IMG_3068.JPG" alt="drawing" width = 500/>
</p>

## Geospatial Controls on Soil Carbon Stocks in the Pacific Northwest

Soils store large amounts of organic carbon with some of the largest stocks in wetlands. We need accurate models and maps of soil organic carbon (SOC) stocks that identify controls and drivers (Yu et al., 2021). However, it is challenging to build models that include wetlands SOC stocks and identify significant drivers and controls, especially with a diversity of modeling approaches that include machine learning.

We have captured the soil moisture gradient using the Wetland Intrinsic Potential (WIP) tool, a topographically-driven mapping algorithm that produces a continuous probability metric between uplands and wetlands (Halabisky et al., 2023). I applied machine learning to more accurately model the heterogeneous distribution of soil carbon in wetlands and uplands, scaling stock estimates across diverse regions in the Pacific Northwest (Stewart et al., In review). Through this upscaling research, I have also helped mentor two students on projects mapping salmon habitat in the Klamath River valley and understanding climate drivers of wetland soil carbon stocks.

<div align="center">
<iframe width="600" height="400" src="/files/All_WA_SOC_shared_spline.html"></iframe>
</div>

## Soil Carbon Persistence in Forested Wetland Soils

A paradigm shift in soil science now recognizes that soil matrix interactions and mineral associations, not intrinsic compound properties, protect soil carbon from decomposition. Yet this framework has rarely been applied to wetland soils, leaving uncertain how much of their substantial carbon stocks is actually protected and persistent. I acquired funding from the U.S. Department of Energy to lead research showing that mineral-associated soil carbon is less abundant in Pacific Northwest forested wetlands compared to upland soils but, surprisingly, it has persisted for more than twice as long (Stewart et al., In Prep). I am also collaborating on a continental-scale assessment of the capacity of North American Spodosols to store mineral-associated organic carbon, which revealed that Pacific Northwest soils hold high potential for additional carbon sequestration ([Spinola et al., 2026](https://doi.org/10.1016/j.catena.2025.109743)).

## Soil Carbon in Southeast Alaska and the North Pacific Temperate Coastal Rainforest

In collaboration with the U.S. Forest Service Pacific Northwest Research Station, we expanded the mapping of wetland-to-upland SOC stocks in the Heen Latinee Experimental Forest (HLEF) within the North Pacific Coastal Temperate Rainforest (NPCTR). The NPCTR is one of the most carbon dense ecosystems on the planet with cool temperatures and high precipitation (Bidlack et al., 2021). Leveraging the WIP wetland probability metric (Halabisky et al., 2022) as a wetland-to-upland continuum and the SOC samples along it, we can potentially identify how MAOM and POM vary with this gradient.

<p align=center>
<img src="/files/ouboundsoil.jpg" alt="drawing" width = 400/>
</p>

## Wetland Mapping & Ecosystem Functions at Cornell

As a Cornell Atkinson Postdoctoral Fellow, I am developing data analysis pipelines and workflows harnessing terabytes of fine-resolution remote sensing and LiDAR data with cloud-based processing platforms to improve wetland mapping using deep learning models in New York State. I also develop GIS processing pipelines for collecting local and regional scale wetland observations to use as training data for these models.

Beyond mapping, I am addressing the significant challenge of upscaling wetland functions from individual wetlands to watersheds and regions. Wetland greenhouse gas fluxes -- especially methane -- are known to vary by orders of magnitude across fine spatial scales. My research is actively developing models of wetland methane and its cross-scale drivers such as land use, hydrology, and plant diversity. I am also modeling the full wetland carbon balance by including carbon stocks and carbon burial in collaboration with the New York State Department of Environmental Conservation and Natural Heritage Program to inform state climate goals.
