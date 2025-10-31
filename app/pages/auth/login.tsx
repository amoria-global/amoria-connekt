'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LoginPage(): React.JSX.Element {
  const t = useTranslations('auth.loginPage');
  const tAuth = useTranslations('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Screen size detection for responsive design
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop' | 'large' | 'xlarge'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width < 1025) setScreenSize('tablet');
      else if (width < 1441) setScreenSize('desktop');
      else if (width < 1921) setScreenSize('large');
      else setScreenSize('xlarge');
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDisabled = !email || !password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      console.log('Login submitted:', { email, password });
      // Add your login logic here
    }
  };

  const isMobile = screenSize === 'mobile';

  // Responsive styles for form inputs (mobile-only responsiveness, desktop keeps original)
  const inputStyle = {
    width: '100%',
    padding: isMobile ? '12px 14px' : '10px 12px',
    fontSize: isMobile ? '16px' : '14px', // 16px on mobile prevents iOS zoom
    border: '2px solid #d1d5db',
    borderRadius: isMobile ? '16px' : '20px',
    outline: 'none',
    transition: 'all 0.3s',
    backgroundColor: '#ffffff',
    minHeight: isMobile ? '44px' : 'auto', // Minimum touch target on mobile only
    boxSizing: 'border-box' as const
  };

  const labelStyle = {
    display: 'block',
    fontSize: isMobile ? '13px' : '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: isMobile ? '4px' : '5px'
  };

  return (
    <>
      <style>{`
        /* Safe area insets for mobile devices with notches */
        @supports (padding: env(safe-area-inset-top)) {
          .mobile-safe-area {
            padding-top: max(1.5rem, env(safe-area-inset-top)) !important;
            padding-bottom: max(1.5rem, env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>

      <div
        className="h-screen overflow-hidden bg-gray-50 flex items-center justify-center"
        style={{
          padding: isMobile ? '0.5rem' : '1rem'
        }}
      >
        <div
          className="w-full bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row"
          style={{
            maxWidth: isMobile ? '100%' : '80rem',
            height: isMobile ? '100vh' : '90vh',
            maxHeight: isMobile ? '100vh' : '800px',
            borderRadius: isMobile ? '0' : '1.5rem'
          }}
        >

        {/* Left Side - Gradient Card (Hidden on mobile) */}
        <div
          className="hidden lg:flex lg:w-1/2 p-8 lg:p-12 flex-col items-center justify-between h-full"
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(8, 58, 133, 1) 0%, rgba(8, 58, 133, 0.6) 40%, rgba(217, 217, 217, 1) 55%, rgba(217, 217, 217, 0.8) 70%, rgba(227, 54, 41, 1) 100%)',
            overflow: 'hidden'
          }}
        >
          {/* Overlay gradients */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(63deg, rgba(8, 58, 133, 1) 0%, rgba(8, 58, 133, 0) 100%)',
            pointerEvents: 'none'
          }}></div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 90% 0%, rgba(137, 89, 0, 1) 0%, rgba(255, 166, 0, 1) 0%, rgba(255, 166, 0, 0) 90%)',
            pointerEvents: 'none'
          }}></div>

          <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon Group matching image layout */}
            <div style={{ marginBottom: '40px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Bracket container */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Top left bracket corner */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '-30px',
                  width: '25px',
                  height: '25px',
                  marginTop: '2rem',
                  borderTop: '4px solid rgba(64, 64, 70, 0.9)',
                  borderLeft: '4px solid rgba(64, 64, 70, 0.9)',
                  borderRadius: '8px 0 0 0'
                }}></div>

                {/* Top right bracket corner */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '-30px',
                  width: '25px',
                  height: '25px',
                  marginTop: '2rem',
                  borderTop: '4px solid rgba(64, 64, 70, 0.9)',
                  borderRight: '4px solid rgba(64, 64, 70, 0.9)',
                  borderRadius: '0 8px 0 0'
                }}></div>

                {/* User Icon centered at top */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(64, 64, 70, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2rem'
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#ffffff"/>
                  </svg>
                </div>

                {/* Bottom left bracket corner */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '-30px',
                  width: '25px',
                  height: '25px',
                  borderBottom: '4px solid rgba(64, 64, 70, 0.9)',
                  borderLeft: '4px solid rgba(64, 64, 70, 0.9)',
                  borderRadius: '0 0 0 8px'
                }}></div>

                {/* Bottom right bracket corner */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '-30px',
                  width: '25px',
                  height: '25px',
                  borderBottom: '4px solid rgba(64, 64, 70, 0.9)',
                  borderRight: '4px solid rgba(64, 64, 70, 0.9)',
                  borderRadius: '0 0 8px 0'
                }}></div>
              </div>

              {/* Bottom row: Camera, Line, Video Camera */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', marginTop: '0' }}>
                {/* Photo Camera Icon */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '20px',
                  marginTop: '1rem',
                  backgroundColor: 'rgba(64, 64, 70, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3H9ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18Z" fill="#ffffff"/>
                    <circle cx="12" cy="13" r="3" fill="#ffffff"/>
                  </svg>
                </div>

                {/* Center Line/Minus */}
                <div style={{
                  width: '60px',
                  height: '4px',
                  backgroundColor: 'rgba(64, 64, 70, 0.9)',
                  borderRadius: '2px'
                }}></div>

                {/* Video Camera Icon */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '20px',
                  marginTop: '1rem',
                  backgroundColor: 'rgba(64, 64, 70, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="#ffffff"/>
                  </svg>
                </div>
              </div>
            </div>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#000000',
              maxWidth: '280px',
              lineHeight: '1.3',
              textAlign: 'center'
            }}>
              {t('connectWith')}
            </h2>
          </div>

          {/* Pagination Dots */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '160px', position: 'relative', zIndex: 1, marginBottom: '6rem' }}>
            <div style={{ width: '28px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px' }}></div>
            <div style={{ width: '28px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '50%' }}></div>
            <div style={{ width: '28px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px' }}></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div
          className={`w-full lg:w-1/2 flex flex-col items-center h-full overflow-y-auto ${isMobile ? 'mobile-safe-area' : ''}`}
          style={{
            padding: isMobile ? '1rem 1rem' : '20px 30px',
            paddingTop: isMobile ? '1.5rem' : '20px',
            paddingBottom: isMobile ? '1.5rem' : '20px',
            justifyContent: isMobile ? 'flex-start' : 'center'
          }}
        >
          <div
            className="w-full max-w-md"
            style={{
              padding: isMobile ? '0 0.25rem' : '0 2rem'
            }}
          >
            <h1 style={{
              fontSize: isMobile ? '20px' : '26px',
              fontWeight: '700',
              textAlign: 'left',
              color: '#000000',
              marginBottom: isMobile ? '10px' : '20px',
              letterSpacing: '0.5px'
            }}>
              {t('title')}
            </h1>

            {/* Social Login Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: isMobile ? '8px' : '12px' }}>
              {/* Google Button */}
              <button style={{
                flex: '1',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                border: '2px solid #d1d5db',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: isMobile ? '8px' : '12px',
              marginTop: isMobile ? '8px' : '12px'
            }}>
              <hr style={{ flex: '1', border: 'none', borderTop: '2px solid #d1d5db' }} />
              <span style={{ padding: '0 10px', fontSize: isMobile ? '13px' : '14px', color: '#6b7280', fontWeight: '600' }}>{t('orContinueWith')}</span>
              <hr style={{ flex: '1', border: 'none', borderTop: '2px solid #d1d5db' }} />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {/* Email Input */}
                <div>
                  <label htmlFor="email" style={labelStyle}>
                    {t('yourEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    style={inputStyle}
                  />
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: isMobile ? '2px' : '3px',
                    marginBottom: isMobile ? '0' : '0'
                  }}>
                    {t('emailHelper')}
                  </p>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" style={labelStyle}>
                    {tAuth('password')}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('passwordPlaceholder')}
                      style={{
                        ...inputStyle,
                        paddingRight: '40px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6b7280',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                        padding: '4px'
                      }}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: '14px' }}></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: isMobile ? '10px' : '16px' }}>
                <button
                  type="submit"
                  disabled={isDisabled}
                  style={{
                    width: '100%',
                    padding: isMobile ? '10px' : '11px',
                    fontSize: '15px',
                    borderRadius: '30px',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    backgroundColor: isDisabled ? '#d1d5db' : '#083A85',
                    color: isDisabled ? '#9ca3af' : '#ffffff',
                    border: 'none'
                  }}
                >
                  {t('loginButton')}
                </button>
              </div>
            </form>

            {/* Links */}
            <div style={{
              marginTop: isMobile ? '10px' : '16px',
              marginBottom: isMobile ? '1rem' : '0',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '4px' : '5px'
            }}>
              <Link href="/user/auth/forgotpswd" style={{
                fontSize: isMobile ? '13px' : '14px',
                color: '#083A85',
                textDecoration: 'underline',
                fontWeight: '800'
              }}>
                {t('forgotPasswordLink')}
              </Link>
              <p style={{ fontSize: isMobile ? '13px' : '14px', color: '#6b7280', margin: 0 }}>
                {t('notRegistered')}{' '}
                <Link href="/user/auth/signup" style={{ color: '#083A85', textDecoration: 'underline', fontWeight: '800' }}>
                  {t('createAccount')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}