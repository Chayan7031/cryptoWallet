import { useState } from 'react';
import { Header } from './components/Header';
import { WalletForm } from './components/WalletForm';
import { BalanceCard } from './components/BalanceCard';
import { AssetList } from './components/AssetList';
import { fetchAccountData } from './lib/stellar';
import { AlertCircle } from 'lucide-react';

function App() {
  const [isTestnet, setIsTestnet] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [account, setAccount] = useState(null);

  const handleSearch = async (publicKey) => {
    setIsLoading(true);
    setError('');
    setAccount(null);

    const result = await fetchAccountData(publicKey, isTestnet);
    
    if (result.success) {
      setAccount(result.account);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Header />
        
        <main>
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Explore Your Stellar Assets</h2>
            <p className="text-slate-400 max-w-2xl">
              Enter any Stellar public key below to instantly view its native XLM balance, custom tokens, and liquidity pool shares.
            </p>
          </div>

          <WalletForm 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            isTestnet={isTestnet} 
            setIsTestnet={setIsTestnet} 
          />

          {error && (
            <div className="mb-8 rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-red-200 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-300">Oops! Something went wrong</h4>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            </div>
          )}

          {account && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <BalanceCard account={account} network={isTestnet ? 'Testnet' : 'Mainnet'} />
              <AssetList balances={account.balances} />
            </div>
          )}
        </main>
        
        <footer className="mt-16 text-center text-sm text-slate-500 pb-8">
          <p>Powered by Stellar Horizon API</p>
          <p className="mt-1 opacity-60">Built with React + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
