const fetchQuoteData = async (searchParams) => {
    try {
      const res = await fetch(
        `https://api.0x.org/swap/permit2/quote?${searchParams}`,
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
      console.log("Quote API URL:", `https://api.0x.org/swap/permit2/quote?${searchParams}`);
      console.log("Quote Data:", data);
  
      return data;
    } catch (err) {
      console.error("Error fetching quote data:", err);
      throw err; // Rethrow the error for further handling
    }
  };
  