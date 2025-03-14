const Node = require('./node');

class Directory {
    /**
     * Constructor to initialize directory tree with root Node
     */
    constructor() {
        this.root = new Node('');
    }

    /**
     * Create path in direcotry tree 
     * If nodes along the way dont exist in tree to make valid path, make them 
     * @param {string} path - The path to create (ie: 'fruits/apples/fuji)
     */
    create(path) {
        const parts = path.split('/');

        let current = this.root;

        for(const part of parts) {
            // path may include children already created or not yet created children
            // in the case where child not created -> create new node to make path possible
            if(!current.hasChild(part)) {
                const newNode = new Node(part);
                current.addChild(newNode);
            }

            current = current.children.get(part);
        }
    }

    /**
     * Recursively lists all nodes in directory tree with proper indentation
     * @param {Node} node - The current node (defaults first call to root node) 
     * @param {number} depth - The depth of current node for indentation (defaults to 0 on first call)
     */
    list(node = this.root, depth = 0) {
        // recursive function to print out file name with proper indentation
        const indent = '  '.repeat(depth);
        // dont need to print out root (no name for root)
        if(node !== this.root) {
            console.log(`${indent}${node.name}`);
        }
        
        for(const child of node.children.values()) {
            this.list(child, depth + 1);
        }
    }
}

const tree = new Directory();
tree.create('fruits');
tree.create('fruits/apples');
tree.create('fruits/apples/fuji');
tree.list();