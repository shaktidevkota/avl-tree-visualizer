# React AVL Tree Visualizer

A modern React implementation of an AVL Tree Visualizer that demonstrates core React concepts and data structure algorithms.

## 🎯 Phase 1 — React Basics Implementation

This project covers fundamental React concepts:

### ✅ Components
- **App**: Main container component with state management
- **TreeVisualization**: Pure component for rendering the tree SVG

### ✅ Props
- Passing `root` prop to TreeVisualization component
- Component communication through props

### ✅ State
- `tree`: AVLTree instance (stable reference)
- `inputValue`: Controlled input for single values
- `multiInput`: Controlled input for bulk operations
- `message`: UI feedback state
- `treeData`: Tree root for triggering re-renders

### ✅ useState Hook
- Managing all component state with useState
- State updates trigger re-renders
- Controlled components pattern

### ✅ useEffect Hook
- `useEffect(() => { setTreeData(tree.root) }, [tree.root])`
- Synchronizes tree data with React state
- Triggers visualization updates

### ✅ Event Handling
- `onClick` handlers for all buttons
- `onChange` handlers for controlled inputs
- `onKeyPress` for Enter key support
- Event delegation and proper binding

### ✅ Conditional Rendering
- `{message.text && <div className={`message ${message.type}`}>...}`
- Conditional display of feedback messages
- Dynamic class names based on state

### ✅ Lists & Keys
- Recursive tree rendering (implicit lists)
- Each node rendered with unique positioning
- SVG elements as dynamic children

## 🏗️ React Rendering Flow

1. **State Change**: User interacts → state updates
2. **Re-render Trigger**: useState setters cause component re-render
3. **Virtual DOM**: React creates new virtual DOM tree
4. **Diffing**: Compares with previous virtual DOM
5. **Updates**: Applies minimal DOM changes
6. **Effects**: useEffect runs for side effects
7. **Visualization**: Tree data updates trigger SVG redraw

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── App.jsx              # Main component with AVL logic
├── App.css              # Component styles
├── TreeVisualization.jsx # SVG tree renderer
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## 🔄 Conversion from Vanilla JS

**Before (Vanilla JS):**
- DOM manipulation with `document.getElementById()`
- Direct event listeners with `addEventListener()`
- Manual state management
- Imperative SVG drawing

**After (React):**
- Declarative component-based architecture
- useState for reactive state management
- useEffect for side effects
- Props for component communication
- Controlled components pattern

## 🎨 Key React Patterns Demonstrated

- **Component Composition**: App contains TreeVisualization
- **State Lifting**: Tree state managed at App level
- **Controlled Components**: Input values controlled by state
- **Side Effect Management**: useEffect for tree updates
- **Event Handling**: Synthetic events with proper binding
- **Conditional Rendering**: Dynamic UI based on state
- **Props Drilling**: Passing data through component tree

This React implementation maintains all the original AVL tree functionality while demonstrating modern React development patterns and the component lifecycle.