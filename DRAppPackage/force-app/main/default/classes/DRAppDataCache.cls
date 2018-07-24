public with sharing class DRAppDataCache {

    @AuraEnabled
    public static void getRefreshContactsAndCentres(){
          
        List<DR_Contact__c>contacts = [SELECT id FROM DR_Contact__c];
       
        List<DR_Centre__c>centres= [SELECT id FROM DR_Centre__c];
        
        update contacts;
        update centres;
        
    }
}