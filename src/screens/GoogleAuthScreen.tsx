import type { User } from "@react-native-google-signin/google-signin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { Button, StyleSheet, Text, View } from "react-native";

interface GoogleAuthScreenProps {
  userInfo: User | null;
  isSigningIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onRevokeAccess: () => void;
  onGetCurrentUser: () => void;
}

export const GoogleAuthScreen = ({
  userInfo,
  isSigningIn,
  onSignIn,
  onSignOut,
  onRevokeAccess,
  onGetCurrentUser,
}: GoogleAuthScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Google Sign-In</Text>

        {!userInfo ? (
          <View style={styles.signInContainer}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={onSignIn}
              disabled={isSigningIn}
            />
            <Text style={styles.helpText}>
              Sign in with your Google account to continue
            </Text>
          </View>
        ) : (
          <View style={styles.userInfoContainer}>
            {userInfo.user.photo && (
              <Image
                source={{ uri: userInfo.user.photo }}
                style={styles.avatar}
                contentFit="cover"
              />
            )}

            <View style={styles.infoCard}>
              <Text>User Information</Text>

              <View style={styles.infoRow}>
                <Text>Name:</Text>
                <Text>{userInfo.user.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Email:</Text>
                <Text>{userInfo.user.email}</Text>
              </View>

              {userInfo.user.id && (
                <View style={styles.infoRow}>
                  <Text>ID:</Text>
                  <Text numberOfLines={1}>{userInfo.user.id}</Text>
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Get Current User Info"
                onPress={onGetCurrentUser}
              />
              <Button title="Sign Out" onPress={onSignOut} color="#FF6B6B" />
              <Button
                title="Revoke Access"
                onPress={onRevokeAccess}
                color="#FF3838"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  signInContainer: {
    alignItems: "center",
    gap: 20,
  },
  helpText: {
    textAlign: "center",
    opacity: 0.7,
  },
  userInfoContainer: {
    gap: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  infoCard: {
    padding: 20,
    borderRadius: 10,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 10,
  },
});
