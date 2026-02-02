import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Activity, Search, Mail, MessageSquare, FileText, ExternalLink } from 'lucide-react';

export default function HelpView() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How is my P&L calculated?",
      answer: "We use a FIFO (First-In, First-Out) method to calculate realized gains against your average buy price. This ensures compliance with standard tax reporting guidelines for most jurisdictions."
    },
    {
      id: 2,
      question: "Is my API Key secure?",
      answer: "Yes. Keys are encrypted using AES-256 and never stored in plain text. We only have read-only access to your exchange accounts, meaning we cannot execute trades or withdraw funds."
    },
    {
      id: 3,
      question: "Why do I see a 'Risk' alert?",
      answer: "Our scam detection engine flags contracts with low liquidity (<$50k), unverified source code, or suspicious owner privileges (like the ability to blacklist wallets)."
    },
    {
      id: 4,
      question: "Can I export my data for TurboTax?",
      answer: "Absolutely. Go to the 'Reports' tab and click 'Download Tax Report'. The CSV format is compatible with TurboTax, CoinTracker, and Koinly."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-white max-w-6xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Help & Support</h2>
          <p className="text-slate-400 mt-1">Documentation, FAQs, and Customer Service.</p>
        </div>
        
        {/* Professional "System Status" Badge */}
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full flex items-center gap-3 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-300">All Systems Operational</span>
          <Activity size={16} className="text-slate-500 ml-2" />
        </div>
      </div>

      {/* SEARCH BAR (Visual Only) */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Search documentation (e.g., 'API Keys', 'Tax Export')..." 
          className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: FAQ ACCORDION (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText size={20} className="text-blue-400"/> Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition duration-200">
                <button 
                  onClick={() => setActiveQuestion(activeQuestion === faq.id ? null : faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="font-medium text-slate-200 text-lg">{faq.question}</span>
                  {activeQuestion === faq.id ? <ChevronUp size={20} className="text-blue-400"/> : <ChevronDown size={20} className="text-slate-500"/>}
                </button>
                
                {/* Smooth Dropdown Animation */}
                {activeQuestion === faq.id && (
                  <div className="px-5 pb-5 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition cursor-pointer group">
              <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                User Guide <ExternalLink size={14}/>
              </h4>
              <p className="text-sm text-slate-400 group-hover:text-slate-300">Read the full documentation on how to set up your portfolio.</p>
            </div>
            <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition cursor-pointer group">
              <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                API Docs <ExternalLink size={14}/>
              </h4>
              <p className="text-sm text-slate-400 group-hover:text-slate-300">Developer resources for integrating custom exchanges.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Contact Support</h3>
                <p className="text-xs text-slate-400">We usually reply in &lt; 24hrs.</p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Your Email</label>
                <input type="email" placeholder="student@university.edu" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none"/>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Message</label>
                <textarea rows="4" placeholder="Describe your issue..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none"></textarea>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                <MessageSquare size={18} /> Send Message
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700 text-center">
              <p className="text-xs text-slate-500">
                Technical Support: <strong>+1 (800) 123-4567</strong><br/>
                Mon-Fri, 9AM - 5PM EST
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}