/**
 * 排序二叉树的节点
 *
 * @param {*} key
 */
function Node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}

/**
 * 排序二叉树
 *
 * @param {*} arr
 */
function BinaryTree(arr) {
  this.root = null;
  this._init(arr);
}

BinaryTree.prototype = {
  constructor: BinaryTree,
  _init(arr) {
    for(let i = 0, len = arr.length; i < len; i++) {
      this.insert(arr[i]);
    }
  },
  /**
   * 插入节点
   *
   * @param {*} key
   */
  insert(key) {
    const node = new Node(key);
    if(this.root === null) {
      this.root = node;
    } else {
      this._insertNode(this.root, node);
    }
  },
  _insertNode(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if(node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  },
  _preOrderTraversal(node, cb) {
    if(node !== null) {
      cb(node.key);
      this._preOrderTraversal(node.left, cb);
      this._preOrderTraversal(node.right, cb);
    }
  },
  /**
   * 前序遍历：根节点 -> 左节点 -> 右节点
   *
   * @param {*} cb
   */
  preOrderTraversal(cb) {
    this._preOrderTraversal(this.root, cb);
  },
  _orderTraversal(node, cb) {
    if(node !== null) {
      this._orderTraversal(node.left, cb);
      cb(node.key);
      this._orderTraversal(node.right, cb);
    }
  },
  /**
   * 中序遍历：左节点 -> 根节点 -> 右节点
   *
   * @param {*} cb
   */
  orderTraversal(cb) {
    this._orderTraversal(this.root, cb);
  },
  _postOrderTraversal(node, cb) {
    if(node !== null) {
      this._postOrderTraversal(node.left, cb);
      this._postOrderTraversal(node.right, cb);
      cb(node.key);
    }
  },
  /**
   * 后序遍历：左节点 -> 右节点 -> 根节点
   *
   * @param {*} cb
   */
  postOrderTraversal(cb) {
    this._postOrderTraversal(this.root, cb);
  },
  _max(node) {
    if(node.right === null) {
      return node.key;
    } else {
      return this._max(node.right);
    }
  },
  /**
   * 查找最大节点
   *
   */
  max() {
    return this._max(this.root);
  },
  _min(node) {
    if(node.left === null) {
      return node.key;
    } else {
      return this._min(node.left);
    }
  },
  /**
   * 查找最小节点
   *
   */
  min() {
    return this._min(this.root);
  },
  _search(node, key) {
    if(node !== null) {
      if(key < node.key) {
        return this._search(node.left, key);
      } else if(key > node.key) {
        return this._search(node.right, key);
      } else if(key === node.key) {
        return true;
      }
    } else {
      return false;
    }
  },
  /**
   * 查找任意节点
   *
   * @param {*} key
   */
  search(key) {
    return this._search(this.root, key);
  },
  // _delete(node, key) {
  //   if(node === null) {
  //     return null;
  //   }
  //   if(key < node.key) {
  //     node.left = this._delete(node.left, key);
  //     return node;
  //   } else if(key > node.key) {
  //     node.right = this._delete(node.right, key);
  //     return node;
  //   } else if(key === node.key) {
  //     return node;
  //   }
  // },
  // /**
  //  * 删除节点
  //  *
  //  * @param {*} key
  //  */
  // remove(key) {
  //   this._delete(this.root, key);
  // },

}

const tree = new BinaryTree([7, 5, 8, 4, 3, 20, 9, 2, 1]);
let res = [];
tree.preOrderTraversal(v => res.push(v));
const max = tree.max();
const min = tree.min();
const search = tree.search(5);
console.log(tree, res, max, min, search);
