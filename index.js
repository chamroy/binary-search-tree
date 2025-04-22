class Node{
    constructor(data){
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }
    
    buildTree(array){
        const processedArray = [...new Set(array)].sort((a,b) => a - b);
        return this.constructBalanceBST(processedArray, 0, processedArray.length - 1)

    }
    constructBalanceBST(array, start, end){
        if(start > end) return null;
        const mid = Math.floor((start + end) /2);
        const node = new Node(array[mid])
        node.left = this.constructBalanceBST(array, start, mid - 1);
        node.right = this.constructBalanceBST(array, mid + 1, end);
        return node;
    }

    insert(value, node = this.root){
        if(node === null) return new Node(value);
        if(value < node.data){
            node.left = this.insert(value, node.left);

        } else if (value > node.data){
            node.right = this.insert(value, node.right);
        }
        return node;

    }

    deleteItem(value, node = this.root){
        if(node === null) return null;
        if(value < node.data){
            node.left = this.deleteItem(value, node.left);

        } else if( value > node.data){
            node.right = this.deleteItem(value, node.right);
        } else {
            if(node.left  === null) return node.right
            if(node.right  === null) return node.left
                
            node.data = this.minValue(node.right);
            node.right = this.deleteItem(node.data, node.right);
        }
        return node;
    }

    minValue(node){
        let min = node.data;
        while(node.left !== null){
            min = node.left.data;
            node = node.left;
        }
        return min;
    }

    find(value, node = this.root){
        if(node === null) return null;
        if(value === node.data) return node;
        return value < node.data? this.find(value, node.left): this.find(value, node.right);
    }
    
    levelOrder(callback){
        if(!callback) throw new Error('Callback function is required');
        const queue = [this.root];
        while(queue.length > 0){
            const current = queue.shift();
            callback(current);
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            
        }
    }

    inOrder(callback, node = this.root){
        if(!callback) throw new Error('callback function is required');
        if(node === null) return;
        callback(node);
        this.inOrder(callback, node.left);
        this.inOrder(callback, node.right);
    }
    postOrder(callback, node = this.root){
        if(!callback) throw new Error('callback function is required');
        if(node === null) return;
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);

    }

    height(node){
        if(node === null) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;

    }

    depth(value, node = this.root, currentDepth = 0){
        if(node === null) return null;
        if(value === node.data) return currentDepth;
        if(value < node.data){
            return this.depth(value, node.left, currentDepth + 1);
        } else {
            return this.depth(value, node.right, currentDepth + 1);
        }
    }

    isBalanced(node = this.root){
        if(node === null) return true;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right);
    }
     
    rebalance(){
        const nodes =[];
        this.inOrder(node => nodes.push(node.data));
        this.root = this.buildTree(nodes)
    }

     prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree  = new Tree(data);
tree.prettyPrint(); 
console.log('Inserting 10: ')

tree.insert(10);
tree.prettyPrint();

console.log('Deleting 23: ')
tree.deleteItem(23);
tree.prettyPrint();

console.log('finding: 8');
console.log(tree.find(8));

console.log('Level Order traversal: ')
tree.levelOrder(node =>console.log(node.data))

console.log('Tree Height:', tree.height(tree.root))
console.log('Depth of 9', tree.depth(9))
console.log('Is balanced', tree.isBalanced())
console.log('Rebalanced Tree');
tree.rebalance();
tree.prettyPrint();

