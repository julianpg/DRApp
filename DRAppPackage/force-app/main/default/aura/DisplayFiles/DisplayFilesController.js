({
	loadFiles : function(component, event, helper) {
		
        var actionAllFiles = component.get("c.getContentDocs");
        var filesMap = [];
        
        actionAllFiles.setCallback(this, function(response){
            var state = response.getState();
			if (state === "SUCCESS") {
            	var files = response.getReturnValue();
                //console.log("files:::"+files);

                for ( var key in files ) {
                    //console.log("Allfiles:::"+actionAllFiles);
     				filesMap.push({folder:key,value:files[key]});
     			}
                console.log("filesMap:::"+filesMap);
                component.set("v.FilesMap",filesMap);
                //component.set("v.allFiles",files);
            }else{
				var toastEvent = $A.get("e.force:showToast");
				var message = '';              
                 if (state === "INCOMPLETE") {
					message = 'Server could not be reached. Check your internet connection.';
                }else if (state === "ERROR") {
                    var errors = response.getError();
                	if (errors) {
                        if (errors[0] && errors[0].message) {
                             message = errors[0].message;                         
                    	}	
                    }else {                       
                        message = 'Unknown error occured loading all files, please message your system admin with the steps to replicate the error';
                    }   
               }                
               toastEvent.setParams({
                    title : 'Error All Files',
                    message: message,
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'dismissible'
               });
               toastEvent.fire();  
           	} 
            
        });
        
        $A.enqueueAction(actionAllFiles);
        
        var actionMyFiles = component.get("c.getMyContentDocs");
        
        actionMyFiles.setCallback(this, function(response){
            var state = response.getState();
			if (state === "SUCCESS") {
            	var myFiles = response.getReturnValue();
                component.set("v.myFiles",myFiles);
            }else{
				var toastEvent = $A.get("e.force:showToast");
				var message = '';              
                 if (state === "INCOMPLETE") {
					message = 'Server could not be reached. Check your internet connection.';
                }else if (state === "ERROR") {
                    var errors = response.getError();
                	if (errors) {
                        if (errors[0] && errors[0].message) {
                             message = errors[0].message;                         
                    	}	
                    }else {                       
                        message = 'Unknown error occured, please message your system admin with the steps to replicate the error';
                    }   
               }                
               toastEvent.setParams({
                    title : 'Error My Files',
                    message: message,
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'dismissible'
               });
               toastEvent.fire();  
           	} 
            
        });
        
        $A.enqueueAction(actionMyFiles);

    },
    
    openFile: function(cmp, event, helper) {
        
        var docId = event.currentTarget.id;
		console.log('doc'+event.currentTarget.id);
    	$A.get('e.lightning:openFiles')
        .fire({
        	recordIds: [docId]
    	});
	},
    
    sectionOne : function(component, event, helper) {
     //expand and minimise sections
     var acc = component.find('articleOne');
      
       /*for(var cmp in acc) {
            $A.util.toggleClass(acc[cmp], 'slds-show');  
            $A.util.toggleClass(acc[cmp], 'slds-hide');  
       }*/
          
  		acc.forEach(function(element) {
        	$A.util.toggleClass(element, "slds-hide");
    		});
    	$A.util.addClass(event.target, "slds-show");
  }
	
})