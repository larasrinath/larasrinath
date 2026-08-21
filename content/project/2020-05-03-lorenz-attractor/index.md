---
title: Lorenz Attractor
author: Lara Srinath
date: '2020-05-03'
featured_summary: "An interactive 3D exploration of the Lorenz system, mapping how tiny changes in initial conditions produce beautifully chaotic outcomes."
featured_home: true
featured_weight: 5
featured_image: /img/portfolio/lorenz-attractor.jpg
featured_image_alt: "Three-dimensional Lorenz attractor visualization"
featured_image_fit: cover
featured_meta: "R · Plotly · Data Visualization — 2020"
slug: lorenz-attractor
categories: []
tags:
  - dataviz
  - R
subtitle: 'Mapping the Chaos'
summary: 'Mapping the Chaos'
authors: []
lastmod: '2020-05-03'
featured: false
image:
  caption: ''
  focal_point: ''
  preview_only: false
projects: []
project_body:
  - type: opening
    text: >-
      Edward Lorenz was an American meteorologist and mathematician, working on a model to predict the climate. He had 12 parameters (temperature, pressure, humidity, etc.) and 12 sets of equations and used a vacuum tube computer to run the model and printed out the result of each iteration as a row of 12 numbers and studied the parameters as it evolved over time.
  - type: image
    src: images/featured.jpg
    alt: Three-dimensional Lorenz attractor visualization
    caption: Mapping the order hidden inside a chaotic system.
  - type: paragraph
    text: >-
      When Lorenz re-ran the model using inputs from the old output, the two models were totally different, predicting an entirely different state of climate. This happened as the printer output was rounded of to 3 decimal points, while his vacuum tube computer ran the model with 6 decimal points. Thus a 1/1000th change in decimal had a massive impact on the results.
  - type: paragraph
    text: >-
      This gave birth to the most famous term "The Butterfly Effect" which states the flapping of butterflies in Brazil (as insignificant as they are) can lead to a tornado in Texas (thousands of miles away).
  - type: paragraph
    text: >-
      And is there a better time than right now to talk about chaos, as we are all in lockdown, waiting for the nightmare to be over. Underlying basis of chaos is a very sensitive dependence of initial condition. A small change in any of the initial condition can have very different consequence. The world is in chaos because someone in one corner of our world decided to give a firm handshake after a hearty meal, could have been very different if the one had waved goodbye.
  - type: quote
    style: feature
    lines:
      - "*Chaos isn't a pit. Chaos is a ladder.*"
    cite: Lord Petyr Littlefinger Baelish, Game of Thrones
  - type: paragraph
    text: >-
      But the reason for this post is due to the fact that I was always fascinated by this system since I was 14, though not understanding it completely then (nor now), but I always loved the picture for its two-winged nature.
  - type: quote
    style: standard
    text: "*Embrace the Chaos*"
    cite: Dr. Sheldon Lee Cooper, The Big Bang Theory
  - type: paragraph
    text: >-
      So I decided to create a 3D plot of the Lorenz system and here is my attempt at it through programming of R…
  - type: heading
    level: 2
    text: Lorenz System
  - type: paragraph
    text: "The 12 sets of equation of the atmospheric model was simplified to the following 3 equations,"
  - type: equations
    aria_label: Lorenz system equations
    lines:
      - dx/dt = σ(y-x)
      - dy/dt = x(ρ-z)-y
      - dz/dt = xy-βz
  - type: heading
    level: 2
    text: 3D Plot
  - type: paragraph
    lines:
      - Swipe, zoom and pan around the plot to discover order in the chaotic system.
      - Isn't it beautiful!!!
  - type: code
    label: View code
    language: r
    code: |-
      library(viridis) # Default Color Maps from matplotlib
      library(data.table) # Extension of data.frame
      library(dplyr) # A Grammar of Data Manipulation
      library(plotly) # Create Interactive Web Graphics via plotly.js

      # Defining the equation in a function
      lorenz_attractor <- function(s = 20, dt = 0.01,
                                   r = 28, b = 8/3,
                                   x = -1, y = 1,
                                   z = -1, n = 100) {
        # Setting up the initial conditions
        x[1] <- x
        y[1] <- y
        z[1] <- z

        for (i in 2:n) {
          x[i] <- x[i-1] + (s * (y[i-1] - x[i-1])) * dt
          y[i] <- y[i-1] + (x[i-1] * (r - z[i-1]) - y[i-1]) * dt
          z[i] <- z[i-1] + (x[i-1] * y[i-1] - b * z[i-1]) * dt
        }

        df <- data.table(x = x, y = y, z = z)
        return(df)
      }

      # Creating a dataset with 10000 data points
      # The more datapoints you have, more chaotic system
      la_df <- lorenz_attractor(n = 10000)

      plot_ly(la_df, x = ~x, y = ~y, z = ~z,
              type = 'scatter3d', mode = 'markers',
              marker = list(
                size = 1,
                color = ~z,
                colorscale = 'Viridis'
              ),
              hoverinfo = 'skip') %>%
        layout(scene = list(
          xaxis = list(title = ' ', showticklabels = FALSE,
                       showspikes = FALSE, showgrid = FALSE, zeroline = FALSE),
          yaxis = list(title = ' ', showticklabels = FALSE,
                       showspikes = FALSE, showgrid = FALSE, zeroline = FALSE),
          zaxis = list(title = ' ', showticklabels = FALSE,
                       showspikes = FALSE, showgrid = FALSE, zeroline = FALSE)
        ), paper_bgcolor = 'black') %>%
        config(displayModeBar = FALSE)
  - type: chart
    kind: lorenz
    view: 3d
    sigma: 20
    rho: 28
    beta: 2.6666667
    dt: 0.01
    points: 10000
    aria_label: Interactive three-dimensional Lorenz attractor
    caption: Drag to rotate, use the mouse wheel to zoom, or swipe on a touch screen.
  - type: callout
    label: Mobile note
    text: Interactive plots are not optimized for mobile devices.
  - type: heading
    level: 2
    text: 2D Plot
  - type: paragraph
    text: Alternatively, we can also plot the system in 2D using Plotly.
  - type: code
    label: View code
    language: r
    code: |-
      plot_ly(la_df, x = ~x, y = ~z,
              name = ' ',
              type = 'scatter',
              mode = 'lines',
              line = list(width = 1),
              hoverinfo = 'skip') %>%
        layout(
          xaxis = list(title = ' ', showticklabels = FALSE,
                       showspikes = FALSE, showgrid = FALSE,
                       zeroline = FALSE, fixedrange = TRUE),
          yaxis = list(title = ' ', showticklabels = FALSE,
                       showspikes = FALSE, showgrid = FALSE,
                       zeroline = FALSE, fixedrange = TRUE),
          plot_bgcolor = 'black',
          paper_bgcolor = 'black'
        ) %>%
        config(displayModeBar = FALSE)
  - type: chart
    kind: lorenz
    view: 2d
    sigma: 20
    rho: 28
    beta: 2.6666667
    dt: 0.01
    points: 10000
    aria_label: Two-dimensional Lorenz attractor
    caption: The same system projected into two dimensions.
  - type: heading
    level: 3
    text: Life Lesson
  - type: signoff
    lines:
      - An insignificant choice can have a massive impact on life.
      - That is the essence of chaos.
---
