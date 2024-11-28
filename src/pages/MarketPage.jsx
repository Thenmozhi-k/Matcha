import React from 'react'
import Market from '../components/Market';
import PlaceOrder from '../components/placeorder/PlaceOrder';

const MarketPage = () => {
    const [currentPage, setCurrentPage] = useState('market'); 

    // Handles navigation between pages
    const handleNavigation = (nextPage) => {
      setCurrentPage(nextPage);
    };
  return (
    <div>
        {currentPage === 'market' && (
        <Market onNavigate={() => handleNavigation('placeorder')} />
      )}
      {currentPage === 'placeorder' && (
        <PlaceOrder 
          onNavigate={() => handleNavigation('steptwo')}
          onBack={() => handleNavigation('market')}
        />
      )}
    </div>
  )
}

export default MarketPage