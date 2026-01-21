

const config = {
    siteUrl: 'https://wondrr.in',
    generateRobotsTxt: true,
    robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/verify/*','/auth/'] }
    ]
  },
}


export default config 