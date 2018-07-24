public class DRAppFaqs {

    @AuraEnabled
    public static List<DR_App_FAQ__c>getFaqs(){
    
        return [SELECT Name, Body__c FROM DR_App_FAQ__c WHERE Active__c = true];
    }
}