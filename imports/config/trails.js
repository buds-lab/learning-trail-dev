export const trailsDefs = [
  {
    name: 'BIOPHILIC DESIGN TRAIL',
    stations: [
      {
        name: 'BIOPHILIC DESIGN TRAIL',
        location: 'Level 6 - Outdoor planter area',
        feedbackGroup: 'l6southOut'
      },
      {
        name: 'NATURE IN PLACE',
        location: 'Level 6 - Outdoor planter area',
        feedbackGroup: 'l6southOut'
      },
      {
        name: 'NATURE OF PLACE',
        location: 'Level 6 - Outdoor planter area',
        feedbackGroup: 'l6southOut'
      },
      {
        name: 'MATERIALITY',
        location: 'Level 6 - Outdoor planter area',
        feedbackGroup: 'l6eastOut'
      },
      {
        name: 'FUTURE TECHNOLOGIES 1',
        location: 'Level 6 - Outdoor Testbedding area',
        feedbackGroup: 'l6eastOut'
      }
    ]
  },
  {
    name: 'WATER TRAIL',
    stations: [
      {
        name: 'WATER TRAIL',
        location: 'Level 2 - Next to water feature, landscape area',
        feedbackGroup: 'water'
      },
      {
        name: 'ABC WATER PROGRAMME',
        location: 'Level 2 - Near bio retention basin, landscape area',
        feedbackGroup: 'water'
      },
      {
        name: 'WATER FEATURE',
        location: 'Level 2 - Outside IRC, near landscape area',
        feedbackGroup: 'water'
      },
      {
        name: 'BIO RETENTION BASIN',
        location: 'Level 2 - Next to water feature, landscape area',
        feedbackGroup: 'water'
      }
    ]
  },
  {
    name: 'WELLNESS TRAIL',
    stations: [
      {
        name: 'WELLNESS TRAIL',
        location: 'Level 2 - Next to bicycle parking, near the staircase',
        feedbackGroup: 'bike'
      },
      {
        name: 'LIGHTING',
        location: 'Level 2 - Information Resource Centre',
        feedbackGroup: 'library'
      },
      {
        name: 'AIR',
        location: 'Level 2 - Information Resource Centre',
        feedbackGroup: 'library'
      },
      {
        name: 'NUS POLICY',
        location: 'Level 3 - Overlooking IRC, Social Plaza',
        feedbackGroup: 'l3open'
      },
      {
        name: 'MOVEMENT',
        location: 'Level 3 - Staircase near restrooms, Social Plaza',
        feedbackGroup: 'l3open'
      },
      {
        name: 'FUTURE TECHNOLOGIES 1',
        location: 'Level 3 - Exhibition space',
        feedbackGroup: 'exhibition'
      },
      {
        name: 'FUTURE TECHNOLOGIES 2',
        location: 'Level 3 - BEE Hub',
        feedbackGroup: 'beehub'
      },
      {
        name: 'FUTURE TECHNOLOGIES 3',
        location: 'Level 3 - Exhibition space',
        feedbackGroup: 'exhibition'
      }
    ]
  },
  {
    name: 'TROPICAL ARCHITECTURE TRAIL',
    stations: [
      {
        name: 'TROPICAL ARCHITECTURE TRAIL',
        location: 'Level 4 - Terrace',
        feedbackGroup: 'l4open'
      },
      {
        name: 'BUILDING FORM',
        location: 'Level 4 - Terrace',
        feedbackGroup: 'l4open'
      },
      {
        name: 'ENVELOPE DESIGN',
        location: 'Level 4 - Service lift lobby',
        feedbackGroup: 'l4open'
      },
      {
        name: 'NATURAL VENTILATION',
        location: 'Level 4 - Terrace',
        feedbackGroup: 'l4open'
      },
      {
        name: 'LANDSCAPE DESIGN',
        location: 'Level 4 - Corridor next to link bridge to SDE3',
        feedbackGroup: 'l4open'
      },
      {
        name: 'FUTURE TECHNOLOGIES 1',
        location: 'Level 4 - Terrace',
        feedbackGroup: 'l4open'
      },
      {
        name: 'FUTURE TECHNOLOGIES 2',
        location: 'Level 4 - Hot Desking Studio',
        feedbackGroup: 'l4studio'
      }
    ]
  },
  {
    name: 'HYBRID COOLING TRAIL',
    stations: [
      {
        name: 'HYBRID COOLING TRAIL',
        location: 'Level 5 - Corridor next to 3D Scanning Lab',
        feedbackGroup: 'l5open'
      },
      {
        name: 'ADAPTIVE COMFORT',
        location: 'Level 5 - Design Studio, opposite DIC studio',
        feedbackGroup: 'l5east'
      },
      {
        name: 'MIXED MODE',
        location: 'Level 5 - Design Studio, opposite DIC studio',
        feedbackGroup: 'l5east'
      },
      {
        name: 'ENHANCED IEQ',
        location: 'Level 5 - Design Studio, opposite Forum',
        feedbackGroup: 'l5west'
      },
      {
        name: 'FUTURE TECHNOLOGIES 1',
        location: 'Level 5 - Design Studio, opposite computer lab',
        feedbackGroup: 'l5west'
      },
      {
        name: 'FUTURE TECHNOLOGIES 2',
        location: 'Level 5 - Design Studio, opposite MA studio',
        feedbackGroup: 'l5west'
      }
    ]
  },
  {
    name: 'NET ZERO ENERGY TRAIL',
    stations: [
      {
        name: 'NET ZERO ENERGY TRAIL',
        location: 'Level 7 - Viewing Deck, Roof',
        feedbackGroup: 'l6open'
      },
      {
        name: 'ENERGY GENERATION',
        location: 'Level 6 - Corridor outside architecture studio',
        feedbackGroup: 'l6studio'
      },
      {
        name: 'DEMAND REDUCTION',
        location: 'Level 6 - Architecture Studio',
        feedbackGroup: 'l6studio'
      },
      {
        name: 'CO WORKING',
        location: 'Level 6 - Architecture Studio',
        feedbackGroup: 'l6studio'
      },
      {
        name: 'FUTURE TECHNOLOGIES 1',
        location: 'Level 6 - Architecture Studio',
        feedbackGroup: 'l6studio'
      }
    ]
  }
]

export const stationFeedbackMap = trailsDefs.reduce((all, def) => {
  def.stations.forEach(station => {
    all[def.name + '/' + station.name] = station.feedbackGroup
  })
  return all
}, {})
