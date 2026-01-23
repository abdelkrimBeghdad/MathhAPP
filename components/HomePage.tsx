
import React from 'react';
import { AppView } from '../types';

interface HomePageProps {
  onStart: () => void;
  onAdminClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, onAdminClick }) => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden text-right">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 md:px-12 py-4 flex justify-between items-center border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 math-gradient rounded-xl flex items-center justify-center text-white text-xl shadow-lg">∑</div>
          <span className="text-2xl font-black text-indigo-600">MathDz</span>
        </div>
        <div className="hidden md:flex gap-8 items-center font-bold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">المميزات</a>
          <a href="#ai" className="hover:text-indigo-600 transition-colors">الأستاذ ذكي</a>
          <div className="flex items-center gap-4">
            <button 
              onClick={onAdminClick}
              className="text-xs text-slate-400 hover:text-indigo-600 transition-colors border-l pl-4 border-slate-200"
            >
              🔐 دخول الإدارة
            </button>
            <button 
              onClick={onStart}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
            >
              دخول المنصة
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 relative z-10">
            <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm animate-bounce">
              🚀 رفيقك الأول لشهادة التعليم المتوسط BEM 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.2]">
              دليلك الذكي للتفوق في <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">الرياضيات</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              منصة تفاعلية 100% مصممة خصيصاً للتلميذ الجزائري. دروس مبسطة، تمارين ذكية، وأستاذ يعتمد على الذكاء الاصطناعي متاح لك 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1"
              >
                ابدأ رحلة النجاح الآن 📝
              </button>
              
              {/* رابط الإدارة المؤقت */}
              <button 
                onClick={onAdminClick}
                className="text-slate-400 hover:text-indigo-600 font-bold transition-colors flex items-center gap-2 group"
              >
                <span className="bg-slate-100 group-hover:bg-indigo-50 p-2 rounded-full transition-colors">🔐</span>
                لوحة الإدارة
              </button>
            </div>
            
            <div className="flex items-center gap-4 px-2">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-4 border-white" alt="student" />
                ))}
              </div>
              <div className="text-sm font-bold text-slate-500">انضم لـ +5000 تلميذ متفوق</div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-100 rotate-3 hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem]" alt="Math Visualization" />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">✅</div>
                    <div>
                      <div className="font-black text-slate-800">تمرين مكتمل</div>
                      <div className="text-xs text-slate-500">تم حفظ تقدمك بنجاح</div>
                    </div>
                  </div>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-indigo-200 rounded-full scale-110 opacity-20 animate-[spin_20s_linear_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-black text-slate-900">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-slate-500 max-w-xl mx-auto">صممنا لك أدوات تجعل دراسة الرياضيات ممتعة وسهلة بدلاً من أن تكون كابوساً.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'أستاذ ذكي خاص', desc: 'أستاذ يعمل بالذكاء الاصطناعي يشرح لك التمارين بالصور والكتابة.', icon: '🤖', color: 'bg-blue-50' },
              { title: 'تمارين تفاعلية', desc: 'بنك أسئلة متجدد يغطي كافة محاور منهاج السنة الرابعة متوسط.', icon: '📝', color: 'bg-emerald-50' },
              { title: 'محاكي هندسي', desc: 'أدوات بصرية تفاعلية لشرح نظريات طالس، فيثاغورس والمثلثات.', icon: '📐', color: 'bg-purple-50' },
              { title: 'بنك القوانين', desc: 'ملخصات شاملة ومركزة لكل القواعد الرياضية التي تحتاجها للبيام.', icon: '📜', color: 'bg-amber-50' },
              { title: 'تتبع المستوى', desc: 'رسوم بيانية توضح لك نقاط قوتك والمواضيع التي تحتاج لمراجعة.', icon: '📊', color: 'bg-rose-50' },
              { title: 'تحديات يومية', desc: 'نافس زملائك واجمع النقاط لتتصدر قائمة المتفوقين في ولايتك.', icon: '🔥', color: 'bg-indigo-50' },
            ].map((f, i) => (
              <div key={i} className={`${f.color} p-10 rounded-[2.5rem] border border-transparent hover:border-indigo-100 transition-all card-hover group`}>
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="text-2xl font-black text-slate-800 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Teaser Section */}
      <section id="ai" className="py-24 px-6 math-gradient text-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="text-6xl md:text-8xl">🤖</div>
          <div className="flex-1 text-center md:text-right space-y-6">
            <h2 className="text-4xl md:text-5xl font-black">تعرف على "الأستاذ ذكي"</h2>
            <p className="text-xl text-indigo-100 leading-loose">
              تخيل أستاذاً لا يمل، يشرح لك المسألة الواحدة بألف طريقة، ويفهم لهجتك الجزائرية! 
              كل ما عليك فعله هو تصوير التمرين، وسيقوم "ذكي" بتحليل الصورة وحلها معك خطوة بخطوة.
            </p>
            <button 
              onClick={onStart}
              className="px-12 py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:shadow-2xl transition-all"
            >
              جربه الآن مجاناً
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl">√(x)</div>
          <div className="absolute bottom-20 right-20 text-4xl">sin(α)</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">a² + b² = c²</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 math-gradient rounded-lg flex items-center justify-center text-white text-sm shadow-lg">∑</div>
            <span className="text-xl font-black">MathDz</span>
          </div>
          <div className="flex gap-8 text-slate-400 font-bold">
            <a href="#" className="hover:text-white transition-colors">عن المنصة</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">اتصل بنا</a>
          </div>
          <div className="flex gap-4">
             {['fb', 'ig', 'yt'].map(s => (
               <div key={s} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 cursor-pointer transition-colors uppercase font-black text-[10px]">{s}</div>
             ))}
          </div>
        </div>
        <p className="text-center text-slate-500 font-bold text-sm">جميع الحقوق محفوظة © 2024 - صنع بحب لتلاميذ الجزائر 🇩🇿</p>
      </footer>
    </div>
  );
};

export default HomePage;
