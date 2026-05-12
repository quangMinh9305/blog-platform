import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords not match!");
      return;
    }
    
    setLoading(true);
    try {
      await register(formData.fullName, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      const msg = err?.error || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[480px]">
      <div className="bg-surface-container-lowest rounded-[14px] border border-neutral-medium-gray shadow-[0px_1px_3px_rgba(0,0,0,0.1)] p-[40px] hover:border-accent-blue-light transition-colors duration-200">
        <div className="text-center mb-xl">
          <div className="inline-flex items-center justify-center mb-md">
            <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
            <span className="ml-xs font-h1-display text-h1-display text-on-surface">DevBlog</span>
          </div>
          <h1 className="font-h1-display text-h1-display text-on-surface mb-xs">Create your account</h1>
          <p className="font-body-regular text-body-regular text-secondary">Join thousands of developers sharing knowledge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-lg">
          {error && <div className="p-3 bg-error-container text-error-red rounded text-sm font-body-standard">{error}</div>}
          
          <div>
            <label htmlFor="fullName" className="block font-body-standard text-body-standard text-on-surface mb-base">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm">
                <span className="material-symbols-outlined text-outline">person</span>
              </span>
              <input 
                type="text" id="fullName" name="fullName"
                value={formData.fullName} onChange={handleChange} autoComplete="name" required
                className="w-full h-[36px] pl-[36px] pr-sm rounded border border-neutral-medium-gray bg-surface-container-lowest font-body-regular text-body-regular text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(29,82,222,0.1)] transition-shadow outline-none" 
                placeholder="Jane Doe" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block font-body-standard text-body-standard text-on-surface mb-base">Email address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm">
                <span className="material-symbols-outlined text-outline">mail</span>
              </span>
              <input 
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange} autoComplete="email" required
                className="w-full h-[36px] pl-[36px] pr-sm rounded border border-neutral-medium-gray bg-surface-container-lowest font-body-regular text-body-regular text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(29,82,222,0.1)] transition-shadow outline-none" 
                placeholder="jane@example.com" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block font-body-standard text-body-standard text-on-surface mb-base">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm">
                <span className="material-symbols-outlined text-outline">lock</span>
              </span>
              <input 
                type={showPassword ? "text" : "password"} id="password" name="password"
                value={formData.password} onChange={handleChange} autoComplete="new-password" required
                className="w-full h-[36px] pl-[36px] pr-[36px] rounded border border-neutral-medium-gray bg-surface-container-lowest font-body-regular text-body-regular text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(29,82,222,0.1)] transition-shadow outline-none" 
                placeholder="••••••••" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-sm text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-body-standard text-body-standard text-on-surface mb-base">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm">
                <span className="material-symbols-outlined text-outline">lock</span>
              </span>
              <input 
                type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required
                className="w-full h-[36px] pl-[36px] pr-[36px] rounded border border-neutral-medium-gray bg-surface-container-lowest font-body-regular text-body-regular text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(29,82,222,0.1)] transition-shadow outline-none" 
                placeholder="••••••••" 
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-sm text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full h-[36px] bg-primary-container text-on-primary font-body-standard text-body-standard rounded-lg hover:bg-primary-blue-dark hover:shadow-[0px_4px_6px_rgba(0,0,0,0.15)] transition-all duration-200 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="mt-xl mb-xl relative flex items-center justify-center">
          <div className="absolute w-full border-t border-neutral-medium-gray"></div>
          <div className="relative bg-surface-container-lowest px-sm font-label-caption text-label-caption text-secondary">or continue with</div>
        </div>

        <div className="flex gap-md">
          <button type="button" className="flex-1 h-[36px] flex items-center justify-center gap-xs bg-surface-container-lowest border border-neutral-medium-gray rounded font-body-standard text-body-standard text-primary hover:bg-neutral-off-white transition-colors duration-200">
            <img alt="Google logo" className="w-4 h-4 object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJweuhHIbGImTSHg784vk-N7P9jwwk7A0ewbclIALZIwE9GfI6I0LzYX8TmSVUYBObDdexNwOyeOcscf3pcFn3FPdQlkpn_GfeGcwFd9Gz1cC-PzkhuQ4Vv6sqnoSn2r-xiWTjRESCsTp_NDJIBwIdumtj94RteFGHHNjOp0riG4GbAgUya6WH6oIWnRFpF_OJVqEJmu48EAYMeglPOZ72Bc2YH_HMEQniDt6xrUvZIUEoRVZpy5sNP1qpd0f6ZzHnEKQMiQIXt2o" />
            Google
          </button>
          <button type="button" className="flex-1 h-[36px] flex items-center justify-center gap-xs bg-surface-container-lowest border border-neutral-medium-gray rounded font-body-standard text-body-standard text-primary hover:bg-neutral-off-white transition-colors duration-200">
            <img alt="GitHub logo" className="w-4 h-4 object-cover rounded-full grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl6FIA_0No7dvixXbdJpmLCyAER9xgDWbi-skRXlT4FY7XO9kY5R_ZLVteYWRManIlpYBhEtZeG-WId2Y7bYfIn2XF5HSfFi0LyXy5C2c3yCpAQ8BtZkNTQVll120nptZguo3mHaAaqroPs_00FYG7rsayxHhd5OmYCqgXec9CzhizJeoenUCZ_2kQ0esD3g_1yzlDt-xlGEdnM78RbN_uERORMXQY0UdpaqsbXxx5VCjroStMqi4tp_8nDYgYpfWg-yPpmwjPgvc" />
            GitHub
          </button>
        </div>

        <div className="mt-xl text-center">
          <p className="font-body-regular text-body-regular text-secondary">
            Already have an account? 
            <Link to="/login" className="text-primary hover:text-primary-blue-dark font-body-standard transition-colors ml-1">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;