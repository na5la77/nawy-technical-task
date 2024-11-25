const nextConfig = {
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    typescript:{
        ignoreBuildErrors:true
    },
    reactStrictMode: false,
    images: {
        domains: ['i.ibb.co','iili.io'],
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/listings',
                permanent: true // Use false for temporary redirects (e.g., during development)
            }
        ];
    }
};

export default nextConfig;
