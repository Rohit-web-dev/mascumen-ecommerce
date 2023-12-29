import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65855c8c96ca1d4be76e');

const databases = new Databases(client);

// -- all products -- 
export const fetchProducts = async () => {
  try {
    const response = await databases.listDocuments('658a5a2edc47302eb5d2', '658a5b48aa285b17681b',);
    console.log(response);
    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// -- get product details -- 
export const fetchProductDetailsById = async (id) => {
  try {
    const response = await databases.listDocuments(
      "658a5a2edc47302eb5d2",
      "658a5b48aa285b17681b",
      [
        Query.equal('$id', id)
      ]
    );
    return response.documents[0];
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};