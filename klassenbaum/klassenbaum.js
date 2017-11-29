var canvas = d3.select("#network"),
	width = canvas.attr("width"),
	height = canvas.attr("height"),
	r = 8,
	x = d3.scaleOrdinal().range([20, width-20]),
	color = d3.scaleOrdinal(d3.schemeCategory20),
	ctx = canvas.node().getContext("2d"),
	simulation = d3.forceSimulation()
		.force("x", d3.forceX(width/2))
		.force("y", d3.forceY(height/2))
		.force("collide", d3.forceCollide(r+20))
		.force("charge", d3.forceManyBody())
		.force("link", d3.forceLink()
			.id(function(d) { return d.name; }));
		
	
	// Random Circles all over my Canvas
	
	/*
	graph.nodes.forEach(function(d) {
		d.x = Math.random() * width;
		d.y = Math.random() * height;
	});
	*/
	
	d3.json("klassenbaum.json", function(error, graph) {
		if(error) throw error;
		
		
		simulation
			.nodes(graph.nodes)
			.on("tick", update)
			.force("link")
			.links(graph.links);
			
		canvas
			.call(d3.drag()
				.container(canvas.node())
				.subject(dragsubject)
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));
			
		function update() {
			ctx.clearRect(0, 0, width, height);

			ctx.beginPath(); // Create Links
			ctx.globalAlpha = 0.9;
			ctx.strokeStyle = "#aaa";
			graph.links.forEach(drawLink);
			ctx.stroke(); // Draw Links				
		
			ctx.beginPath(); // Create Nodes
			ctx.globalAlpha = 1.0;
			graph.nodes.forEach(drawNode);
			ctx.fill(); // Draw Nodes
		}
		
		function dragsubject() {
			return simulation.find(d3.event.x, d3.event.y);
		}
		
	});
	
	
	


function drawNode(d) {
	ctx.fillStyle = color(d.age);
	ctx.moveTo(d.x, d.y);
	ctx.arc(d.x, d.y, r, 0, 2*Math.PI);
	ctx.fill();
}

function drawLink(l) {
	ctx.moveTo(l.source.x, l.source.y);
	ctx.lineTo(l.target.x, l.target.y);
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
  console.log(d3.event.subject);
}

function dragged(d) {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}