import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    // Shop Information
    shopName: {
        type: String,
        required: true
    },
    shopDescription: {
        type: String
    },

    // Address Information
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: 'India'
    },

    // Business Information
    gstNumber: {
        type: String,
        required: true,
        unique: true
    },
    panNumber: {
        type: String,
        required: true,
        unique: true
    },
    businessType: {
        type: String,
        enum: ['Sole Proprietor', 'Partnership', 'Company', 'Individual'],
        required: true
    },

    // Bank Details
    bankAccountNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    bankIFSC: {
        type: String,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },

    // Status
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const seller = mongoose.model('seller', sellerSchema);
export default seller;
