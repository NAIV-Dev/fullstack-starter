import { Layout } from '@/components/Layout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component() {
    return (
      <Layout>
        {/*  */}
      </Layout>
    );
  }
})