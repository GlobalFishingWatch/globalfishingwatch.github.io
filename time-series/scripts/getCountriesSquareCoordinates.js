#!/usr/bin/env node

var parseString = require('xml2js').parseString
var xml = require('fs').readFileSync('./countriesTransform.svg')
var outCountries= {}
parseString(xml, function (err, result) {
  var countries = result.svg.g[0].g[0].g
  countries.forEach(country => {
    var name = country.text[0].tspan[0]._
    var transform = country.$.transform
    outCountries[name] = transform
  })
  console.log('window.countriesTransform = ')
  console.dir(outCountries)
});
