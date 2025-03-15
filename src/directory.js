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
     
        // ASSUMPTION: list children in alphabetical order (like a normal file directory)
        const sortedChildren = [...node.children.values()].sort((a, b) => a.name.localeCompare(b.name));


        for(const child of sortedChildren) {
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
                // ASSUMPTION: handle invalid path same as given in DELETE error path example
                console.error(`Cannot move ${fromPath} to ${toPath} - ${part} does not exist`);
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
                // ASSUMPTION: handle invalid path same as given in DELETE error path example
                console.error(`Cannot move ${fromPath} to ${toPath} - ${part} does not exist`);
                return;
            }
        }

        // So we traversed the from node path now lets delete this child from the parent so we can properly move it 
        currFromNode.parent.removeChild(currFromNode.name);

        // Now we can properly move the node to its new parent 
        currToNode.addChild(currFromNode);
    }

    /**
     * Delete a node from the directory tree
     * @param {string} path - The path of node to remove (ie: 'fruits/apples/fuji')
     */
    delete(path) {
        // handle deletion of root 
        if(path === '') {
            this.root = new Node('');
            return;
        }
        
        const parts = this._splitPath(path);
        
        let curr = this.root;

        for (const part of parts) {
            if(curr.hasChild(part)) {
                curr = curr.children.get(part);
            } else {
                console.error(`ERROR: Cannot delete ${path} - ${part} does not exist`);
                return;
            }
        }
        
        // So we traversed the path now lets delete this child from its parent (similar to move)
        curr.parent.removeChild(curr.name);        
    }
}

const tree = new Directory();
// follow given test
tree.create('fruits');
tree.create('vegetables');
tree.create('grains');
tree.create('fruits/apples');
tree.create('fruits/apples/fuji');
tree.list();
// so far so good 
tree.create('grains/squash');
tree.move('grains/squash', 'vegetables');
tree.create('foods');  
tree.move('grains', 'foods');
tree.move('fruits', 'foods');
tree.move('vegetables', 'foods');
tree.list();
// so far so good
tree.delete('fruits/apples');
tree.delete('foods/fruits/apples');
tree.list();
// yay! passed given test case 