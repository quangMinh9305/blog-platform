import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Giả lập API gửi email reset
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="w-full max-w-[480px]">
      <div className="bg-surface-container-lowest rounded-[14px] border border-neutral-medium-gray shadow-[0px_1px_3px_rgba(0,0,0,0.1)] hover:border-accent-blue-light transition-colors duration-300 p-[40px] flex flex-col items-center relative overflow-hidden">
        
        <div className="w-full mb-8">
          <Link to="/login" className="inline-flex items-center gap-2 font-link-standalone text-link-standalone text-primary-container hover:bg-primary-container/10 px-2 py-1 -ml-2 rounded transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-active:scale-95 transition-transform">arrow_back</span>
            Back to login
          </Link>
        </div>

        <div className="w-20 h-20 rounded-full bg-primary-container/10 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[48px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
        </div>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-8 flex flex-col gap-2">
              <h1 className="font-h1-display text-h1-display text-on-background">Forgot your password?</h1>
              <p className="font-body-regular text-body-regular text-secondary max-w-[320px] mx-auto">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-body-standard text-body-standard text-on-surface-variant sr-only">Email address</label>
                <input 
                  type="email" id="email" 
                  value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required
                  className="w-full h-[36px] px-3 bg-surface-container-lowest border border-neutral-medium-gray rounded focus:outline-none focus:border-primary-container focus:ring-[3px] focus:ring-primary-container/20 font-body-regular text-body-regular text-on-background placeholder:text-outline transition-all" 
                  placeholder="Enter your email" 
                />
              </div>
              <button type="submit" disabled={loading} className="w-full h-[36px] bg-primary-container text-on-primary font-body-standard text-body-standard rounded-lg hover:bg-primary-blue-dark hover:shadow-[0px_4px_6px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50">
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center mb-4 flex flex-col gap-4 w-full">
            <h1 className="font-h1-display text-h1-display text-on-background">Check your email</h1>
            <p className="font-body-regular text-body-regular text-secondary">
              We've sent a password reset link to <span className="font-body-standard text-on-background">{email}</span>.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="mt-4 text-primary hover:text-primary-blue-dark font-body-standard transition-colors">
              Try another email
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;