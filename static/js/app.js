//Create bar graph, bubble chart, gauge, and meta data

function drawBarGraph(sampleId)
{
    console.log(`Calling drawBarGraph(${sampleId})`);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"

        };

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barArray, barLayout);

    });
}

function drawBubbleChart(sampleId)
{
    console.log(`Calling drawBubbleChart(${sampleId})`);
}

function showMetaData(sampleId)
{
    console.log(`Calling showMetaData(${sampleId})`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var PANEL = d3.select("#sample-metadata");

        PANEL.html("")

        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `${key}: ${value}`;
            PANEL.append("h6").text(textToShow);
        });
    });
}

function drawGauge(sampleId)
{
    console.log(`Calling drawGauge(${sampleId})`);
}

// Create event handler function for user changing sample ID in the dropdown menu

function optionChanged(newSampleId)
{
    console.log(`User selected ${newSampleId}`);

    drawBubbleChart(newSampleId);
    drawBarGraph(newSampleId);
    drawGauge(newSampleId);
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

        var sampleId = sampleNames[0];

        drawBarGraph(sampleId);
        drawBubbleChart(sampleId);
        drawGauge(sampleId);
        showMetaData(sampleId);

    });
}

initDashboard();