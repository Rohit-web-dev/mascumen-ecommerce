// import conf from '@/conf/config'
import { Client, Account, Databases } from 'appwrite'

const appwriteClient = new Client()

appwriteClient
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('65855c8c96ca1d4be76e');

export const account = new Account(appwriteClient)
const database = new Databases(appwriteClient)

const promise = database.createDocument('658a5a2edc47302eb5d2', '658a5b48aa285b17681b', 'docId');

promise.then(function (response) {
  console.log(response); // Success
}, function (error) {
  console.log(error); // Failure
});


// export async function fetchDataFromAppwrite() {
//   try {
//     const response = await database.listDocuments('658a5b48aa285b17681b');
//     console.log("res=", response);
//     return response.documents;
//   } catch (error) {
//     console.error('Error fetching data from Appwrite:', error);
//     throw error;
//   }
// }

