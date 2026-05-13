// Tree Layout Engine - Converts AVL tree structure to visual coordinates
export function layoutTree(root, containerWidth = 800, containerHeight = 600) {
  if (!root) {
    return { nodes: [], edges: [] }
  }

  const nodes = []
  const edges = []

  // Calculate tree dimensions
  const treeHeight = getTreeHeight(root)
  const maxWidth = Math.pow(2, treeHeight - 1) // Maximum possible width at bottom level

  // Layout parameters
  const levelHeight = Math.min(80, containerHeight / (treeHeight + 1))
  const nodeRadius = 25
  const horizontalSpacing = Math.max(nodeRadius * 3, containerWidth / (maxWidth + 1))

  // Recursive function to position nodes
  function positionNode(node, x, y, availableWidth, depth = 0) {
    if (!node) return

    // Create node data with coordinates
    const nodeData = {
      id: `${node.value}-${depth}`,
      value: node.value,
      height: node.height,
      balanceFactor: getBalanceFactor(node),
      x: x,
      y: y,
      radius: nodeRadius,
      level: depth
    }

    nodes.push(nodeData)

    // Position children
    const childY = y + levelHeight

    if (node.left) {
      const leftX = x - (availableWidth / 4)
      positionNode(node.left, leftX, childY, availableWidth / 2, depth + 1)

      // Add edge to left child
      edges.push({
        id: `edge-${node.value}-left`,
        from: nodeData.id,
        to: `${node.left.value}-${depth + 1}`,
        x1: x,
        y1: y,
        x2: leftX,
        y2: childY
      })
    }

    if (node.right) {
      const rightX = x + (availableWidth / 4)
      positionNode(node.right, rightX, childY, availableWidth / 2, depth + 1)

      // Add edge to right child
      edges.push({
        id: `edge-${node.value}-right`,
        from: nodeData.id,
        to: `${node.right.value}-${depth + 1}`,
        x1: x,
        y1: y,
        x2: rightX,
        y2: childY
      })
    }
  }

  // Start positioning from root
  const startX = containerWidth / 2
  const startY = 60
  positionNode(root, startX, startY, containerWidth)

  return { nodes, edges }
}

// Helper function to get tree height
function getTreeHeight(node) {
  if (!node) return 0
  return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right))
}

// Helper function to get balance factor
function getBalanceFactor(node) {
  if (!node) return 0
  const leftHeight = node.left ? node.left.height : 0
  const rightHeight = node.right ? node.right.height : 0
  return leftHeight - rightHeight
}

// Alternative layout algorithm for better spacing
export function layoutTreeBalanced(root, containerWidth = 800, containerHeight = 600) {
  if (!root) {
    return { nodes: [], edges: [] }
  }

  const nodes = []
  const edges = []

  // Calculate positions using inorder traversal for better horizontal distribution
  const positions = []
  collectPositions(root, positions, 0)

  const levelHeight = Math.min(80, containerHeight / (getTreeHeight(root) + 1))
  const nodeRadius = 25

  // Position nodes based on collected positions
  function assignCoordinates(node, level = 0) {
    if (!node) return

    const position = positions.find(p => p.node === node)
    if (position) {
      const x = (position.index + 0.5) * (containerWidth / positions.length)
      const y = 60 + level * levelHeight

      const nodeData = {
        id: `${node.value}-${level}`,
        value: node.value,
        height: node.height,
        balanceFactor: getBalanceFactor(node),
        x: x,
        y: y,
        radius: nodeRadius,
        level: level
      }

      nodes.push(nodeData)

      // Position children
      if (node.left) {
        assignCoordinates(node.left, level + 1)
        const childNode = nodes.find(n => n.value === node.left.value && n.level === level + 1)
        if (childNode) {
          edges.push({
            id: `edge-${node.value}-left`,
            from: nodeData.id,
            to: childNode.id,
            x1: x,
            y1: y,
            x2: childNode.x,
            y2: childNode.y
          })
        }
      }

      if (node.right) {
        assignCoordinates(node.right, level + 1)
        const childNode = nodes.find(n => n.value === node.right.value && n.level === level + 1)
        if (childNode) {
          edges.push({
            id: `edge-${node.value}-right`,
            from: nodeData.id,
            to: childNode.id,
            x1: x,
            y1: y,
            x2: childNode.x,
            y2: childNode.y
          })
        }
      }
    }
  }

  assignCoordinates(root)
  return { nodes, edges }
}

// Collect positions using inorder traversal
function collectPositions(node, positions, level = 0) {
  if (!node) return

  collectPositions(node.left, positions, level + 1)
  positions.push({ node, level, index: positions.length })
  collectPositions(node.right, positions, level + 1)
}