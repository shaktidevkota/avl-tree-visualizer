// AVL Tree Data Structure - Pure JavaScript, no React dependencies
export class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }
}

export class AVLTree {
  constructor() {
    this.root = null
  }

  // Get height of a node
  getHeight(node) {
    return node ? node.height : 0
  }

  // Get balance factor of a node
  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0
  }

  // Update height of a node
  updateHeight(node) {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
  }

  // Right rotation
  rotateRight(y) {
    const x = y.left
    const T2 = x.right

    x.right = y
    y.left = T2

    this.updateHeight(y)
    this.updateHeight(x)

    return x
  }

  // Left rotation
  rotateLeft(x) {
    const y = x.right
    const T2 = y.left

    y.left = x
    x.right = T2

    this.updateHeight(x)
    this.updateHeight(y)

    return y
  }

  // Insert a value into the AVL tree
  insert(value) {
    this.root = this._insert(this.root, value)
  }

  _insert(node, value) {
    if (!node) {
      return new Node(value)
    }

    if (value < node.value) {
      node.left = this._insert(node.left, value)
    } else if (value > node.value) {
      node.right = this._insert(node.right, value)
    } else {
      return node // Duplicate values not allowed
    }

    this.updateHeight(node)

    const balance = this.getBalanceFactor(node)

    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this.rotateRight(node)
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this.rotateLeft(node)
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left)
      return this.rotateRight(node)
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right)
      return this.rotateLeft(node)
    }

    return node
  }

  // Delete a value from the AVL tree
  delete(value) {
    this.root = this._delete(this.root, value)
  }

  _delete(node, value) {
    if (!node) {
      return node
    }

    if (value < node.value) {
      node.left = this._delete(node.left, value)
    } else if (value > node.value) {
      node.right = this._delete(node.right, value)
    } else {
      // Node with only one child or no child
      if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      }

      // Node with two children: Get the inorder successor
      const temp = this._minValueNode(node.right)
      node.value = temp.value
      node.right = this._delete(node.right, temp.value)
    }

    if (!node) {
      return node
    }

    this.updateHeight(node)

    const balance = this.getBalanceFactor(node)

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node)
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left)
      return this.rotateRight(node)
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node)
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right)
      return this.rotateLeft(node)
    }

    return node
  }

  // Find the node with minimum value (used in delete)
  _minValueNode(node) {
    let current = node
    while (current.left) {
      current = current.left
    }
    return current
  }

  // Check if a value exists in the tree
  find(value) {
    return this._find(this.root, value)
  }

  _find(node, value) {
    if (!node) return false
    if (node.value === value) return true
    if (value < node.value) return this._find(node.left, value)
    return this._find(node.right, value)
  }

  // Clear the entire tree
  clear() {
    this.root = null
  }

  // Get tree statistics
  getStats() {
    const height = this.getHeight(this.root)
    const balance = this.getBalanceFactor(this.root)
    return { height, balance, root: this.root }
  }
}