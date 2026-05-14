import { useEffect, useState } from 'react'
import { AVLTree } from './dataStructures/AVLTree'
import { layoutTree } from './utils/layoutTree'
import TreeVisualization from './TreeVisualization'
import './App.css'

function App() {
  const [tree] = useState(() => new AVLTree())
  const [inputValue, setInputValue] = useState('')
  const [bulkInput, setBulkInput] = useState('')
  const [message, setMessage] = useState({ text: '', type: 'info' })
  const [visualTreeData, setVisualTreeData] = useState({ nodes: [], edges: [] })
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [rotationNodes, setRotationNodes] = useState([])
  const [operation, setOperation] = useState('Ready')
  const [traversal, setTraversal] = useState({ type: '', values: [] })
  const [treeStats, setTreeStats] = useState({ height: 0, totalNodes: 0, balance: 0 })
  const [treeRefresh, setTreeRefresh] = useState(0)

  useEffect(() => {
    setVisualTreeData(layoutTree(tree.root, 1200, 520))
    setTreeStats(tree.getStats())
  }, [treeRefresh, tree.root])

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type })
    if (!text) return
    setTimeout(() => setMessage({ text: '', type: 'info' }), 3200)
  }

  const triggerUpdate = (operationLabel, highlightValue = null) => {
    const details = tree.getOperationDetails()
    setOperation(operationLabel)

    if (highlightValue !== null) {
      setHighlightedNode(highlightValue)
      setTimeout(() => setHighlightedNode(null), 2400)
    }

    if (details?.rotation?.nodes?.length) {
      setRotationNodes(details.rotation.nodes)
      setTimeout(() => setRotationNodes([]), 2400)
    }

    setTreeRefresh((prev) => prev + 1)
  }

  const handleInsert = () => {
    const value = parseInt(inputValue, 10)
    if (Number.isNaN(value)) {
      showMessage('Please enter a valid number.', 'error')
      return
    }
    if (tree.find(value)) {
      showMessage(`Value ${value} already exists in the tree.`, 'error')
      return
    }

    tree.insert(value)
    triggerUpdate(`Insert ${value}`, value)
    setInputValue('')
    setTraversal({ type: '', values: [] })
    showMessage(`Inserted ${value} and rebalanced the tree.`, 'success')
  }

  const handleDelete = () => {
    const value = parseInt(inputValue, 10)
    if (Number.isNaN(value)) {
      showMessage('Please enter a valid number.', 'error')
      return
    }
    if (!tree.find(value)) {
      showMessage(`Value ${value} not found in the tree.`, 'error')
      return
    }

    tree.delete(value)
    triggerUpdate(`Delete ${value}`)
    setInputValue('')
    setTraversal({ type: '', values: [] })
    showMessage(`Deleted ${value} and updated tree balance.`, 'success')
  }

  const handleSearch = () => {
    const value = parseInt(inputValue, 10)
    if (Number.isNaN(value)) {
      showMessage('Please enter a valid number to search.', 'error')
      return
    }
    if (!tree.find(value)) {
      setOperation(`Search ${value}`)
      showMessage(`Value ${value} was not found.`, 'error')
      return
    }

    const node = tree.findNode(value)
    const balance = tree.getBalanceFactor(node)
    triggerUpdate(`Search ${value}`, value)
    showMessage(`Found ${value}: height ${node.height}, balance ${balance}.`, 'success')
  }

  const handleClear = () => {
    tree.clear()
    triggerUpdate('Tree reset')
    setHighlightedNode(null)
    setRotationNodes([])
    setTraversal({ type: '', values: [] })
    showMessage('Tree cleared successfully.', 'info')
  }

  const handleRandomInsert = () => {
    let value = Math.floor(Math.random() * 90) + 10
    let attempts = 0
    while (tree.find(value) && attempts < 30) {
      value = Math.floor(Math.random() * 90) + 10
      attempts += 1
    }

    if (tree.find(value)) {
      showMessage('Unable to find a new random value. Try again.', 'error')
      return
    }

    tree.insert(value)
    triggerUpdate(`Random insert ${value}`, value)
    setInputValue('')
    setTraversal({ type: '', values: [] })
    showMessage(`Inserted random value ${value}.`, 'success')
  }

  const handleGenerateTree = () => {
    const insertedValues = []
    let attempts = 0
    while (insertedValues.length < 6 && attempts < 60) {
      const value = Math.floor(Math.random() * 90) + 10
      if (!tree.find(value) && !insertedValues.includes(value)) {
        tree.insert(value)
        insertedValues.push(value)
      }
      attempts += 1
    }

    if (!insertedValues.length) {
      showMessage('Unable to generate a random tree. Try again.', 'error')
      return
    }

    triggerUpdate('Random tree generated', insertedValues[insertedValues.length - 1])
    setTraversal({ type: '', values: [] })
    showMessage(`Random tree values: ${insertedValues.join(', ')}.`, 'success')
  }

  const handleBulkInsert = () => {
    if (!bulkInput.trim()) {
      showMessage('Enter comma-separated values to insert.', 'error')
      return
    }

    const values = bulkInput
      .split(/[\s,]+/)
      .map((item) => parseInt(item, 10))
      .filter((value) => !Number.isNaN(value))

    if (!values.length) {
      showMessage('No valid numbers found in the bulk input.', 'error')
      return
    }

    let insertedCount = 0
    values.forEach((value) => {
      if (!tree.find(value)) {
        tree.insert(value)
        insertedCount += 1
      }
    })

    if (!insertedCount) {
      showMessage('All provided values already exist in the tree.', 'error')
      return
    }

    triggerUpdate(`Bulk insert ${insertedCount} values`)
    setBulkInput('')
    setTraversal({ type: '', values: [] })
    showMessage(`${insertedCount} values inserted successfully.`, 'success')
  }

  const handleTraversal = (type) => {
    if (!treeStats.totalNodes) {
      showMessage('Build the tree before traversing.', 'info')
      return
    }

    let values = []
    if (type === 'inorder') values = tree.inorder()
    if (type === 'preorder') values = tree.preorder()
    if (type === 'postorder') values = tree.postorder()
    if (type === 'levelorder') values = tree.levelOrder()

    setTraversal({ type, values })
    setOperation(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal`)
    showMessage(`Traversal result: ${values.join(' → ')}`, 'info')
  }

  const handleNodeClick = (nodeValue) => {
    const node = tree.findNode(nodeValue)
    if (!node) return
    const balance = tree.getBalanceFactor(node)
    showMessage(`Node ${nodeValue} — height: ${node.height}, balance: ${balance}.`, 'info')
  }

  return (
    <div className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">AVL Tree Visualizer</p>
          <h1>AVL Tree Portfolio Project</h1>
          <p className="description">
            Explore AVL insertion, deletion, search, balancing and traversals with a polished React visualization. The tree updates in real time while displaying node height, balance factors and rotation feedback.
          </p>
        </div>

        <div className="status-panel">
          <div className="status-card">
            <h3>Current Operation</h3>
            <p>{operation}</p>
          </div>
          <div className="status-card">
            <h3>Tree Height</h3>
            <p>{treeStats.height}</p>
          </div>
          <div className="status-card">
            <h3>Total Nodes</h3>
            <p>{treeStats.totalNodes}</p>
          </div>
          <div className="status-card">
            <h3>Balance Factor</h3>
            <p>{treeStats.balance}</p>
          </div>
        </div>
      </section>

      <div className="layout-grid">
        <aside className="control-panel">
          <div className="panel">
            <div className="panel-header">
              <h2>Tree Controls</h2>
              <span className="tag">AVL</span>
            </div>
            <div className="section">
              <label>Single value</label>
              <div className="input-row">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                  placeholder="Enter a number"
                />
                <button className="button primary" onClick={handleInsert}>Insert</button>
              </div>
              <div className="button-group">
                <button className="button secondary" onClick={handleDelete}>Delete</button>
                <button className="button secondary" onClick={handleSearch}>Search</button>
              </div>
            </div>
            <div className="section">
              <label>Bulk insert</label>
              <textarea
                rows="3"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Enter values separated by space or comma"
              />
              <button className="button accent" onClick={handleBulkInsert}>Insert Multiple</button>
            </div>
            <div className="section split-actions">
              <button className="button secondary" onClick={handleRandomInsert}>Insert Random</button>
              <button className="button secondary" onClick={handleGenerateTree}>Generate Tree</button>
            </div>
            <div className="section split-actions">
              <button className="button outline" onClick={handleClear}>Reset Tree</button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Traversals</h2>
            </div>
            <div className="button-grid">
              <button className="button outline" onClick={() => handleTraversal('inorder')}>Inorder</button>
              <button className="button outline" onClick={() => handleTraversal('preorder')}>Preorder</button>
              <button className="button outline" onClick={() => handleTraversal('postorder')}>Postorder</button>
              <button className="button outline" onClick={() => handleTraversal('levelorder')}>Level Order</button>
            </div>
            <div className="traversal-output">
              {traversal.type ? (
                <>
                  <h3>{traversal.type.charAt(0).toUpperCase() + traversal.type.slice(1)}:</h3>
                  <p>{traversal.values.join(' → ')}</p>
                </>
              ) : (
                <p className="muted">Traversal output appears here.</p>
              )}
            </div>
          </div>

          <div className="panel info-panel">
            <div className="panel-header">
              <h2>Algorithm Insights</h2>
            </div>
            <ul>
              <li>Search: O(log n)</li>
              <li>Insert: O(log n)</li>
              <li>Delete: O(log n)</li>
              <li>Balance check: height difference ≤ 1</li>
            </ul>
          </div>
        </aside>

        <main className="visual-panel">
          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
          <div className="visual-card">
            <div className="visual-header">
              <div>
                <h2>AVL Tree Visualization</h2>
                <p>Click a node to reveal height and balance information.</p>
              </div>
              <span className="badge">Interactive SVG</span>
            </div>
            <TreeVisualization
              visualTreeData={visualTreeData}
              highlightedNode={highlightedNode}
              rotationNodes={rotationNodes}
              onNodeClick={handleNodeClick}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
