export default function sitemap() {
  return [
    {
      url: 'https://jolie-beauty.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://jolie-beauty.com/authentication/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://jolie-beauty.com/authentication/signin',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://jolie-beauty.com/dashboard',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://jolie-beauty.com/management',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://jolie-beauty.com/properties',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://jolie-beauty.com/sales',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://jolie-beauty.com/settings',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://jolie-beauty.com/transaction',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: 'https://jolie-beauty.com/not-found',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.8,
    },
  ]
}