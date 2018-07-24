({
    sectionOne : function(component, event, helper) {
     //expand and minimise sections
     var acc = component.find('articleOne');
      
       for(var cmp in acc) {
            $A.util.toggleClass(acc[cmp], 'slds-show');  
            $A.util.toggleClass(acc[cmp], 'slds-hide');  
       } 
  }
})