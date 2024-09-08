export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://joeliesbeautyhaven.com/sitemap.xml',
  }
}