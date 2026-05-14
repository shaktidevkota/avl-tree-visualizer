// Node Component - Renders individual tree nodes
function Node({ node, isHighlighted, onClick }) {
  const handleClick = () => {
    if (onClick) onClick(node.value)
  }

  return (
    <g
      className={`tree-node ${isHighlighted ? 'highlighted' : ''}`}
      transform={`translate(${node.x}, ${node.y})`}
      onClick={handleClick}
    >
      {/* Node circle */}
      <circle
        r={node.radius}
        className="node-circle"
      />

      {/* Node value */}
      <text
        className="node-value"
        textAnchor="middle"
        dy="-5"
      >
        {node.value}
      </text>

      {/* Height indicator */}
      <text
        className="node-height"
        textAnchor="middle"
        dy="8"
      >
        h:{node.height}
      </text>

      {/* Balance factor indicator */}
      <text
        className="node-balance"
        textAnchor="middle"
        dy="18"
      >
        b:{node.balanceFactor}
      </text>
    </g>
  )
}

export default Node