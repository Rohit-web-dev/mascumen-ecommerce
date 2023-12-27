const conf = {
  appwriteUrl: String(process.env.NEXT_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(process.env.NEXT_APPWRITE_COLLECTION_ID),
}

export default conf


// NEXT_APPWRITE_URL = https://cloud.appwrite.io/v1

// NEXT_APPWRITE_PROJECT_ID = 65855c8c96ca1d4be76e

// NEXT_APPWRITE_DATABASE_ID = 658a5a2edc47302eb5d2

// NEXT_APPWRITE_COLLECTION_ID = 658a5b48aa285b17681b