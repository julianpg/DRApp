({
    loadLists : function(component, event, helper) {
        
        var action = component.get("c.getListViews");
        
        action.setCallback(this, function(response){
            var state = response.getState();
			if (state === "SUCCESS") {
                
            	var listviews = response.getReturnValue();
                component.set("v.DrContactListView",listviews);
            }else{
				var toastEvent = $A.get("e.force:showToast");
				var message = '';              
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

    },
    
	getCons : function(component, event, helper) {
		
        var action = component.get("c.getContacts");
        
        var type = component.get("v.type");
        
        action.setParams({"type":type});
        action.setCallback(this, function(response) {
        	var state = response.getState();            
			if(state === "SUCCESS") {
        		component.set("v.contacts",response.getReturnValue());	
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
	},
    goToRecord : function (component, event, helper) {
     	var recordId = event.target.title;        
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": recordId,
          "slideDevName": "related"          
        });
     navEvt.fire();
    }
})