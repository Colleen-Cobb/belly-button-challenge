// read in the samples.json 

function charts(selectedPatientID) {
    d3.json("samples.json").then((data) => {
      let plottingData = data.samples;
      let subject = plottingData.filter(
        (sampleobject) => sampleobject.id == selectedPatientID
      )[0];

      console.log(subject);
      let ids = subject.otu_ids;
      let labels = subject.otu_labels;
      let values = subject.sample_values;
      
      // Trace for the sample data
      let trace1 = {
        x: values.slice(0, 10).reverse(),
        y: ids
            .slice(0, 10)
            .map((otuID) => `OTU ${otuID}`)
            .reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
  };

        // Data trace array
        let traceData= [trace1];

        let layout = {
            title: "Top 10 OTUs",
            xaxis: {autrorange: true}, 
            yaxis: {autorange: true},
            margin: {t: 70, 1: 100},
            hieght: 380,
        };

        Plotly.newPlot("plot", traceData, layout);

        // Create bubble chart

        let trace2 = {
            x: ids, 
            y: values, 
            text: labels, 
            mode: "markers", 
            marker: {
                color: ids, 
                size: values, 
                colorscale: "Plasma",
            }, 
        };

        let traceData2= [trace2];

        let layout2 = {
            margin: { t: 0},
            xaxis: {title: "OTU ID", 
            hovermode: "closest",
            width: window. width, 
        };

        Plotly.newPlot("bubble", traceData2, layout2);
    };
}

// Initialize demographic info

function demoInfo(selectedPatientID) {
    d3.json("samples.json").then(((data)) => {
        let metaData = data.metadata;
        let subject= metaData.filter(
            (sampleobject) => sampleobject.id == selectedPatientID
        )[0];
        let demoInfoBox = d3.select("#sample-metadata");
        demoInfoBox.html("");
        Object.entereis(subject).forEach(([key, value]) => {
            demoInfoBox.append("h5").text(`${key}: ${value}`);
        });

    },
};