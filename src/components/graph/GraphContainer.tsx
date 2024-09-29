import * as d3 from "d3";

import React, { useEffect, useRef } from "react";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface SimulationNodeDatum extends d3.SimulationNodeDatum {
  id: string;
}

interface SimulationLinkDatum
  extends d3.SimulationLinkDatum<SimulationNodeDatum> {
  source: string | SimulationNodeDatum;
  target: string | SimulationNodeDatum;
}

const GraphContainer: React.FC = () => {
  const d3Container = useRef<null | HTMLDivElement>(null);

  const { environment, showVersion, invertColoring, nameFilter, owner } =
    useSelector((state: RootState) => state.filters);

  useEffect(() => {
    if (d3Container.current) {
      d3.select(d3Container.current).selectAll("svg").remove();

      let nodes: SimulationNodeDatum[] = [
        { id: "Service A" },
        { id: "Service B" },
        { id: "Service C" },
        { id: "Service D" },
        { id: "Service E" },
        { id: "Service F" },
        { id: "Service G" },
        { id: "Service H" },
        { id: "Service I" },
        { id: "Service J" },
        { id: "Service K" },
        { id: "Service L" },
        { id: "Service M" },
      ];

      let links: SimulationLinkDatum[] = [
        { source: "Service A", target: "Service B" },
        { source: "Service A", target: "Service C" },
        { source: "Service B", target: "Service D" },
        { source: "Service C", target: "Service A" },
        { source: "Service D", target: "Service E" },
        { source: "Service E", target: "Service F" },
        { source: "Service F", target: "Service G" },
        { source: "Service G", target: "Service A" },
        { source: "Service F", target: "Service H" },
        { source: "Service H", target: "Service I" },
        { source: "Service I", target: "Service J" },
        { source: "Service J", target: "Service K" },
        { source: "Service K", target: "Service L" },
        { source: "Service L", target: "Service M" },
        { source: "Service M", target: "Service A" },
        { source: "Service D", target: "Service H" },
        { source: "Service E", target: "Service I" },
        { source: "Service G", target: "Service J" },
      ];

      if (nameFilter) {
        nodes = nodes.filter((node) =>
          node.id.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      links = links.filter(
        (link) =>
          nodes.find((node) => node.id === link.source) &&
          nodes.find((node) => node.id === link.target)
      );

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);

      const simulation = d3
        .forceSimulation<SimulationNodeDatum>(nodes)
        .force(
          "link",
          d3
            .forceLink<SimulationNodeDatum, SimulationLinkDatum>(links)
            .id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(400, 300));

      const link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-width", 2);

      const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", invertColoring ? "#1b82e3" : "#52ae30")
        .call(
          d3
            .drag<SVGCircleElement, SimulationNodeDatum>()
            .on("start", (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on("end", (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
        );

      const text = svg
        .append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dy", -15)
        .attr("dx", 15)
        .text((d) => d.id)
        .attr("fill", "white")
        .style("font-size", "12px");

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => (d.source as SimulationNodeDatum).x!)
          .attr("y1", (d) => (d.source as SimulationNodeDatum).y!)
          .attr("x2", (d) => (d.target as SimulationNodeDatum).x!)
          .attr("y2", (d) => (d.target as SimulationNodeDatum).y!);

        node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

        text.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
      });
    }
  }, [environment, showVersion, invertColoring, nameFilter, owner]);

  return <div ref={d3Container} />;
};

export default GraphContainer;
