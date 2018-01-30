THREE.Earth = function(options){

  THREE.Object3D.call(this);
  this.name = "sky_" + this.id;
  options = options || {};

  function TreeNode(val){
    this.val = val;
    this.right = this.left = null;
  }

  function params(value, defaultValue){
    return value !== undefined ? value : defaultValue;
  }

  this.firstLevel = params(options.firstLevel, []);
  this.secondLevel = params(options.secondLevel, []);
  this.thirdLevel = params(options.thirdLevel, []);

  this.firstBoundary = params(options.firstBoundary, []);
  this.secondBoundary = params(options.secondBoundary, []);
  this.thirdBoundary = params(options.thirdBoundary, []);

  function createTree(){
    
    if (this.firstLevel.length <= 0){
      return;
    }

    this.root = new TreeNode(this.firstLevel[0]);
    var currentNode = root;
    for (var i = 0 ; i < this.secondLevel.length ; i++){
      currentNode.right = new TreeNode(this.secondLevel[i]);
      currentNode = currentNode.right;

    }

    // for (var j = 0 ; j < this.thirdLevel.length ; j++){
    //   currentNode.child.push(new TreeNode(this.thirdLevel[j]));
    // }
  }

  this.side = params(options.side, THREE.FrontSide);

  this.material = new THREE.MeshBasicMaterial({
  });

  this.mesh = new THREE.Object3D();
};

THREE.Earth.prototype = Object.create(THREE.Object3D.prototype);

THREE.Earth.prototype.render = function(options, camera){

      options = options || {};

      function params(value, defaultValue){
        return value !== undefined ? value : defaultValue;
      }

      if (camera.position.y > this.firstBoundary){
          this.root
      }
};

