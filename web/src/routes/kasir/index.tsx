import { AxiosClient } from '@/api-client/AxiosClient';
import { MetodePembayaran } from '@/api-client/model/enum/MetodePembayaran';
import { Layanan } from '@/api-client/model/table/Layanan';
import { Pelanggan } from '@/api-client/model/table/Pelanggan';
import { Transaksi } from '@/api-client/model/table/Transaksi';
import { User } from '@/api-client/model/table/User';
import { TransaksiFulldata } from '@/api-client/schema/TransaksiFulldata';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { IDRFormatter } from '@/utility';
import { addToast, Button, Card, CardBody, CardHeader, Checkbox, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Radio, RadioGroup, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Download, Pencil, Printer } from 'lucide-react'
import { ItemDataKasirTotalHariIni } from '@/api-client/schema/ItemDataKasirTotalHariIni';
import { PrintTransaksiModal } from '@/components/PrintTransaksiModal';

interface LoaderData {
  list_pelanggan: Pelanggan[]
  list_layanan: Layanan[]
  trx: TransaksiFulldata[]
  list_total_hari_ini: ItemDataKasirTotalHariIni[]
}
interface ModalForm {
  trx_id: number
  pelanggan_id: number
  metode_pembayaran: string
  sudah_lunas: boolean
  sudah_diambil: boolean
  nama: string
  trx_number: string
}
const initial_limit = 10;
export const Route = createFileRoute('/kasir/')({
  async loader(): Promise<LoaderData> {
    const res = await AxiosClient.kasirTranasksiHariIni({
      headers: { authorization: UserSession.getToken() },
    });
    const list_pelanggan = (await AxiosClient.kasirGetPelanggan({
      headers: { authorization: UserSession.getToken() },
      query: { limit: Number.MAX_SAFE_INTEGER }
    })).data;
    const list_layanan = (await AxiosClient.kasirGetLayanan({
      headers: { authorization: UserSession.getToken() },
      query: { limit: Number.MAX_SAFE_INTEGER }
    })).data;
    const list_total_hari_ini = await AxiosClient.kasirGetTotalTransaksiHariIni({
      headers: { authorization: UserSession.getToken() },
    })
    return {
      trx: res,
      list_layanan,
      list_pelanggan,
      list_total_hari_ini
    };
  },
  component() {
    const loader_data: LoaderData = Route.useLoaderData();
    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(initial_limit);
    const [data, setData] = useState<TransaksiFulldata[]>(loader_data.trx);
    const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
    const [loading_update_status, setLoadingUpdateStatus] = useState<boolean>(false);
    const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);
    const [open_modal_form, setOpenModalForm] = useState<boolean>(false);
    const [update_status_form, setUpdateStatusForm] = useState<ModalForm>();

    const [open_print_modal, setOpenPrintModal] = useState<boolean>(false);
    const [active_print_transaction, setActivePrintTransaction] = useState<TransaksiFulldata>();

    async function getData() {
      try {
        setLoadingGetData(true);
        setData(await AxiosClient.kasirTranasksiHariIni({
          headers: { authorization: UserSession.getToken() }
        }));
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingGetData(false);
      }
    }

    async function deleteData(item: TransaksiFulldata) {
      try {
        setLoadingDeleteData(true);
        await AxiosClient.kasirDeleteTransaksiByID({
          headers: { authorization: UserSession.getToken() },
          path: { id: item.transaksi.id }
        });
        await getData();
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingDeleteData(false);
      }
    }

    async function updateTransactionStatus() {
      if (!update_status_form) {
        return;
      }
      try {
        setLoadingUpdateStatus(true);
        await AxiosClient.kasirUpdateTransaksiByID({
          headers: { authorization: UserSession.getToken() },
          path: { id: update_status_form.trx_id },
          body: {
            pelanggan_id: update_status_form.pelanggan_id,
            sudah_diambil: update_status_form.sudah_diambil,
            sudah_lunas: update_status_form.sudah_lunas,
            metode_pembayaran: update_status_form.metode_pembayaran,
          }
        });
        await getData();
        setOpenModalForm(false);
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingUpdateStatus(false);
      }
    }

    useEffect(() => {
      getData();
    }, [offset, limit]);

    return (
      <Layout className='flex flex-col gap-4'>

        {/* TITLE */}
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Transaksi Hari Ini
        </div>

        <div 
          className={`
            grid grid-cols-2 gap-3
            md:grid-cols-3
            xl:grid-cols-4
          `}>
          {
            loader_data.list_total_hari_ini.map((total, i: number) => (
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

        {/* ADD BUTTON */}
        <Button 
          className='lg:self-start'
          variant='bordered'
          color='primary'
          href='/kasir/transaksi/add'
          as={Link}>
          + Add Transaksi
        </Button>

        {/* DATA TABLE */}
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nomor</TableColumn>
            <TableColumn>Pelanggan</TableColumn>
            <TableColumn>Item</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Pembayaran</TableColumn>
            <TableColumn>Jumlah</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {
              data.map(transaksi => (
                <TableRow key={transaksi.transaksi.id}>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <div className='font-bold text-sky-500'>
                        { transaksi.transaksi.nomor_transaksi }
                      </div>
                      <div>
                        { moment(transaksi.transaksi.created_at).format('dddd, DD MMMM YYYY HH:mm') }
                      </div>
                      <div className='flex flex-col gap-2'>
                        <Button
                          color='default'
                          variant='bordered'
                          size='sm'
                          onPress={() => {
                            setUpdateStatusForm({
                              trx_id: transaksi.transaksi.id,
                              pelanggan_id: transaksi.transaksi.pelanggan_id!,
                              metode_pembayaran: transaksi.transaksi.metode_pembayaran,
                              sudah_lunas: transaksi.transaksi.sudah_lunas ?? false,
                              sudah_diambil: transaksi.transaksi.sudah_diambil ?? false,
                              nama: transaksi.pelanggan.nama,
                              trx_number: transaksi.transaksi.nomor_transaksi
                            });
                            setOpenModalForm(true);
                          }}>
                          <Pencil size={14} /> Update
                        </Button>
                        <div className='flex items-center gap-2'>
                          <Button
                            color='default'
                            variant='bordered'
                            size='sm'
                            onPress={() => {
                              setActivePrintTransaction(transaksi);
                              setOpenPrintModal(true);
                            }}
                            className='!min-w-0'>
                            <Printer size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <div>
                        { transaksi.pelanggan.nama }
                      </div>
                      <div>
                        { transaksi.pelanggan.nomor_hp }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='min-w-[200px]'>
                    <div className='flex flex-col'>
                      {
                        transaksi.list_item.map(item => {
                          const layanan = loader_data.list_layanan.find(l => l.id == item.layanan_id);
                          return (
                            <div className=''>
                              { Number(item.jumlah) } { layanan?.label_satuan } { layanan?.nama }
                            </div>
                          );
                        })
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      { transaksi.transaksi.sudah_lunas && <div className='text-primary-500'>Sudah Lunas</div> }
                      { !transaksi.transaksi.sudah_lunas && <div className='text-red-500'>Belum Bayar</div> }
                      { transaksi.transaksi.sudah_diambil && <div className='text-primary-500'>Sudah Diambil</div> }
                      { !transaksi.transaksi.sudah_diambil && <div className='text-red-500'>Belum Diambil</div> }
                    </div>
                  </TableCell>
                  <TableCell>
                    { transaksi.transaksi.metode_pembayaran }
                  </TableCell>
                  <TableCell>
                    { IDRFormatter.format(transaksi.transaksi.total_harga) }
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button 
                        color='warning'
                        variant='bordered'
                        size='sm'
                        href={`/kasir/transaksi/${transaksi.transaksi.id}`}
                        as={Link}>
                        Edit
                      </Button>
                      {/* <Button 
                        color='danger'
                        variant='bordered'
                        size='sm'
                        onPress={() => confirm('Delete item?') && deleteData(transaksi)}>
                        Delete
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        { update_status_form && <Modal
          isOpen={open_modal_form}
          onOpenChange={setOpenModalForm}>
          <ModalContent>
            <ModalHeader>
              Ubah Status ({ update_status_form.trx_number } - { update_status_form.nama })
            </ModalHeader>
            <ModalBody className='flex flex-col gap-2'>
              <RadioGroup 
                label="Status Pembayaran"
                value={update_status_form!.sudah_lunas ? 'true' : 'false'}
                onChange={e => setUpdateStatusForm({ ...update_status_form!, sudah_lunas: e.target.value === 'true' })}>
                <Radio color='danger' value="false">Belum Bayar</Radio>
                <Radio color='primary' value="true">Sudah Lunas</Radio>
              </RadioGroup>
              <RadioGroup 
                label="Status Pengambilan"
                value={update_status_form!.sudah_diambil ? 'true' : 'false'}
                onChange={e => setUpdateStatusForm({ ...update_status_form!, sudah_diambil: e.target.value === 'true' })}>
                <Radio color='danger' value="false">Belum Diambil</Radio>
                <Radio color='primary' value="true">Sudah Diambil</Radio>
              </RadioGroup>
              <Select
                selectionMode='single'
                selectedKeys={[String(update_status_form!.metode_pembayaran)]}
                label='Pembayaran'
                labelPlacement='outside'
                placeholder='Pilih Pembayaran'
                onSelectionChange={val => setUpdateStatusForm({ ...update_status_form!, metode_pembayaran: val.currentKey as MetodePembayaran })}
                variant="bordered">
                {Object.keys(MetodePembayaran).map((mp) => (
                  <SelectItem textValue={String(mp)} key={String(mp)}>{mp}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loading_update_status}
                color="primary"
                onPress={updateTransactionStatus}>
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
          { active_print_transaction && <PrintTransaksiModal
            listLayanan={loader_data.list_layanan}
            data={active_print_transaction}
            open={open_print_modal}
            setOpen={setOpenPrintModal}
            onFinish={() => {}} />}
        </Modal> }
      </Layout>
    );
  }
})
