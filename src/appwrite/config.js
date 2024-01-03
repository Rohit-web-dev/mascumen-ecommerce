import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65855c8c96ca1d4be76e');

const databases = new Databases(client);
const cartCollectionId = '6594e8a9158e259fe423';
const roleID = '6594eb94f31503705194';

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


// -- get cart data -- 
export const getCartData = async () => {
  const collectionId = '6594e8a9158e259fe423'; // Replace with your actual cart collection ID

  try {
    const response = await appwrite.database.listDocuments(collectionId);
    console.log('Get cart data response:', response);

    if (!response) {
      throw new Error('Invalid response: Empty response');
    }

    return response.documents;
  } catch (error) {
    console.error('Error getting cart data:', error);
    throw error;
  }
};


// -- generate unique id -- 
const generateUniqueID = (length) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// -- Added To Cart -- 
export const addToCart = async (product) => {
  const cartCollectionId = '6594e8a9158e259fe423'; 
  const uniqueDocumentId = generateUniqueID(20);
  try {
    const response = await databases.createDocument(
      cartCollectionId,
      uniqueDocumentId.toString(),
      { product },
      ['6594eb94f31503705194'] // Replace with your actual permission role ID
    );
    console.log('Add to cart response:', response);
    if (!response) {
      throw new Error('Invalid response: Empty response');
    }
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};