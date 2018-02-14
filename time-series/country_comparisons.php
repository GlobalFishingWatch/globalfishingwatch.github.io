<?php 
  // This php allows us to adjust the height and width of the interactive
  // the map is set to be 200 px shorther than this height, to give room for 
  // the header and footer
  $iso3 = (isset($_GET['iso3']))? $_GET['iso3'] : "WLD";
  $region = $iso3;

  $year = (isset($_GET['year']))? $_GET['year'] : "ALL";
?>


<!DOCTYPE html>
<div id="chart"></div>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script>

var iso3 = "<?php echo($iso3);?>";
var year = "<?php echo($year);?>";

function countryChart(iso3, year){
  console.log(iso3);

  year = year.toString()
  if(year == "ALL"){year = ""}

  d3.select("#chart svg").remove(); // remove old svg if it exists
  // d3.select("#chart div").remove(); // remove old svg if it exists

   d3.select("#chart")
     .append("svg")
     .attr("width",900)
     .attr("height",300);

  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y-%m-%d");

  var x = d3.scaleTime()
      .rangeRound([0, width]);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.fishing); });

  d3.csv("countries"+year+"/"+iso3+".csv", function(d) {
    d.date = parseTime(d.date);
    d.fishing = +d.fishing;
    return d;
  }, function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.fishing; }));

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Hours of Fishing per Day");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
  });

}

countryChart(iso3,year);

</script>

