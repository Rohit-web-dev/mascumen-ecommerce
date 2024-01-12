import { Client, Databases, Query, ID, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65855c8c96ca1d4be76e');

export const databases = new Databases(client);

// export const roleID = '6594eb94f31503705194';
  
export const account = new Account(client)

export class AppwriteService {
  async createUserAccount({ email, password, name, phone }) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name, phone)
      if (userAccount) {
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (error) {
      throw error
    }
  }

  async login({ email, password }) {
    try {
      return await account.createEmailSession(email, password)
    } catch (error) {
      throw error
    }
  }

  async forgetPassword(newPassword) {
    try {
      const password = await account.updatePassword(this.getCurrentUser(), newPassword);
      return password
    }
    catch (error) {
      console.log(error)
    }
  }

  async isLoggedIn() {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data)
    } catch (error) { }
    return false
  }

  async getCurrentUser() {
    try {
      return account.get()
    } catch (error) {
      console.log("getcurrentUser error: " + error)
    }
    return null
  }

  async logout() {
    try {
      return await account.deleteSession("current")
    } catch (error) {
      console.log("logout error: " + error)
    }
  }

 async getAllUsers() {
    try {
      const users = await appwrite.account.listUsers();
      console.log(users);
      return users;
    } catch (error) {
      throw error;
    }
  }
  
}



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

// -- update cart data -- 
export const updateCartItem = async (itemId, updatedData) => {
  try {
    console.log('Updating cart item with data:', updatedData);
    const response = await databases.updateDocument(
      '658a5a2edc47302eb5d2',
      '6594e8a9158e259fe423',
      itemId,
      updatedData
    );
    console.log('Cart item updated successfully:', response);
    return response.documents;
  } catch (error) {
    console.error('Error updating cart item:', error);
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


// -- added order details -- 
export const addOrderAllDetails = async (userID, address, payment, amount, product) => {
  try {
    const userAddress = await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '659d1b647efdf3940520',
      ID.unique(),
      {
        userId: userID,
        addressOne: address?.addressOne,
        addressTwo: address?.addressTwo,
        country: address?.country,
        state: address?.state,
        city: address?.city,
        pin: address?.pin,
      }
    );

    const oderDetails = await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '659e28b8c7ae24db37c9',
      ID.unique(),
      {
        userId: userID,
        totalAmount: amount,
        paymentId: payment,
        orderItems: [],
        userAddress: userAddress.$id,
      }
    );

    Promise.allSettled(product.map(async (item) => await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '659e2a0807c23128c50e',
      ID.unique(),
      {
        orderId: oderDetails?.$id,
        productId: item.productId,
        productItem: item.productItem,
      }
    ))).then(async (results) => {
      console.log('Order item added successfully:', results);
      const value = results.map((item) => (item?.value?.$id))
      const updateValue = await databases.updateDocument(
        '658a5a2edc47302eb5d2',
        '659e28b8c7ae24db37c9',
        oderDetails?.$id,
        {
          orderItems: value,
        }
      );
      console.log(updateValue);
    })
      .catch((error) => {
        console.error('Error adding order items:', error);
      });

  } catch (error) {
    console.error('Error Order Details:', error);
    throw error;
  }
};

const appwriteService = new AppwriteService()

export default appwriteService