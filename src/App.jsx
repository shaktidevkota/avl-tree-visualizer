import { useState, useEffect } from 'react'
import { AVLTree } from './dataStructures/AVLTree'
import { layoutTree } from './utils/layoutTree'
import TreeVisualization from './TreeVisualization'
import './App.css'

function App() {
  // Initialize AVL tree instance (stable reference)
  const [tree] = useState(() => new AVLTree())

  // React state for UI
  const [inputValue, setInputValue] = useState('')
  const [multiInput, setMultiInput] = useState('')
  const [message, setMessage] = useState('')
  const [visualTreeData, setVisualTreeData] = useState(null)
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [treeRefresh, setTreeRefresh] = useState(0) // Force re-render on tree changes

  // Update visual tree data whenever tree changes
  useEffect(() => {
    const newVisualData = layoutTree(tree.root, 800, 600)
    setVisualTreeData(newVisualData)
  }, [treeRefresh])

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const handleInsert = () => {
    const value = parseInt(inputValue)

    if (isNaN(value)) {
      showMessage("Please enter a valid number", "error")
      return
    }

    if (tree.find(value)) {
      showMessage(`Value ${value} already exists in the tree`, "error")
      return
    }

    // Insert into AVL tree
    tree.insert(value)
    setTreeRefresh(prev => prev + 1) // Trigger re-render

    // Highlight the inserted node temporarily
    setHighlightedNode(value)
    setTimeout(() => setHighlightedNode(null), 2000)

    // Clear input and show success
    setInputValue("")
    showMessage(`Successfully inserted ${value} into AVL tree`, "success")
  }

  const handleDelete = () => {
    const value = parseInt(inputValue)

    if (isNaN(value)) {
      showMessage("Please enter a valid number", "error")
      return
    }

    if (!tree.find(value)) {
      showMessage(`Value ${value} not found in the tree`, "error")
      return
    }

    // Delete from AVL tree
    tree.delete(value)
    setTreeRefresh(prev => prev + 1) // Trigger re-render

    // Clear input and show success
    setInputValue("")
    showMessage(`Successfully deleted ${value} from AVL tree`, "success")
  }

  const handleClear = () => {
    tree.clear()
    setTreeRefresh(prev => prev + 1) // Trigger re-render
    setHighlightedNode(null)
    showMessage("Tree cleared successfully", "info")
  }

  const handleRandom = () => {
    const randomValue = Math.floor(Math.random() * 100)
    tree.insert(randomValue)
    setTreeRefresh(prev => prev + 1) // Trigger re-render

    // Highlight the inserted node
    setHighlightedNode(randomValue)
    setTimeout(() => setHighlightedNode(null), 2000)

    showMessage(`Random value ${randomValue} inserted`, "success")
  }

  const handleBulkInsert = () => {
    if (!multiInput) {
      showMessage("Please enter values to bulk insert", "error")
      return
    }

    const values = multiInput.split(/[\s,]+/)
    let insertedCount = 0

    for (let val of values) {
      let num = parseInt(val)
      if (!isNaN(num)) {
        tree.insert(num)
        insertedCount++
      }
    }

    if (insertedCount > 0) {
      setTreeRefresh(prev => prev + 1) // Trigger re-render
      setMultiInput("")
      showMessage(`Successfully inserted ${insertedCount} values`, "success")
    } else {
      showMessage("No valid numbers found to insert", "error")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInsert()
    }
  }

  const handleNodeClick = (nodeValue) => {
    const stats = tree.getStats()
    showMessage(`Node ${nodeValue}: Height=${stats.height}, Balance=${stats.balance}`, "info")
  }

  return (
    <div className="container">
      <h1>React AVL Tree Visualizer</h1>
      <p className="description">
        An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes. Each node shows: value (top), height (h:), and balance factor (b:).
      </p>

      <div className="controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter number"
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleRandom}>Random</button>
      </div>

      <div className="multi-controls">
        <input
          type="text"
          value={multiInput}
          onChange={(e) => setMultiInput(e.target.value)}
          placeholder="e.g. 50 30 70 20"
        />
        <button onClick={handleBulkInsert}>Bulk Insert</button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <TreeVisualization
        visualTreeData={visualTreeData}
        highlightedNode={highlightedNode}
        onNodeClick={handleNodeClick}
      />
    </div>
  )
}

export default App