const d3 = window.d3

const COUNTRIES = [['WLD','All countries'],['NCH','All countries except China'],['AFG','Afghanistan'],['ALB','Albania'],['DZA','Algeria'],['AGO','Angola'],['ARG','Argentina'],['ARM','Armenia'],['AUS','Australia'],['AUT','Austria'],['AZE','Azerbaijan'],['BHS','Bahamas'],['BGD','Bangladesh'],['BLR','Belarus'],['BEL','Belgium'],['BLZ','Belize'],['BEN','Benin'],['BTN','Bhutan'],['BOL','Bolivia'],['BIH','Bosnia & Herzegovina'],['BWA','Botswana'],['BRA','Brazil'],['BRN','Brunei Darussalam'],['BGR','Bulgaria'],['BFA','Burkina Faso'],['BDI','Burundi'],['CPV','Cabo Verde'],['KHM','Cambodia'],['CMR','Cameroon'],['CAN','Canada'],['CAF','Central African Rep'],['TCD','Chad'],['CHL','Chile'],['CHN','China'],['COL','Colombia'],['COM','Comoros'],['COD','Congo (DRC) '],['COG','Congo'],['CRI','Costa Rica'],['CIV','Cote d\'Ivoire'], ['HRV','Croatia'],['CUB','Cuba'],['CYP','Cyprus'],['CZE','Czech Republic'],['DNK','Denmark'],['DJI','Djibouti'],['DOM','Dominican Republic'],['ECU','Ecuador'],['EGY','Egypt'],['SLV','El Salvador'],['GNQ','Equatorial Guinea'],['ERI','Eritrea'],['EST','Estonia'],['ETH','Ethiopia'],['FJI','Fiji'],['FIN','Finland'],['FRA','France'],['GAB','Gabon'],['GMB','Gambia'],['GEO','Georgia'],['DEU','Germany'],['GHA','Ghana'],['GRC','Greece'],['GTM','Guatemala'],['GNB','Guinea-Bissau'],['GIN','Guinea'],['GUY','Guyana'],['HTI','Haiti'],['HND','Honduras'],['HUN','Hungary'],['ISL','Iceland'],['IND','India'],['IDN','Indonesia'],['IRN','Iran'],['IRQ','Iraq'],['IRL','Ireland'],['ISR','Israel'],['ITA','Italy'],['JPN','Japan'],['JOR','Jordan'],['KAZ','Kazakhstan'],['KEN','Kenya'],['KWT','Kuwait'],['KGZ','Kyrgyzstan'],['LAO','Laos'],['LVA','Latvia'],['LBN','Lebanon'],['LSO','Lesotho'],['LBR','Liberia'],['LBY','Libya'],['LTU','Lithuania'],['LUX','Luxembourg'],['MKD','Macedonia'],['MDG','Madagascar'],['MWI','Malawi'],['MYS','Malaysia'],['MLI','Mali'],['MRT','Mauritania'],['MUS','Mauritius'],['MEX','Mexico'],['MDA','Moldova'],['MNG','Mongolia'],['MAR','Morocco'],['MOZ','Mozambique'],['NAM','Namibia'],['NPL','Nepal'],['NLD','Netherlands'],['NZL','New Zealand'],['NIC','Nicaragua'],['NER','Niger'],['NGA','Nigeria'],['NOR','Norway'],['OMN','Oman'],['PAK','Pakistan'],['PAN','Panama'],['PNG','Papua New Guinea'],['PRY','Paraguay'],['PER','Peru'],['PHL','Philippines'],['POL','Poland'],['PRT','Portugal'],['PRI','Puerto Rico'],['QAT','Qatar'],['ROU','Romania'],['RUS','Russian Federation'],['RWA','Rwanda'],['VCT','Saint Vincent'],['WSM','Samoa'],['STP','Sao Tome & Principe'],['SAU','Saudi Arabia'],['SEN','Senegal'],['SRB','Serbia'],['SLE','Sierra Leone'],['SVK','Slovakia'],['SVN','Slovenia'],['SLB','Solomon Islands'],['ZAF','South Africa'],['KOR','South Korea'],['ESP','Spain'],['LKA','Sri Lanka'],['SDN','Sudan'],['SUR','Suriname'],['SWZ','Swaziland'],['SWE','Sweden'],['CHE','Switzerland'],['SYR','Syria'],['TJK','Tajikistan'],['TZA','Tanzania'],['THA','Thailand'],['TGO','Togo'],['TTO','Trinidad and Tobago'],['TUN','Tunisia'],['TUR','Turkey'],['TKM','Turkmenistan'],['UGA','Uganda'],['UKR','Ukraine'],['ARE','United Arab Emirates'],['GBR','United Kingdom'],['USA','United States'],['URY','Uruguay'],['UZB','Uzbekistan'],['VUT','Vanuatu'],['VEN','Venezuela'],['VNM','Vietnam'],['YEM','Yemen'],['ZMB','Zambia'],['ZWE','Zimbabwe'],['TWN', 'Taiwan'],['FRO', 'Faroe Islands'],['GRL','Greenland'],['FLK','Falkland Islands'],['NCL','New Caledonia'],['GUF', 'French Guiana'],['REU','Reunion'],['SYC', 'Seychelles'],['FSM', 'Micronesia, Federated States of'],['MLT','Malta'],['KIR','Kiribati'],['MHL','Marshall Islands']]
const NO_COUNTRY = '___'
const NUM_CHARTS = 2
const TOP_NUM = 40
const BASE_SHARE_URL = 'http://globalfishingwatch.io/time-series'
const BASE_SHARE_IFRAME_CODE = '<iframe allowfullscreen="true" width="730" height="650" src="$baseUrl" />'

