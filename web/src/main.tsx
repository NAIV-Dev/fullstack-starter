import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './styles.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {HeroUIProvider, ToastProvider} from "@heroui/react";

import reportWebVitals from './reportWebVitals.ts'
import { AxiosClient } from './api-client/AxiosClient.ts'

AxiosClient.BaseURL.instance.set(import.meta.env.VITE_BASE_URL ?? `${window.location.origin}/api`);

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <HeroUIProvider>
      <ToastProvider />
      <RouterProvider router={router} />
    </HeroUIProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
