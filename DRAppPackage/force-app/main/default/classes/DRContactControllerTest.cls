@isTest
public class DRContactControllerTest {

    @isTest
    public static void createDRContacts(){
        
        List<DR_Contact__c>contactsToInsert = new List<DR_Contact__c>();
        
        for(integer i=0;i<10;i++){
            
            DR_Contact__c c = new DR_Contact__c();
            c.Name = 'Joe Doe'+i;
            c.Email__c = 'Joe@mailnewspapers.co.uk';
            c.Mobile__c = '0123456789';
            c.Phone__c  = '0123456789';
            c.Alternate_Email__c = 'Doe@Mailnewspapers.co.uk';
            c.Type__c = 'Useful Contacts';
            
            contactsToInsert.add(c);
        }
        
        insert contactsToInsert;
        
        List<DR_Contact__c>getUsefulContacts = DRContactController.getContacts('Useful Contacts');
        List<DR_Contact__c>getAllContacts = DRContactController.getContacts('All');
        List<DR_Contact__c>getNullContacts = DRContactController.getContacts(null);
        system.assertEquals(10, getUsefulContacts.size());
        system.assertEquals(10, getAllContacts.size());
        system.assert(getNullContacts == null );
        
    }
    
    @isTest
    public static void createListViews(){
        
        List<ListView>listviews = DRContactController.getListViews();
        
        system.assert(!listviews.isEmpty());
        

    }
}