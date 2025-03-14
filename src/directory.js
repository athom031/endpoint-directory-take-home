const Node = require('./node');

class Directory {
    /**
     * Constructor to initialize directory tree with root Node
     */
    constructor() {
        this.root = new Node('');
    }

    /**
     * Helper function to scalably get parts of path 
     * @param {string} path
     * @return {string[]} - The parts of path
     */
    _splitPath(path) {
        return path.split('/');
    }

    /**
     * Create path in direcotry tree 
     * If nodes along the way dont exist in tree to make valid path, make them 
     * @param {string} path - The path to create (ie: 'fruits/apples/fuji)
     */
    create(path) {
        const parts = this._splitPath(path);

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

    /**
     * Move a node to a new parent node 
     * @param {string} fromPath - The path of node to move (ie: 'fruits/apples/fuji')
     * @param {string} toPath - The path of new parent node (ie: 'fruits')
     */
    move(fromPath, toPath) {
        // Go through given from path
        const fromParts = this._splitPath(fromPath);
        let currFromNode = this.root;
        for (const part of fromParts) {
            if(currFromNode.hasChild(part)) {
                currFromNode = currFromNode.children.get(part);
            } else {
                console.error(`ERROR: Cannot move ${fromPath} to ${toPath}.\n${fromPath} is not valid path in current directory.`);
                return;
            }
        } 

        // Go through given to path 
        const toParts = this._splitPath(toPath);
        let currToNode = this.root;
        for (const part of toParts) {
            if(currToNode.hasChild(part)) {
                currToNode = currToNode.children.get(part);
            } else {
                console.error(`ERROR: Cannot move ${fromPath} to ${toPath}.\n${toPath} is not valid path in current directory.`);
                return;
            }
        }

        // So we traversed the from node path now lets delete this child from the parent so we can properly move it 
        currFromNode.parent.removeChild(currFromNode.name);

        // Now we can properly move the node to its new parent 
        currToNode.addChild(currFromNode);
    }
}

const tree = new Directory();
tree.create('fruits');
tree.create('fruits/apples');
tree.create('fruits/apples/fuji');
tree.create('vegetables');
tree.list();
tree.move('fruits/apples/fuji', 'vegetables');
tree.list();