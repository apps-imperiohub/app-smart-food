import { useState, useEffect } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  type User,
} from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";

export const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    checkIsSignedIn();
  }, []);

  const checkIsSignedIn = async () => {
    try {
      const user = GoogleSignin.getCurrentUser();
      if (user) {
        setUserInfo(user);
      }
    } catch (error) {
      console.error("Error checking sign-in status:", error);
    }
  };

  const signIn = async () => {
    try {
      setIsSigningIn(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        setUserInfo(response.data);
        Alert.alert("Success", `Welcome ${response.data.user.name}!`);
      } else {
        Alert.alert("Cancelled", "Sign in was cancelled");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert("In Progress", "Sign in is already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Error", "Play Services not available or outdated");
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert("Cancelled", "User cancelled the sign in");
            break;
          default:
            Alert.alert("Error", `Something went wrong: ${error.message}`);
        }
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      Alert.alert("Success", "Signed out successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to sign out");
      console.error("Sign out error:", error);
    }
  };

  const revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      setUserInfo(null);
      Alert.alert("Success", "Access revoked successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to revoke access");
      console.error("Revoke access error:", error);
    }
  };

  const getCurrentUser = () => {
    try {
      const user = GoogleSignin.getCurrentUser();
      Alert.alert("Current User", JSON.stringify(user, null, 2));
    } catch (error) {
      Alert.alert("Error", "No user is currently signed in");
    }
  };

  return {
    userInfo,
    isSigningIn,
    signIn,
    signOut,
    revokeAccess,
    getCurrentUser,
  };
};
