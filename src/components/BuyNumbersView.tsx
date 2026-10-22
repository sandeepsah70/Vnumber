import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { VirtualNumber } from '../lib/supabase';

interface BuyNumbersViewProps {
  numbers: VirtualNumber[];
  onSelectNumber: (num: VirtualNumber) => void;
  selectedCountryFilter?: 'India' | 'United States';
}

export const BuyNumbersView: React.FC<BuyNumbersViewProps> = ({
  numbers,
  onSelectNumber,
  selectedCountryFilter = 'India',
}) => {
  const [countryTab, setCountryTab] = useState<'India' | 'United States'>(
    selectedCountryFilter
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNumbers = numbers.filter((item) => {
    const matchesCountry = item.country === countryTab;
    const matchesQuery = item.phone_number.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCountry && matchesQuery;
  });

  return (
    <div className="buy-numbers-view animate-fade-in">
      {/* Top Banner / Heading */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dash-title">Select Your Number</h1>
          <p className="dash-subtitle">
            Instantly provision high-reputation virtual numbers with dedicated SMS & voice routing.
          </p>
        </div>
        <div className="live-pool-tag">
          <span className="live-ping-dot"></span>
          <span>15 Numbers Ready</span>
        </div>
      </div>

      {/* Top 2 Category Cards matching the Desktop Dashboard Screenshot */}
      <div className="dashboard-category-cards-grid">
        {/* Indian Number Card */}
        <div
          className={`dash-cat-card ${countryTab === 'India' ? 'active-border' : ''}`}
          onClick={() => setCountryTab('India')}
        >
          <div className="cat-card-body">
            <div className="cat-card-left">
              <span className="cat-flag">🇮🇳</span>
              <div>
                <h3 className="cat-title">Indian Number</h3>
                <div className="cat-price">
                  <span className="cat-price-val">₹150</span>
                  <span className="cat-price-term">/ Number</span>
                </div>
              </div>
            </div>
            <button
              className="btn-dash-buy-now"
              onClick={(e) => {
                e.stopPropagation();
                setCountryTab('India');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* US Number Card */}
        <div
          className={`dash-cat-card ${countryTab === 'United States' ? 'active-border' : ''}`}
          onClick={() => setCountryTab('United States')}
        >
          <div className="cat-card-body">
            <div className="cat-card-left">
              <span className="cat-flag">🇺🇸</span>
              <div>
                <h3 className="cat-title">US Number</h3>
                <div className="cat-price">
                  <span className="cat-price-val">₹250</span>
                  <span className="cat-price-term">/ Number</span>
                </div>
              </div>
            </div>
            <button
              className="btn-dash-buy-now"
              onClick={(e) => {
                e.stopPropagation();
                setCountryTab('United States');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Available Numbers Section */}
      <div className="available-numbers-section-box">
        <div className="available-section-header">
          <h2 className="available-heading">Available Numbers</h2>

          {/* Filter Tabs and Search Bar */}
          <div className="filter-and-search-row">
            <div className="country-filter-tabs">
              <button
                className={`tab-btn ${countryTab === 'India' ? 'active' : ''}`}
                onClick={() => setCountryTab('India')}
              >
                Indian Numbers
              </button>
              <button
                className={`tab-btn ${countryTab === 'United States' ? 'active' : ''}`}
                onClick={() => setCountryTab('United States')}
              >
                US Numbers
              </button>
            </div>

            <div className="search-input-wrap">
              <Search size={16} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search digits (e.g. 98765)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid of Number Cards matching the exact layout */}
        {filteredNumbers.length === 0 ? (
          <div className="no-matches-box">
            <p>No numbers matched your search "{searchQuery}".</p>
            <button className="btn-reset-filter" onClick={() => { setSearchQuery(''); setCountryTab('India'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="dashboard-numbers-grid">
            {filteredNumbers.map((num) => (
              <div key={num.id} className="dash-number-cell-card">
                <div className="cell-num-info">
                  <span className="cell-flag">{num.flag}</span>
                  <div className="cell-text">
                    <span className="cell-phone-digits">{num.phone_number}</span>
                    <span className="cell-sub-country">{num.country}</span>
                  </div>
                </div>

                <div className="cell-right-action">
                  <span className="cell-price-pill">
                    {num.currency}{num.price}
                  </span>
                  <button
                    className="btn-cell-select"
                    onClick={() => onSelectNumber(num)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
