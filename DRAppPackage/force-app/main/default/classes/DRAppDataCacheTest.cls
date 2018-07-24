@isTest
public class DRAppDataCacheTest {

    @isTest
    public static void testCache(){
        
        DR_Contact__c contact = new DR_Contact__c();
        contact.Name = 'Test';
        
        insert contact;
        
        DR_Centre__c centre = new DR_Centre__c();
        centre.Name = 'HQ';
        
        insert centre;
        
        DRAppDataCache.getRefreshContactsAndCentres();
        
        system.assertEquals(1, [SELECT count() FROM DR_Centre__c]);
        system.assertEquals(1, [SELECT count() FROM DR_Contact__c]);
    }
}