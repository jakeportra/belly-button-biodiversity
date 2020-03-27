//Create stubs to confirm event handler function is working

function drawBarGraph(sampleId)
{
    console.log(`Calling drawBarGraph(${sampleId})`);
}

function drawBubbleChart(sampleId)
{
    console.log(`Calling drawBubbleChart(${sampleId})`);
}

function showMetaData(sampleId)
{
    console.log(`Calling showMetaData(${sampleId})`);
}

// Create event handler function for user changing sample ID in the dropdown menu

function optionChanged(newSampleId)
{
    console.log(`User selected ${newSampleId}`);

    drawBubbleChart(newSampleId);
    drawBarGraph(newSampleId);
    showMetaData(newSampleId);
}

// Create function to initialize the dashboard

function initDashboard()
{
    console.log("Initializing Dashboard");

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((sampleId) => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });



    });
}

initDashboard();