export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://sihamhadi.com/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  )
}