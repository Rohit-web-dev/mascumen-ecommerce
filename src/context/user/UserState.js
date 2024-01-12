"use client"
import React, { useState, useEffect } from 'react';
import UserContext from './userContext';
import appwriteService from '@/appwrite/config';

const UserState = (props) => {
  const [currentUserRollID, setCurrentUserRollID] = useState();

  useEffect(() => {
    const fetchUserRollID = async () => {
      try {
        const users = await appwriteService.getCurrentUser();
        setCurrentUserRollID(users?.$id);
        // const loggedIn = await appwriteService.isLoggedIn();
        // setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserRollID();
  }, []);

  // console.log("role ",currentUserRollID);

  return (
   <UserContext.Provider value={{ currentUserRollID }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
