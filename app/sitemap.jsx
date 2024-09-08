export default function sitemap() {
  return [
    {
      url: 'https://joeliesbeautyhaven.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://joeliesbeautyhaven.com/authentication/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://joeliesbeautyhaven.com/authentication/signin',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://joeliesbeautyhaven.com/dashboard',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://joeliesbeautyhaven.com/management',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://joeliesbeautyhaven.com/properties',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://joeliesbeautyhaven.com/sales',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://joeliesbeautyhaven.com/settings',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://joeliesbeautyhaven.com/transaction',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://joeliesbeautyhaven.com/not-found',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.8,
    },
  ]
}