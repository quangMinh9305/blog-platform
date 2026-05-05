import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    // Mock Google OAuth
    navigate('/');
  };

  // Giao diện chuẩn đã được bọc logic React và sửa lỗi cú pháp (class -> className, for -> htmlFor)
  return (
    <main className="w-full max-w-[480px]">
      <div className="bg-surface-container-lowest rounded-[14px] border border-neutral-medium-gray shadow-[0px_1px_3px_rgba(0,0,0,0.1)] p-[40px] hover:border-accent-blue-light transition-colors duration-200 flex flex-col gap-xl">
        
        <header className="flex flex-col items-center text-center gap-md">
          <div className="flex items-center gap-xs text-primary-container font-h1-display text-h1-display font-black tracking-tight">
            <span className="material-symbols-outlined text-[32px]">code_blocks</span>
            <span>DevBlog</span>
          </div>
          <div>
            <h1 className="font-h1-display text-h1-display text-on-surface mb-xs">Welcome back</h1>
            <p className="font-body-regular text-body-regular text-on-surface-variant">Sign in to continue reading and writing</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <div className="flex flex-col gap-sm">
            <label className="font-body-standard text-body-standard text-on-surface" htmlFor="email">Email</label>
            <input 
              type="email"
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className={`h-[36px] px-sm rounded-DEFAULT border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-0 focus:shadow-[0_0_0_3px_rgba(29,82,222,0.1)] outline-none transition-all font-body-regular text-body-regular ${
                errors.email ? 'border-danger-red' : 'border-neutral-medium-gray'
              }`}
              placeholder="you@example.com" 
              required
            />
            {errors.email && (
              <p className="text-danger-red text-sm font-body-regular">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between">
              <label className="font-body-standard text-body-standard text-on-surface" htmlFor="password">Password</label>
              <Link to="/forgot-password" className="font-link-standalone text-link-standalone text-[14px] text-primary-container hover:text-primary-blue-dark transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className={`w-full h-[36px] pl-sm pr-xl rounded-DEFAULT border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-0 focus:shadow-[0_0_0_3px_rgba(29,82,222,0.1)] outline-none transition-all font-body-regular text-body-regular ${
                  errors.password ? 'border-danger-red' : 'border-neutral-medium-gray'
                }`}
                placeholder="••••••••" 
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-danger-red text-sm font-body-regular">{errors.password}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[36px] bg-primary-container text-on-primary rounded-lg font-body-standard text-body-standard flex items-center justify-center hover:bg-primary-blue-dark hover:shadow-[0px_4px_6px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="flex items-center gap-md">
          <div className="flex-1 h-px bg-neutral-medium-gray"></div>
          <span className="font-label-caption text-label-caption text-on-surface-variant uppercase tracking-wider">or continue with</span>
          <div className="flex-1 h-px bg-neutral-medium-gray"></div>
        </div>

        <div className="flex flex-col gap-md">
          <button onClick={handleGoogleLogin} type="button" className="w-full h-[36px] bg-surface-container-lowest text-primary-container border border-neutral-medium-gray rounded-lg font-body-standard text-body-standard flex items-center justify-center gap-sm hover:bg-neutral-off-white hover:border-accent-blue-light transition-all">
            <img alt="Google logo icon" className="w-4 h-4 object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJweuhHIbGImTSHg784vk-N7P9jwwk7A0ewbclIALZIwE9GfI6I0LzYX8TmSVUYBObDdexNwOyeOcscf3pcFn3FPdQlkpn_GfeGcwFd9Gz1cC-PzkhuQ4Vv6sqnoSn2r-xiWTjRESCsTp_NDJIBwIdumtj94RteFGHHNjOp0riG4GbAgUya6WH6oIWnRFpF_OJVqEJmu48EAYMeglPOZ72Bc2YH_HMEQniDt6xrUvZIUEoRVZpy5sNP1qpd0f6ZzHnEKQMiQIXt2o" />
            Google
          </button>
          <button type="button" className="w-full h-[36px] bg-surface-container-lowest text-primary-container border border-neutral-medium-gray rounded-lg font-body-standard text-body-standard flex items-center justify-center gap-sm hover:bg-neutral-off-white hover:border-accent-blue-light transition-all">
            <img alt="GitHub logo icon" className="w-4 h-4 object-cover rounded-full grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl6FIA_0No7dvixXbdJpmLCyAER9xgDWbi-skRXlT4FY7XO9kY5R_ZLVteYWRManIlpYBhEtZeG-WId2Y7bYfIn2XF5HSfFi0LyXy5C2c3yCpAQ8BtZkNTQVll120nptZguo3mHaAaqroPs_00FYG7rsayxHhd5OmYCqgXec9CzhizJeoenUCZ_2kQ0esD3g_1yzlDt-xlGEdnM78RbN_uERORMXQY0UdpaqsbXxx5VCjroStMqi4tp_8nDYgYpfWg-yPpmwjPgvc" />
            GitHub
          </button>
        </div>

        <footer className="text-center mt-sm">
          <p className="font-body-regular text-body-regular text-on-surface-variant">
            Don't have an account? <Link to="/register" className="font-link-standalone text-[14px] text-primary-container hover:text-primary-blue-dark transition-colors">Create one</Link>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Login;