const ANNOTATIONS = {
  // CHN: [[new Date(2016, 6, 1), 'Moratorium']]
}

const allData = {}
const allDataArr = []
const charts = []
let originalX = null, currentX = null
const timeline = {}
let baseWidth = 0
let chartCompareHideBtn = null
let container = null
let variableTypeRadios = null
let zoomRadios = null
let map = null, mapCountries = null
let shareDom = {}

const parseTime = d3.timeParse('%Y-%m-%d')

// decode url state
let urlState
if (window.location.hash !== '') {
  let urlStateArr = window.location.hash.replace('#', '').split(',')
  if (urlStateArr.length === 5) {
    urlState = urlStateArr
  }
}

let currentlyZoomedOut = urlState ? urlState[3] === 'true' : false
let currentIso3s = urlState ? [urlState[0], urlState[1]] : ['CHN', NO_COUNTRY]
let currentVariableType = urlState ? urlState[2] : 'fishing'
let currentAllowMap = urlState ? urlState[4] === 'true' : true

let currentlyPlaying = false
let currentPlayX = 0
let currentPlayTimeout = null


const margin = {top: 20, right: 20, bottom: 18, left: 45}
let width = 0, height = 0

const update = (i) => {
  const chart = charts[i]
  const countryIso3 = currentIso3s[i]
  const country = allData[countryIso3]

  if (i === 1) {
    chart.dom.chart.classed('-hidden', countryIso3 === NO_COUNTRY)
    chartCompareHideBtn.classed('-hidden', countryIso3 === NO_COUNTRY)
  }

  variableTypeRadios.property('checked', (d, i) =>
    (i === 0 && currentVariableType === 'fishing') || (i === 1 && currentVariableType === 'vessels'))
  zoomRadios.property('checked', (d, i) =>
    (i === 0 && currentlyZoomedOut === false) || (i === 1 && currentlyZoomedOut === true))

  chart.dom.selector
    .selectAll('option')
    .property('selected', d => d.iso3 === currentIso3s[i])

  chart.dom.selectorFlag.html((country) ? window.flags[country.name] : '')

  // save state
  window.location.hash = [currentIso3s[0], currentIso3s[1], currentVariableType, currentlyZoomedOut, currentAllowMap].join(',')
  const baseUrl = `${BASE_SHARE_URL}${window.location.hash}`
  shareDom.link.value = baseUrl
  shareDom.linkCopy.innerText = 'Copy'
  shareDom.iframe.value = BASE_SHARE_IFRAME_CODE.replace('$baseUrl', baseUrl)
  shareDom.iframeCopy.innerText = 'Copy'

  chart.data = country.data

  chart.accessors.y.domain(d3.extent(chart.data, d => (currentVariableType === 'fishing') ? d.fishing : d.vessels))

  chart.dom.xAxis.transition()
    .call(chart.accessors.xAxis)

  timeline.xAxisDom.transition()
    .call(chart.accessors.xAxis)

  chart.dom.yAxis.transition()
    .call(chart.accessors.yAxis)

  chart.dom.yAxisLabel.text((currentVariableType === 'fishing') ? 'Hours of Fishing per Day' : 'Number of vessels per day')

  chart.dom.grid.transition()
    .call(chart.accessors.yAxisGrid)

  chart.dom.area.datum(chart.data)
    .transition()
    .attr('d', chart.accessors.area)

  chart.dom.line.datum(chart.data)
    .transition()
    .attr('d', chart.accessors.line)

  if (ANNOTATIONS[countryIso3]) {
    const pos = d => {
      const x = currentX(d[0])
      return `translate(${x}, 0)`
    }

    const newPoints = chart.dom.annotations.selectAll('g')
      .data(ANNOTATIONS[countryIso3])
      .enter()
      .append('g')
      .attr('transform', pos)

    newPoints.append('circle')
      .attr('r', 5)

    newPoints.append('line')
      .attr('x0', 0)
      .attr('y0', 0)
      .attr('x1', 0)
      .attr('y1', d => {
        const interpolatedValue = findValueAt(chart.data, d[0])
        return chart.accessors.y(interpolatedValue) + 2
      })

    newPoints.append('text')
      .html(d => d[1])
      .attr('x', 10)

    chart.dom.annotations.selectAll('g')
      .attr('transform', pos)
  } else {
    chart.dom.annotations.selectAll('g').remove()
  }

  mapCountries.classed('-selected', d => currentIso3s.some(c => c === d.iso3))

  onMouseMove()
}

