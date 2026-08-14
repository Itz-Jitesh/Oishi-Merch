import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      default: null,
    },

    
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
    emailVerified: {
      type: Boolean,
      default: false,
    },
    
    image: {
      type: String,
      default: "",
    },
    
    wishlistCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    wishlist: {
      type: [String],
      default: [],
    },
    
    loyaltyPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    addresses: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        phone: {
          type: String,
          required: true,
          trim: true,
        },

        addressLine1: {
          type: String,
          required: true,
          trim: true,
        },

        addressLine2: {
          type: String,
          default: "",
          trim: true,
        },

        city: {
          type: String,
          required: true,
          trim: true,
        },

        state: {
          type: String,
          required: true,
          trim: true,
        },

        postalCode: {
          type: String,
          required: true,
          trim: true,
        },

        country: {
          type: String,
          default: "India",
          trim: true,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    otpPurpose: {
      type: String,
      enum: ["email-verification", "password-reset"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.User;
}

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;