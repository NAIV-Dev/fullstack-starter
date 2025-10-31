import { AxiosClient } from '@/api-client/AxiosClient';
import { MetodePembayaran } from '@/api-client/model/enum/MetodePembayaran';
import { Layanan } from '@/api-client/model/table/Layanan';
import { Pelanggan } from '@/api-client/model/table/Pelanggan';
import { Transaksi } from '@/api-client/model/table/Transaksi';
import { User } from '@/api-client/model/table/User';
import { InputPopup } from '@/components/InputPopup';
import { Layout } from '@/components/Layout';
import { globalPrintReceipt } from '@/components/PrintTransaksiModal';
import { TrxItemBreakdown } from '@/components/TrxItemBreakdown';
import { UserSession } from '@/user-session';
import { IDRFormatter } from '@/utility';
import { addToast, Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Select, SelectItem, Textarea } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import moment from 'moment';
import { useEffect, useState } from 'react';

interface LoaderData {
  initial_modal_form?: ModalForm & { id: number }
  list_pelanggan: Pelanggan[]
  list_layanan: Layanan[]
  list_kasir: User[]
}
interface ModalForm {
  pengguna_id: number
  pelanggan_id?: number
  pelanggan_baru?: {
    nama?: string
    nomor_hp?: string
    alamat?: string
  }
  tanggal_transaksi: string
  metode_pembayaran: string
  sudah_lunas?: boolean
  sudah_diambil?: boolean
  total_harga: number
  catatan?: string
  items: {
    layanan_id: number
    jumlah: number
  }[]
}
const initial_limit = 10;
export const Route = createFileRoute('/admin/transaksi/$id')({
  async loader(context): Promise<LoaderData> {
    let initial_modal_form: (ModalForm & { id: number }) | undefined;
    if (/\d+/.test(context.params.id)) {
      const trx = await AxiosClient.adminGetTransaksiByID({
        headers: { authorization: UserSession.getToken() },
        path: { id: +context.params.id }
      });
      initial_modal_form = {
        id: trx.transaksi.id,
        pengguna_id: trx.transaksi.pengguna_id,
        pelanggan_id: trx.transaksi.pelanggan_id as any,
        tanggal_transaksi: moment(trx.transaksi.tanggal_transaksi).format('YYYY-MM-DD'),
        metode_pembayaran: trx.transaksi.metode_pembayaran,
        sudah_diambil: trx.transaksi.sudah_diambil,
        sudah_lunas: trx.transaksi.sudah_lunas,
        total_harga: trx.transaksi.total_harga,
        catatan: trx.transaksi.catatan,
        items: trx.list_item.map(item => ({
          layanan_id: item.layanan_id,
          jumlah: +(item.jumlah as any)
        }))
      };
    }
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
      list_layanan,
      list_pelanggan,
      list_kasir,
      initial_modal_form
    };
  },
  component() {
    const loader_data: LoaderData = Route.useLoaderData();
    const edit_mode = Boolean(loader_data.initial_modal_form);
    const [payload, setPayload] = useState<ModalForm>(loader_data.initial_modal_form ?? {
      pengguna_id: '' as any,
      pelanggan_id: '' as any,
      tanggal_transaksi: moment().format('YYYY-MM-DD'),
      metode_pembayaran: '',
      total_harga: '' as any,
      catatan: '',
      items: []
    });
    const [loading, setLoading] = useState<boolean>(false);
    const new_customer_mode = Boolean(payload.pelanggan_baru);

    const total_item_amount = payload.items.reduce((acc: number, curr) => {
      const harga_layanan = loader_data.list_layanan.find(l => l.id == curr.layanan_id)?.harga_satuan || 0;
      return acc + +harga_layanan * +(curr.jumlah || 0);
    }, 0);

    async function submit() {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        let created_transaksi: Transaksi;
        if (loader_data.initial_modal_form) {
          created_transaksi = await AxiosClient.adminUpdateTransaksiByID({
            headers: { authorization: UserSession.getToken() },
            path: { id: loader_data.initial_modal_form.id },
            body: {
              ...payload,
              total_harga: total_item_amount
            }
          });
        } else {
          created_transaksi = await AxiosClient.adminCreateTransaksi({
            headers: { authorization: UserSession.getToken() },
            body: {
              ...payload,
              total_harga: total_item_amount
            }
          });
        }

        const trx_fulldata = await AxiosClient.kasirGetTransaksiByID({
          headers: { authorization: UserSession.getToken() },
          path: { id: created_transaksi.id }
        });

        await new Promise(async (resolve) => {
          setTimeout(async () => {
            try {
              globalPrintReceipt(trx_fulldata, loader_data.list_layanan);
              resolve(null);
            } catch { }
            window.location.replace('/admin/transaksi');
          }, 500);
        });
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoading(false);
      }
    }

    function addItem() {
      setPayload({
        ...payload,
        items: [
          ...payload.items,
          { layanan_id: '' as any, jumlah: '' as any }
        ]
      });
    }

    function updateItem(i: number, layanan_id: number, jumlah: number) {
      setPayload({
        ...payload,
        items: [
          ...payload.items.slice(0, i),
          { layanan_id, jumlah },
          ...payload.items.slice(i + 1),
        ]
      });
    }

    function deleteItem(i: number) {
      setPayload({
        ...payload,
        items: [
          ...payload.items.slice(0, i),
          ...payload.items.slice(i + 1),
        ]
      });
    }

    useEffect(() => {
      const Android = (window as any).Android;
      if (Android && !Android.isBluetoothPermissionGranted()) {
        Android.askBluetoothPermission();
      }
    }, []);
    
    return (
      <Layout className='flex flex-col gap-4'>

        {/* TITLE */}
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          { edit_mode ? 'Ubah' : 'Tambah' } Transaksi
        </div>
        <div className='flex flex-col gap-4'>
          <div className={`
            flex flex-col gap-4
            lg:flex-row lg:gap-8
          `}>
            <div className='flex-1 flex flex-col gap-2'>
              <Input
                type='date'
                value={payload.tanggal_transaksi}
                onChange={e => setPayload({ ...payload, tanggal_transaksi: e.target.value })}
                placeholder='Tanggal'
                label='Tanggal'
                labelPlacement='outside-top' />
              <Select
                selectionMode='single'
                selectedKeys={[String(payload.pengguna_id)]}
                label='Kasir'
                labelPlacement='outside'
                placeholder='Pilih Kasir'
                onSelectionChange={val => setPayload({ ...payload, pengguna_id: +(val.currentKey as any) })}
                variant="bordered">
                {loader_data.list_kasir.map((k) => (
                  <SelectItem textValue={`${k.nama} (${k.username})`} key={String(k.id)}>
                      {k.nama} ({k.username})
                  </SelectItem>
                ))}
              </Select>
              <div className='flex flex-col gap-2 shadow-[0px_1px_20px_1px_rgba(0,0,0,.1)] p-4 rounded-2xl mt-2'>
                <div className='flex gap-2'>
                  <Button
                    variant='bordered'
                    color={new_customer_mode ? 'default' : 'primary'}
                    onPress={() => setPayload({
                      ...payload,
                      pelanggan_baru: undefined
                    })}
                    className='flex-1'>
                    Cari Pelanggan
                  </Button>
                  <Button
                    variant='bordered'
                    color={new_customer_mode ? 'primary' : 'default'}
                    onPress={() => setPayload({
                      ...payload,
                      pelanggan_baru: {}
                    })}
                    className='flex-1'>
                    Pelanggan Baru
                  </Button>
                </div>
                { new_customer_mode && <div className='flex flex-col gap-2'>
                  <div className={`
                    flex flex-col gap-2
                    lg:flex-row lg:gap-3
                  `}>
                    <Input
                      value={payload.pelanggan_baru?.nama}
                      onChange={e => setPayload({
                        ...payload,
                        pelanggan_baru: {
                          ...payload.pelanggan_baru,
                          nama: e.target.value
                        }
                      })}
                      placeholder='Nama'
                      label='Nama'
                      labelPlacement='outside-top' />
                    <Input
                      value={payload.pelanggan_baru?.nomor_hp}
                      onChange={e => setPayload({
                        ...payload,
                        pelanggan_baru: {
                          ...payload.pelanggan_baru,
                          nomor_hp: e.target.value
                        }
                      })}
                      placeholder='Nomor HP'
                      label='Nomor HP'
                      labelPlacement='outside-top' />
                  </div>
                  <Textarea
                    value={payload.pelanggan_baru?.alamat}
                    onChange={e => setPayload({
                      ...payload,
                      pelanggan_baru: {
                        ...payload.pelanggan_baru,
                        alamat: e.target.value
                      }
                    })}
                    placeholder='Alamat'
                    label='Alamat'
                    labelPlacement='outside-top' />
                </div> }
                { !new_customer_mode && <Autocomplete
                  selectedKey={String(payload.pelanggan_id || '')}
                  label='Pelanggan'
                  labelPlacement='outside'
                  placeholder='Pilih Pelanggan'
                  onSelectionChange={val => setPayload({ ...payload, pelanggan_id: +(val as any) })}
                  variant="bordered">
                  {loader_data.list_pelanggan.map((p) => (
                    <AutocompleteItem textValue={`${p.nama} (${p.nomor_hp})`} key={String(p.id)}>
                      {p.nama} ({p.nomor_hp})
                    </AutocompleteItem>
                  ))}
                </Autocomplete> }
              </div>
              <Select
                selectionMode='single'
                selectedKeys={[String(payload.metode_pembayaran)]}
                label='Pembayaran'
                labelPlacement='outside'
                placeholder='Pilih Pembayaran'
                onSelectionChange={val => setPayload({ ...payload, metode_pembayaran: val.currentKey as MetodePembayaran })}
                variant="bordered">
                {Object.keys(MetodePembayaran).map((mp) => (
                  <SelectItem textValue={String(mp)} key={String(mp)}>{mp}</SelectItem>
                ))}
              </Select>
              <RadioGroup 
                label="Status Pembayaran"
                value={payload.sudah_lunas ? 'true' : 'false'}
                onChange={e => setPayload({ ...payload, sudah_lunas: e.target.value === 'true' })}>
                <Radio color='danger' value="false">Belum Bayar</Radio>
                <Radio color='primary' value="true">Sudah Lunas</Radio>
              </RadioGroup>
              <RadioGroup 
                label="Status Pengambilan"
                value={payload.sudah_diambil ? 'true' : 'false'}
                onChange={e => setPayload({ ...payload, sudah_diambil: e.target.value === 'true' })}>
                <Radio color='danger' value="false">Belum Diambil</Radio>
                <Radio color='primary' value="true">Sudah Diambil</Radio>
              </RadioGroup>
              <Textarea
                value={payload.catatan}
                onChange={e => setPayload({ ...payload, catatan: e.target.value })}
                placeholder='Catatan'
                label='Catatan'
                labelPlacement='outside-top' />
            </div>
            <div className='flex-[1.5] flex flex-col gap-2'>
              <div className='font-bold text-xl'>
                Daftar Item
              </div>
              <div className='flex flex-col gap-4'>
                {
                  payload.items.map((item, i: number) => (
                    <div 
                      key={i}
                      className={`
                        flex flex-col gap-2
                        lg:flex-row
                      `}>
                      {/* <Autocomplete
                        className='flex-[1.25]'
                        selectedKey={String(item.layanan_id)}
                        placeholder='Pilih Layanan'
                        onSelectionChange={(val: any) => updateItem(i, val, item.jumlah)}
                        variant="bordered">
                        {loader_data.list_layanan.map((l) => (
                          <AutocompleteItem textValue={`${l.nama} (${IDRFormatter.format(l.harga_satuan)}/${l.label_satuan})`} key={String(l.id)}>
                            {l.nama} ({IDRFormatter.format(l.harga_satuan)}/{l.label_satuan})
                          </AutocompleteItem>
                        ))}
                      </Autocomplete> */}
                      <InputPopup
                        items={loader_data.list_layanan.map(l => ({
                          label: `${l.nama} (${IDRFormatter.format(l.harga_satuan)}/${l.label_satuan})`,
                          key: l.id
                        }))}
                        selected={item.layanan_id}
                        onSelectedChange={layanan_id => updateItem(i, layanan_id, item.jumlah)}
                        className='flex-[1.25]'
                        placeholder='Pilih Layanan' />
                      <div className='flex-1 flex gap-2'>
                        <Input
                          type='number'
                          className='flex-1'
                          value={String(item.jumlah)}
                          onChange={e => updateItem(i, item.layanan_id, e.target.valueAsNumber)}
                          placeholder='Jumlah'
                          endContent={item.layanan_id ? loader_data.list_layanan.find(l => l.id == item.layanan_id)?.label_satuan : ''} />
                        <Button
                          onPress={() => deleteItem(i)}
                          variant='bordered'
                          color='danger'>
                          Hapus
                        </Button>
                      </div>
                      <div className='w-full h-px bg-zinc-100 mt-2 lg:hidden' />
                    </div>
                  ))
                }
              </div>
              <Button
                onPress={addItem}
                variant='flat'
                className='self-start'
                color='primary'>
                + Tambah Item
              </Button>
              <div className='mt-2 bg-amber-100 p-4 px-6 rounded-lg'>
                <TrxItemBreakdown
                  data={payload.items.map(item => {
                    const l = loader_data.list_layanan.find(l => l.id == item.layanan_id);
                    return {
                      name: l?.nama ?? '',
                      qty: item.jumlah,
                      price: l?.harga_satuan ?? 0
                    };
                  })} />
                <div className='bg-amber-500 w-full min-h-px my-2' />
                <div>
                  Total
                </div>
                <div className='font-bold'>
                  { IDRFormatter.format(total_item_amount) }
                </div>
              </div>
            </div>
          </div>
          <Button 
            color='primary'
            variant='shadow'
            isLoading={loading}
            onPress={submit}
            className={`
              lg:self-start
            `}>
            { edit_mode ? 'Simpan' : 'Tambah Transaksi' }
          </Button>
        </div>
      </Layout>
    );
  }
})
