export const productImages = {
    // iPhone images
    'iPhone 15 Pro': 'https://www.apple.com/v/iphone-15-pro/a/images/overview/design/design_titanium_static__gdhkdv866byy_large.jpg',
    
    // MacBook images
    'MacBook Pro M2': 'https://www.apple.com/v/macbook-pro-14-and-16/e/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg',
    'MacBook Air M2': 'https://www.apple.com/v/macbook-air-m2/b/images/overview/hero/hero_mba_m2__ejbs627dj7ee_large.jpg',
    
    // iPad images
    'iPad Pro M2': 'https://www.apple.com/v/ipad-pro/al/images/overview/hero/hero__x0qecjh1kxuy_large.jpg',
    'iPad Air': 'https://www.apple.com/v/ipad-air/r/images/overview/hero/hero__x0qecjh1kxuy_large.jpg'
};

export const getFallbackImage = (category, productName = '') => {
    switch (category) {
        case 'Laptops':
            return 'https://www.apple.com/v/macbook-pro-14-and-16/e/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg';
        case 'Phones':
            return 'https://www.apple.com/v/iphone-15-pro/a/images/overview/design/design_titanium_static__gdhkdv866byy_large.jpg';
        case 'Tablets':
            return 'https://www.apple.com/v/ipad-pro/al/images/overview/hero/hero__x0qecjh1kxuy_large.jpg';
        default:
            return `https://placehold.co/800x800?text=${encodeURIComponent(productName || 'Product')}`;
    }
}; 