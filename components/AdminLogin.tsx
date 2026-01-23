
import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // كلمة السر الافتراضية للتجربة هي 1234
    if (password === '1234') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl border border-white transition-all ${error ? 'animate-shake border-red-500' : ''}`}>
        <div className="text-center space-y-4 mb-8">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-xl">🔐</div>
          <h2 className="text-3xl font-black text-slate-900">دخول الإدارة</h2>
          <p className="text-slate-500 font-bold">يرجى إدخال كلمة المرور للوصول إلى صلاحيات التعديل</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-right font-bold text-slate-700 mr-2">كلمة المرور</label>
            <input 
              type="password" 
              autoFocus
              className="w-full p-4 bg-slate-100 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all text-center text-2xl tracking-widest"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm font-bold text-center animate-pulse">كلمة المرور خاطئة! (جرب 1234)</p>}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 shadow-xl transition-all active:scale-95"
            >
              دخول المنصة
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors"
            >
              إلغاء والعودة
            </button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-[10px] text-slate-300 uppercase font-black tracking-widest">MathDz Admin Secure Gateway v1.0</p>
      </div>
    </div>
  );
};

export default AdminLogin;