const updateAll = () => {
  for (let i = 0; i < NUM_CHARTS; i++) update(i)
}

const findValueAt = (data, currentTime, forcedVariableType) => {
  const varType = forcedVariableType || currentVariableType
  for (let r = 0; r < data.length; r++) {
    const row = data[r]
    if (row.id > currentTime) {
      const prevRow = data[r - 1] || row
      return prevRow[varType]
    }
  }
}

const seek = (x) => {
  currentPlayX = x
  const currentDate = currentX.invert(x)
  const currentTime = currentDate.getTime()
  const currentTimeHuman = window.moment(currentTime).format('ddd, ll')

  timeline.currentDot
    .attr('cx', x)

  for (let i = 0; i < NUM_CHARTS; i++) {
    const chart = charts[i]
    const interpolatedValue = findValueAt(chart.data, currentTime)
    const interpolatedY = charts[i].accessors.y(interpolatedValue)
    if (interpolatedValue === undefined) {
      continue
    }

    chart.dom.currentDot
      .attr('cx', x)
      .attr('cy', interpolatedY)

    const currentValueHuman = Math.round(interpolatedValue).toLocaleString()
    const currentValueLabel = (currentVariableType === 'fishing') ? 'hours' : 'vessels'

    chart.dom.currentLabel
      .html(`${currentTimeHuman}: ${currentValueHuman} ${currentValueLabel}`)
      .style('left', `${x}px`)
      .style('top', `${interpolatedY}px`)
  }

  timeline.currentLabel
    .html(`${currentTimeHuman}`)
    .style('left', `${x}px`)

  mapCountries.select('.moving')
    .attr('r', d => {
      const value = findValueAt(d.data, currentTime, 'fishing')
      return (value === undefined) ? 0 : Math.sqrt(value/Math.PI)
    })

  d3.selectAll('.currentLabel').classed('-right', x > width - 220)
}

const togglePlay = () => {
  currentlyPlaying = !currentlyPlaying
  timeline.playPauseToggle.html(currentlyPlaying ? '❚ ❚' : '▶')

  if (currentlyPlaying === true) {
    currentPlayTimeout = setInterval(() => {
      currentPlayX += 1
      if (currentPlayX >= width) {
        currentPlayX = 0
        togglePlay()
      } else {
        seek(currentPlayX)
      }
    }, 60)
  } else {
    clearInterval(currentPlayTimeout)
  }
}

const toggleZoom = (zoomedOut) => {
  currentlyZoomedOut = (zoomedOut === undefined) ? !currentlyZoomedOut : zoomedOut
  d3.selectAll('.chart').classed('-zoomedOut', currentlyZoomedOut)
  const xExtent = (currentlyZoomedOut === true) ? [new Date(2012, 0), new Date(2017, 0)]: [new Date(2016, 0),  new Date(2017, 0)]
  currentX.domain(xExtent)
  updateAll()
}