<form name="map_select", onchange="javascript:countryChart(document.getElementById('s').value, document.getElementById('y').value)"> 
<select name='s' id='s' size='1' class'myDropdown'> 
<option <?php if ($region==WLD) {echo "selected";} ?>  value="WLD">The World</option>
<option value="--"> -- </option>
<option <?php if ($region==AFG) {echo "selected";} ?>  value="AFG">Afghanistan</option>
<option <?php if ($region==ALB) {echo "selected";} ?>   value="ALB">Albania</option>
<option <?php if ($region==DZA) {echo "selected";} ?>   value="DZA">Algeria</option>
<option <?php if ($region==AGO) {echo "selected";} ?>   value="AGO">Angola</option>
<option <?php if ($region==ARG) {echo "selected";} ?>   value="ARG">Argentina</option>
<option <?php if ($region==ARM) {echo "selected";} ?>   value="ARM">Armenia</option>
<option <?php if ($region==AUS) {echo "selected";} ?>   value="AUS">Australia</option>
<option <?php if ($region==AUT) {echo "selected";} ?>   value="AUT">Austria</option>
<option <?php if ($region==AZE) {echo "selected";} ?>   value="AZE">Azerbaijan</option>
<option <?php if ($region==BHS) {echo "selected";} ?>   value="BHS">Bahamas</option>
<option <?php if ($region==BGD) {echo "selected";} ?>   value="BGD">Bangladesh</option>
<option <?php if ($region==BLR) {echo "selected";} ?>   value="BLR">Belarus</option>
<option <?php if ($region==BEL) {echo "selected";} ?>   value="BEL">Belgium</option>
<option <?php if ($region==BLZ) {echo "selected";} ?>   value="BLZ">Belize</option>
<option <?php if ($region==BEN) {echo "selected";} ?>   value="BEN">Benin</option>
<option <?php if ($region==BTN) {echo "selected";} ?>   value="BTN">Bhutan</option>
<option <?php if ($region==BOL) {echo "selected";} ?>   value="BOL">Bolivia</option>
<option <?php if ($region==BIH) {echo "selected";} ?>   value="BIH">Bosnia & Herzegovina</option>
<option <?php if ($region==BWA) {echo "selected";} ?>   value="BWA">Botswana</option>
<option <?php if ($region==BRA) {echo "selected";} ?>   value="BRA">Brazil</option>
<option <?php if ($region==BRN) {echo "selected";} ?>   value="BRN">Brunei Darussalam</option>
<option <?php if ($region==BGR) {echo "selected";} ?>   value="BGR">Bulgaria</option>
<option <?php if ($region==BFA) {echo "selected";} ?>   value="BFA">Burkina Faso</option>
<option <?php if ($region==BDI) {echo "selected";} ?>   value="BDI">Burundi</option>
<option <?php if ($region==CPV) {echo "selected";} ?>   value="CPV">Cabo Verde</option>
<option <?php if ($region==KHM) {echo "selected";} ?>   value="KHM">Cambodia</option>
<option <?php if ($region==CMR) {echo "selected";} ?>   value="CMR">Cameroon</option>
<option <?php if ($region==CAN) {echo "selected";} ?>   value="CAN">Canada</option>
<option <?php if ($region==CAF) {echo "selected";} ?>   value="CAF">Central African Rep.</option>
<option <?php if ($region==TCD) {echo "selected";} ?>   value="TCD">Chad</option>
<option <?php if ($region==CHL) {echo "selected";} ?>   value="CHL">Chile</option>
<option <?php if ($region==CHN) {echo "selected";} ?>   value="CHN">China</option>
<option <?php if ($region==COL) {echo "selected";} ?>   value="COL">Colombia</option>
<option <?php if ($region==COM) {echo "selected";} ?>   value="COM">Comoros</option>
<option <?php if ($region==COD) {echo "selected";} ?>   value="COD">Congo (DRC) </option>
<option <?php if ($region==COG) {echo "selected";} ?>   value="COG">Congo</option>
<option <?php if ($region==CRI) {echo "selected";} ?>   value="CRI">Costa Rica</option>
<option <?php if ($region==CIV) {echo "selected";} ?>   value="CIV">Cote d'Ivoire</option>
<option <?php if ($region==HRV) {echo "selected";} ?>   value="HRV">Croatia</option>
<option <?php if ($region==CUB) {echo "selected";} ?>   value="CUB">Cuba</option>
<option <?php if ($region==CYP) {echo "selected";} ?>   value="CYP">Cyprus</option>
<option <?php if ($region==CZE) {echo "selected";} ?>   value="CZE">Czech Republic</option>
<option <?php if ($region==DNK) {echo "selected";} ?>   value="DNK">Denmark</option>
<option <?php if ($region==DJI) {echo "selected";} ?>   value="DJI">Djibouti</option>
<option <?php if ($region==DOM) {echo "selected";} ?>   value="DOM">Dominican Republic</option>
<option <?php if ($region==ECU) {echo "selected";} ?>   value="ECU">Ecuador</option>
<option <?php if ($region==EGY) {echo "selected";} ?>   value="EGY">Egypt</option>
<option <?php if ($region==SLV) {echo "selected";} ?>   value="SLV">El Salvador</option>
<option <?php if ($region==GNQ) {echo "selected";} ?>   value="GNQ">Equatorial Guinea</option>
<option <?php if ($region==ERI) {echo "selected";} ?>   value="ERI">Eritrea</option>
<option <?php if ($region==EST) {echo "selected";} ?>   value="EST">Estonia</option>
<option <?php if ($region==ETH) {echo "selected";} ?>   value="ETH">Ethiopia</option>
<option <?php if ($region==FJI) {echo "selected";} ?>   value="FJI">Fiji</option>
<option <?php if ($region==FIN) {echo "selected";} ?>   value="FIN">Finland</option>
<option <?php if ($region==FRA) {echo "selected";} ?>   value="FRA">France</option>
<option <?php if ($region==GAB) {echo "selected";} ?>   value="GAB">Gabon</option>
<option <?php if ($region==GMB) {echo "selected";} ?>   value="GMB">Gambia</option>
<option <?php if ($region==GEO) {echo "selected";} ?>   value="GEO">Georgia</option>
<option <?php if ($region==DEU) {echo "selected";} ?>   value="DEU">Germany</option>
<option <?php if ($region==GHA) {echo "selected";} ?>   value="GHA">Ghana</option>
<option <?php if ($region==GRC) {echo "selected";} ?>   value="GRC">Greece</option>
<option <?php if ($region==GTM) {echo "selected";} ?>   value="GTM">Guatemala</option>
<option <?php if ($region==GNB) {echo "selected";} ?>   value="GNB">Guinea-Bissau</option>
<option <?php if ($region==GIN) {echo "selected";} ?>   value="GIN">Guinea</option>
<option <?php if ($region==GUY) {echo "selected";} ?>   value="GUY">Guyana</option>
<option <?php if ($region==HTI) {echo "selected";} ?>   value="HTI">Haiti</option>
<option <?php if ($region==HND) {echo "selected";} ?>   value="HND">Honduras</option>
<option <?php if ($region==HUN) {echo "selected";} ?>   value="HUN">Hungary</option>
<option <?php if ($region==ISL) {echo "selected";} ?>   value="ISL">Iceland</option>
<option <?php if ($region==IND) {echo "selected";} ?>   value="IND">India</option>
<option <?php if ($region==IDN) {echo "selected";} ?>   value="IDN">Indonesia</option>
<option <?php if ($region==IRN) {echo "selected";} ?>   value="IRN">Iran</option>
<option <?php if ($region==IRQ) {echo "selected";} ?>   value="IRQ">Iraq</option>
<option <?php if ($region==IRL) {echo "selected";} ?>   value="IRL">Ireland</option>
<option <?php if ($region==ISR) {echo "selected";} ?>   value="ISR">Israel</option>
<option <?php if ($region==ITA) {echo "selected";} ?>   value="ITA">Italy</option>
<option <?php if ($region==JPN) {echo "selected";} ?>   value="JPN">Japan</option>
<option <?php if ($region==JOR) {echo "selected";} ?>   value="JOR">Jordan</option>
<option <?php if ($region==KAZ) {echo "selected";} ?>   value="KAZ">Kazakhstan</option>
<option <?php if ($region==KEN) {echo "selected";} ?>   value="KEN">Kenya</option>
<option <?php if ($region==KWT) {echo "selected";} ?>   value="KWT">Kuwait</option>
<option <?php if ($region==KGZ) {echo "selected";} ?>   value="KGZ">Kyrgyzstan</option>
<option <?php if ($region==LAO) {echo "selected";} ?>   value="LAO">Laos</option>
<option <?php if ($region==LVA) {echo "selected";} ?>   value="LVA">Latvia</option>
<option <?php if ($region==LBN) {echo "selected";} ?>   value="LBN">Lebanon</option>
<option <?php if ($region==LSO) {echo "selected";} ?>   value="LSO">Lesotho</option>
<option <?php if ($region==LBR) {echo "selected";} ?>   value="LBR">Liberia</option>
<option <?php if ($region==LBY) {echo "selected";} ?>   value="LBY">Libya</option>
<option <?php if ($region==LTU) {echo "selected";} ?>   value="LTU">Lithuania</option>
<option <?php if ($region==LUX) {echo "selected";} ?>   value="LUX">Luxembourg</option>
<option <?php if ($region==MKD) {echo "selected";} ?>   value="MKD">Macedonia</option>
<option <?php if ($region==MDG) {echo "selected";} ?>   value="MDG">Madagascar</option>
<option <?php if ($region==MWI) {echo "selected";} ?>   value="MWI">Malawi</option>
<option <?php if ($region==MYS) {echo "selected";} ?>   value="MYS">Malaysia</option>
<option <?php if ($region==MLI) {echo "selected";} ?>   value="MLI">Mali</option>
<option <?php if ($region==MRT) {echo "selected";} ?>   value="MRT">Mauritania</option>
<option <?php if ($region==MUS) {echo "selected";} ?>   value="MUS">Mauritius</option>
<option <?php if ($region==MEX) {echo "selected";} ?>   value="MEX">Mexico</option>
<option <?php if ($region==MDA) {echo "selected";} ?>   value="MDA">Moldova</option>
<option <?php if ($region==MNG) {echo "selected";} ?>   value="MNG">Mongolia</option>
<option <?php if ($region==MAR) {echo "selected";} ?>   value="MAR">Morocco</option>
<option <?php if ($region==MOZ) {echo "selected";} ?>   value="MOZ">Mozambique</option>
<option <?php if ($region==NAM) {echo "selected";} ?>   value="NAM">Namibia</option>
<option <?php if ($region==NPL) {echo "selected";} ?>   value="NPL">Nepal</option>
<option <?php if ($region==NLD) {echo "selected";} ?>   value="NLD">Netherlands</option>
<option <?php if ($region==NZL) {echo "selected";} ?>   value="NZL">New Zealand</option>
<option <?php if ($region==NIC) {echo "selected";} ?>   value="NIC">Nicaragua</option>
<option <?php if ($region==NER) {echo "selected";} ?>   value="NER">Niger</option>
<option <?php if ($region==NGA) {echo "selected";} ?>   value="NGA">Nigeria</option>
<option <?php if ($region==NOR) {echo "selected";} ?>   value="NOR">Norway</option>
<option <?php if ($region==OMN) {echo "selected";} ?>   value="OMN">Oman</option>
<option <?php if ($region==PAK) {echo "selected";} ?>   value="PAK">Pakistan</option>
<option <?php if ($region==PAN) {echo "selected";} ?>   value="PAN">Panama</option>
<option <?php if ($region==PNG) {echo "selected";} ?>   value="PNG">Papua New Guinea</option>
<option <?php if ($region==PRY) {echo "selected";} ?>   value="PRY">Paraguay</option>
<option <?php if ($region==PER) {echo "selected";} ?>   value="PER">Peru</option>
<option <?php if ($region==PHL) {echo "selected";} ?>   value="PHL">Philippines</option>
<option <?php if ($region==POL) {echo "selected";} ?>   value="POL">Poland</option>
<option <?php if ($region==PRT) {echo "selected";} ?>   value="PRT">Portugal</option>
<option <?php if ($region==PRI) {echo "selected";} ?>   value="PRI">Puerto Rico</option>
<option <?php if ($region==QAT) {echo "selected";} ?>   value="QAT">Qatar</option>
<option <?php if ($region==ROU) {echo "selected";} ?>   value="ROU">Romania</option>
<option <?php if ($region==RUS) {echo "selected";} ?>   value="RUS">Russian Federation</option>
<option <?php if ($region==RWA) {echo "selected";} ?>   value="RWA">Rwanda</option>
<option <?php if ($region==VCT) {echo "selected";} ?>   value="VCT">Saint Vincent</option>
<option <?php if ($region==WSM) {echo "selected";} ?>   value="WSM">Samoa</option>
<option <?php if ($region==STP) {echo "selected";} ?>   value="STP">Sao Tome & Principe</option>
<option <?php if ($region==SAU) {echo "selected";} ?>   value="SAU">Saudi Arabia</option>
<option <?php if ($region==SEN) {echo "selected";} ?>   value="SEN">Senegal</option>
<option <?php if ($region==SRB) {echo "selected";} ?>   value="SRB">Serbia</option>
<option <?php if ($region==SLE) {echo "selected";} ?>   value="SLE">Sierra Leone</option>
<option <?php if ($region==SVK) {echo "selected";} ?>   value="SVK">Slovakia</option>
<option <?php if ($region==SVN) {echo "selected";} ?>   value="SVN">Slovenia</option>
<option <?php if ($region==SLB) {echo "selected";} ?>   value="SLB">Solomon Islands</option>
<option <?php if ($region==ZAF) {echo "selected";} ?>   value="ZAF">South Africa</option>
<option <?php if ($region==KOR) {echo "selected";} ?>   value="KOR">South Korea</option>
<option <?php if ($region==ESP) {echo "selected";} ?>   value="ESP">Spain</option>
<option <?php if ($region==LKA) {echo "selected";} ?>   value="LKA">Sri Lanka</option>
<option <?php if ($region==SDN) {echo "selected";} ?>   value="SDN">Sudan</option>
<option <?php if ($region==SUR) {echo "selected";} ?>   value="SUR">Suriname</option>
<option <?php if ($region==SWZ) {echo "selected";} ?>   value="SWZ">Swaziland</option>
<option <?php if ($region==SWE) {echo "selected";} ?>   value="SWE">Sweden</option>
<option <?php if ($region==CHE) {echo "selected";} ?>   value="CHE">Switzerland</option>
<option <?php if ($region==SYR) {echo "selected";} ?>   value="SYR">Syria</option>
<option <?php if ($region==TJK) {echo "selected";} ?>   value="TJK">Tajikistan</option>
<option <?php if ($region==TZA) {echo "selected";} ?>   value="TZA">Tanzania</option>
<option <?php if ($region==THA) {echo "selected";} ?>   value="THA">Thailand</option>
<option <?php if ($region==TGO) {echo "selected";} ?>   value="TGO">Togo</option>
<option <?php if ($region==TTO) {echo "selected";} ?>   value="TTO">Trinidad and Tobago</option>
<option <?php if ($region==TUN) {echo "selected";} ?>   value="TUN">Tunisia</option>
<option <?php if ($region==TUR) {echo "selected";} ?>   value="TUR">Turkey</option>
<option <?php if ($region==TKM) {echo "selected";} ?>   value="TKM">Turkmenistan</option>
<option <?php if ($region==UGA) {echo "selected";} ?>   value="UGA">Uganda</option>
<option <?php if ($region==UKR) {echo "selected";} ?>   value="UKR">Ukraine</option>
<option <?php if ($region==ARE) {echo "selected";} ?>   value="ARE">United Arab Emirates</option>
<option <?php if ($region==GBR) {echo "selected";} ?>   value="GBR">United Kingdom</option>
<option <?php if ($region==USA) {echo "selected";} ?>   value="USA">United States</option>
<option <?php if ($region==URY) {echo "selected";} ?>   value="URY">Uruguay</option>
<option <?php if ($region==UZB) {echo "selected";} ?>   value="UZB">Uzbekistan</option>
<option <?php if ($region==VUT) {echo "selected";} ?>   value="VUT">Vanuatu</option>
<option <?php if ($region==VEN) {echo "selected";} ?>   value="VEN">Venezuela</option>
<option <?php if ($region==VNM) {echo "selected";} ?>   value="VNM">Vietnam</option>
<option <?php if ($region==YEM) {echo "selected";} ?>   value="YEM">Yemen</option>
<option <?php if ($region==ZMB) {echo "selected";} ?>   value="ZMB">Zambia</option>
<option <?php if ($region==ZWE) {echo "selected";} ?>   value="ZWE">Zimbabwe</option>
       </select>
</form>

<form name="year_select", onchange="javascript:countryChart(document.getElementById('s').value, document.getElementById('y').value)"> 
<select name='y' id='y' size='1' class'myDropdown'> 
<option <?php if ($year==ALL) {echo "selected";} ?>  value="ALL">2012-2016</option>
<option value="--"> -- </option>
<option <?php if ($region==2016) {echo "selected";} ?>  value="2016">2016</option>