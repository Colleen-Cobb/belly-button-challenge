const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// setup up demographic information
fucntion demoInfo(sample)

{
    d3.json("samples.json").then((data)=> {

        //import metadata
        let metaData= data.metadata;

        //filter the results to population the value of one sample
        let result=metaData.filter(sampleResult => sampleResult.id == sample);

        //start from the first value
        let resultData = result[0];

        //clear the data for the next value
        d3.select("#sample-metadata").html("");

       //obtain the key value pairs for the demographic information
       Object.enteries(resultData).forEach(([key, vlaue]) => {
        d3.select("#sample=metadata")
        .append("h5").text(`${key}: ${value}`);
       }); 
    });
};

