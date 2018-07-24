({
  sectionOne : function(component, event, helper) {
     //expand and minimise sections
     var acc = component.find('articleOne');
      
       for(var cmp in acc) {
            $A.util.toggleClass(acc[cmp], 'slds-show');  
            $A.util.toggleClass(acc[cmp], 'slds-hide');  
       } 
  },
    
  goToRecord : function (component, event, helper) {
      var recordId = event.target.title;
      console.log("recordID::"+recordId);      
      var navEvt = $A.get("e.force:navigateToSObject");
      navEvt.setParams({
          "recordId": recordId,
                   
      });
      navEvt.fire();
    }
    
})