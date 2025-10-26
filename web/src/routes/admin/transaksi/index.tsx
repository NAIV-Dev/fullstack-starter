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
import { addToast, Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Download, Funnel, Pencil, Printer, Search, X } from 'lucide-react'
import _ from 'lodash';

interface LoaderData {
  list_pelanggan: Pelanggan[]
  list_layanan: Layanan[]
  list_kasir: User[]
  trx: {
    total: number
    data: TransaksiFulldata[]
  }
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
export const Route = createFileRoute('/admin/transaksi/')({
  async loader(): Promise<LoaderData> {
    const res = await AxiosClient.adminGetTransaksi({
      headers: { authorization: UserSession.getToken() },
      query: { limit: initial_limit }
    });
    const list_pelanggan = (await AxiosClient.adminGetPelanggan({
      headers: { authorization: UserSession.getToken() },
      query: { limit: Number.MAX_SAFE_INTEGER }
    })).data;
    const list_layanan = (await AxiosClient.adminGetLayanan({
      headers: { authorization: UserSession.getToken() },
      query: { limit: Number.MAX_SAFE_INTEGER }
    })).data;
    const list_kasir = (await AxiosClient.adminGetKasir({
      headers: { authorization: UserSession.getToken() },
      query: { limit: Number.MAX_SAFE_INTEGER }
    })).data;
    return {
      trx: res,
      list_layanan,
      list_pelanggan,
      list_kasir
    };
  },
  component() {
    const loader_data: LoaderData = Route.useLoaderData();
    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(initial_limit);
    const [data, setData] = useState<{total: number; data: TransaksiFulldata[]}>(loader_data.trx);
    const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
    const [loading_update_status, setLoadingUpdateStatus] = useState<boolean>(false);
    const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);
    const [open_modal_form, setOpenModalForm] = useState<boolean>(false);
    const [update_status_form, setUpdateStatusForm] = useState<ModalForm>();
    const [filter_pelanggan_id, setFilterPelangganID] = useState<number>();
    const [filter_tanggal_from, setFilterTanggalFrom] = useState<string>();
    const [filter_tanggal_to, setFilterTanggalTo] = useState<string>();
    const [keyword, setKeyword] = useState<string>();
    const [temp_keyword, setTempKeyword] = useState<string>('');
    const [filter_sudah_lunas, setFilterSudahLunas] = useState<boolean>();
    const [filter_sudah_diambil, setFilterSudahDiambil] = useState<boolean>();
    const [filter_metode_pembayaran_list, setFilterMetodePembayaranList] = useState<MetodePembayaran[]>();

    async function getData() {
      try {
        setLoadingGetData(true);
        setData(await AxiosClient.adminGetTransaksi({
          headers: { authorization: UserSession.getToken() },
          query: {
            limit,
            offset,
            filter_pelanggan_id,
            filter_tanggal_from,
            filter_tanggal_to,
            keyword,
            filter_sudah_diambil,
            filter_sudah_lunas,
            filter_metode_pembayaran_csv: filter_metode_pembayaran_list?.join(',')
          }
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
        await AxiosClient.adminDeleteTransaksiByID({
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
        await AxiosClient.adminUpdateTransaksiByID({
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
    }, [offset, limit, filter_pelanggan_id, filter_tanggal_from, filter_tanggal_to, keyword, filter_sudah_diambil, filter_sudah_lunas, filter_metode_pembayaran_list]);

    return (
      <Layout className='flex flex-col gap-4'>

        {/* TITLE */}
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Transaksi
        </div>

        {/* ADD BUTTON */}
        <Button 
          className='lg:self-start'
          variant='bordered'
          color='primary'
          href='/admin/transaksi/add'
          as={Link}>
          + Add Transaksi
        </Button>

        {/* DATA TABLE */}
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>
              <div className='flex items-center gap-2'>
                <div>
                  Nomor
                </div>
                <Popover placement='bottom'>
                  <PopoverTrigger
                    className='outline-none'>
                    <div className='relative'>
                      <Funnel 
                        className='cursor-pointer'
                        size={12} />
                      { keyword && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' /> }
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='!px-1'>
                    <div className='flex items-center gap-1'>
                      <Input
                        value={temp_keyword}
                        onChange={e => setTempKeyword(e.target.value)}
                        onKeyUp={e => e.key === 'Enter' && setKeyword(temp_keyword)}
                        placeholder='Search' />
                      <Button
                        onPress={() => setKeyword(temp_keyword)}
                        variant='bordered'
                        className='!min-w-0 !p-1 !px-3'>
                        <Search size={20} className='text-sky-500' />
                      </Button>
                    </div>
                    { keyword && <div 
                      onClick={() => {
                        setKeyword(undefined);
                        setTempKeyword('');
                      }}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div> }
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>
              <div className='flex items-center gap-2'>
                <div>
                  Tanggal
                </div>
                <Popover placement='bottom'>
                  <PopoverTrigger
                    className='outline-none'>
                    <div className='relative'>
                      <Funnel 
                        className='cursor-pointer'
                        size={12} />
                      { (filter_tanggal_from && filter_tanggal_to) && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' /> }
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='!px-2 !py-2'>
                    <Input
                      className='min-w-40'
                      type='date'
                      value={filter_tanggal_from || ''}
                      onChange={e => setFilterTanggalFrom(e.target.value)}
                      placeholder='From'
                      label='From'
                      labelPlacement='outside-top' />
                    <Input
                      className='min-w-40'
                      type='date'
                      value={filter_tanggal_to || ''}
                      onChange={e => setFilterTanggalTo(e.target.value)}
                      placeholder='To'
                      label='To'
                      labelPlacement='outside-top' />
                    { (filter_tanggal_from && filter_tanggal_to) && <div 
                      onClick={() => {
                        setFilterTanggalFrom(undefined);
                        setFilterTanggalTo(undefined);
                      }}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div> }
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>
              <div className='flex items-center gap-2'>
                <div>
                  Pelanggan
                </div>
                <Popover placement='bottom'>
                  <PopoverTrigger
                    className='outline-none'>
                    <div className='relative'>
                      <Funnel 
                        className='cursor-pointer'
                        size={12} />
                      { filter_pelanggan_id && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' /> }
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='!px-1'>
                    <Select
                      className="w-40"
                      selectionMode='single'
                      selectedKeys={[String(filter_pelanggan_id)]}
                      aria-label='.'
                      onSelectionChange={val => setFilterPelangganID(+(val.currentKey as any))}
                      placeholder='Pilih Pelanggan'
                      variant="bordered">
                      {loader_data.list_pelanggan.map((p) => (
                        <SelectItem textValue={String(p.nama)} key={String(p.id)}>
                          {p.nama}
                        </SelectItem>
                      ))}
                    </Select>
                    { filter_pelanggan_id && <div 
                      onClick={() => setFilterPelangganID(undefined)}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div> }
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>Item</TableColumn>
            <TableColumn>
              <div className='flex items-center gap-2'>
                <div>
                  Status
                </div>
                <Popover placement='bottom'>
                  <PopoverTrigger
                    className='outline-none'>
                    <div className='relative'>
                      <Funnel 
                        className='cursor-pointer'
                        size={12} />
                      { (typeof filter_sudah_lunas === 'boolean' || typeof filter_sudah_diambil === 'boolean') && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' /> }
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='!px-1'>
                    <div className='flex flex-col gap-1'>
                      <div className='flex gap-1'>
                        <Button
                          size='sm'
                          variant='bordered'
                          onPress={() => setFilterSudahLunas(false)}
                          color={filter_sudah_lunas === false ? 'primary' : 'default'}>
                          Belum Bayar
                        </Button>
                        <Button
                          size='sm'
                          variant='bordered'
                          onPress={() => setFilterSudahLunas(true)}
                          color={filter_sudah_lunas === true ? 'primary' : 'default'}>
                          Sudah Lunas
                        </Button>
                      </div>
                      <div className='flex gap-1'>
                        <Button
                          size='sm'
                          variant='bordered'
                          onPress={() => setFilterSudahDiambil(false)}
                          color={filter_sudah_diambil === false ? 'primary' : 'default'}>
                          Belum Diambil
                        </Button>
                        <Button
                          size='sm'
                          variant='bordered'
                          onPress={() => setFilterSudahDiambil(true)}
                          color={filter_sudah_diambil === true ? 'primary' : 'default'}>
                          Sudah Diambil
                        </Button>
                      </div>
                    </div>
                    { (typeof filter_sudah_lunas === 'boolean' || typeof filter_sudah_diambil === 'boolean') && <div 
                      onClick={() => {
                        setFilterSudahLunas(undefined);
                        setFilterSudahDiambil(undefined);
                      }}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div> }
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>
              <div className='flex items-center gap-2'>
                <div>
                  Pembayaran
                </div>
                <Popover placement='bottom'>
                  <PopoverTrigger
                    className='outline-none'>
                    <div className='relative'>
                      <Funnel 
                        className='cursor-pointer'
                        size={12} />
                      { (filter_metode_pembayaran_list?.length ?? 0) > 0 && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' /> }
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='!px-1'>
                    <Select
                      className="w-40"
                      selectionMode='multiple'
                      selectedKeys={filter_metode_pembayaran_list ?? []}
                      aria-label='.'
                      onSelectionChange={(val: any) => setFilterMetodePembayaranList([...val])}
                      placeholder='Pilih Metode Pembayaran'
                      variant="bordered">
                      {Object.keys(MetodePembayaran).map((mp: string) => (
                        <SelectItem textValue={String(mp)} key={String(mp)}>
                          {mp}
                        </SelectItem>
                      ))}
                    </Select>
                    { (filter_metode_pembayaran_list?.length ?? 0) > 0 && <div 
                      onClick={() => setFilterMetodePembayaranList(undefined)}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div> }
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>Jumlah</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {
              data.data.map(transaksi => (
                <TableRow key={transaksi.transaksi.id}>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <div className='font-bold text-sky-500'>
                        { transaksi.transaksi.nomor_transaksi }
                      </div>
                      <div className='flex items-center gap-2'>
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
                        <Button
                          color='default'
                          variant='bordered'
                          size='sm'
                          className='!min-w-0'>
                          <Printer size={14} />
                        </Button>
                        <Button
                          color='default'
                          variant='bordered'
                          size='sm'
                          className='!min-w-0'>
                          <Download size={14} />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    { moment(transaksi.transaksi.tanggal_transaksi).format('dddd, DD MMMM YYYY HH:mm') }
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
                        href={`/admin/transaksi/${transaksi.transaksi.id}`}
                        as={Link}>
                        Edit
                      </Button>
                      <Button 
                        color='danger'
                        variant='bordered'
                        size='sm'
                        onPress={() => confirm('Delete item?') && deleteData(transaksi)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        {/* PAGINATION & LIMIT */}
        <div className={`
          flex flex-col gap-2
          lg:flex-row lg:justify-between
        `}>
          <Pagination
            initialPage={(offset / limit) + 1}
            total={Math.ceil(data.total / limit)}
            onChange={page => setOffset((page - 1) * limit)} />
          <div className={`
            flex items-center gap-4
            lg:flex-row-reverse
          `}>
            <Select
              className="w-30"
              selectionMode='single'
              selectedKeys={[String(limit)]}
              aria-label='.'
              onSelectionChange={val => setLimit(+(val.currentKey as any))}
              variant="bordered">
              {[10, 20, 50, 100, 200].map((k) => (
                <SelectItem textValue={String(k)} key={String(k)}>{k}</SelectItem>
              ))}
            </Select>
            { (loading_delete_data || loading_get_data) && <Spinner size='sm' />}
          </div>
        </div>
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
        </Modal> }
      </Layout>
    );
  }
})
