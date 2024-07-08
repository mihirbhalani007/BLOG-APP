const conf = {
  appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
  appwriteProjectId: String(process.env.REACT_APP_APPWRITIE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.REACT_APP_APPWRITIE_DATABAS_ID),
  appwriteCollectionId: String(process.env.REACT_APP_APPWRITIE_COLLECTION_ID),
  appwriteBucketId: String(process.env.REACT_APP_APPWRITIE_BUCKET_ID),
};

export default conf;