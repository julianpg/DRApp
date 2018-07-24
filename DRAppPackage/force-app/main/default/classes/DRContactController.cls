public with sharing class DRContactController {
	
    @AuraEnabled
    public static List<DR_Contact__c> getContacts(String type){ 
        
        if(type == null){       
            return null;       
        }else if(type=='All'){
               return [SELECT id, Name, Email__c,Mobile__c,First_Name__c FROM DR_Contact__c];               
        }else{                    
               return [SELECT id, Name,Email__c,Mobile__c,First_Name__c FROM DR_Contact__c WHERE Type__c=:type];                   
             }        
    }
    
    @AuraEnabled
	public static List<ListView> getListViews() {
        
        List<ListView> listviews = [SELECT Id, Name FROM ListView WHERE SobjectType = 'DR_Contact__c'];
    
        return listviews;
	}
}