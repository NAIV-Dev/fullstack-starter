import { AxiosClient } from '@/api-client/AxiosClient';
import { Pengeluaran } from '@/api-client/model/table/Pengeluaran';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { IDRFormatter } from '@/utility';
import { addToast, Autocomplete, AutocompleteItem, Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import moment from 'moment';
import { JenisPengeluaran } from '@/api-client/model/table/JenisPengeluaran';
import { Funnel, X } from 'lucide-react';

interface LoaderData {
  list_jenis_pengeluaran: JenisPengeluaran[]
  exp: {
    total: number
    data: Pengeluaran[]
  }
}
interface ModalForm {
  tanggal: string
  jumlah: number
  deskripsi: string
  id_jenis_pengeluaran: number
}
const initial_limit = 10;
export const Route = createFileRoute('/admin/pengeluaran')({
  async loader(): Promise<LoaderData> {
    const exp = await AxiosClient.adminGetPengeluaran({
      headers: { authorization: UserSession.getToken() },
      query: { limit: initial_limit }
    });
    const list_jenis_pengeluaran = (await AxiosClient.adminGetJenisPengeluaran({
      headers: { authorization: UserSession.getToken() },
      query: { limit: Number.MAX_SAFE_INTEGER }
    })).data;
    return {
      exp,
      list_jenis_pengeluaran
    };
  },
  component() {
    const loader_data: LoaderData = Route.useLoaderData();
    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(initial_limit);
    const [data, setData] = useState<{ total: number; data: Pengeluaran[] }>(loader_data.exp);
    const [open_modal_form, setOpenModalForm] = useState<boolean>(false);
    const [selected_item, setSelectedItem] = useState<Pengeluaran>();
    const [modal_form, setModalForm] = useState<ModalForm>({
      tanggal: moment().format('YYYY-MM-DD'),
      jumlah: '' as any,
      deskripsi: '',
      id_jenis_pengeluaran: '' as any
    });
    const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
    const [loading_submit_data, setLoadingSubmitData] = useState<boolean>(false);
    const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);
    const [filter_jenis_pengeluaran_id_list, setFilterJenisPengeluaranIDList] = useState<number[]>();
    const [filter_tanggal_from, setFilterTanggalFrom] = useState<string>();
    const [filter_tanggal_to, setFilterTanggalTo] = useState<string>();

    const total_amount_exp = data.data.reduce((acc: number, exp: Pengeluaran) => +acc + +exp.jumlah, 0);

    async function getData() {
      try {
        setLoadingGetData(true);
        setData(await AxiosClient.adminGetPengeluaran({
          headers: { authorization: UserSession.getToken() },
          query: {
            limit,
            offset,
            filter_jenis_pengeluaran_id_csv: filter_jenis_pengeluaran_id_list?.join(','),
            filter_tanggal_from,
            filter_tanggal_to
          }
        }));
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingGetData(false);
      }
    }

    async function submitData() {
      try {
        setLoadingSubmitData(true);
        if (selected_item) {
          await AxiosClient.adminUpdatePengeluaranByID({
            headers: { authorization: UserSession.getToken() },
            path: { id: selected_item.id },
            body: modal_form
          });
        } else {
          await AxiosClient.adminCreatePengeluaran({
            headers: { authorization: UserSession.getToken() },
            body: modal_form
          });
        }
        await getData();
        setOpenModalForm(false);
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingSubmitData(false);
      }
    }

    async function deleteData(item: Pengeluaran) {
      try {
        setLoadingDeleteData(true);
        await AxiosClient.adminDeletePengeluaranByID({
          headers: { authorization: UserSession.getToken() },
          path: { id: item.id }
        });
        await getData();
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingDeleteData(false);
      }
    }

    useEffect(() => {
      getData();
    }, [offset, limit, filter_tanggal_from, filter_tanggal_to, filter_jenis_pengeluaran_id_list]);

    return (
      <Layout className='flex flex-col gap-4'>

        {/* TITLE */}
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Pengeluaran
        </div>

        {/* ADD BUTTON */}
        <div className='flex items-center justify-between'>
          <Button
            className='lg:self-start'
            variant='bordered'
            color='primary'
            onPress={() => {
              setSelectedItem(undefined);
              setModalForm({
                tanggal: '',
                jumlah: '' as any,
                deskripsi: '',
                id_jenis_pengeluaran: '' as any
              });
              setOpenModalForm(true);
            }}>
            + Add Pengeluaran
          </Button>
          <Button
            href={'/admin/jenis-pengeluaran'}
            variant='light'
            color='primary'
            as={Link}>
            Kelola Jenis Pengeluaran
          </Button>
        </div>

        {/* DATA TABLE */}
        <Table aria-label="Example static collection table">
          <TableHeader>
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
                        size={17} />
                      {(filter_tanggal_from && filter_tanggal_to) && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' />}
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
                    {(filter_tanggal_from && filter_tanggal_to) && <div
                      onClick={() => {
                        setFilterTanggalFrom(undefined);
                        setFilterTanggalTo(undefined);
                      }}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div>}
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>
              <div className='flex items-center gap-2'>
                <div>
                  Jenis
                </div>
                <Popover placement='bottom'>
                  <PopoverTrigger
                    className='outline-none'>
                    <div className='relative'>
                      <Funnel
                        className='cursor-pointer'
                        size={17} />
                      {(filter_jenis_pengeluaran_id_list?.length ?? 0) > 0 && <div className='w-1 h-1 rounded-full bg-red-500 absolute top-[-2px] right-[-4px]' />}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='!px-1'>
                    <Select
                      className="w-40"
                      selectionMode='multiple'
                      selectedKeys={filter_jenis_pengeluaran_id_list ?? []}
                      aria-label='.'
                      onSelectionChange={(val: any) => setFilterJenisPengeluaranIDList([...val])}
                      placeholder='Pilih Jenis Pengeluaran'
                      variant="bordered">
                      {loader_data.list_jenis_pengeluaran.map((jp: JenisPengeluaran) => (
                        <SelectItem textValue={jp.label} key={String(jp.id)}>
                          {jp.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {(filter_jenis_pengeluaran_id_list?.length ?? 0) > 0 && <div
                      onClick={() => setFilterJenisPengeluaranIDList(undefined)}
                      className='flex items-center gap-[2px] self-start text-red-400 hover:text-red-600 cursor-pointer'>
                      <X size={14} className='mt-px' />
                      <div>
                        Clear
                      </div>
                    </div>}
                  </PopoverContent>
                </Popover>
              </div>
            </TableColumn>
            <TableColumn>Jumlah</TableColumn>
            <TableColumn>Deskripsi</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {
              data.data.map(pengeluaran => (
                <TableRow key={pengeluaran.id}>
                  <TableCell>{moment(pengeluaran.tanggal).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{loader_data.list_jenis_pengeluaran.find(jp => jp.id == pengeluaran.id_jenis_pengeluaran)?.label}</TableCell>
                  <TableCell>{IDRFormatter.format(pengeluaran.jumlah)}</TableCell>
                  <TableCell>{pengeluaran.deskripsi}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button
                        color='warning'
                        variant='bordered'
                        size='sm'
                        onPress={() => {
                          setSelectedItem(pengeluaran);
                          setModalForm({
                            tanggal: moment(pengeluaran.tanggal).format('YYYY-MM-DD'),
                            jumlah: pengeluaran.jumlah,
                            deskripsi: pengeluaran.deskripsi,
                            id_jenis_pengeluaran: pengeluaran.id_jenis_pengeluaran as any
                          });
                          setOpenModalForm(true);
                        }}>
                        Edit
                      </Button>
                      <Button
                        color='danger'
                        variant='bordered'
                        size='sm'
                        onPress={() => confirm('Delete item?') && deleteData(pengeluaran)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) as any
            }
            <TableRow className='bg-zinc-100'>
              <TableCell>Menampilkan {data.data.length} pengeluaran</TableCell>
              <TableCell>{''}</TableCell>
              <TableCell className='font-bold'>{ IDRFormatter.format(total_amount_exp) }</TableCell>
              <TableCell>{''}</TableCell>
              <TableCell>{''}</TableCell>
            </TableRow>
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
            {(loading_delete_data || loading_get_data) && <Spinner size='sm' />}
          </div>
        </div>

        {/* FORM MODAL */}
        <Modal
          isOpen={open_modal_form}
          onOpenChange={setOpenModalForm}>
          <ModalContent>
            <ModalHeader>
              {selected_item ? 'Update Data' : 'Add New Data'}
            </ModalHeader>
            <ModalBody className='flex flex-col gap-2'>
              <Autocomplete
                selectedKey={String(modal_form.id_jenis_pengeluaran)}
                placeholder='Pilih Jenis'
                onSelectionChange={(val: any) => setModalForm({ ...modal_form, id_jenis_pengeluaran: val })}
                variant="bordered">
                {loader_data.list_jenis_pengeluaran.map((jp) => (
                  <AutocompleteItem textValue={jp.label} key={String(jp.id)}>
                    {jp.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                type='date'
                value={modal_form.tanggal}
                onChange={e => setModalForm({ ...modal_form, tanggal: e.target.value })}
                placeholder='Tanggal'
                label='Tanggal'
                labelPlacement='outside-top' />
              <Input
                type='number'
                value={String(modal_form.jumlah)}
                startContent={'Rp '}
                onChange={e => setModalForm({ ...modal_form, jumlah: e.target.valueAsNumber })}
                placeholder='Jumlah'
                label='Jumlah'
                labelPlacement='outside-top' />
              <Textarea
                value={modal_form.deskripsi}
                onChange={e => setModalForm({ ...modal_form, deskripsi: e.target.value })}
                placeholder='Deskripsi'
                label='Deskripsi'
                labelPlacement='outside-top' />
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loading_submit_data}
                color="primary"
                onPress={submitData}>
                {selected_item ? 'Update' : 'Add'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    );
  }
})
