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
    this.lastOperation = null
    this.lastRotation = null
  }

  getHeight(node) {
    return node ? node.height : 0
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0
  }

  updateHeight(node) {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
  }

  rotateRight(y) {
    const x = y.left
    const T2 = x.right

    x.right = y
    y.left = T2

    this.updateHeight(y)
    this.updateHeight(x)

    this.lastRotation = {
      type: 'Right Rotation',
      nodes: [x.value, y.value],
      root: x.value,
    }

    return x
  }

  rotateLeft(x) {
    const y = x.right
    const T2 = y.left

    y.left = x
    x.right = T2

    this.updateHeight(x)
    this.updateHeight(y)

    this.lastRotation = {
      type: 'Left Rotation',
      nodes: [x.value, y.value],
      root: y.value,
    }

    return y
  }

  insert(value) {
    this.lastRotation = null
    this.lastOperation = { type: 'insert', value, rotation: null }
    this.root = this._insert(this.root, value)
    if (this.lastRotation) {
      this.lastOperation.rotation = this.lastRotation
    }
    return this.root
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
      return node
    }

    this.updateHeight(node)
    const balance = this.getBalanceFactor(node)

    if (balance > 1 && value < node.left.value) {
      return this.rotateRight(node)
    }

    if (balance < -1 && value > node.right.value) {
      return this.rotateLeft(node)
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left)
      return this.rotateRight(node)
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right)
      return this.rotateLeft(node)
    }

    return node
  }

  delete(value) {
    this.lastRotation = null
    this.lastOperation = { type: 'delete', value, rotation: null }
    this.root = this._delete(this.root, value)
    if (this.lastRotation) {
      this.lastOperation.rotation = this.lastRotation
    }
    return this.root
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
      if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      }

      const temp = this._minValueNode(node.right)
      node.value = temp.value
      node.right = this._delete(node.right, temp.value)
    }

    if (!node) {
      return node
    }

    this.updateHeight(node)
    const balance = this.getBalanceFactor(node)

    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node)
    }

    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left)
      return this.rotateRight(node)
    }

    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node)
    }

    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right)
      return this.rotateLeft(node)
    }

    return node
  }

  _minValueNode(node) {
    let current = node
    while (current.left) {
      current = current.left
    }
    return current
  }

  find(value) {
    return this._find(this.root, value)
  }

  _find(node, value) {
    if (!node) return false
    if (node.value === value) return true
    if (value < node.value) return this._find(node.left, value)
    return this._find(node.right, value)
  }

  findNode(value) {
    return this._findNode(this.root, value)
  }

  _findNode(node, value) {
    if (!node) return null
    if (node.value === value) return node
    if (value < node.value) return this._findNode(node.left, value)
    return this._findNode(node.right, value)
  }

  clear() {
    this.root = null
    this.lastOperation = { type: 'clear', value: null, rotation: null }
    this.lastRotation = null
  }

  getSize() {
    return this._getSize(this.root)
  }

  _getSize(node) {
    if (!node) return 0
    return 1 + this._getSize(node.left) + this._getSize(node.right)
  }

  inorder() {
    const result = []
    this._inorder(this.root, result)
    return result
  }

  _inorder(node, result) {
    if (!node) return
    this._inorder(node.left, result)
    result.push(node.value)
    this._inorder(node.right, result)
  }

  preorder() {
    const result = []
    this._preorder(this.root, result)
    return result
  }

  _preorder(node, result) {
    if (!node) return
    result.push(node.value)
    this._preorder(node.left, result)
    this._preorder(node.right, result)
  }

  postorder() {
    const result = []
    this._postorder(this.root, result)
    return result
  }

  _postorder(node, result) {
    if (!node) return
    this._postorder(node.left, result)
    this._postorder(node.right, result)
    result.push(node.value)
  }

  levelOrder() {
    const result = []
    if (!this.root) return result

    const queue = [this.root]
    while (queue.length > 0) {
      const node = queue.shift()
      result.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    return result
  }

  getStats() {
    return {
      height: this.getHeight(this.root),
      totalNodes: this.getSize(),
      balance: this.getBalanceFactor(this.root),
    }
  }

  getOperationDetails() {
    return this.lastOperation
  }
}
