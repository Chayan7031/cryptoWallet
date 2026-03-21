import { Search, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function WalletForm({ onSearch, isLoading, isTestnet, setIsTestnet }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const publicKey = fd.get('publicKey');
    if (publicKey) {
      onSearch(publicKey);
    }
  };

  return (
    <div className="glass-card mb-8 p-6 transition-all duration-300 hover:border-indigo-500/30">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <label htmlFor="publicKey" className="text-sm font-medium text-slate-300">
            Stellar Public Key
          </label>
          <div className="flex items-center gap-2 rounded-full bg-slate-900/50 p-1 ring-1 ring-white/10">
            <button
              type="button"
              onClick={() => setIsTestnet(true)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                isTestnet ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              Testnet
            </button>
            <button
              type="button"
              onClick={() => setIsTestnet(false)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                !isTestnet ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              Mainnet
            </button>
          </div>
        </div>

        <div className="relative flex items-center">
          <input
            id="publicKey"
            name="publicKey"
            type="text"
            placeholder="G..."
            required
            pattern="^G[A-Z2-7]{55}$"
            title="A legitimate public key starts with G and has 56 characters."
            className="w-full rounded-xl border border-white/10 bg-slate-900/50 py-3 pl-4 pr-32 text-slate-100 placeholder-slate-500 shadow-inner outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span>Check</span>
          </button>
        </div>
      </form>
    </div>
  );
}
