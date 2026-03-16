import seller from '../model/sellerSchema.js';

export const registerSeller = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            shopName,
            shopDescription,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            gstNumber,
            panNumber,
            businessType,
            bankAccountNumber,
            bankName,
            bankIFSC,
            accountHolderName
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !password || !shopName) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Validate GST and PAN
        if (!gstNumber || !panNumber) {
            return res.status(400).json({ message: 'GST and PAN numbers are required' });
        }

        // Check if seller already exists
        const existingSeller = await seller.findOne({ $or: [{ email }, { gstNumber }] });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seller with this email or GST already exists' });
        }

        // Create new seller
        const newSeller = new seller({
            firstName,
            lastName,
            email,
            phone,
            password, // In production, this should be hashed
            shopName,
            shopDescription: shopDescription || '',
            addressLine1,
            addressLine2: addressLine2 || '',
            city,
            state,
            postalCode,
            country: country || 'India',
            gstNumber,
            panNumber,
            businessType,
            bankAccountNumber,
            bankName,
            bankIFSC,
            accountHolderName,
            status: 'Pending',
            isVerified: false,
            isActive: true
        });

        await newSeller.save();

        return res.status(200).json({
            message: 'Seller registration successful. Your account is pending verification.',
            sellerId: newSeller._id,
            status: 'Pending'
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSellerById = async(req, res) => {
    try {
        const sellerData = await seller.findById(req.params.id);
        res.status(200).json(sellerData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSellerByEmail = async(req, res) => {
    try {
        const sellerData = await seller.findOne({ email: req.params.email });
        if (!sellerData) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.status(200).json(sellerData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSellerProfile = async(req, res) => {
    try {
        const sellerId = req.params.id;
        const updatedData = {
            ...req.body,
            updatedAt: new Date()
        };

        const updatedSeller = await seller.findByIdAndUpdate(
            sellerId,
            updatedData,
            { new: true }
        );

        if (!updatedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(200).json({
            message: 'Seller profile updated successfully',
            seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllSellers = async(req, res) => {
    try {
        const allSellers = await seller.find({ isActive: true });
        res.status(200).json(allSellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifySellerEmail = async(req, res) => {
    try {
        const sellerId = req.params.id;
        const updatedSeller = await seller.findByIdAndUpdate(
            sellerId,
            { isVerified: true, status: 'Approved' },
            { new: true }
        );

        if (!updatedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(200).json({
            message: 'Seller verified successfully',
            seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const disableSeller = async(req, res) => {
    try {
        const sellerId = req.params.id;
        const updatedSeller = await seller.findByIdAndUpdate(
            sellerId,
            { isActive: false },
            { new: true }
        );

        if (!updatedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(200).json({
            message: 'Seller disabled successfully',
            seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
