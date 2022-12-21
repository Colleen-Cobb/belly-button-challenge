
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

const dataPromise = d3.json(url)
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data.names);

    let names = data.names;

    let metadata = data.metadata;

    let samples = data.samples;
  });

// Set up the base chart
function charts(selectedPatientID) {
    d3.json("samples.json").then((data) => {
      var plottingData = data.samples;
      var subject = plottingData.filter(
        (sampleobject) => sampleobject.id == selectedPatientID
      )[0];
  
      console.log(subject);
      var ids = subject.otu_ids;
      var labels = subject.otu_labels;
      var values = subject.sample_values;
  
      // Horizontal Bar Char
      var trace1 = {
        x: values.slice(0, 10).reverse(),
        y: ids
          .slice(0, 10)
          .map((otuID) => `OTU ${otuID}`)
          .reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      };
  
      var data = [trace1];
  
      var layout = {
        title: "Top 10 OTUs",
        xaxis: { autorange: true },
        yaxis: { autorange: true },
        margin: { t: 40, l: 100 },
        height: 400,
      };
  
      Plotly.newPlot("bar", data, layout);
  
      //Bubble Chart 

      var trace2 = {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          colorscale: "plasma",
        },
      };
  
      var data = [trace2];
  
      var layout = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        width: window.width,
      };
  
      Plotly.newPlot("bubble", data, layout);
    });
  }
  
  // Demographic Info
  function demo(selectedPatientID) {
    d3.json("samples.json").then((data) => {
      var MetaData = data.metadata;
      var subject = MetaData.filter(
        (sampleobject) => sampleobject.id == selectedPatientID
      )[0];
      var demographicInfoBox = d3.select("#sample-metadata");
      demographicInfoBox.html("");
      Object.entries(subject).forEach(([key, value]) => {
        demographicInfoBox.append("h5").text(`${key}: ${value}`);
      });

    });
  }
  
  // Call the data into the inspector console. 
  function init() {
    d3.json("samples.json").then(function (data) {
      console.log("samples.json:", data);
      // Set up the DropDown:
      let DropDown = d3.select(`#selDataset`);
  
      data.names.forEach((name) => {
        DropDown.append(`option`).text(name).property(`value`, name);
      });
      // Reset demographic info and visuals to first subject when page is refreshed.
      const firstSample = data.names[0];
      charts(firstSample);
      demo(firstSample);
    });
  }
  // Pull data for new subject into demo and visuals. 
  function optionChanged(newSample) {
    charts(newSample);
    demo(newSample);
  }
  
  init();