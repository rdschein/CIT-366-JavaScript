function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   if (listA === null || listB === null) {
	   	return null;
	   }

	   for (var i=0; i<listA.length; i++) {
           var nextValue = listA[i];

           for (var j = 0; j < listB.length; j++) {
               if (listB[j] === nextValue) {
               	   resultList.push(listB[j]);

               	   break;

               }
           }
       }
	   return resultList;
	};
    
    
    
	this.union = function(listA, listB) {
		var resultList = [];
        if (listA === null || listB === null) {
            return null;
        }

        for (var i=0; i<listA.length; i++) {
        	resultList.push(listA[i]);
		}

		for (var j=0; j<listB.length; j++) {
        	if (resultList.indexOf(listB[j]) == -1) {
        		resultList.push(listB[j]);
			}
		}

		return resultList;
	};




	this.relativeComplement = function(listA, listB) {

        var resultList = [];
        if (listA === null || listB === null) {
            return null;
        }

        for (var i=0; i<listA.length; i++) {
            if (listB.indexOf(listA[i]) == -1) {
                resultList.push(listA[i]);
			}
        }

        return resultList;
    };



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];
       
	   if (listA === null || listB === null) {
	   		return null;
	   }

	   for (var i=0; i<listA.length; i++) {
	   		if (listB.indexOf(listA[i]) == -1) {
	   			resultList.push(listA[i]);
			}
	   }

	   for (var j=0; j<listB.length; j++) {
	   		if (listA.indexOf(listB[j]) == -1) {
	   			resultList.push(listB[j]);
			}
	   }
       
	   return resultList;
	}	
	

};
