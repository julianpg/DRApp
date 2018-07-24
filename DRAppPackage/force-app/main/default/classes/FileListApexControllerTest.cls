@isTest
public class FileListApexControllerTest {

  @isTest
  public static void getTestDocuments() {
    Map<String,List<ContentDocumentLink>> nullDocuments = FileListApexController.getContentDocs();
    System.assert(nullDocuments == null);
      
    ContentVersion contentVersion_1 = new ContentVersion(
      Title = 'Penguins',
      PathOnClient = 'Penguins.jpg',
      VersionData = Blob.valueOf('Test Content'),
      IsMajorVersion = true
    );
    insert contentVersion_1;
    
    ContentVersion contentVersion_2 = [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion_1.Id LIMIT 1];
    Map<String,List<ContentDocumentLink>> documents = FileListApexController.getContentDocs();
    System.assertEquals(1,documents.size());

  }

    @isTest
    public static void getMyTestDocuments() {
        List<ContentDocument> nullDocuments = FileListApexController.getMyContentDocs();
        System.assert(nullDocuments == null);
        
        ContentVersion contentVersion_1 = new ContentVersion(
            Title = 'Penguins',
            PathOnClient = 'Penguins.jpg',
            VersionData = Blob.valueOf('Test Content'),
            IsMajorVersion = true
        );
        insert contentVersion_1;
        
        ContentVersion contentVersion_2 = [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion_1.Id LIMIT 1];
        List<ContentDocument> documents = FileListApexController.getMyContentDocs();
        System.assertEquals(1,documents.size());
        
    }
}