import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65855c8c96ca1d4be76e');

const databases = new Databases(client);

export const roleID = '6594eb94f31503705194';

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

// -- added cart data -- 
export const addToCart = async (productId, userID) => {
  try {
    const response = await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '6594e8a9158e259fe423',
      ID.unique(),
      {
        userId: userID,
        ecommerceWebProducts: [productId],
        productItem: 1
      }
    );
    console.log('Product added to cart:', response);
    return response.documents;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

// -- get cart data -- 
export const getCartData = async () => {
  try {
    const response = await databases.listDocuments('658a5a2edc47302eb5d2', '6594e8a9158e259fe423',);
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

// -- delete cart data --
export const removeCartItem = (itemId) => {
  return databases.deleteDocument('658a5a2edc47302eb5d2', '6594e8a9158e259fe423', itemId);
};

// -- added wishlist data -- 
export const addToWishlist = async (productId, userID) => {
  try {
    const response = await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '659677e92b9023968d76',
      ID.unique(),
      {
        userId: userID,
        ecommerceWebProducts: [productId],
        productItem: 1
      }
    );
    console.log('Product added to cart:', response);
    return response.documents;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

// -- get wishlist data -- 
export const getWishlistData = async () => {
  try {
    const response = await databases.listDocuments('658a5a2edc47302eb5d2', '659677e92b9023968d76',);
    console.log('Get wishlist data response:', response);
    if (!response) {
      throw new Error('Invalid response: Empty response');
    }
    return response.documents;
  } catch (error) {
    console.error('Error getting wishlist data:', error);
    throw error;
  }
};

// -- delete wishlist data --
export const removeWishlistItem = (itemId) => {
  return databases.deleteDocument('658a5a2edc47302eb5d2', '659677e92b9023968d76', itemId);
};