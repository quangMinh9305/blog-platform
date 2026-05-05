import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Password dot not match");
      return;
    }
    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    // Giả lập API
    setTimeout(() => {
      setLoading(false);
      alert("Password reset successful! Redirecting to login...");
      navigate('/login');
    }, 1000);
  };

  return (
    <main className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-neutral-medium-gray shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-[40px] flex flex-col items-center text-center">
      <div className="mb-6 flex items-center justify-center h-16 w-16 bg-neutral-off-white rounded-full border border-neutral-medium-gray">
        <span className="material-symbols-outlined text-primary-container text-[32px] leading-none" style={{ fontSize: '48px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>lock</span>
      </div>
      
      <div className="w-full mb-8">
        <h1 className="font-h1-display text-h1-display text-on-surface mb-2">Set new password</h1>
        <p className="font-body-regular text-body-regular text-on-surface-variant">Your new password must be at least 8 characters.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 text-left">
        {error && <div className="p-3 bg-error-container text-error-red rounded text-sm font-body-standard">{error}</div>}

        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="font-body-standard text-body-standard text-on-surface">New password</label>
          <div className="relative w-full">
            <input 
              type={showNewPassword ? "text" : "password"} id="newPassword" name="newPassword"
              value={formData.newPassword} onChange={handleChange} autoComplete="new-password" required minLength="8"
              className="w-full h-[36px] bg-surface-container-lowest border border-neutral-medium-gray rounded-DEFAULT px-3 py-2 font-body-regular text-body-regular text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:shadow-[0_0_3px_rgba(0,59,181,0.3)] transition-shadow" 
              placeholder="••••••••" 
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors flex items-center justify-center h-full focus:outline-none">
              <span className="material-symbols-outlined text-[20px]">{showNewPassword ? 'visibility' : 'visibility_off'}</span>
            </button>
          </div>
          
          <div className="flex gap-2 w-full mt-1">
            <div className="h-1 flex-1 rounded-full bg-error-red"></div>
            <div className="h-1 flex-1 rounded-full bg-tertiary-container"></div>
            <div className="h-1 flex-1 rounded-full bg-surface-dim"></div>
            <div className="h-1 flex-1 rounded-full bg-surface-dim"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="font-body-standard text-body-standard text-on-surface">Confirm new password</label>
          <div className="relative w-full">
            <input 
              type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required minLength="8"
              className="w-full h-[36px] bg-surface-container-lowest border border-neutral-medium-gray rounded-DEFAULT px-3 py-2 font-body-regular text-body-regular text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:shadow-[0_0_3px_rgba(0,59,181,0.3)] transition-shadow" 
              placeholder="••••••••" 
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors flex items-center justify-center h-full focus:outline-none">
              <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full h-[36px] mt-2 bg-primary-container text-on-primary font-body-standard text-body-standard rounded-lg hover:bg-primary-blue-dark hover:shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center disabled:opacity-50">
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;