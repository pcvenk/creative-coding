function collide(t){var r=t.radius+16,e=t.x-r,o=t.x+r,n=t.y-r,i=t.y+r;return function(r,d,c,a,s){if(r.point&&r.point!==t){var u=t.x-r.point.x,l=t.y-r.point.y,f=Math.sqrt(u*u+l*l),h=t.radius+r.point.radius;f<h&&(f=(f-h)/f*.5,t.x-=u*=f,t.y-=l*=f,r.point.x+=u,r.point.y+=l)}return d>o||a<e||c>i||s<n}}var width=window.innerWidth,height=window.innerHeight,nodes=d3.range(170).map(function(){return{radius:6*Math.random()+10}}),root=nodes[0],color=d3.scale.category10();root.radius=70,root.fixed=!0;var force=d3.layout.force().gravity(.05).charge(function(t,r){return r?0:-1700}).nodes(nodes).size([width,height]);force.start();var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);svg.selectAll("circle").data(nodes.slice(1)).enter().append("circle").attr("r",function(t){return t.radius}).style("fill",function(t,r){return color(r%7)}),force.on("tick",function(t){for(var r=d3.geom.quadtree(nodes),e=0,o=nodes.length;++e<o;)r.visit(collide(nodes[e]));svg.selectAll("circle").attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y})}),svg.on("mousemove",function(){var t=d3.mouse(this);root.px=t[0],root.py=t[1],force.resume()});