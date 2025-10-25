import { AxiosClient } from '@/api-client/AxiosClient';
import { AdminDashboardData } from '@/api-client/schema/AdminDashboardData';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { IDRFormatter } from '@/utility';
import { Button, Card, CardBody, CardHeader, Divider, Link } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  async loader() {
    return await AxiosClient.adminDashboard({
      headers: { authorization: UserSession.getToken() }
    });
  },
  component() {
    const data: AdminDashboardData = Route.useLoaderData();
    return (
      <Layout className='flex flex-col gap-8'>
        <div 
          className={`
            grid grid-cols-2 gap-3
            md:grid-cols-3
            xl:grid-cols-4
          `}>
          {
            [
              ['Total Pendapatan', IDRFormatter.format(data.total_pendapatan)],
              ['Total Pengeluaran', IDRFormatter.format(data.total_pengeluaran)],
              ['Total Keuntungan', IDRFormatter.format(data.total_keuntungan)],
              ['Total Kasir', `${data.total_kasir} Kasir`],
              ['Total Layanan', `${data.total_layanan} Layanan`],
              ['Total Transaksi', `${data.total_transaksi} Transaksi`],
              ['Belum Diambil', `${data.total_belum_ambil}`],
              ['Belum Bayar', `${data.total_belum_bayar}`],
            ].map(([label, total], i: number) => (
              <Card
                key={i}
                className="w-full">
                <CardHeader className="flex py-1 text-zinc-500">
                  { label }
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className='text-xl font-bold'>
                    { total }
                  </div>
                </CardBody>
              </Card>
            ))
          }
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            Hari Ini
          </div>
          <div 
            className={`
              grid grid-cols-2 gap-3
              md:grid-cols-3
              xl:grid-cols-4
            `}>
            {
              data.data_hari_ini.map((total, i: number) => (
                <Card
                  key={i}
                  className="w-full">
                  <CardHeader className="flex py-1 text-zinc-500">
                    { total.nama_layanan }
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className='text-xl font-bold'>
                      { total.jumlah } { total.label_satuan }
                    </div>
                  </CardBody>
                </Card>
              ))
            }
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            Menu
          </div>
          <div className='flex gap-4 flex-wrap items-start'>
            <Button 
              href={'/admin/transaksi'}
              as={Link}
              color='primary'
              variant='shadow'>
              Buka Transaksi
            </Button>
            <Button 
              href={'/admin/pengeluaran'}
              as={Link}
              color='primary'
              variant='shadow'>
              Buka Pengeluaran
            </Button>
            <Button 
              href={'/admin/layanan'}
              as={Link}
              color='primary'
              variant='shadow'>
              Buka Layanan
            </Button>
            <Button 
              href={'/admin/pelanggan'}
              as={Link}
              color='primary'
              variant='shadow'>
              Buka Pelanggan
            </Button>
            <Button 
              href={'/admin/kasir'}
              as={Link}
              color='primary'
              variant='shadow'>
              Buka Daftar Kasir
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
})