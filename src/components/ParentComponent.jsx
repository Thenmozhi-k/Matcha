import React, { useState } from 'react';
import TokenList from './TokenList'; // Path to TokenList component
import BuySection from './BuySection'; // Path to BuySection component

const ParentComponent = () => {
    const [selectedToken, setSelectedToken] = useState(null); // State to store selected token

    return (
        <div>
            {/* Pass setSelectedToken to TokenList to update the selected token */}
            <TokenList setSelectedToken={setSelectedToken} />

            {/* Pass the selectedToken to BuySection to display the selected token */}
            <BuySection selectedToken={selectedToken} />
        </div>
    );
};

export default ParentComponent;
