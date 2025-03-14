class Node { 
    /**
     * Constructor to initialize a node with a name.
     * @param {string} name - The name of the node.
     */
    constructor(name) {
        this.name = name;
        this.children = new Map();
        this.parent = null;
    }

    /**
     * Sets the parent node.
     * @param {Node} parent - The parent node.
     */
    setParent(parent) {
        this.parent = parent;
    }

    /**
     * Checks if the node has a child with the specified name.
     * @param {string} name - The name of the child node to check.
     * @returns {boolean} - True if the child exists, otherwise false.
     */
    hasChild(name) {
        return this.children.has(name);
    }

    /**
     * Adds a child node to the current node.
     * @param {Node} node - The child node to add.
     */
    addChild(node) {
        node.setParent(this);
        this.children.set(node.name, node);
    }

    /**
     * Removes a child node by name.
     * @param {string} name - The name of the child node to remove.
     */
    removeChild(name) {
        this.children.delete(name);
    }
}

module.exports = Node;