const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        items: {
            type: Object,
            default: {}
        },
        total: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Add to cart method
UserSchema.methods.addToCart = async function(productId, product) {
    console.log('=== Adding to Cart ===');
    console.log('Current cart:', this.cart);
    console.log('Product to add:', { productId, product });

    // Initialize cart if it doesn't exist
    if (!this.cart) {
        console.log('Initializing new cart');
        this.cart = {
            items: {},
            total: 0,
            count: 0
        };
    }

    // Add or update item in cart
    if (this.cart.items[productId]) {
        console.log('Updating existing item quantity');
        this.cart.items[productId].quantity += 1;
    } else {
        console.log('Adding new item to cart');
        this.cart.items[productId] = {
            quantity: 1,
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category
            }
        };
    }

    // Update cart totals
    this.cart.count = Object.values(this.cart.items)
        .reduce((sum, item) => sum + item.quantity, 0);
    
    this.cart.total = Object.values(this.cart.items)
        .reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

    console.log('Updated cart:', this.cart);

    // Mark cart as modified
    this.markModified('cart');
    
    // Save and return the updated user
    const savedUser = await this.save();
    console.log('Saved user cart:', savedUser.cart);
    return savedUser;
};

// Add removeFromCart method
UserSchema.methods.removeFromCart = async function(productId) {
    try {
        console.log('Starting removeFromCart:', {
            productId,
            cartExists: !!this.cart,
            itemsExist: !!this.cart?.items,
            currentCart: this.cart
        });
        
        // Initialize cart if needed
        if (!this.cart || !this.cart.items) {
            console.log('Initializing empty cart');
            this.cart = { items: {}, total: 0, count: 0 };
            return this;
        }

        // Check if item exists in cart
        if (!this.cart.items[productId]) {
            console.log('Product not found in cart:', productId);
            return this;
        }

        // Store item details before removal
        const itemToRemove = this.cart.items[productId];
        console.log('Removing item:', itemToRemove);

        // Remove the item
        delete this.cart.items[productId];

        // Recalculate totals
        const items = Object.values(this.cart.items);
        this.cart.count = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cart.total = items.reduce((sum, item) => 
            sum + (item.quantity * item.product.price), 0);

        console.log('Updated cart:', {
            itemCount: this.cart.count,
            total: this.cart.total,
            remainingItems: Object.keys(this.cart.items)
        });

        // Mark cart as modified and save
        this.markModified('cart');
        const savedUser = await this.save();
        console.log('Cart saved successfully');
        
        return savedUser;
    } catch (error) {
        console.error('Error in removeFromCart:', {
            error,
            productId,
            cartState: this.cart
        });
        throw error;
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User; 