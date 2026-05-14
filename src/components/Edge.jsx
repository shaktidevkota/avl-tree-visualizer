// Edge Component - Renders connections between parent and child nodes
function Edge({ edge }) {
  return (
    <line
      x1={edge.x1}
      y1={edge.y1}
      x2={edge.x2}
      y2={edge.y2}
      className="tree-edge"
    />
  )
}

export default Edge