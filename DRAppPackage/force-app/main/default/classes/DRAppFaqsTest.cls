@isTest
public class DRAppFaqsTest {

    @isTest
    public static void testFaqs(){
        
        List<DR_App_FAQ__c>faqs = new List<DR_App_FAQ__c>();
        
        for(integer i=0;i<10;i++){
            DR_App_FAQ__c f = new DR_App_FAQ__c();
            f.Active__c = true;
            f.Body__c   = 'Testing 123';
            f.Name      = 'FAQ #'+i;
            
            faqs.add(f);
        }
        
        insert faqs;
        
        List<DR_App_FAQ__c>getFaqs = DRAppFaqs.getFaqs();
        
        system.assertEquals(10, getFaqs.size());
        
    }
}