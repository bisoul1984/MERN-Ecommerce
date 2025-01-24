router.get('/:id', async (req, res) => {
    try {
        console.log(`GET /api/products/${req.params.id} - Fetching single product`);
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log(`Product not found with id: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log('Product found:', product);
        res.json(product);
    } catch (error) {
        console.error(`Error fetching product ${req.params.id}:`, error);
        res.status(400).json({ message: error.message });
    }
});

// Create product
router.post('/', async (req, res) => {
    try {
        console.log('POST /api/products - Creating new product');
        console.log('Request body:', req.body);
        const product = await Product.create(req.body);
        console.log('Product created:', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update product
router.patch('/:id', async (req, res) => {
    try {
        console.log(`PATCH /api/products/${req.params.id} - Updating product`);
        console.log('Update data:', req.body);
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            console.log(`Product not found with id: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log('Product updated:', product);
        res.json(product);
    } catch (error) {
        console.error(`Error updating product ${req.params.id}:`, error);
        res.status(400).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        console.log(`DELETE /api/products/${req.params.id} - Deleting product`);
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            console.log(`Product not found with id: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log('Product deleted successfully');
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(`Error deleting product ${req.params.id}:`, error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 
