# AVL Tree Visualizer

A polished React portfolio project that visualizes an AVL tree with insertion, deletion, search, balancing, traversals, and interactive SVG animation.

## 🚀 Features

- Insert and delete values with automatic AVL balancing
- Search nodes and highlight selections
- Random tree generation and bulk insert support
- Inorder, preorder, postorder, and level order traversals
- Visual display of node height and balance factor
- Rotation highlighting for balancing operations
- Responsive layout with clean modern UI
- Vite-powered build ready for deployment

## 📦 Tech Stack

- React 18
- Vite
- JavaScript (ES6+)
- SVG visualization
- Custom AVL tree implementation

## 💻 Installation

```bash
git clone https://github.com/shaktidevkota/avl-tree-visualizer.git
cd avl-tree-visualizer
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📈 Production Build

```bash
npm run build
npm run preview
```

## 🧠 How to Use

1. Enter a value in the input field and click **Insert**.
2. Use **Delete** to remove a value.
3. Search a value and see it highlighted in the tree.
4. Use **Random Insert** or **Generate Tree** for fast demonstrations.
5. Run traversals and inspect the output path.
6. Click a node to view its height and balance factor.

## 📂 Project Structure

```text
src/
├── components/
│   ├── Edge.jsx
│   └── Node.jsx
├── dataStructures/
│   └── AVLTree.js
├── utils/
│   └── layoutTree.js
├── App.jsx
├── App.css
├── TreeVisualization.jsx
├── main.jsx
├── index.css
└── index.html
```

## ✨ AVL Tree Insights

- **AVL tree** is a self-balancing binary search tree.
- Each node tracks the height of its subtree.
- The tree rotates to keep the difference between left and right subtree heights at most 1.
- Rotation types supported: left rotation, right rotation, left-right, right-left.
- Operation time complexity remains **O(log n)**.

## 🚀 Deployment

This project is ready for deployment on Vercel, Netlify, or GitHub Pages.

### Vercel
- Connect your GitHub repository
- Set build command: `npm run build`
- Set output directory: `dist`

### GitHub Pages
```bash
npm install gh-pages --save-dev
```
Add to `package.json`:
```json
"homepage": "https://<your-username>.github.io/avl-tree-visualizer",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Then run:
```bash
npm run deploy
```

## 🛠 Future Improvements

- Animated rotation steps
- Step-by-step tree building mode
- Dark/light theme toggle
- Export tree image or JSON
- Traversal animation

## 📌 Notes

This repository is designed to be portfolio-ready with a user-friendly interface, strong algorithm support, and responsive styling.
