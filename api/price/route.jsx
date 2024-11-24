const fetchPriceData = async (searchParams) => {
    try {
      const res = await fetch(
        `https://api.0x.org/swap/permit2/price?${searchParams}`,
        {
          headers: {
            "0x-api-key": process.env.NEXT_PUBLIC_ZEROEX_API_KEY,
            "0x-version": "v2",
          },
        }
      );
  
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("Price API URL:", `https://api.0x.org/swap/permit2/price?${searchParams}`);
      console.log("Price Data:", data);
  
      return data;
    } catch (err) {
      console.error("Error fetching price data:", err);
      throw err;
    }
  };
  