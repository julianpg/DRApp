@isTest
public class MeetingPointControllerTest {
    
	@isTest public static void createCentres(){  
        
        List<DR_Centre__c>insertCentres = new List<DR_Centre__c>();
            
            for(integer i=0;i<5;i++){
                
                DR_Centre__c c = new DR_Centre__c();
                c.Name = 'HQ'+i;
                c.Street_Number__c = '123 street';
                c.City__c = 'London';
                c.Post_Code__c ='NW95XD';
                
                insertCentres.add(c);
            }
        
        insert insertCentres;
        
        List<DR_Centre__c>meetingPoints = MeetingPointController.getMeetingPoints();
        
        system.assertEquals(5, meetingPoints.size());
  	}	
}