/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(start = this.root, depth = 0) {
    if(!start){
      return depth;
    }

    depth++;
    const left = this.left;
    const right = this.right;

    return  this.minDepth(left,depth) <
            this.minDepth(right,depth) ?
            left : right;

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(start = this.root, depth = 0) {

    if(!start){
      return depth;
    }

    depth++;
    const left = this.left;
    const right = this.right;

    return  this.maxDepth(left,depth) > 
            this.maxDepth(right,depth) ?
            left : right;

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(start = this.root, sum = 0) {

    if(!start){
      return sum;
    }

    const sum = sum + this.maxSum(this.left,sum) > this.maxSum(this.right,sum) ? 
    this.maxSum(this.left,sum) : this.maxSum(this.right,sum);

    return sum;

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound = 0,current = 0, start = this.root) {

    if(!start){
      return current;
    }

    if(start.val > lowerBound && start.val < current){
      current = start.val;
    }


    const lb = this.nextLarger(lowerBound, current, this.left) <
                this.nextLarger(lowerBound,current, this.right) ? 
                this.nextLarger(lowerBound,current,this.left) :
                this.nextLarger(lowerBound,current,this.right);
        

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

    function getDepth(current = this.root, depth = 0, target){

      depth++;
      if(current === target){
        return depth;
      } else {
        return getDepth(this.left, depth, target) || getDepth(this.right,depth,target);
      }

    }

    if(getDepth(node1,0,node2)){
      return true;
    } else {
      return false;
    }

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

   static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }

    traverse(tree.root);
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function buildTree() {
      // building a tree starting from the beginning of the array
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    // base case 1: empty tree
    if (currentNode === null) return null;

    // base case 2: root is one of the target nodes
    if (currentNode === node1 || currentNode === node2) return currentNode;

    // recursively search the left sub-tree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    // recursively search the right sub-tree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    // if neither left nor right is null, currentNode is the ancestor
    if (left !== null && right !== null) return currentNode;
    
    // if one node is not null, return it
    if (left !== null || right !== null) return left || right;
    
    // left and right are both null, return null
    if (left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
