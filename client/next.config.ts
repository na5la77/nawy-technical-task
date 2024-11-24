const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ibb.co'
            }
        ]
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/listings',
                permanent: false // Use false for temporary redirects (e.g., during development)
            }
        ];
    }
};

export default nextConfig;
