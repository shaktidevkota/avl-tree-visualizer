// Tree Layout Engine - Converts AVL tree structure to visual coordinates
export function layoutTree(root, containerWidth = 1200, containerHeight = 520) {
  if (!root) {
    return { nodes: [], edges: [] }
  }

  const positions = []
  collectPositions(root, 0, positions)

  const maxLevel = positions.reduce((max, pos) => Math.max(max, pos.level), 0)
  const totalNodes = positions.length
  const horizontalSpacing = containerWidth / (totalNodes + 1)
  const verticalSpacing = Math.min(110, (containerHeight - 120) / (maxLevel + 1))

  const nodeMap = new Map()
  positions.forEach((position, index) => {
    nodeMap.set(position.node, {
      x: (index + 1) * horizontalSpacing,
      y: 70 + position.level * verticalSpacing,
      level: position.level,
    })
  })

  const nodes = []
  const edges = []

  function buildNode(node) {
    if (!node) return

    const position = nodeMap.get(node)
    const nodeData = {
      id: `${node.value}-${position.level}`,
      value: node.value,
      height: node.height,
      balanceFactor: getBalanceFactor(node),
      x: position.x,
      y: position.y,
      radius: 28,
      level: position.level,
    }

    nodes.push(nodeData)

    if (node.left) {
      buildNode(node.left)
      const child = nodeMap.get(node.left)
      if (child) {
        edges.push({
          id: `edge-${node.value}-left`,
          x1: nodeData.x,
          y1: nodeData.y + nodeData.radius * 0.8,
          x2: child.x,
          y2: child.y - nodeData.radius * 0.8,
        })
      }
    }

    if (node.right) {
      buildNode(node.right)
      const child = nodeMap.get(node.right)
      if (child) {
        edges.push({
          id: `edge-${node.value}-right`,
          x1: nodeData.x,
          y1: nodeData.y + nodeData.radius * 0.8,
          x2: child.x,
          y2: child.y - nodeData.radius * 0.8,
        })
      }
    }
  }

  buildNode(root)
  return { nodes, edges }
}

function collectPositions(node, level, positions) {
  if (!node) return
  collectPositions(node.left, level + 1, positions)
  positions.push({ node, level })
  collectPositions(node.right, level + 1, positions)
}

function getBalanceFactor(node) {
  if (!node) return 0
  const leftHeight = node.left ? node.left.height : 0
  const rightHeight = node.right ? node.right.height : 0
  return leftHeight - rightHeight
}
