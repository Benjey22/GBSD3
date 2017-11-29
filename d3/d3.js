var dataset, svg, bandScale;
			
			d3.csv("zep.csv", function(d){
				dataset = d;
				dataset.forEach(function(d, i){
					d.order = i;
				});
				createChart();
			});
			
			function createChart() {
				var w = 1000;
				var h = 300;
				var margin = {top: 20, right: 20, bottom: 30, left: 40};
				
				svg = d3.select("#vis")
					.append("svg");
					
				svg.attr("width", w)
					.attr("height", h);
					
				var albums = dataset.map(function(d) {
					return d.albums;
				});
					
				bandScale = d3.scaleBand()
					.domain(albums)
					.range([0,w])
					.padding(0.1);
				
				var heightScale = d3.scaleLinear()
					.domain([0,37000000])
					.range([0,h]);
					
				var g = svg.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

				g.append("g")
			      .attr("transform", "translate(0," + h + ")")
			      .text("Test")
			      .call(d3.axisBottom(bandScale));

			    g.append("g")
			      .call(d3.axisLeft(heightScale).ticks(10, "%"))
			      .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", "0.71em")
			      .attr("text-anchor", "end")
			      .text("Sells");

			    g.selectAll("rect")
			    	.data(dataset)
			    	.enter()
			    	.append("rect")
					.attr("x", function(d, i) {
						return bandScale(d.albums);
					})
					.attr("y", function(d){
						
						return h - heightScale(d.s);;
					})
					.attr("width", function(d) {
						return bandScale.bandwidth();
					})
					.attr("height", function(d) {
						return heightScale(d.s);
					})
					.attr("fill", function(d) {
						return d.color;
					})
					.append("title")
					.text(function(d) {
						return "Album: " + d.albums + ", Verkäufe: " + d.s;
					});
					
						
			}
			
			d3.select("#descending").on("change", toggleSortDesc);
			
			function toggleSortDesc() {
				
				var sortComparer;
				
				if(this.checked) {
					// Sort by Sells
					sortComparer = function(a,b) {
						return b.s - a.s; // descending
					};
				}
				else {
					// Sort by original order
					sortComparer = function(a,b) {
						return a.order - b.order; // original
					};
				}
				
				dataset.sort(sortComparer);
				
				var albumsOrder = dataset.map(function(d) {
					return d.albums
				});
			
				bandScale.domain(albumsOrder);
			
				svg.transition()
					.duration(1000)
					.selectAll("rect")
					.delay(function(d, i) {
						return i * 50;
					})
					.attr("x", function(d) {
						return bandScale(d.albums)
					});
			}	