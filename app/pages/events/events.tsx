'use client';

import React, { useState } from 'react';
import AmoriaKNavbar from '../../components/navbar';
import { useTranslations } from 'next-intl';

const Events: React.FC = () => {
  const t = useTranslations('events');
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mock events data
  const eventsData = [
    {
      id: 1,
      title: 'APR BBC Vs Espoir BCC',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80',
      category: 'Sports',
      date: '2025-08-15',
      time: '08:00 AM - 11:50 PM',
      location: 'BK Arena - KN 4 Ave, Kigali',
      status: 'UPCOMING',
      price: '15,000 RWF',
      attendees: 450
    },
    {
      id: 2,
      title: 'Joseph & Solange Wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
      category: 'Wedding',
      date: '2025-07-20',
      time: '10:00 AM - 06:00 PM',
      location: 'Kigali Serena Hotel - KN 3 Ave, Kigali',
      status: 'LIVE',
      price: '50,000 RWF',
      attendees: 200
    },
    {
      id: 3,
      title: '2021 Graduation Ceremony',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80',
      category: 'Academic',
      date: '2025-09-10',
      time: '09:00 AM - 02:00 PM',
      location: 'University of Rwanda - KK 737 St, Kigali',
      status: 'UPCOMING',
      price: 'Free',
      attendees: 1500
    },
    {
      id: 4,
      title: 'Zuba Sisterhood',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80',
      category: 'Gathering',
      date: '2025-08-05',
      time: '03:00 PM - 07:00 PM',
      location: 'Inema Arts Center - KG 518 St, Kigali',
      status: 'LIVE',
      price: '10,000 RWF',
      attendees: 80
    },
    {
      id: 5,
      title: 'The Toxxyk Experience',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&q=80',
      category: 'Concert',
      date: '2025-07-20',
      time: '08:00 AM - 11:50 PM',
      location: 'Heza Beach Resort - RBV 187 Ave, Gisenyi',
      status: 'UPCOMING',
      price: '25,000 RWF',
      attendees: 500
    },
    {
      id: 6,
      title: 'New Jersey Fashion Week',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80',
      category: 'Fashion',
      date: '2025-10-15',
      time: '06:00 PM - 11:00 PM',
      location: 'Kigali Convention Centre - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: '30,000 RWF',
      attendees: 350
    },
    {
      id: 7,
      title: 'Rebecca Holy Service',
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=500&q=80',
      category: 'Religious',
      date: '2025-07-25',
      time: '10:00 AM - 01:00 PM',
      location: 'Christian Life Assembly - KG 7 Ave, Kigali',
      status: 'UPCOMING',
      price: 'Free',
      attendees: 800
    },
    {
      id: 8,
      title: 'Kwita Izina - Gorilla Naming',
      image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=500&q=80',
      category: 'Cultural',
      date: '2025-09-05',
      time: '08:00 AM - 05:00 PM',
      location: 'Volcanoes National Park, Musanze',
      status: 'UPCOMING',
      price: '100,000 RWF',
      attendees: 250
    },
    {
      id: 9,
      title: 'Pervision Experience',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
      category: 'Corporate',
      date: '2025-11-20',
      time: '02:00 PM - 06:00 PM',
      location: 'Radisson Blu Hotel - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: '40,000 RWF',
      attendees: 150
    },
    {
      id: 10,
      title: 'Iwacu Music Festival',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80',
      category: 'Concert',
      date: '2025-12-10',
      time: '05:00 PM - 11:30 PM',
      location: 'Amahoro Stadium - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: '20,000 RWF',
      attendees: 2000
    },
    {
      id: 11,
      title: 'Tech Startup Summit',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80',
      category: 'Conference',
      date: '2025-08-30',
      time: '09:00 AM - 05:00 PM',
      location: 'Norrsken House - KG 17 Ave, Kigali',
      status: 'LIVE',
      price: '35,000 RWF',
      attendees: 300
    },
    {
      id: 12,
      title: 'Rwanda Film Festival',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
      category: 'Entertainment',
      date: '2025-07-18',
      time: '06:00 PM - 10:00 PM',
      location: 'Century Cinema - UTC, Kigali',
      status: 'LIVE',
      price: '12,000 RWF',
      attendees: 180
    },
    {
      id: 13,
      title: 'Jazz & Wine Evening',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&q=80',
      category: 'Concert',
      date: '2025-08-22',
      time: '07:00 PM - 11:00 PM',
      location: 'Heaven Restaurant - KN 6 Ave, Kigali',
      status: 'UPCOMING',
      price: '25,000 RWF',
      attendees: 120
    },
    {
      id: 14,
      title: 'Startup Pitch Competition',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80',
      category: 'Conference',
      date: '2025-09-15',
      time: '10:00 AM - 05:00 PM',
      location: 'Impact Hub - KG 9 Ave, Kigali',
      status: 'LIVE',
      price: '20,000 RWF',
      attendees: 200
    },
    {
      id: 15,
      title: 'Annual Charity Gala',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80',
      category: 'Corporate',
      date: '2025-10-05',
      time: '06:00 PM - 11:00 PM',
      location: 'Kigali Marriott Hotel - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: '75,000 RWF',
      attendees: 300
    },
    {
      id: 16,
      title: 'Traditional Dance Festival',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=500&q=80',
      category: 'Cultural',
      date: '2025-08-18',
      time: '03:00 PM - 08:00 PM',
      location: 'Kigali Cultural Village - KG 14 Ave, Kigali',
      status: 'LIVE',
      price: '8,000 RWF',
      attendees: 400
    },
    {
      id: 17,
      title: 'E-Commerce Summit 2025',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=80',
      category: 'Conference',
      date: '2025-11-08',
      time: '08:00 AM - 06:00 PM',
      location: 'Radisson Blu Hotel - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: '45,000 RWF',
      attendees: 250
    },
    {
      id: 18,
      title: 'Photography Exhibition',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80',
      category: 'Entertainment',
      date: '2025-09-20',
      time: '10:00 AM - 08:00 PM',
      location: 'Ivuka Arts Center - KG 563 St, Kigali',
      status: 'UPCOMING',
      price: '5,000 RWF',
      attendees: 150
    },
    {
      id: 19,
      title: 'Youth Leadership Forum',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80',
      category: 'Conference',
      date: '2025-10-12',
      time: '09:00 AM - 04:00 PM',
      location: 'Kigali Convention Centre - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: 'Free',
      attendees: 500
    },
    {
      id: 20,
      title: 'International Food Fair',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80',
      category: 'Entertainment',
      date: '2025-08-28',
      time: '12:00 PM - 09:00 PM',
      location: 'Kigali Heights - KN 4 Ave, Kigali',
      status: 'UPCOMING',
      price: '15,000 RWF',
      attendees: 600
    },
    {
      id: 21,
      title: 'Marathon for Peace',
      image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=500&q=80',
      category: 'Sports',
      date: '2025-09-25',
      time: '06:00 AM - 12:00 PM',
      location: 'Kigali City Centre - KN 3 Ave, Kigali',
      status: 'LIVE',
      price: '10,000 RWF',
      attendees: 1000
    },
    {
      id: 22,
      title: 'Classical Music Night',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&q=80',
      category: 'Concert',
      date: '2025-11-15',
      time: '07:30 PM - 10:30 PM',
      location: 'Kigali Serena Hotel - KN 3 Ave, Kigali',
      status: 'UPCOMING',
      price: '30,000 RWF',
      attendees: 180
    },
    {
      id: 23,
      title: 'Digital Marketing Bootcamp',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80',
      category: 'Conference',
      date: '2025-10-20',
      time: '09:00 AM - 05:00 PM',
      location: 'Norrsken House - KG 17 Ave, Kigali',
      status: 'LIVE',
      price: '50,000 RWF',
      attendees: 100
    },
    {
      id: 24,
      title: 'Comedy & Brunch Special',
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=500&q=80',
      category: 'Entertainment',
      date: '2025-08-10',
      time: '11:00 AM - 03:00 PM',
      location: 'The Hut - KG 623 St, Kigali',
      status: 'UPCOMING',
      price: '18,000 RWF',
      attendees: 90
    }
  ];

  // Trending Events Data - Filter only LIVE events
  const trendingEvents = eventsData.filter(event => event.status === 'LIVE').map(event => ({
    id: event.id,
    name: event.title,
    image: event.image
  }));

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  // Pagination logic
  const totalPages = Math.ceil(eventsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = eventsData.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)' }}>
      <style>{`
        .event-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        /* Live Now Badge Animation with Sound Wave Effect */
        @keyframes sound-wave-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7),
                        0 0 0 0 rgba(16, 185, 129, 0.7),
                        0 0 10px rgba(16, 185, 129, 0.5);
          }
          40% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0),
                        0 0 0 16px rgba(16, 185, 129, 0),
                        0 0 15px rgba(16, 185, 129, 0.7);
          }
          80% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0),
                        0 0 0 16px rgba(16, 185, 129, 0),
                        0 0 10px rgba(16, 185, 129, 0.5);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0),
                        0 0 0 0 rgba(16, 185, 129, 0),
                        0 0 10px rgba(16, 185, 129, 0.5);
          }
        }

        @keyframes border-beep {
          0%, 100% {
            border-color: #039130;
            transform: scale(1);
          }
          50% {
            border-color: #34d399;
            transform: scale(1.02);
          }
        }

        @keyframes icon-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }

        .live-badge {
          position: relative;
          animation: sound-wave-pulse 0.9s ease-out infinite, border-beep 0.9s ease-in-out infinite;
        }

        .live-badge-icon {
          animation: icon-pulse 1s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <AmoriaKNavbar />

      {/* Hero Section with Search and Filters */}
      <div style={{
        position: 'relative',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        overflow: 'hidden',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '0rem'
      }}>
        {/* Background Image with Blur Overlay */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://i.pinimg.com/736x/1b/97/8d/1b978dbaab62a500d6915617c0cc43bb.jpg"
            alt="Events Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'linear-gradient(135deg, #ec4899 0%, #f97316 50%, #8b5cf6 100%)',
            backdropFilter: 'blur(20px)'
          }}></div>
        </div>

        <div style={{
          position: 'relative',
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem',
            fontFamily: "'Pragati Narrow', sans-serif"
          }}>
            {t('title')}
          </h1>
          <p style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '1.5rem',
            maxWidth: '42rem',
            margin: '0 auto 1.5rem',
            fontFamily: "'Pragati Narrow', sans-serif"
          }}>
            {t('subtitle')}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ maxWidth: '43rem', margin: '0 auto 1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 3rem 0.8rem 1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: '#d4d4d4',
                  color: '#000000'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '1.25rem'
                }}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Filters Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            maxWidth: '70rem',
            margin: '0 auto'
          }}>
            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.275rem 1rem',
                  borderRadius: '0.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#111827',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <option value="all">{t('allCategories')}</option>
                <option value="wedding">{t('categories.weddings')}</option>
                <option value="concert">{t('categories.concerts')}</option>
                <option value="corporate">{t('categories.corporate')}</option>
                <option value="sports">{t('categories.sports')}</option>
                <option value="cultural">{t('categories.cultural')}</option>
                <option value="conference">{t('categories.conferences')}</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.275rem 1rem',
                  borderRadius: '0.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#111827',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <option value="all">{t('allLocations')}</option>
                <option value="kigali">Kigali</option>
                <option value="musanze">Musanze</option>
                <option value="huye">Huye</option>
                <option value="rubavu">Rubavu</option>
                <option value="nyanza">Nyanza</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.275rem 1rem',
                  borderRadius: '0.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#111827',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <option value="all">{t('allDates')}</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="next-month">Next Month</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.275rem 1rem',
                  borderRadius: '0.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#111827',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <option value="all">{t('allStatuses')}</option>
                <option value="upcoming">{t('status.upcoming')}</option>
                <option value="live">{t('liveNow')}</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Live Trends Section */}
      <div style={{
        maxWidth: '1280px',
        margin: '2rem auto 0',
        padding: '0 1rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
          overflowX: 'hidden',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          position: 'relative'
        }}>
          {/* Connector Line - Full Width (attached to badge) */}
          <div style={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '50%',
            height: '3px',
            background: 'linear-gradient(90deg, #ec4899 0%, #f97316 50%, #8b5cf6 100%)',
            transform: 'translateY(-50%)',
            zIndex: 0
          }}></div>

          {/* Hot Live Trends Badge */}
          <div style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #f97316 50%, #8b5cf6 100%)',
            padding: '0.75rem 1.5rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: 'white',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
            flexShrink: 0,
            marginRight: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}>
            {t('hotLiveTrends')}
          </div>

          {/* Trending Events Circles */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            position: 'relative',
            zIndex: 1,
            gap: '0.5rem',
            paddingRight: '1.5rem'
          }}>
            {trendingEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => window.location.href = `/user/events/view-event?id=${event.id}`}
                style={{
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #cf5704',
                  boxShadow: '0 4px 10px rgba(249, 115, 22, 0.4)',
                  backgroundColor: 'white'
                }}>
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow" style={{ marginTop: '1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem 4rem 1rem' }}>
          {/* Event Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '28px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '4px solid #000000',
                    padding: '3px',
                    position: 'relative',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  {/* Event Image */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '320px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    marginBottom: '1rem'
                  }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Event Details */}
                  <div style={{ padding: '0 0.5rem 0.5rem' }}>
                    {/* Event Title */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.6rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#111827',
                        lineHeight: '1.2',
                        margin: 0,
                        textAlign: 'center'
                      }}>
                        {event.title}
                      </h3>
                    </div>

                    {/* Status Badge - LIVE NOW or UPCOMING */}
                    {event.status === 'LIVE' ? (
                      <div
                        className="live-badge"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          background: 'transparent',
                          border: '2px solid #039130',
                          color: '#039130',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <i className="bi bi-camera-video-fill live-badge-icon" style={{ fontSize: '0.9rem' }}></i>
                        {t('status.live')}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          background: 'transparent',
                          border: '2px solid #3b82f6',
                          color: '#3b82f6',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <i className="bi bi-broadcast" style={{ fontSize: '0.9rem' }}></i>
                        {t('status.upcoming')}
                      </div>
                    )}

                    {/* Location */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      color: '#374151',
                      fontSize: '0.9rem',
                      marginBottom: '0.4rem',
                      fontWeight: '500'
                    }}>
                      <i className="bi bi-geo-alt-fill" style={{ fontSize: '0.85rem', color: '#3b82f6' }}></i>
                      <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{event.location}</span>
                    </div>

                    {/* Time */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      color: '#374151',
                      fontSize: '0.9rem',
                      marginBottom: '0.75rem',
                      fontWeight: '500'
                    }}>
                      <i className="bi bi-clock-fill" style={{ fontSize: '0.85rem', color: '#3b82f6' }}></i>
                      <span>{event.time}</span>
                    </div>

                    {/* Stream Now Button */}
                    <button
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        background: event.status === 'LIVE' ? '#039130' : '#083A85',
                        border: `2.5px solid ${event.status === 'LIVE' ? '#059669' : '#083A85'}`,
                        color: '#FFFFFF',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.5px'
                      }}
                      onClick={() => window.location.href = `/user/events/view-event?id=${event.id}`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        <path d="M12 6v6l4 2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                        <path d="M8 8c1-1 2-1 2-1M16 8c-1-1-2-1-2-1M8 16c1 1 2 1 2 1M16 16c-1 1-2 1-2 1" strokeLinecap="round" />
                      </svg>
                      {event.status === 'LIVE' ? t('joinEvent').toUpperCase() : t('viewDetails').toUpperCase()}
                    </button>
                  </div>
                </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '3rem',
              flexWrap: 'wrap'
            }}>
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #bab8b8',
                  backgroundColor: currentPage === 1 ? '#f3f4f6' : '#ffffff',
                  color: currentPage === 1 ? '#9ca3af' : '#111827',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#083A85';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#bab8b8';
                  }
                }}
              >
                <i className="bi bi-chevron-left"></i>
                Previous
              </button>

              {/* Page Numbers */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      border: currentPage === pageNum ? '2px solid #083A85' : '1px solid #bab8b8',
                      backgroundColor: currentPage === pageNum ? '#083A85' : '#ffffff',
                      color: currentPage === pageNum ? '#ffffff' : '#111827',
                      cursor: 'pointer',
                      fontWeight: currentPage === pageNum ? '600' : '500',
                      fontSize: '0.9rem',
                      minWidth: '2.5rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== pageNum) {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#083A85';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== pageNum) {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.borderColor = '#bab8b8';
                      }
                    }}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #bab8b8',
                  backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#ffffff',
                  color: currentPage === totalPages ? '#9ca3af' : '#111827',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#083A85';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#bab8b8';
                  }
                }}
              >
                Next
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Events;
