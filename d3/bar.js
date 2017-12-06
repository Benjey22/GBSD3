var margin = { top:20, right:10, bottom:100, left: 75},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select('body')
            .append('svg')
            .attr ({
                "width" : width + margin.right + margin.left,
                "height": height + margin.top + margin.bottom + 30
            })
                .append('g')
                    .attr("transform", "translate(" + margin.left + ',' + margin.right + ")");

var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.2, 0.2);

var yScale = d3.scale.linear()
            .range([height, 0]);
    
var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");



d3.csv("zep.csv", function(error, data) {
    if(error) throw error;

    data.forEach(function(d) {
        d.albums = d.albums;
        d.s = +d.s;
    });

    data.forEach(function(d, i){
		d.order = i;
	});

    xScale.domain(data.map(function(d) { return d.albums; }));
    yScale.domain([0, d3.max(data, function(d) { return d.s; })]);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(2000)
        .delay(function(d, i) { return i * 100; } )
        .attr({
            'x': function(d) { return xScale(d.albums); },
            'y': function(d) { return yScale(d.s); },
            'width': xScale.rangeBand(),
            'height': function(d) { return height - yScale(d.s); }
        })
        .attr("fill", function(d) {
			return d.color;
        });
        
        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function(d) { return d.s; })
            .attr('x', function(d) { return xScale(d.albums) + xScale.rangeBand()/2; })
            .attr('y', function(d) { return yScale(d.s) + 12; })
            .style("fill", "white")
            .style("font-size", "12px")
            .style("text-anchor", "middle");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-60)")
            .attr("dx", "-.7em")
            .attr("dy", ".20em")
            .style("text-anchor", "end")
            .style("font-size", "14px");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("font-size", "14px");

    d3.select("#descending").on("change", toggleSortDesc);
    
    function toggleSortDesc() {

        var sortComparer;

        if(this.checked) {
            sortComparer = function(a,b) {
                return b.s - a.s;
            };
        }
        else {
            sortComparer = function(a,b) {
                return a.order - b.order;
            };
        }

        data.sort(sortComparer);
        
        var albumsOrder = data.map(function(d) {
            return d.albums
        });
    
        xScale.domain(albumsOrder);

        svg.transition()
        .duration(1000)
        .selectAll("rect")
        .delay(function(d, i) {
            return i * 50;
        })
        .attr("x", function(d) {
            return xScale(d.albums);
        });

        svg.selectAll("g").remove();
        
        svg.selectAll("text").remove();

        svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .transition().duration(1000)
        .text(function(d) { return d.s; })
        .attr('x', function(d) { return xScale(d.albums) + xScale.rangeBand()/2; })
        .attr('y', function(d) { return yScale(d.s) + 12; })
        .style("fill", "white")
        .style("font-size", "12px")
        .style("text-anchor", "middle");


        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-60)")
        .attr("dx", "-.7em")
        .attr("dy", ".20em")
        .style("text-anchor", "end")
        .style("font-size", "14px");

        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .style("font-size", "14px");

    }

});