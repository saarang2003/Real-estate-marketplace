import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hytronymwaklomonlhkl.supabase.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './'),
        };
        return config;
    },
    experimental: {
        turbo: {
            resolveAlias: {
                '@/*': './*'
            }
        }
    }
};

export default nextConfig;