module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			'i.pinimg.com',
			'asset-cdn.campaignbrief.com',
			'mir-s3-cdn-cf.behance.net',
			'p1.pxfuel.com',
			'd1ralsognjng37.cloudfront.net',
			'res.cloudinary.com',
		],
	},
	env: {
		GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
	},
};
