# React AVL Tree Visualizer

A modern React implementation of an AVL Tree Visualizer that demonstrates core React concepts and data structure algorithms. **v1.0** ✨

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and **npm** 8+
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/shaktidevkota/react-avl-visualizer.git
cd react-avl-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173` (Vite default)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 Project Features

This project demonstrates core React concepts:

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

## 📁 Clean Architecture & Separation of Concerns

```
src/
├── dataStructures/
│   └── AVLTree.js          # Pure AVL data structure
│                           # No React dependencies
│                           # Export: Node, AVLTree classes
│
├── utils/
│   └── layoutTree.js       # Tree positioning algorithm
│                           # Converts tree to SVG coordinates
│                           # Export: layoutTree function
│
├── components/
│   ├── Node.jsx            # Individual node rendering
│   └── Edge.jsx            # Connection lines between nodes
│
├── App.jsx                 # Main app with state management
├── App.css                 # Component styling + animations
├── TreeVisualization.jsx   # Tree rendering orchestrator
├── main.jsx                # React entry point
├── index.css               # Global styles
│
├── package.json            # Dependencies & scripts
├── vite.config.js          # Build configuration
└── index.html              # HTML entry point
```

### Architecture Principles

✅ **Data Structure** (`AVLTree.js`): Pure JavaScript, reusable in any framework  
✅ **Utilities** (`layoutTree.js`): Algorithm for tree positioning  
✅ **Components** (`components/`): Reusable React UI elements  
✅ **Container** (`App.jsx`): State management and coordination  
✅ **Visualization** (`TreeVisualization.jsx`): Pure rendering component  

---

---

## 🎮 How to Use

### Insert a Single Value
1. Enter a number in the input field
2. Click **"Insert"** or press Enter
3. Watch the tree rebalance automatically
4. The new node highlights briefly in yellow

### Delete a Value
1. Enter a number in the input field
2. Click **"Delete"** to remove it
3. Tree rebalances if necessary

### Search a Value
1. Enter a number in the input field
2. Click **"Search"** to highlight it in the tree

### Insert Multiple Values
1. Enter comma-separated values (e.g., `10, 20, 30`)
2. Click **"Insert Multiple"**
3. All values are inserted sequentially

### Clear the Tree
Click **"Clear"** to remove all nodes and start fresh

---

## 🔄 React Concepts Demonstrated

✅ **Components** — App, TreeVisualization, Node, Edge  
✅ **Props** — Passing data through component tree  
✅ **State (useState)** — Input, tree data, highlighting  
✅ **Effects (useEffect)** — Sync tree with visualization  
✅ **Events** — Clicks, keypresses, form submissions  
✅ **Controlled Components** — Inputs controlled by state  
✅ **Conditional Rendering** — Dynamic UI based on state  
✅ **SVG Rendering** — Custom visualization with React  

### Conversion from Vanilla JS → React

| Vanilla JS | React |
|-----------|-------|
| `document.getElementById()` | State + Props |
| `addEventListener()` | `onClick`, `onChange` handlers |
| Manual DOM updates | Virtual DOM + auto re-render |
| Imperative SVG | Declarative React components |
| Global state | `useState` hooks |

---

## 📋 Implementation Steps

### Step 1: AVL Logic Extraction
- Created `src/dataStructures/AVLTree.js`
- Implemented Node class with height tracking
- Implemented AVLTree class with insert/delete
- Added all rotation cases (LL, LR, RL, RR)
- **Commit**: `feat: implement AVL tree logic with rotations`

### Step 2: Layout Engine  
- Created `src/utils/layoutTree.js`
- Implemented recursive tree positioning algorithm
- Calculates x,y coordinates for each node
- Handles balance factor visualization
- **Commit**: `feat: add tree layout algorithm for node positioning`

### Step 3: Rendering System
- Created `src/TreeVisualization.jsx` component
- Created `src/components/Node.jsx` for individual nodes
- Created `src/components/Edge.jsx` for connections
- SVG-based rendering with smooth transitions
- **Commit**: `feat: implement SVG tree rendering system with components`

### Step 4: React Integration
- Created `src/App.jsx` with state management
- Connected AVL logic with React hooks (useState, useEffect)
- Implemented event handlers for all operations
- Added user feedback messages
- **Commit**: `feat: connect AVL tree with React state and UI interactions`

### Step 5: Final Polish
- Added styling with `src/App.css`
- Included animations and hover effects
- Set up build configuration with Vite
- **Commit**: `chore: finalize AVL visualizer v1 with configuration files`

### View Git History
```bash
git log --oneline
```

---

## 🎨 Tech Stack

- **React 18.2** — UI library
- **Vite 5** — Build tool & dev server
- **JavaScript ES6+** — Modern syntax
- **SVG** — Vector graphics
- **CSS3** — Styling + animations

---

## 🚀 Next Phase (v2 Enhancement Ideas)

- [ ] Framer Motion animations for rotations
- [ ] Highlight rotation operations
- [ ] Tree traversal visualization (In/Pre/Post order)
- [ ] Step-by-step execution mode
- [ ] Dark/light theme toggle
- [ ] Export tree as image
- [ ] Performance metrics dashboard

---

## 📝 License

Open source for educational purposes.

---

**Happy Learning! 🎉**