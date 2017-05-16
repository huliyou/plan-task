module.exports = {
	//判断table 是否已包含该数据
  	isInArray(arr, item) {
  		let status = false;
  		console.log('onChange____arr',arr)
  		console.log('onChange____item',item)
		for (var i = 0; i < arr.length; i++) { 
			if (arr[i].probId == item.probId) {
				status = true;
			}
		}
	    return status;
  	},

  	//数组删除某个元素
  	removeItem(arr,item){
  		for (var i = 0; i < arr.length; i++) { 
			if (arr[i].probId == item.probId) {
				arr.splice(i,1);
			}
		}
		return arr;
  	},
}