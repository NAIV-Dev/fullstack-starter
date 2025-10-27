import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useSystemConfig } from '@/hooks/useSystemConfig'

export const Route = createRootRoute({
  component: () => {
    const { system_name } = useSystemConfig();
    return (
      <>
        <head>
          <title>
            { system_name }
          </title>
        </head>
        <HeadContent />
        <Outlet />
        {/* <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
      </>
    )
  },
})
