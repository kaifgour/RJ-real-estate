import './globals.css'
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: 'Buy & Sell Property in Jogeshwari, Goregaon & Andheri | Rajasthan Estate',
  description: 'Looking to buy, sell or rent property in Jogeshwari, Goregaon or Andheri? Rajasthan Estate helps you find verified flats & new projects at the best price.',
   icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}