const onMouseMove = () => {
  if (!charts.length || currentlyPlaying === true) {
    return
  }
  d3.selectAll('.currentDot').classed('-hidden', false)
  d3.selectAll('.currentLabel').classed('-hidden', false)

  const pageX = (d3.event !== null) ? d3.event.pageX : window.pageX || 0
  if (pageX === undefined) {
    return
  }
  window.pageX = pageX
  const offset = margin.left + 20 //body margin
  const chartX = Math.max(0, pageX - offset)
  seek(chartX)
}


const onPanned = () => {
  if (currentlyZoomedOut === true) {
    return
  }
  currentX = d3.event.transform.rescaleX(originalX)
  for (let i = 0; i < NUM_CHARTS; i++) {
    const chart = charts[i]
    chart.dom.xAxis.call(chart.accessors.xAxis.scale(currentX))
    timeline.xAxisDom.call(chart.accessors.xAxis.scale(currentX))
    chart.accessors.line.x(d => currentX(d.date))
    chart.dom.line.attr('d', chart.accessors.line)
    chart.accessors.area.x(d => currentX(d.date))
    chart.dom.area.attr('d', chart.accessors.area)
  }

}

const buildChart = () => {
  container = d3.select('#chart')

  baseWidth = Math.max(600, document.getElementById('chart').clientWidth)
  const baseChartHeight = Math.min(250, baseWidth * .16)

  width = baseWidth - margin.left - margin.right
  height = baseChartHeight - margin.top - margin.bottom

  originalX = currentX = d3.scaleTime().rangeRound([0, width])

  if (currentlyZoomedOut === false) {
    originalX.domain([new Date(2016, 0),  new Date(2017, 0)])
  }

  const topIso3 = allDataArr
    .map(d => ({ iso3: d.iso3, maxHours: d.maxHours }))
    .sort((a, b) => b.maxHours - a.maxHours)
    .slice(0, TOP_NUM)
    .map(d => d.iso3)

  const selectorCountries = allDataArr
    .map(d => ({ iso3: d.iso3, name: d.name}))
    .sort((a, b) => a.name.localeCompare(b.name))

  for (let i = 0; i < NUM_CHARTS; i++) {
    const dom = {}
    dom.chart = container.append('div')
      .attr('class', 'chart')

    const selectorContainer = dom.chart.append('div')
      .attr('class', 'selectorContainer')
    selectorContainer.append('h2').html(i === 0 ? 'Country:' : 'Compare with:')
    const selectorContainerLabel = selectorContainer.append('label')
      .attr('class', 'selectorContainerLabel')
    dom.selector = selectorContainerLabel.append('select')
      .attr('class', 'selector')
    dom.selectorFlag = selectorContainerLabel.append('div')
      .attr('class', 'selectorFlag')


    if (i === 1) {
      chartCompareHideBtn = selectorContainer.append('button')
        .html('hide')
        .attr('class', 'chartCompareHideBtn')
    }

    dom.selector
      .selectAll('option')
      .data(selectorCountries)
      .enter()
      .append('option')
      .attr('value', d => d.iso3)
      .property('hidden', d => topIso3.indexOf(d.iso3) ===  -1)
      .html(d => d.name)

    dom.svg = dom.chart.append('svg')
      .attr('width', baseWidth)
      .attr('height', baseChartHeight)
    dom.g = dom.svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


    const accessors = {
      y: d3.scaleLinear()
        .rangeRound([height, 0])
    }

    accessors.xAxis = d3.axisBottom().scale(originalX)
    accessors.yAxis = d3.axisLeft().scale(accessors.y)
      .tickArguments([4])
      .tickSize(0)
    accessors.yAxisGrid = d3.axisLeft().scale(accessors.y)
      .tickArguments([4])
      .tickFormat('')
      .tickSize(-width)

    accessors.zoom = d3.zoom()
      // .scaleExtent([1, 10])
      .on('zoom', onPanned)
      .on('start', () => {
        d3.selectAll('.currentDot').classed('-hidden', true)
        d3.selectAll('.currentLabel').classed('-hidden', true)
      })

    accessors.line = d3.line()
      .curve(d3.curveCardinal)
      .x(d => originalX(d.date))
      .y(d => accessors.y((currentVariableType === 'fishing') ? d.fishing : d.vessels))

    accessors.area = d3.area()
      .curve(d3.curveCardinal)
      .x(d => originalX(d.date))
      .y1(d => accessors.y((currentVariableType === 'fishing') ? d.fishing : d.vessels))
      .y0(accessors.y(0))

    // dom ---

    dom.scrollable = dom.g.append('g')
      .attr('class', 'scrollable')

    dom.scrollable.append('rect')
      .attr('width', width)
      .attr('height', height)

    dom.grid = dom.scrollable.append('g')
      .attr('class', 'grid')
      .call(accessors.yAxisGrid)

    dom.area = dom.scrollable.append('path')
      .attr('class', 'area')

    dom.line = dom.scrollable.append('path')
      .attr('class', 'line')

    // cache
    dom.g.append('rect')
      .attr('x', -margin.left)
      .attr('width', margin.left)
      .attr('height', height + 20)

    dom.xAxisContainer = dom.g.append('g')
      .attr('class', 'xAxisContainer')

    dom.xAxisContainer.append('rect')
      .attr('y', height)
      .attr('width', width)
      .attr('height', 20)

    dom.xAxis = dom.xAxisContainer.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(accessors.xAxis)

    dom.yAxis = dom.g.append('g')
    dom.yAxisLabel = dom.yAxis.call(accessors.yAxis)
      .append('text')
      .attr('class', 'yAxis-text')
      // .attr('transform', 'rotate(-90)')
      // .attr('y', 6)
      // .attr('dy', '0.71em')
      .attr('text-anchor', 'start')
      .attr('x', 5)
      .attr('y', 10)

    dom.currentDot = dom.g.append('circle')
      .attr('class', 'currentDot')
      .attr('r', 5)

    dom.currentLabel = dom.chart.append('div')
      .attr('class', 'currentLabel')

    dom.annotations = dom.g.append('g')
      .attr('class', 'annotations')

    // events --
    variableTypeRadios = d3.selectAll('input[name="variableType"]').on('change', () => {
      currentVariableType = d3.event.currentTarget.value
      updateAll()
    })
    zoomRadios = d3.selectAll('input[name="zoom"]').on('change', () => {
      toggleZoom(d3.event.currentTarget.value === 'zoomedOut')
    })

    dom.selector.on('change', function () {
      currentIso3s[i] = d3.select(this).property('value')
      d3.event.stopPropagation()
      update(i)
      return false
    })

    dom.selector.on('click', () => {
      d3.event.stopPropagation()
      return false
    })

    dom.xAxisContainer.on('click', () => {
      toggleZoom()
    })

    dom.scrollable.call(accessors.zoom).on('wheel.zoom', null)

    dom.scrollable.on('mousemove', onMouseMove)



    charts.push({
      dom,
      accessors,
      data: []
    })
  }

  chartCompareHideBtn.on('click', () => {
    currentIso3s[1] = NO_COUNTRY
    d3.event.stopPropagation()
    update(1)
    return false
  })
}


