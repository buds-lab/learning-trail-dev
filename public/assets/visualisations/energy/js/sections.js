
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  // The data that we are using for this visualisation
    var data = [{name: "Reference", value: [1947,1511,690, 321, 209, 0], previous: [1947,1511,690, 321, 209, 0]}, 
    {name: "Envelope", value: [1602,1472,651,322,209, 0], previous: [1947,1511,690, 321, 209, 0]}, 
    {name: "Aircon", value: [1200,1070, 626,321, 209, 0], previous: [1602,1472,651,322,209, 0]},
    {name: "Hybrid", value: [820, 820, 497, 320, 209, 0], previous: [1200,1070, 626,321, 209, 0]}, // Note the graph doesn't add up
    {name: "January", value: [646, 605, 387,245, 186, 30], previous: [820,497, 320,320, 209, 0]}, // Added uncertainity to the start of the graph
    {name: "February", value: [497,470, 348,228, 176, 30], previous: [646, 605, 387,245, 186, 30]},
    {name: "Solar", value: [510], previous: [0]}]

    console.log(data)

    // Window Area
    let windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log("screen width" + screen.width)
    console.log("window width" + window.innerWidth)
    let windowHeight = screen.height;
    var width = windowWidth/2.0;
    var height =windowHeight/2.0;
    var margin = { top: 0, left: 20, bottom: 40, right: 10 };

    // keeing track of which visualisation we are on
    var lastIndex = -1;
    var activeIndex = 0;

    //our main svg and group
    var svg = null;
    var g = null;

    // Max Energy Consumption
    var maxEnergy = data.map((d) => d3.max(d.value) )

    // Create an x axis scale for responsiveness
    var xBarScale = d3.scaleLinear()
    .domain([0,d3.max(maxEnergy) + 250])
    .range([0, width])

    // Create a y axis scale for responsiveness
    // Note that I have added two extra bars to make space for our legend
    var yBarScale = d3.scaleBand()
    .paddingInner(0.38)
    .domain([0,1,2,3,4,5,6,7,8])
    .range([0, height], 0.1, 0.1);


    //Define the x Axis
    var xAxisBar = d3.axisBottom()
    .scale(xBarScale)
    .ticks(4);

    // when scrolling to a new section, the activation function is called
    var activateFunctions = [];

    // when the section has an update function then this iscalled
    var updateFunctions = [];

    // Left is light, right is dark
    //var barColors = { 0: '#A9FCFF', 1: '#86F3FA', 2: '#30D8ED', 3: '#00AAD7', 4:'#0074B3', 5: '#004487' };
    var barColors = { 0: '#FED4B2', 1: '#FBC193', 2: '#F9AE76', 3: '#F79650', 4:'#F48031', 5: '#874434' };


  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function () {

        // Access our elemt that we will work on
        //var el = ReactDOM.findDOMNode(this)

        // Build our element within this 
        svg = d3.select(this)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

        // Append our main group 
        svg.append("g");

        // Move the main g depending on the margins
        g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        // define the bar as a group that will eventually contain rectangles
        var bars = g.selectAll('.bar').data(data)
        .enter()
        .append('g')
        .attr('class', (d,i) => {return'bar ' + d.name})
        .attr('transform', (d,i) => {return 'translate(' + 0 + ',' + yBarScale(i+2) + ')'})
        
        // Crreate each stacked rectangular element for each bar
        // Note that the data is not the actual value, but the value of the previous bar
        // This allows us to do a transition where the bars shrink
        bars
        .selectAll('rect')
        .data((d) => {return d.previous})
        .enter().append('rect')
        .attr('class', 'bar-rect')
        .attr("x", (d,i)=>0)
        .attr('height', yBarScale.bandwidth())
        .attr('width', (d)=> {return xBarScale(d)})
        .attr("fill", (d,i) => {return barColors[i]})
        .attr("opacity", 0)

        // append the x axis bar to the primary group
        g.append('g')
          .attr('class', 'x-axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxisBar);

        // Add text to each bar at the end
        bars.append("text")
              .attr("class", "text")
              .attr('x', (d)=> {return xBarScale(d.value[0]) + 5})
              .attr('y', yBarScale.bandwidth()/1.5)
              .attr('opacity', 0)
              .text((d)=>d.value[0].toString())
              .style('font-size', '10px');


        // Draw Legend
        var legendLabels = ['FCU', 'Ventilation', 'Auxilary', 'Light', 'Plug Loads', 'Uncertainity']

        // create a set of groups that are transformed into three columns
        var legend = svg.selectAll('.legend')
              .data(data[0].value)
              .enter()
              .append('g')
              .attr('class', 'legend')
              .attr("transform", function(d, i) { 
                if (i<2){return "translate("+(i * 80) +"," + yBarScale(1)*0.1 + ")"; }
                else if (i<4){return "translate("+ (i-2) * 80 +"," + yBarScale(1)*0.5 + ")";}
                else {return "translate("+ (i-4) * 80 +"," + yBarScale(1)*0.9 + ")";};
              });

        // Add square to each of these with a colour
        legend.append('rect')
                .attr('x', 20)
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', (d,i) => barColors[i]);

        // add the corresponding legend label text
        legend.append('text')
                .attr('x', 35)
                .attr('y', 8)
                .attr('transform', 'rotate(-0)')
                .text((d,i)=> legendLabels[i])
                .style('font-size', '10px')

        // Sets the sections up, see next function below
        setupSections();
    });
  };




  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */


  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  /**
   * showTitle - initial title
   *
   * hides: count title
   * (no previous step to hide)
   * shows: intro title
   *
   */
  function showReference() {
  // Show first bar
  g.select(".Reference").selectAll('rect')
  .transition()
  .duration(0)
  .attr('opacity', 1.0)

  // Show data label corresponding to that bar
  g.select('.Reference').selectAll('text')
      .transition()
      .delay(100)
      .duration(400)
      .attr('opacity', 1)  

  // Hide next bar when scrolling up
  g.select('.Envelope').selectAll('text')
      .transition()
      .duration(0)
      .attr('opacity', 0)

  // Hide text corresponding to that bar on scroll up
  g.select('.Envelope').selectAll('rect')
  .transition()
  .duration(0)
  .attr('opacity', 0)
  }

  /**
   * showFillerTitle - filler counts
   *
   * hides: intro title
   * hides: square grid
   * shows: filler count title
   *
   */
  function showFirst() {
    // Select the second bar and link in the real data set

    var firstBar = g.select('.Envelope').selectAll('rect')
    .data(data[1].value)

    // Reveal the Bar
    firstBar
    .transition()
    .duration(300)
    .attr('opacity', 1.0)

    // The bars should shrink to their actual value size
    firstBar
    .transition('rect')
    .duration(800)
    .delay(200)
    .attr('width', (d)=> {return xBarScale(d)})


    // Reveal the text value
    g.select('.Envelope').selectAll('text')
      .transition()
      .delay(800)
      .duration(400)
      .attr('opacity', 1)

  // hide the previous text value
  g.select('.Aircon').selectAll('text')
      .transition()
      .duration(0)
      .attr('opacity', 0)

    // hide the previous bar
    g.select('.Aircon').selectAll('rect')
    .transition()
    .duration(0)
    .attr('opacity', 0)
  }

  /**
   * showGrid - square grid
   *
   * hides: filler count title
   * hides: filler highlight in grid
   * shows: square grid
   *
   */
  function showSecond() {
    var secondBar = g.select('.Aircon').selectAll('rect')
    .data(data[2].value)
    secondBar
    .transition('rect')
    .duration(800)
    .delay(200)
    .attr('width', (d)=> {return xBarScale(d)})

    secondBar
    .transition()
    .duration(400)
    .attr('opacity', 1.0)

    g.select('.Aircon').selectAll('text')
      .transition()
      .delay(800)
      .duration(400)
      .attr('opacity', 1)


  g.select('.Hybrid').selectAll('text')
      .transition()
      .duration(0)
      .attr('opacity', 0)

    g.selectAll('.next-title')
    .transition()
    .duration(0)
    .attr('opacity', 0)

    g.selectAll('.Hybrid').selectAll('rect')
    .transition()
    .duration(0)
    .attr('opacity', 0)
  }

  /**
   * highlightGrid - show fillers in grid
   *
   * hides: barchart, text and axis
   * shows: square grid and highlighted
   *  filler words. also ensures squares
   *  are moved back to their place in the grid
   */
  function showThird() {
    var thirdBar = g.select('.Hybrid').selectAll('rect')
    .data(data[3].value)
    thirdBar
    .transition('rect')
    .duration(800)
    .delay(200)
    .attr('width', (d)=> {return xBarScale(d)})

    thirdBar
    .transition()
    .duration(400)
    .attr('opacity', 1.0)

    g.select('.Hybrid').selectAll('text')
      .transition()
      .delay(800)
      .duration(400)
      .attr('opacity', 1)


  g.select('.January').selectAll('text')
      .transition()
      .duration(0)
      .attr('opacity', 0)

    g.selectAll('.January').selectAll('rect')
    .transition()
    .duration(0)
    .attr('opacity', 0)
  }

  /**
   * showBar - barchart
   *
   * hides: square grid
   * hides: histogram
   * shows: barchart
   *
   */
  function showFourth() {
    // Select the second bar and link in the new data to it
    var fourthBar = g.select('.January').selectAll('rect')
    .data(data[4].value)
    fourthBar
    .transition('rect')
    .duration(800)
    .delay(200)
    .attr('width', (d)=> {return xBarScale(d)});

    fourthBar
    .transition()
    .duration(400)
    .attr('opacity', 1.0);

    g.select('.January').selectAll('text')
      .transition()
      .delay(800)
      .duration(400)
      .attr('opacity', 1)

    g.select('.February').selectAll('text')
      .transition()
      .duration(0)
      .attr('opacity', 0)

    g.selectAll('.February').selectAll('rect')
    .transition()
    .duration(0)
    .attr('opacity', 0);
  }

  /**
   * showHistPart - shows the first part
   *  of the histogram of filler words
   *
   * hides: barchart
   * hides: last half of histogram
   * shows: first half of histogram
   *
   */
  function showFifth() {
  // Select the second bar and link in the new data to it
     var fifthBar = g.select('.February').selectAll('rect')
     .data(data[5].value)

     fifthBar
     .transition('rect')
     .duration(800)
     .delay(400)
     .attr('width', (d)=> {return xBarScale(d)});

     fifthBar
     .transition()
     .duration(600)
     .attr('opacity', 1.0);

  g.select('.February').selectAll('text')
      .transition()
      .delay(800)
      .duration(400)
      .attr('opacity', 1)


  g.select('.Solar').selectAll('text')
      .transition()
      .duration(0)
      .attr('opacity', 0)

    g.selectAll('.Solar').selectAll('rect')
    .transition()
    .duration(0)
    .attr('opacity', 0);
  }

  /**
   * showHistAll - show all histogram
   *
   * hides: cough title and color
   * (previous step is also part of the
   *  histogram, so we don't have to hide
   *  that)
   * shows: all histogram bars
   *
   */
  function showSolar() {
     // Select the second bar and link in the new data to it
     var solarBar = g.select('.Solar').selectAll('rect')
     .data(data[6].value)

     solarBar
     .transition('rect')
     .duration(800)
     .delay(400)
     .attr('width', (d)=> {return xBarScale(d)});

     solarBar
     .transition()
     .duration(600)
     .attr('fill', 'gray')
     .attr('opacity', 1.0);

       g.select('.Solar').selectAll('text')
      .transition()
      .delay(800)
      .duration(400)
      .attr('opacity', 1)
  }

    var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
      activateFunctions[0] = showReference;
      activateFunctions[1] = showFirst;
      activateFunctions[2] = showSecond;
      activateFunctions[3] = showThird;
      activateFunctions[4] = showFourth;
      activateFunctions[5] = showFifth;
      activateFunctions[6] = showSolar;
    // TODO: Work out what this does
    // Something about update functions being set to no-op functions
    for (var i = 0; i < 9; i++) {
      updateFunctions[i] = function () {};
    }

  };

  
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};



function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}
