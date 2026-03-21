import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Stellar<span className="text-indigo-400">Scan</span>
          </h1>
          <p className="text-sm font-medium text-slate-400">Wallet Balance Checker</p>
        </div>
      </div>
    </header>
  );
}