const buildMap = () => {
  //mapTitle = container.append('h2')
  const mapSvg = container.append('svg')
    .attr('class', 'map')
    .attr('viewBox', '0 0 1130 580')
    .attr('preserveAspectRatio', 'xMidYMin meet')
    .classed('-hidden', currentAllowMap === false)

  document.querySelector('.map').innerHTML = '<pattern id="diagonalHatch" width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">\n' +
    '  <line x1="0" y1="0" x2="0" y2="4" style="stroke:#8abbc7; stroke-width:.4" />\n' +
    '</pattern>'

  map = mapSvg.append('g')
    .attr('transform', 'translate(1, 1)')
  mapCountries = map
    .selectAll('g')
    .data(allDataArr.filter(d => ['WLD','NCH', NO_COUNTRY].indexOf(d.iso3) === -1))
    .enter()
    .append('g')
    .attr('class', 'country')
    .attr('transform', d => window.countriesTransform[d.name])
    .classed('-small', d => d.maxHours < 500 && ['MEX', 'MNG', 'MUS'].indexOf(d.iso3) === -1)

  mapCountries
    .append('circle')
    .attr('class', 'static')
    .attr('r', d => d.maxHoursR)
    .attr('cx', d => d.maxHoursR)
    .attr('cy', d => d.maxHoursR)
    // .attr('fill', '#ff0000')

  mapCountries
    .append('circle')
    .attr('class', 'moving')
    .attr('cx', d => d.maxHoursR)
    .attr('cy', d => d.maxHoursR)

  mapCountries
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', d => d.maxHoursR)
    .attr('y', d => d.maxHoursR - 6)
    // .attr('font-size', 1)
    .html(d => d.name)

  mapCountries.on('click', (d) => {
    const currentLineChartToShow = (currentIso3s[1] === NO_COUNTRY) ? 0 : 1
    currentIso3s[currentLineChartToShow] = d.iso3
    update(currentLineChartToShow)
  })


  const legend = map.append('g')
    .attr('class', 'country legend')
    .attr('transform', 'translate(0, 565)')
  legend.append('circle')
    .attr('class', 'static')
    .attr('r', 8)
    .attr('cx', 12)
  legend.append('text')
    .html('maximum extent')
    .attr('x', 26)
    .attr('y', -7)
  legend.append('circle')
    .attr('class', 'moving')
    .attr('r', 8)
    .attr('cx', 170)
  legend.append('text')
    .html('value for current day')
    .attr('x', 185)
    .attr('y', -7)


  const timelineDom = container.append('div')
    .attr('class', 'timeline')
    .classed('-hidden', currentAllowMap === false)

  const timelineSvg = timelineDom.append('svg')
    .attr('width', baseWidth)
    .attr('height', 40)

  const g = timelineSvg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  timeline.xAxisDom = g.append('g')
  timeline.xAxisDom
    .call(charts[0].accessors.xAxis)

  timeline.currentDot = g.append('circle')
    .attr('class', 'currentDot')
    .attr('r', 5)

  timeline.currentLabel = timelineDom.append('div')
    .attr('class', 'currentLabel')

  timeline.playPauseToggle = timelineDom.append('button')
    .attr('class', 'playPauseToggle')
    .html('▶')
    .on('click', () => {
      togglePlay()
    })
}

