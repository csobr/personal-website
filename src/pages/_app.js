import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
                page_path: url,
            })
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    return <Component {...pageProps} />
}
