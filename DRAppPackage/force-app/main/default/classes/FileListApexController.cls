public with sharing class FileListApexController {

    @AuraEnabled
    //public static List<ContentDocument> getContentDocs() {
      public static Map<string,list<ContentDocumentLink>> getContentDocs(){

        set<string>libraryNames = new set<string>();
          for(string s : label.DR_App_libraries.split(',')){
              libraryNames.add(s);
          }
        system.debug('Names::'+libraryNames);
        set<id>ids = (new map<id,contentworkspace>([SELECT id FROM contentworkspace WHERE name IN:libraryNames])).keySet();
        system.debug('ids::'+ids);
        Map<string,List<ContentDocumentLink>>folderMap = new Map<string,List<ContentDocumentLink>>();
          
        for(ContentDocumentLink cdl : [SELECT ContentDocumentId,ContentDocument.title,ContentDocument.FileType,linkedEntity.Name FROM ContentDocumentLink WHERE LinkedEntityId IN:ids]){
  			if(folderMap.get(cdl.linkedEntity.Name) != null){
              	folderMap.get(cdl.linkedEntity.Name).add(cdl);
              }else{
                folderMap.put(cdl.linkedEntity.Name,new list<ContentDocumentLink>{cdl});
              }     
         }

        id userId = UserInfo.getUserId();
        //Check for any documents shared with the user specifically 
        List<ContentDocumentLink>sharedDocumentsLink = [SELECT ContentDocumentId,ContentDocument.title,ContentDocument.FileType,linkedEntity.Name FROM ContentDocumentLink WHERE LinkedEntityId = :UserId];
        
        if(sharedDocumentsLink.size()>0){          
            folderMap.put('individually Shared',sharedDocumentsLink);
        }     
          system.debug('folderMap::'+folderMap);
          if(!folderMap.isEmpty()){
              return folderMap;
          }
            return null;
    }
    
    
    @AuraEnabled
    public static List<ContentDocument> getMyContentDocs() {
        
        List<ContentDocument> myEntries = [SELECT Id, Title, FileType FROM ContentDocument WHERE OwnerId =:UserInfo.getUserId()];
        
            if(!myEntries.isEmpty()){   
        		return myEntries;
            }
            return null;
    }
}