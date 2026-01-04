import mongoose, { Schema, Document, Model } from 'mongoose';

export enum SocialMediaPlatform {
    FACEBOOK = 'Facebook',
    INSTAGRAM = 'Instagram',
    LINKEDIN = 'LinkedIn',
    YOUTUBE = 'YouTube',
    WEBSITE = 'Website',
}

export enum HostType {
    INDIVIDUAL = 'Individual',
    ORGANIZATION = 'Organization',
}

export interface ISocialMedia {
    platform: SocialMediaPlatform;
    url: string;
}

export interface IHostProfile {
    userId: mongoose.Types.ObjectId;
    type: HostType;
    avatar : string
    panCardNumber?: string;
    GSTNumber?: string;
    businessCertificate?: string;
    socialMedias?: ISocialMedia[];
    countryCode : string
    contactNumber : string
    isVerified: boolean;
}

export interface IHostProfileDocument extends IHostProfile, Document {
    createdAt: Date;
    updatedAt: Date;
}

const socialMediaSchema = new Schema<ISocialMedia>({
    platform: {
        type: String,
        enum: Object.values(SocialMediaPlatform),
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v: string): boolean {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'URL must be a valid HTTP/HTTPS link'
        }
    },
});

const hostProfileSchema = new Schema<IHostProfileDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(HostType),
        required: true,
    },
    avatar: {
        type: String,
    },
    panCardNumber: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    GSTNumber: {
        type: String,
        trim: true,
        maxlength: 50,
    },
    businessCertificate: {
        type: String,
        trim: true,
    },
    socialMedias: [{
        type: socialMediaSchema,
        default: [],
    }],
    countryCode: {
        type: String,
        required: true,
        default: '+91'
    },
    contactNumber: {
        type: String,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true
    });

export const HostProfile: Model<IHostProfileDocument> = mongoose.model<IHostProfileDocument>('HostProfile', hostProfileSchema);
