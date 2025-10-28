'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import GlobalNetwork from "./components/GlobalNetwork";
import Preloader from "./components/Preloader";

export default function Home() {
  const t = useTranslations();
  const [activeDevice, setActiveDevice] = useState(0) // 0: phone, 1: tablet, 2: laptop
  const [isPaused, setIsPaused] = useState(false)
  const [activeCard, setActiveCard] = useState(0) // 0: rated, 1: live, 2: pay, 3: gallery
  // Check if preloader should show on initial load
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasShownPreloader = sessionStorage.getItem('hasShownPreloader');
      return hasShownPreloader !== 'true';
    }
    return true; // Default to true on server-side rendering
  })

  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  // Auto-rotation effect - rotate every 3 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveDevice((prev) => (prev + 1) % 3)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isPaused])

  // Calculate circular positions for each device based on activeDevice
  const getDevicePosition = (deviceIndex: number) => {
    // Calculate relative position (0 = center/front, 1 = right, 2 = left)
    const relativePosition = (deviceIndex - activeDevice + 3) % 3

    const positions = [
      // Center/Front position
      {
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        scale: 1,
        zIndex: 10,
        opacity: 1,
        rotate: 0
      },
      // Right position (visible on right side)
      {
        left: '75%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        scale: 0.5,
        zIndex: 2,
        opacity: 0.6,
        rotate: 15
      },
      // Left position (visible on left side)
      {
        left: '15%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        scale: 0.5,
        zIndex: 2,
        opacity: 0.6,
        rotate: -15
      }
    ]

    return positions[relativePosition]
  }
  return (
    <>
      {/* Show preloader only on first visit */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Show main content only after preloader is complete */}
      {!showPreloader && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Navbar - Outside sections to stay fixed */}
          <Navbar />

        <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          backgroundColor: '#DBDBDB',
          overflow: 'hidden',
        }}>
          {/* Hero Content Container */}
          <div style={{
            position: 'relative',
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '40px 20px 128px', // Standardized padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 'calc(80vh - 64px)'
          }}>

            {/* Left Content */}
            <div style={{
              position: 'relative',
              width: '48%',
              maxWidth: '450px',
              zIndex: 10
            }}>
              {/* Blue lighting bulb-like glow effect */}
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '-135px',
                width: '612px',
                height: '212.5px',
                background: 'radial-gradient(circle, rgba(4, 25, 255, 0.3) 0% 10%, rgba(37, 17, 220, 0.43) 4% 10%, rgba(37, 17, 220, 0) 90% 90%)',
                borderRadius: '50%',
                filter: 'blur(55px)',
                zIndex: -1,
                pointerEvents: 'none'
              }} />

              {/* Twitter Handle Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7.5px',
                padding: '9px 19.5px',
                border: '1.5px solid #000',
                borderRadius: '37.5px',
                marginBottom: '24px',
                backgroundColor: 'transparent'
              }}>
                <svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
                <button style={{ fontWeight: 600, fontSize: '15px', color: '#000', cursor: 'pointer' }}>{t('hero.twitter')}</button>
              </div>

              {/* Main Heading */}
              <h1 style={{
                fontSize: '57px',
                fontWeight: 700,
                lineHeight: '1.05',
                marginBottom: '19.5px',
                letterSpacing: '-0.02em'
              }}>
                <div style={{ color: '#083A85', marginBottom: '3px' }}>{t('hero.title1')}</div>
                <div style={{ color: '#000', marginBottom: '3px' }}>{t('hero.title2')}</div>
                <div style={{ color: '#000' }}>{t('hero.title3')}</div>
              </h1>

              {/* Description */}
              <p style={{
                fontSize: '15px',
                color: '#1f1d1d',
                lineHeight: '1.65',
                marginBottom: '30px',
                maxWidth: '390px'
              }}>
                {t('hero.description')}
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '13.5px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => window.location.href = '/user/photographers'}
                  style={{
                    backgroundColor: '#083A85',
                    color: '#fff',
                    padding: '11.25px 25.5px',
                    borderRadius: '37.5px',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 3px 9px rgba(8, 58, 133, 0.2)'
                  }}
                >
                  {t('hero.findPhotographer')}
                </button>
                <button
                  onClick={() => window.location.href = '/user/auth/signup-type?type=photographer'}
                  style={{
                  backgroundColor: 'transparent',
                  color: '#083A85',
                  padding: '11.25px 25.5px',
                  borderRadius: '37.5px',
                  border: '1.5px solid #083A85',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  {t('hero.joinPhotographer')}
                </button>
              </div>
            </div>

            {/* Right Content - Image Section */}
            <div style={{
              position: 'relative',
              width: '52%',
              height: '525px',
              zIndex: 5
            }}>
              {/* Full Circle - Upper Left */}
              <div style={{
                position: 'absolute',
                left: '-115px',
                top: '235px',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #083A85 0%, #FF6363 100%)',
                zIndex: 20
              }} />

              {/* Half Circle - Lower Right */}
              <div style={{
                position: 'absolute',
                left: '-50px',
                bottom: '140px',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #083A85 0%, #FF6363 100%)',
                clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                transform: 'rotate(-90deg)',
                zIndex: 20
              }} />

              {/* Photographer Image Container */}
              <div style={{
                position: 'absolute',
                left: '75px',
                top: '0',
                width: '487.5px',
                height: '525px',
                zIndex: 10
              }}>
                {/* Main Image */}
                <img
                  src="/camman.png"
                  alt="Photographer with camera"
                  style={{
                    width: '700px',
                    height: '700px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />

                {/* Blue Angular Gradient Overlay - Top Right with 3D Perspective */}
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '20px',
                  width: '1370px',
                  height: '500px',
                  background: 'conic-gradient(from 180deg at 70% 50%, rgba(2, 14, 31, 0.6) 0deg, rgba(8, 58, 133, 0.8) 359.96deg, rgba(2, 14, 31, 0.6) 360deg)',
                  borderRadius: '120px 30px 30px 100px',
                  transform: 'perspective(630px) rotateY(-27deg) rotateX(-1deg)',
                  transformOrigin: 'right center',
                  zIndex: 3,
                  boxShadow: '0 400px 800px rgba(2, 14, 31, 0.3)'
                }} />

                {/* Lady with Speech Bubble - Top Left */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-175px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '30.5px',
                  zIndex: 15
                }}>
                  <img
                    src="/lady.png"
                    alt="Smiling woman"
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      boxShadow: '0 4.5px 13.5px rgba(0,0,0,0.12)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '85px',
                    bottom: '20px',
                    background: 'linear-gradient(-90deg, #083A85 0%, #FF6363 100%)',
                    padding: '8.25px 16.5px',
                    borderRadius: '30px',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '2.3px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 3.75px 11.25px rgba(0,0,0,0.18)'
                  }}>
                    {t('hero.ohWow')}
                  </div>
                  {/* Triangular polygon pointer for speech bubble */}
                  <svg
                    style={{
                      position: 'absolute',
                      width: '15px',
                      height: '30px',
                      left: '75px',
                      top: '19px',
                      transform: 'matrix(0.7, -0.72, 0.7, 0.72, 0, 0)',
                      zIndex: 14
                    }}
                    viewBox="0 0 48.26 39.64"
                  >
                    <path
                      d="M 20 8 Q 24.13 4 28 8 L 44 34 Q 46 38 44 39.64 L 4 39.64 Q 2 38 4 34 L 20 8 Z"
                      fill="#000000"
                      stroke="#000000"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Call UI Card - Left Middle (under camera) */}
                <div style={{
                  position: 'absolute',
                  left: '-200px',
                  top: '130px',
                  height: '40px',
                  width: '160px',
                  backgroundColor: '#fff',
                  padding: '9.75px 12px',
                  borderRadius: '52.5px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  zIndex: 12
                }}>
                  <img
                    src="/bea.png"
                    alt="User Bea"
                    style={{
                      position: 'absolute',
                      left: '4px',
                      top: '2px',
                      width: '33px',
                      height: '35px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5px' }}>
                    <div style={{
                      position: 'absolute',
                      left: '42px',
                      top: '12px',
                      width: '68.5px',
                      height: '4.75px',
                      backgroundColor: '#868686',
                      borderRadius: '3.75px'
                    }}/>
                    <div style={{
                      position: 'absolute',
                      left: '42px',
                      top: '23px',
                      width: '48.75px',
                      height: '4.75px',
                      backgroundColor: '#D9D9D9',
                      borderRadius: '3.75px'
                    }}/>
                  </div>
                  <div style={{
                    position: 'absolute',
                    left: '125px',
                    top: '6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#34C848',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="16.5" height="16.5" viewBox="0 0 24 24" fill="none">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="white"/>
                    </svg>
                  </div>
                </div>

                {/* Verified Man Card - Right Bottom (under photographer hair) */}
                <div style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '335px',
                  height: '40px',
                  width: '160px',
                  backgroundColor: '#fff',
                  padding: '11.25px 18px',
                  borderRadius: '52.5px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  zIndex: 12
                }}>
                  <div style={{  }}>
                    <img
                      src="/man.png"
                      alt="Verified man"
                      style={{
                        position: 'absolute',
                        left: '2px',
                        top: '2px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '24px',
                      right: '120px',
                      width: '14.5px',
                      height: '14.5px',
                      borderRadius: '50%',
                      backgroundColor: '#00C2FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2.25px solid #fff'
                    }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{
                      position: 'absolute',
                      bottom: '21px',
                      right: '23px',
                      width: '90px',
                      height: '6.5px',
                      backgroundColor: '#9948FF',
                      borderRadius: '3.75px'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '45px',
                      width: '67.5px',
                      height: '6.5px',
                      backgroundColor: '#FF8E8C',
                      borderRadius: '3.75px'
                    }} />
                  </div>
                </div>

                {/* Smile Please - Bottom Center (under photographer mouth) */}
                <div style={{
                  position: 'absolute',
                  left: '225px',
                  bottom: '210px',
                  minWidth: '140px',
                  width: 'fit-content',
                  background: 'linear-gradient(180deg, #8C82FF 0%, #14008E 100%)',
                  padding: '9.75px 21px',
                  borderRadius: '24px',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  zIndex: 12,
                  boxShadow: '0 3.75px 13.5px rgba(140,130,255,0.35)',
                  whiteSpace: 'nowrap'
                }}>
                  {t('hero.smilePlease')}
                </div>
                {/* Triangular polygon pointer for Smile Please bubble */}
                <svg
                  style={{
                    position: 'absolute',
                    width: '15px',
                    height: '10px',
                    left: '240px',
                    bottom: '245px',
                    transform: 'matrix(0.7, 0.72, -0.7, 0.72, 0, 0) rotate(90deg)',
                    zIndex: 11
                  }}
                  viewBox="0 0 48.26 39.64"
                >
                  <path
                    d="M 20 8 Q 24.13 4 28 8 L 44 34 Q 46 38 44 39.64 L 4 39.64 Q 2 38 4 34 L 20 8 Z"
                    fill="#14008E"
                    stroke="#14008E"
                    strokeWidth="6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how-it-works" style={{
          backgroundColor: '#fff',
          padding: '80px 0', // Increased vertical padding
        }}>
          <div style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 20px' // Horizontal padding for smaller screens
          }}>
            {/* Section Title */}
            <h2 style={{
              fontSize: '50px',
              fontWeight: 1000,
              textAlign: 'center',
              marginBottom: '100px', // Standardized margin
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              {t('howItWorks.title')}
            </h2>

            {/* Three Steps Container */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '40px',
              position: 'relative'
            }}>
              {/* Dotted Line Connector */}
              <svg
                style={{
                  position: 'absolute',
                  top: '-360px',
                  left: '12%',
                  width: '76%',
                  height: '950px',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
                viewBox="0 0 1000 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 60 Q 250 20, 500 60 T 1000 60"
                  stroke="#000000"
                  strokeWidth="0.7"
                  strokeDasharray="10,10"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Step 1: Get Started */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                <img
                  src="/ava1.png"
                  alt="Get Started"
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'contain',
                    marginBottom: '30px'
                  }}
                />
                <h3 style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  {t('howItWorks.getStarted.title')}
                </h3>
                <p style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#1f1d1d',
                  lineHeight: '1.65',
                  maxWidth: '280px'
                }}>
                  {t('howItWorks.getStarted.description')}
                </p>
              </div>

              {/* Step 2: Photography */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                <img
                  src="/ava2.png"
                  alt="Photography"
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'contain',
                    marginBottom: '30px'
                  }}
                />
                <h3 style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  {t('howItWorks.photography.title')}
                </h3>
                <p style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#1f1d1d',
                  lineHeight: '1.65',
                  maxWidth: '280px'
                }}>
                  {t('howItWorks.photography.description')}
                </p>
              </div>

              {/* Step 3: Go Live */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                <img
                  src="/ava3.png"
                  alt="Go Live"
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'contain',
                    marginBottom: '30px'
                  }}
                />
                <h3 style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  {t('howItWorks.goLive.title')}
                </h3>
                <p style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#1f1d1d',
                  lineHeight: '1.65',
                  maxWidth: '280px'
                }}>
                  {t('howItWorks.goLive.description')}
                </p>
              </div>
            </div>

            {/* For Photographers Container */}
            <div style={{
              marginTop: '40px',
              background: 'linear-gradient(90deg, #083A85 19%, #4675AA 100%)',
              borderRadius: '24px',
              padding: '25px ',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '60px',
              position: 'relative',

            }}>
              {/* Left Content */}
              <div style={{
                flex: 1,
                color: '#fff',
                maxWidth: '400px'
              }}>
                <h2 style={{
                  position: 'absolute',
                  top: '40px',
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  maxWidth: '350px',
                  lineHeight: '1'
                }}>
                  {t('howItWorks.forPhotographers.title')}
                </h2>
                <p style={{
                  position: 'inherit',
                  top: '120px',
                  fontSize: '18px',
                  lineHeight: '1.5',
                  marginBottom: '-50px',
                  opacity: 0.95
                }}>
                  {t('howItWorks.forPhotographers.description')}
                </p>
                <button
                  onClick={() => window.location.href = '/user/auth/signup-type'}
                  style={{
                    background: 'linear-gradient(90deg, #041DC0 0%, #FF6363 0%, #7763FF 100%)',
                    color: '#000',
                    position: 'absolute',
                    left: '150px',
                    top: '290px',
                    fontSize: '20px',
                    fontWeight: 600,
                    padding: '8.25px 5.5px',
                    width: '180px',
                    height: '12%',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  {t('howItWorks.forPhotographers.cta')}
                </button>
              </div>

              {/* Right Video Container */}
              <div style={{
                flex: 1,
                maxWidth: '580px',
                maxHeight: '1000px',
                background: 'linear-gradient(90deg, #0104B9 0%, #0104B9 50%, #2213d1 10%, #013773 0%)',
                borderRadius: '20px',
                padding: '23px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '270px',
                  padding: '10px',
                  backgroundColor: '#000',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'cover'
                    }}
                    controls={false}
                  >
                    <source src="/vid.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mockups Section */}
        <section style={{
          background: 'linear-gradient(90deg, #ec4899 0%, #f97316 50%, #8b5cf6 100%)',
          backdropFilter: 'blur(1000px)',
          padding: '130px 220px 130px 250px', // Standardized vertical padding
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
            position: 'relative',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '2000px',
            perspectiveOrigin: 'center center'
          }}>
            {/* Laptop Mockup - Background Layer */}
            <div
              onMouseEnter={() => {
                setActiveDevice(2)
                setIsPaused(true)
              }}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                position: 'absolute',
                left: getDevicePosition(2).left,
                top: getDevicePosition(2).top,
                transform: `translate(${getDevicePosition(2).translateX}, ${getDevicePosition(2).translateY}) scale(${getDevicePosition(2).scale}) rotateY(${getDevicePosition(2).rotate}deg)`,
                zIndex: getDevicePosition(2).zIndex,
                opacity: getDevicePosition(2).opacity,
                filter: getDevicePosition(2).zIndex > 5 ? 'none' : 'blur(1px)',
                transition: 'all 0.7s ease-out',
                cursor: 'pointer'
            }}>
              {/* Laptop Screen */}
              <div style={{
                width: '950px',
                height: '500px',
                backgroundColor: '#e8e8e8',
                borderRadius: '30px 30px 0 0',
                border: '4px solid #d0d0d0',
                borderBottom: 'none',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                overflow: 'visible',
                position: 'relative'
              }}>
                {/* Screen Bezel */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: '3px solid #bdbdbd',
                  borderRadius: '28px 28px 0 0',
                  pointerEvents: 'none',
                  zIndex: 4
                }} />

                {/* Webcam Notch */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#0a0a0a',
                  borderRadius: '50%',
                  zIndex: 5,
                  boxShadow: 'inset 0 0 3px rgba(100,100,255,0.3), 0 0 0 2px rgba(200,200,200,0.3)'
                }} />

                {/* Browser UI */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  right: '12px',
                  height: '32px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '20px 20px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  gap: '8px',
                  zIndex: 3,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  {/* Browser Buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#ff5f56', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#ffbd2e', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#27c93f', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                  </div>
                  {/* Address Bar */}
                  <div style={{
                    flex: 1,
                    height: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '0 8px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#666'
                  }}>
                    🔒 connekyt.com/concerts
                  </div>
                </div>

                {/* Screen Content */}
                <div style={{
                  position: 'absolute',
                  top: '44px',
                  left: '12px',
                  right: '12px',
                  bottom: '3px',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  borderRadius: '0'
                }}>
                  <img
                    src="/pc.png"
                    alt="Concerts"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Concerts Text */}
                  <div style={{
                    position: 'absolute',
                    left: '40px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(-60deg)',
                    transformOrigin: 'left center',
                    fontFamily: "'Alex Brush', cursive",
                    fontSize: '65px',
                    fontWeight: 400,
                    color: '#fff',
                    textShadow: '3px 3px 12px rgba(0,0,0,0.6)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.02em'
                  }}>
                    {t('devices.concerts')}
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div style={{
                width: '950px',
                height: '20px',
                backgroundColor: '#d0d0d0',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 4px 2px rgba(0,0,0,0.15)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)'
              }}>
                {/* Keyboard indent */}
                <div style={{
                  width: '85%',
                  height: '3px',
                  backgroundColor: '#c0c0c0',
                  borderRadius: '1.5px',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
                }} />
              </div>

              {/* Laptop Keyboard Base */}
              <div style={{
                width: '1050px',
                height: '8px',
                backgroundColor: '#bdbdbd',
                position: 'relative',
                marginLeft: '-50px',
                borderRadius: '0 0 10px 10px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
              }} />
            </div>

            {/* Tablet Mockup - Middle Layer */}
            <div
              onMouseEnter={() => {
                setActiveDevice(1)
                setIsPaused(true)
              }}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                position: 'absolute',
                left: getDevicePosition(1).left,
                top: getDevicePosition(1).top,
                transform: `translate(${getDevicePosition(1).translateX}, ${getDevicePosition(1).translateY}) scale(${getDevicePosition(1).scale}) rotateY(${getDevicePosition(1).rotate}deg)`,
                width: '450px',
                height: '580px',
                backgroundColor: '#fff',
                borderRadius: '30px',
                border: '2px solid #e8e8e8',
                borderBottom: 'none',
                boxShadow: getDevicePosition(1).zIndex > 5 ? '0 25px 80px rgba(0,0,0,0.4)' : '0 15px 40px rgba(0,0,0,0.25)',
                overflow: 'visible',
                zIndex: getDevicePosition(1).zIndex,
                opacity: getDevicePosition(1).opacity,
                filter: getDevicePosition(1).zIndex > 5 ? 'none' : 'blur(1px)',
                transition: 'all 0.7s ease-out',
                cursor: 'pointer'
            }}>
              {/* Power Button (Top Right) */}
              <div style={{
                position: 'absolute',
                top: '80px',
                right: '-6px',
                width: '5px',
                height: '60px',
                backgroundColor: '#FFFFFF',
                borderRadius: '0 50px 50px 0',
                boxShadow: '2px 0 4px rgba(0,0,0,0.15), inset -1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 10
              }} />

              {/* Volume Up Button (Left Side) */}
              <div style={{
                position: 'absolute',
                top: '150px',
                left: '-5px',
                width: '5px',
                height: '50px',
                backgroundColor: '#FFFFFF',
                borderRadius: '50px 0 0 50px',
                boxShadow: '-2px 0 4px rgba(0,0,0,0.15), inset 1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 50
              }} />

              {/* Volume Down Button (Left Side) */}
              <div style={{
                position: 'absolute',
                top: '230px',
                left: '-5px',
                width: '5px',
                height: '50px',
                backgroundColor: '#FFFFFF',
                borderRadius: '50px 0 0 50px',
                boxShadow: '-2px 0 4px rgba(0,0,0,0.15), inset 1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 10
              }} />

              {/* Screen Bezel */}
              <div style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                right: '5px',
                bottom: '5px',
                backgroundColor: '#000',
                borderRadius: '25px',
                overflow: 'hidden'
              }}>
                {/* Status Bar */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '50px',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
                  zIndex: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 35px',
                  fontSize: '14px',
                  color: '#fff',
                  fontWeight: 800
                }}>
                  {/* Time - Left Side */}
                  <div style={{ marginTop: '5px' }}>9:41</div>

                  {/* Status Icons - Right Side */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '5px' }}>
                    {/* WiFi */}
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" opacity="900" >
                      <path d="M9 11C9.55 11 10 11.45 10 12C10 12.55 9.55 13 9 13C8.45 13 8 12.55 8 12C8 11.45 8.45 11 9 11ZM9 5C10.78 5 12.44 5.66 13.71 6.76L12.65 7.82C11.68 7.04 10.4 6.5 9 6.5C7.6 6.5 6.32 7.04 5.35 7.82L4.29 6.76C5.56 5.66 7.22 5 9 5ZM9 0C11.73 0 14.24 0.97 16.18 2.58L15.12 3.64C13.5 2.31 11.36 1.5 9 1.5C6.64 1.5 4.5 2.31 2.88 3.64L1.82 2.58C3.76 0.97 6.27 0 9 0Z" fill="white"/>
                    </svg>

                    {/* Battery */}
                    <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                      <rect x="0.5" y="1.5" width="22" height="11" rx="2.5" stroke="white" strokeWidth="1" fill="none" opacity="0.4"/>
                      <rect x="2.5" y="3.5" width="17" height="7" rx="1.5" fill="#f7d705"/>
                      <rect x="24" y="5" width="3" height="4" rx="1" fill="white" opacity="0.4"/>
                    </svg>
                  </div>
                </div>

                {/* Front Camera */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '15px',
                  height: '15px',
                  backgroundColor: '#000000',
                  borderRadius: '50%',
                  zIndex: 100,
                  boxShadow: 'inset 0 0 3px rgba(255,255,255,255.9), 0 0 0 5px rgba(60,60,60,0.4)'
                }} />

                <img
                  src="/tab.png"
                  alt="Weddings"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Weddings Text */}
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: '60px',
                  fontWeight: 400,
                  color: '#fff',
                  textShadow: '3px 3px 12px rgba(0,0,0,0.6)',
                  zIndex: 3,
                  letterSpacing: '0.02em'
                }}>
                  {t('devices.weddings')}
                </div>
                {/* Left Ring */}
                <img
                  src="/ring.png"
                  alt="Ring"
                  style={{
                    position: 'absolute',
                    top: '50px',
                    left: '10px',
                    width: '50px',
                    height: '40px',
                    transform: 'rotate(-45deg)',
                    zIndex: 3
                  }}
                />
                {/* Right Ring */}
                <img
                  src="/ring.png"
                  alt="Ring"
                  style={{
                    position: 'absolute',
                    top: '50px',
                    right: '10px',
                    width: '50px',
                    height: '40px',
                    transform: 'rotate(45deg)',
                    zIndex: 3
                  }}
                />

                {/* Navigation Dock (Bottom) */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '240px',
                  height: '70px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  zIndex: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0 15px',
                  boxShadow: '0 8px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)'
                }}>
                  {/* App Icons */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(8, 58, 133, 0.9)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>📷</div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(255, 99, 99, 0.9)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>🎬</div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(140, 130, 255, 0.9)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>💼</div>
                </div>

                {/* Home Indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '95px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '5px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '2.5px',
                  zIndex: 50
                }} />
              </div>
            </div>

            {/* Phone Mockup - Foreground Layer */}
            <div
              onMouseEnter={() => {
                setActiveDevice(0)
                setIsPaused(true)
              }}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                position: 'absolute',
                left: getDevicePosition(0).left,
                top: getDevicePosition(0).top,
                transform: `translate(${getDevicePosition(0).translateX}, ${getDevicePosition(0).translateY}) scale(${getDevicePosition(0).scale}) rotateY(${getDevicePosition(0).rotate}deg)`,
                width: '250px',
                height: '500px',
                backgroundColor: '#fff',
                borderRadius: '36px',
                border: '1px solid #e8e8e8',
                boxShadow: getDevicePosition(0).zIndex > 5 ? '0 40px 100px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.3)',
                overflow: 'visible',
                zIndex: getDevicePosition(0).zIndex,
                opacity: getDevicePosition(0).opacity,
                filter: getDevicePosition(0).zIndex > 5 ? 'none' : 'blur(1px)',
                transition: 'all 0.7s ease-out',
                cursor: 'pointer'
            }}>
              {/* Power Button (Right Side) */}
              <div style={{
                position: 'absolute',
                top: '130px',
                right: '-4px',
                width: '4px',
                height: '70px',
                backgroundColor: '#FFFFFF',
                borderRadius: '0 30px 30px 0',
                boxShadow: '2px 0 3px rgba(0,0,0,0.15), inset -1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 10
              }} />

              {/* Volume Up Button (Left Side) */}
              <div style={{
                position: 'absolute',
                top: '120px',
                left: '-4px',
                width: '4px',
                height: '35px',
                backgroundColor: '#FFFFFF',
                borderRadius: '30px 0 0 30px',
                boxShadow: '-2px 0 3px rgba(0,0,0,0.15), inset 1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 10
              }} />

              {/* Volume Down Button (Left Side) */}
              <div style={{
                position: 'absolute',
                top: '165px',
                left: '-4px',
                width: '4px',
                height: '35px',
                backgroundColor: '#FFFFFF',
                borderRadius: '30px 0 0 30px',
                boxShadow: '-2px 0 3px rgba(0,0,0,0.15), inset 1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 10
              }} />

              {/* Mute Switch (Left Side) */}
              <div style={{
                position: 'absolute',
                top: '85px',
                left: '-3px',
                width: '4px',
                height: '25px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px 0 0 2px',
                boxShadow: '-2px 0 3px rgba(0,0,0,0.15), inset 1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 10
              }} />

              {/* Screen Bezel */}
              <div style={{
                position: 'absolute',
                top: '5px',
                left: '6px',
                right: '6px',
                bottom: '6px',
                backgroundColor: '#000',
                borderRadius: '30px',
                overflow: 'hidden'
              }}>
                {/* Notch Container */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '20px',
                  backgroundColor: '#000',
                  borderRadius: '0 0 50px 50px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0 12px'
                }}>
                  {/* Front Camera */}
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    left: '20%',
                    width: '9px',
                    height: '9px',
                    backgroundColor: '#0a0a0a',
                    borderRadius: '50%',
                    boxShadow: 'inset 0 0 8px rgba(255,255,255,255)'
                  }} />

                  {/* Sensor */}
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '37%',
                    width: '32px',
                    height: '5px',
                    backgroundColor: '#0f0f0f',
                    borderRadius: '2.5px',
                    boxShadow: 'inset 0 1px 3px rgba(255,255,255,255)'
                  }} />
                </div>

                {/* Status Bar Background (behind notch) */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '40px',
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 70%, transparent 100%)',
                  zIndex: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 15px',
                  fontSize: '10px',
                  color: '#fff',
                  fontWeight: 500
                }}>
                  {/* Time - Left Side */}
                  <div style={{ marginTop: '2px', fontWeight: 600, fontSize: '11px'}}>9:41</div>

                  {/* Status Icons - Right Side */}
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center', marginTop: '1px' }}>
                    {/* Signal Bars */}
                    <svg width="10" height="9" viewBox="0 0 14 10" fill="none">
                      <rect x="0" y="6" width="2" height="4" rx="0.5" fill="white" opacity="9.8"/>
                      <rect x="4" y="4" width="2" height="6" rx="0.5" fill="white" opacity="9.8"/>
                      <rect x="8" y="2" width="2" height="8" rx="0.5" fill="white"/>
                      <rect x="12" y="0" width="2" height="10" rx="0.5" fill="white"/>
                    </svg>

                    {/* WiFi */}
                    <svg width="18" height="9" viewBox="0 0 18 13" fill="white" opacity="9" >
                      <path d="M9 11C9.55 11 10 11.45 10 12C10 12.55 9.55 13 9 13C8.45 13 8 12.55 8 12C8 11.45 8.45 11 9 11ZM9 5C10.78 5 12.44 5.66 13.71 6.76L12.65 7.82C11.68 7.04 10.4 6.5 9 6.5C7.6 6.5 6.32 7.04 5.35 7.82L4.29 6.76C5.56 5.66 7.22 5 9 5ZM9 0C11.73 0 14.24 0.97 16.18 2.58L15.12 3.64C13.5 2.31 11.36 1.5 9 1.5C6.64 1.5 4.5 2.31 2.88 3.64L1.82 2.58C3.76 0.97 6.27 0 9 0Z" fill="white"/>
                    </svg>

                     {/* Battery */}
                    <svg width="24" height="10" viewBox="0 0 28 14" fill="none">
                      <rect x="0.5" y="1.5" width="22" height="11" rx="2.5" stroke="white" strokeWidth="1" fill="none" opacity="9"/>
                      <rect x="2.5" y="3.5" width="17" height="7" rx="1.5" fill="#ffffff"/>
                      <rect x="24" y="5" width="3" height="4" rx="1" fill="white" opacity="9.4"/>
                    </svg>
                  </div>
                </div>

                {/* Video Content */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                >
                  <source src="/phone.mp4" type="video/mp4" />
                </video>

                {/* Bottom Navigation Bar with Controls */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '80px',
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
                  zIndex: 9,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 20px 15px'
                }}>
                  {/* Control Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '30px',
                    marginBottom: '12px',
                    alignItems: 'center'
                  }}>
                    {/* Capture Button */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '4px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
              zIndex: 5
            }}>
              {[t('devices.phone'), t('devices.tablet'), t('devices.laptop')].map((device, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveDevice(index)
                    setIsPaused(true)
                    setTimeout(() => setIsPaused(false), 3000) // Resume auto-rotation after 3 seconds
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  style={{
                    width: activeDevice === index ? '40px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: activeDevice === index ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: activeDevice === index ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                  }}
                  aria-label={device}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Amoria Connekt Only Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: '90px 0', // Standardized vertical padding
        }}>
          <div style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 20px',
          }}>
             {/* Section Header */}
            <div style={{
              maxWidth: '780px',
              margin: '0 auto 80px', // Center align header and add bottom margin
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '50px',
                fontWeight: 1000,
                marginBottom: '24px',
                color: '#000',
                letterSpacing: '-0.02em'
              }}>
                  {t('whyAmoria.title')}
              </h2>
              <p style={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#1f1d1d',
                lineHeight: '1.7',
              }}>
                {t('whyAmoria.subtitle')}
              </p>
            </div>

            {/* Main Content Layout */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '64px' // Increased gap
            }}>
              {/* Left Content */}
              <div style={{
                flex: 1,
                maxWidth: '500px'
              }}>
                {/* Info Cards */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {/* Rated Photographers */}
                  <div
                    onMouseEnter={() => setActiveCard(0)}
                    style={{
                      background: 'linear-gradient(100deg, rgba(194, 194, 194, 1) 0%, rgba(194, 194, 194, 1) 25%, rgba(194, 194, 194, 1) 40%, rgba(194, 194, 194, 1) 55%, rgba(194, 194, 194, 1) 70%, rgba(124, 124, 124, 1) 100%)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: activeCard === 0 ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: activeCard === 0 ? '0 8px 24px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)'
                    }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="#FFD700">
                        <path d="M8 0l2.163 4.382 4.837.703-3.5 3.411.826 4.818L8 11.09l-4.326 2.224.826-4.818-3.5-3.411 4.837-.703L8 0z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#083A85',
                        marginBottom: '8px'
                      }}>
                        {t('whyAmoria.ratedPhotographers.title')}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#000',
                        lineHeight: '1.5'
                      }}>
                        {t('whyAmoria.ratedPhotographers.description')}
                      </p>
                    </div>
                  </div>

                  {/* Live Streaming */}
                  <div
                    onMouseEnter={() => setActiveCard(1)}
                    style={{
                      background: 'linear-gradient(-100deg, rgba(194, 194, 194, 1) 0%, rgba(194, 194, 194, 1) 25%, rgba(194, 194, 194, 1) 40%, rgba(194, 194, 194, 1) 55%, rgba(194, 194, 194, 1) 70%, rgba(124, 124, 124, 1) 100%)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: activeCard === 1 ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: activeCard === 1 ? '0 8px 24px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)'
                    }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" fill="#FF0000"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF0000" opacity="0.3"/>
                        <path d="M16.5 8.5c1.5 1.5 1.5 3.5 1.5 3.5s0 2-1.5 3.5M7.5 8.5C6 10 6 12 6 12s0 2 1.5 3.5" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#083A85',
                        marginBottom: '8px'
                      }}>
                        {t('whyAmoria.liveStreaming.title')}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#000',
                        lineHeight: '1.5'
                      }}>
                        {t('whyAmoria.liveStreaming.description')}
                      </p>
                    </div>
                  </div>

                  {/* Secure Payments */}
                  <div
                    onMouseEnter={() => setActiveCard(2)}
                    style={{
                      background: 'linear-gradient(100deg, rgba(194, 194, 194, 1) 0%, rgba(194, 194, 194, 1) 25%, rgba(194, 194, 194, 1) 40%, rgba(194, 194, 194, 1) 55%, rgba(194, 194, 194, 1) 70%, rgba(124, 124, 124, 1) 100%)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: activeCard === 2 ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: activeCard === 2 ? '0 8px 24px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)'
                    }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#4CAF50"/>
                        <path d="M3 9h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" fill="#2E7D32"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#083A85',
                        marginBottom: '8px'
                      }}>
                        {t('whyAmoria.securePayments.title')}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#000',
                        lineHeight: '1.5'
                      }}>
                        {t('whyAmoria.securePayments.description')}
                      </p>
                    </div>
                  </div>

                  {/* Full Event Gallery */}
                  <div
                    onMouseEnter={() => setActiveCard(3)}
                    style={{
                      background: 'linear-gradient(-100deg, rgba(194, 194, 194, 1) 0%, rgba(194, 194, 194, 1) 25%, rgba(194, 194, 194, 1) 40%, rgba(194, 194, 194, 1) 55%, rgba(194, 194, 194, 1) 70%, rgba(124, 124, 124, 1) 100%)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: activeCard === 3 ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: activeCard === 3 ? '0 8px 24px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)'
                    }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" fill="#2196F3"/>
                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" fill="#03405e"/>
                        <circle cx="2.5" cy="6" r="0.5" fill="#FFF"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#083A85',
                        marginBottom: '8px'
                      }}>
                        {t('whyAmoria.fullEventGallery.title')}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#000',
                        lineHeight: '1.5'
                      }}>
                        {t('whyAmoria.fullEventGallery.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image Container with Transitions */}
              <div style={{
                position: 'relative',
                flex: 1,
                maxWidth: '500px',
                height: '600px'
              }}>
                {/* Background Gradient Container */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '490px',
                  height: '580px',
                  background: 'linear-gradient(0deg,rgba(255, 99, 99, 1) 0%, rgba(180, 110, 180, 1) 9%, rgba(99, 120, 255, 1) 30%, rgba(150, 110, 200, 1) 56%, rgba(255, 99, 99, 1) 75%, rgba(180, 110, 180, 1) 89%, rgba(99, 120, 255, 1) 100%)',
                  borderRadius: '120px 20px 120px 20px',
                  zIndex: 1
                }} />

                {/* Image Transition Container */}
                <div style={{
                  position: 'absolute',
                  top: 16,
                  right: '15px',
                  width: '480px',
                  height: '580px',
                  borderRadius: '120px 20px 120px 20px',
                  overflow: 'hidden',
                  zIndex: 2,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                }}>
                  {/* Rated Image - Card 0 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: activeCard === 0 ? 1 : 0,
                    transition: 'opacity 0.7s ease-out',
                    zIndex: activeCard === 0 ? 2 : 1
                  }}>
                    <img
                      src="/rated.png"
                      alt="Rated Photographers"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Live Streaming Image - Card 1 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: activeCard === 1 ? 1 : 0,
                    transition: 'opacity 0.7s ease-out',
                    zIndex: activeCard === 1 ? 2 : 1
                  }}>
                    <img
                      src="/live.png"
                      alt="Live Streaming"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Secure Payments Image - Card 2 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: activeCard === 2 ? 1 : 0,
                    transition: 'opacity 0.7s ease-out',
                    zIndex: activeCard === 2 ? 2 : 1
                  }}>
                    <img
                      src="/pay.png"
                      alt="Secure Payments"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Full Event Gallery Image - Card 3 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: activeCard === 3 ? 1 : 0,
                    transition: 'opacity 0.7s ease-out',
                    zIndex: activeCard === 3 ? 2 : 1
                  }}>
                    <img
                      src="/gallery.png"
                      alt="Full Event Gallery"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Network Section */}
        <section style={{
          background: 'linear-gradient(135deg, #001a33 0%, #002b4d 50%, #001a33 100%)',
          padding: '130px 0', // Increased vertical padding
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            maxWidth: '1280px', // Slightly wider for this specific section
            margin: '0 auto',
            padding: '0 20px', // Standard horizontal padding
            display: 'flex',
            alignItems: 'center',
            gap: '80px', // Increased gap
            minHeight: '450px'
          }}>
            {/* Left Content */}
            <div style={{
              flex: '0 0 35%', // Increased flex basis to accommodate longer text
              maxWidth: '500px', // Increased from 400px to 500px
              color: '#fff',
              zIndex: 2
            }}>
              {/* Title */}
              <h2 style={{
                fontSize: '50px',
                fontWeight: 1000,
                lineHeight: '1.1',
                marginBottom: '24px',
                color: '#fff',
                letterSpacing: '-0.02em'
              }}>
                {t('globalNetwork.title')}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: '17px',
                lineHeight: '1.65',
                color: '#fff',
                opacity: 0.9,
                fontWeight: 400,
                marginBottom: '32px'
              }}>
                {t('globalNetwork.description')}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
                <button
                  onClick={() => window.location.href = '/user/photographers'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#000000';
                  }}
                  style={{
                    backgroundColor: 'white',
                    color: '#000000',
                    padding: '11.25px 20px',
                    borderRadius: '37.5px',
                    border: '1.5px solid #FFFFFF',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 3px 9px rgba(8, 58, 133, 0.2)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t('globalNetwork.connectNow')}
                </button>
                <button
                  onClick={() => window.location.href = '/user/events'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    padding: '11.25px 20px',
                    borderRadius: '37.5px',
                    border: '1.5px solid #FFFFFF',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 3px 9px rgba(8, 58, 133, 0.2)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t('globalNetwork.findEvents')}
                </button>
                </div>

            </div>
          
            {/* Right Content - for the network visualization */}
            <div style={{
              flex: '1',
              height: '450px',
              position: 'relative'
            }}>
              <GlobalNetwork />
            </div>
          </div>

          {/* Additional ambient glow effects */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '15%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 168, 204, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        </section>
      </main>
      <Footer />
      </div>
      )}
    </>
  );
}