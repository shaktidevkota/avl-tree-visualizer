// Node Component - Renders individual tree nodes
function Node({ node, isHighlighted, isRotated, onClick }) {
  const handleClick = () => {
    if (onClick) onClick(node.value)
  }

  return (
    <g
      className={`tree-node ${isHighlighted ? 'highlighted' : ''} ${isRotated ? 'rotated' : ''}`}
      transform={`translate(${node.x}, ${node.y})`}
      onClick={handleClick}
      role="button"
      aria-label={`AVL node ${node.value}`}
      tabIndex={0}
    >
      <circle r={node.radius} className="node-circle" />
      <text className="node-value" textAnchor="middle" dy="-8">
        {node.value}
      </text>
      <text className="node-height" textAnchor="middle" dy="10">
        h:{node.height}
      </text>
      <text className="node-balance" textAnchor="middle" dy="22">
        b:{node.balanceFactor}
      </text>
    </g>
  )
}

export default Node
