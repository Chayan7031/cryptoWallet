import { Coins, AlertCircle } from 'lucide-react';

export function AssetList({ balances }) {
  // Filter out the native XLM balance
  const assets = balances.filter(b => b.asset_type !== 'native');

  if (assets.length === 0) {
    return (
      <div className="glass-card p-8 text-center border-dashed border-2 border-slate-700/50 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-200">No Custom Assets</h3>
          <p className="text-sm text-slate-400 max-w-sm mt-1 mx-auto">
            This account only holds native XLM. Any other tokens or trustlines will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-200">
        <Coins className="w-5 h-5 text-indigo-400" />
        Portfolio Assets
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset, index) => {
          const isLiquidityPool = asset.asset_type === 'liquidity_pool_shares';
          // Name handling
          const code = isLiquidityPool ? 'Liquidity Pool' : asset.asset_code;
          // Format balance
          const balance = parseFloat(asset.balance).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 7,
          });

          return (
            <div key={index} className="glass-card p-5 hover:border-indigo-500/20 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-slate-800 flex items-center justify-center border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-300 uppercase">
                      {isLiquidityPool ? 'LP' : (code ? code.substring(0, 3) : 'UNK')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg leading-none mb-1">{code || 'Unknown Asset'}</h4>
                    {asset.asset_issuer && (
                      <div className="text-xs text-slate-500 max-w-[150px] truncate" title={asset.asset_issuer}>
                        Issuer: {asset.asset_issuer.substring(0,6)}...{asset.asset_issuer.substring(asset.asset_issuer.length - 4)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-baseline">
                <span className="text-sm text-slate-400">Balance</span>
                <span className="text-xl font-bold text-slate-200 truncate pl-2" title={balance}>{balance}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
