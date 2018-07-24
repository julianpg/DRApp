public with sharing class MeetingPointController {

    @AuraEnabled
    public static List<DR_Centre__c>getMeetingPoints(){
        
        return [SELECT id, Name, Map__c,Post_Code__c,Street_Number__c,City__c,Building_Picture__c FROM DR_Centre__c];
        
    }
}