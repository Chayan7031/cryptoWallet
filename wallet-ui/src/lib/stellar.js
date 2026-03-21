import * as StellarSdk from 'stellar-sdk';

export const fetchAccountData = async (publicKey, isTestnet) => {
  try {
    const serverUrl = isTestnet 
      ? 'https://horizon-testnet.stellar.org' 
      : 'https://horizon.stellar.org';
      
    // Always use the standard Horizon server
    const server = new StellarSdk.Horizon.Server(serverUrl);
    
    // Fetch account details
    const account = await server.loadAccount(publicKey);

    
    return {
      success: true,
      account
    };
  } catch (error) {
    console.error("Error fetching account:", error);
    
    // Check if error is 404
    if (error.response && error.response.status === 404) {
      return {
        success: false,
        error: "Account not found on the network. It might be inactive."
      };
    }
    
    return {
      success: false,
      error: error.message || "Failed to fetch account data. Invalid address?"
    };
  }
};