const buildShare = () => {
  shareDom = {
    link: document.querySelector('.js-share-content-link'),
    iframe: document.querySelector('.js-share-content-iframe'),
    linkCopy: document.querySelector('.js-share-content-link-copy'),
    iframeCopy: document.querySelector('.js-share-content-iframe-copy')
  }

  shareDom.linkCopy.addEventListener('click', () => {
    shareDom.link.select()
    document.execCommand('copy')
    shareDom.linkCopy.innerText = 'Copied !'
  })
  shareDom.iframeCopy.addEventListener('click', () => {
    shareDom.iframe.select()
    document.execCommand('copy')
    shareDom.iframeCopy.innerText = 'Copied !'
  })
}

let headers = new Headers()
headers.append('Authorization', 'Basic ' + btoa('gfw:fishing'))

fetch('./allcountries2012-2016.csv', {
  method:'GET',
  headers
})
  .then(resp => resp.text())
  .then(csv => {
    d3.csvParse(csv, d => {
      const iso3 = d.flag
      if (allData[iso3] === undefined) {
        const country = COUNTRIES.find(c => c[0] === iso3)
        if (country === undefined) {
          return
        }
        allData[iso3] = {
          iso3,
          name: country[1],
          data: [],
        }
      }
      const date = parseTime(d.date)
      const id = date.getTime()
      allData[iso3].data.push({
        id,
        date,
        fishing: +d.fishing_hours,
        vessels: +d.vessels_fishing
      })
    })


    Object.keys(allData).forEach(iso3 => {
      const country = allData[iso3]
      const countryData = country.data.sort((da, db) => da.id - db.id)
      country.maxHours = d3.max(countryData, d => d.fishing)
      country.maxHoursR = Math.sqrt(country.maxHours/Math.PI)

      allDataArr.push(country)
    })

    allData[NO_COUNTRY] = {
      iso3: NO_COUNTRY,
      name: '< Select...>',
      data: [],
      maxHours: 999999
    }
    allDataArr.push(allData[NO_COUNTRY])


    buildShare()
    buildChart()
    buildMap()
    updateAll()
    toggleZoom(currentlyZoomedOut)
  })

