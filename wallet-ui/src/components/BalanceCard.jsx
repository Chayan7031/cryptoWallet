import { Copy, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

export function BalanceCard({ account, network }) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find XLM balance
  const nativeBalance = account.balances.find((b) => b.asset_type === 'native');
  const xlmAmount = nativeBalance ? parseFloat(nativeBalance.balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 7,
  }) : '0.00';

  const handleCopy = () => {
    navigator.clipboard.writeText(account.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card mb-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
          
          <div className="flex-1 w-full overflow-hidden">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
                {network}
              </span>
              <span className="text-sm text-slate-400 font-medium">Native Balance</span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-6 flex-wrap">
              <span className="text-5xl font-bold tracking-tight text-white mb-2 break-all">{xlmAmount}</span>
              <span className="text-xl font-medium text-slate-400">XLM</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Account ID / Public Key</p>
              <div className="flex items-center gap-2 w-full">
                <code className="bg-slate-900/50 text-slate-300 px-3 py-2 rounded-lg text-sm truncate flex-1 border border-white/5 font-mono">
                  {account.id}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2 shrink-0 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group relative"
                  title="Copy Address"
                >
                  <Copy className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-slate-300 group-hover:text-white'}`} />
                </button>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className={`p-2 shrink-0 rounded-lg cursor-pointer border transition-colors ${showQR ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300 hover:text-white'}`}
                  title="Show QR Code"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showQR && (
            <div className="shrink-0 bg-white p-3 rounded-xl shadow-xl animate-in fade-in zoom-in duration-200 self-center">
              <QRCodeSVG 
                value={account.id} 
                size={120}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
