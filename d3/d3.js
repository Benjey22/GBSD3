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
				
				svg = d3.select("#vis")
					.append("svg");
					
				svg.attr("width", w)
					.attr("height", h);

                var txt = d3.select("#vis")
                    .append("div");

                txt.selectAll("div")
                    .data(dataset)
                    .enter()
                    .append("g")
                    .text(function(d) {
                        return d.albums + " ";
                    });
					
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
					
				
					
				svg.selectAll("rect")
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