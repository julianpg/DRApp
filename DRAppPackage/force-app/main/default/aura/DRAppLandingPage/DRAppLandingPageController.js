({
	doInit : function(component, event, helper) {
		var action = component.get("c.getRefreshContactsAndCentres") 
        
        action.setCallback(this, function(response){
            var state = response.getState();
			if (state === "SUCCESS") {
				var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                    title : 'Success',
                    message: 'Your offline data is ready to be cached',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'dismissible'
               });
               toastEvent.fire(); 
            }else{
				var toastEvent = $A.get("e.force:showToast");
				var message = response.getError();              
                 if (state === "INCOMPLETE") {
					message = 'Server could not be reached. Check your internet connection.';
                }else if (state === "ERROR") {
                    var errors = response.getError();
                	if (errors) {
                        if (errors[0] && errors[0].message) {
                             message = 'Following error occurred: '+errors[0].message;                         
                    	}	
                    }else {                       
                        message = 'Unknown error occured, please message your system admin with the steps to replicate the error';
                    }   
               }                
               toastEvent.setParams({
                    title : 'Error',
                    message: message[0],
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'dismissible'
               });
               toastEvent.fire();  
           	}
            
        });
        
        $A.enqueueAction(action);
    
	}
})