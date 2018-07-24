({
	loadLists : function(component, event, helper) {
		
        var action = component.get("c.getMeetingPoints");
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                component.set("v.meetingPoints",data);
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
                    title : 'Error',
                    message: message,
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