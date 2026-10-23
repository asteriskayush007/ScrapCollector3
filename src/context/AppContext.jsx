import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_PICKUP_REQUESTS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & URL routing
  const [activePage, setActivePage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  // Products & User Listings (Synchronize with INITIAL_PRODUCTS to guarantee fresh local image assets)
  const [products, setProducts] = useState(() => {
    // Clear out stale legacy keys
    try {
      localStorage.removeItem('autolux_products');
      localStorage.removeItem('autolux_products_v2');
      localStorage.removeItem('autolux_products_v3');
    } catch {
      // ignore
    }

    const saved = localStorage.getItem('autolux_products_v5');
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      const initialMap = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));
      const merged = parsed.map((p) => {
        if (initialMap.has(p.id)) {
          const fresh = initialMap.get(p.id);
          initialMap.delete(p.id);
          return { ...p, ...fresh };
        }
        return p;
      });
      return [...merged, ...Array.from(initialMap.values())];
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Scrap Pickup Requests
  const [pickupRequests, setPickupRequests] = useState(() => {
    const saved = localStorage.getItem('autolux_pickups');
    return saved ? JSON.parse(saved) : INITIAL_PICKUP_REQUESTS;
  });

  // Shopping Cart (Always ensure cart item products have fresh image assets)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('autolux_cart_v5');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((item) => {
        const fresh = INITIAL_PRODUCTS.find((p) => p.id === item.product?.id);
        return fresh ? { ...item, product: { ...item.product, ...fresh } } : item;
      });
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('autolux_wishlist');
    return saved ? JSON.parse(saved) : ['prod-01', 'prod-05'];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('autolux_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-98214',
        date: '2026-10-18T14:20:00Z',
        items: [
          { product: INITIAL_PRODUCTS[0], quantity: 1 }
        ],
        total: 68500,
        status: 'Delivered',
        trackingNumber: 'BLUEDART-882190'
      }
    ];
  });

  // User Role Switcher (Customer / Seller / Staff Admin)
  const [userRole, setUserRole] = useState('customer');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Persist states
  useEffect(() => {
    localStorage.setItem('autolux_products_v5', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('autolux_pickups', JSON.stringify(pickupRequests));
  }, [pickupRequests]);

  useEffect(() => {
    localStorage.setItem('autolux_cart_v5', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('autolux_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('autolux_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast notification system
  const addToast = ({ type = 'info', title, message }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper with History API
  const navigate = (page, params = {}) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlPath = `/${page === 'home' ? '' : page}`;
    if (params.id) urlPath += `/${params.id}`;
    if (params.category) urlPath += `?category=${params.category}`;
    window.history.pushState({ page, params }, '', urlPath || '/');
  };

  // Browser popstate listener (back/forward buttons)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
        setPageParams(event.state.params || {});
      } else {
        // Parse from location
        const path = window.location.pathname.replace(/^\//, '');
        if (!path) {
          setActivePage('home');
          setPageParams({});
        } else {
          setActivePage(path.split('/')[0] || 'home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.title.substring(0, 32)}... added.`
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Item Removed',
      message: 'Item was removed from your cart.'
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );
  const cartShipping = cartSubtotal > 50000 || cartSubtotal === 0 ? 0 : 1500;
  const cartTax = Math.round(cartSubtotal * 0.18); // 18% GST standard on automotive parts
  const cartTotal = cartSubtotal + cartShipping;

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: 'Saved item removed.'
        });
        return prev.filter((id) => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist',
          message: 'Item saved for quick access.'
        });
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Listing creation (Seller flow)
  const addProductListing = (newProduct) => {
    const listing = {
      ...newProduct,
      id: `prod-${Date.now().toString().slice(-6)}`,
      rating: 5.0,
      reviewsCount: 0,
      featured: false,
      seller: {
        id: 'user-seller-01',
        name: 'Verified Private Seller',
        rating: 5.0,
        verified: true,
        location: newProduct.location || 'Local Warehouse'
      }
    };
    setProducts((prev) => [listing, ...prev]);
    addToast({
      type: 'success',
      title: 'Listing Published',
      message: 'Your automotive component is now live on Autolux Loop!'
    });
    return listing;
  };

  // Scrap Pickup flow
  const createPickupRequest = (data) => {
    const newId = `ALX-PK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'Submitted',
      valuationEstimate: null,
      quoteNotes: null,
      statusHistory: [
        {
          status: 'Submitted',
          timestamp: new Date().toISOString(),
          note: 'Request received. Autolux technical team assigned for review.'
        }
      ]
    };
    setPickupRequests((prev) => [newRequest, ...prev]);
    addToast({
      type: 'success',
      title: 'Pickup Request Logged',
      message: `Your reference ID is ${newId}. Our team will review within 4 hours.`
    });
    return newRequest;
  };

  // Staff / Company Admin updates
  const updatePickupStatus = (requestId, newStatus, note, quote) => {
    setPickupRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;
        const updated = {
          ...req,
          status: newStatus,
          statusHistory: [
            ...req.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              note: note || `Status progressed to ${newStatus}`
            }
          ]
        };
        if (quote !== undefined && quote !== null) {
          updated.valuationEstimate = quote;
        }
        return updated;
      })
    );
    addToast({
      type: 'info',
      title: 'Status Updated',
      message: `Pickup ${requestId} transitioned to ${newStatus}.`
    });
  };

  // Customer confirmation of quote
  const confirmPickupQuote = (requestId, accepted) => {
    setPickupRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;
        const nextStatus = accepted ? 'Confirmed' : 'Cancelled';
        return {
          ...req,
          status: nextStatus,
          statusHistory: [
            ...req.statusHistory,
            {
              status: nextStatus,
              timestamp: new Date().toISOString(),
              note: accepted
                ? 'Customer accepted scrap valuation. Logistics scheduled.'
                : 'Customer declined valuation quote.'
            }
          ]
        };
      })
    );
    addToast({
      type: accepted ? 'success' : 'info',
      title: accepted ? 'Quote Accepted' : 'Request Cancelled',
      message: accepted
        ? 'Pickup is confirmed. Our logistics flatbed is scheduled.'
        : 'The request has been updated.'
    });
  };

  // Checkout order submission
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal,
      shippingDetails: orderDetails.shipping,
      paymentMethod: orderDetails.paymentMethod,
      status: 'Processing',
      trackingNumber: `ALX-EXP-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        pageParams,
        navigate,
        products,
        addProductListing,
        pickupRequests,
        createPickupRequest,
        updatePickupStatus,
        confirmPickupQuote,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        userRole,
        setUserRole,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
