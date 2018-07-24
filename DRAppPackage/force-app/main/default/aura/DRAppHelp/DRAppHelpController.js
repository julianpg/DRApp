({  
    doInit : function(component, evenr, helper) {
        var section = component.find("section");
        $A.util.removeClass(section, "slds-truncate");
        $A.util.addClass(section, "text");
     	var action = component.get("c.getFaqs") 
        
        action.setCallback(this, function(response){
            var state = response.getState();
			if (state === "SUCCESS") {
                var faqs = response.getReturnValue();
                component.set("v.faqs",faqs);
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