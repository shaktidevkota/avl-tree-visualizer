// Tree Visualization Component - Pure rendering, no AVL logic
import Node from './components/Node'
import Edge from './components/Edge'

function TreeVisualization({ visualTreeData, highlightedNode, onNodeClick }) {
  if (!visualTreeData || !visualTreeData.nodes) {
    return (
      <svg
        className="tree-visualization"
        width="100%"
        height="600"
        viewBox="0 0 800 600"
      >
        {/* Empty tree state */}
      </svg>
    )
  }

  return (
    <svg
      className="tree-visualization"
      width="100%"
      height="600"
      viewBox="0 0 800 600"
    >
      {/* Render edges first (behind nodes) */}
      {visualTreeData.edges.map(edge => (
        <Edge key={edge.id} edge={edge} />
      ))}

      {/* Render nodes on top */}
      {visualTreeData.nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          isHighlighted={highlightedNode === node.value}
          onClick={onNodeClick}
        />
      ))}
    </svg>
  )
}

export default TreeVisualization