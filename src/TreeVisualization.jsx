// Tree Visualization Component - Pure rendering, no AVL logic
import Node from './components/Node'
import Edge from './components/Edge'

function TreeVisualization({ visualTreeData, highlightedNode, rotationNodes = [], onNodeClick }) {
  const hasNodes = visualTreeData?.nodes?.length > 0

  return (
    <div className="tree-view-wrapper">
      {hasNodes ? (
        <svg
          className="tree-visualization"
          width="100%"
          height="520"
          viewBox="0 0 1200 520"
        >
          {visualTreeData.edges.map((edge) => (
            <Edge key={edge.id} edge={edge} />
          ))}
          {visualTreeData.nodes.map((node) => (
            <Node
              key={node.id}
              node={node}
              isHighlighted={highlightedNode === node.value}
              isRotated={rotationNodes.includes(node.value)}
              onClick={onNodeClick}
            />
          ))}
        </svg>
      ) : (
        <div className="empty-tree">
          <h3>Your AVL tree is empty.</h3>
          <p>Insert values or generate a random tree to begin.</p>
        </div>
      )}
    </div>
  )
}

export default TreeVisualization
