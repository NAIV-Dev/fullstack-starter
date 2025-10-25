import { AxiosClient } from '@/api-client/AxiosClient';
import { Layanan } from '@/api-client/model/table/Layanan';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { IDRFormatter } from '@/utility';
import { addToast, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

interface LoaderData {
  total: number
  data: Layanan[]
}
interface ModalForm {
  nama: string
  label_satuan?: string
  harga_satuan: number
  deskripsi?: string
  is_active?: boolean
}
const initial_limit = 10;
export const Route = createFileRoute('/admin/layanan')({
  async loader() {
    const res = await AxiosClient.adminGetLayanan({
      headers: { authorization: UserSession.getToken() },
      query: { limit: initial_limit }
    });
    return res;
  },
  component() {
    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(initial_limit);
    const [data, setData] = useState<LoaderData>(Route.useLoaderData());
    const [open_modal_form, setOpenModalForm] = useState<boolean>(false);
    const [selected_item, setSelectedItem] = useState<Layanan>();
    const [modal_form, setModalForm] = useState<ModalForm>({
      nama: '',
      label_satuan: '',
      harga_satuan: '' as any,
      deskripsi: '',
      is_active: true,
    });
    const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
    const [loading_submit_data, setLoadingSubmitData] = useState<boolean>(false);
    const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);

    async function getData() {
      try {
        setLoadingGetData(true);
        setData(await AxiosClient.adminGetLayanan({
          headers: { authorization: UserSession.getToken() },
          query: { limit, offset }
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
          await AxiosClient.adminUpdateLayananByID({
            headers: { authorization: UserSession.getToken() },
            path: { id: selected_item.id },
            body: modal_form
          });
        } else {
          await AxiosClient.adminCreateLayanan({
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

    async function deleteData(item: Layanan) {
      try {
        setLoadingDeleteData(true);
        await AxiosClient.adminDeleteLayananByID({
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
    }, [offset, limit]);

    return (
      <Layout className='flex flex-col gap-4'>

        {/* TITLE */}
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Layanan
        </div>

        {/* ADD BUTTON */}
        <Button 
          className='lg:self-start'
          variant='bordered'
          color='primary'
          onPress={() => {
            setSelectedItem(undefined);
            setModalForm({
              nama: '',
              label_satuan: '',
              harga_satuan: '' as any,
              deskripsi: '',
              is_active: true,
            });
            setOpenModalForm(true);
          }}>
          + Add Layanan
        </Button>

        {/* DATA TABLE */}
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Layanan</TableColumn>
            <TableColumn>Harga per satuan</TableColumn>
            <TableColumn>Deskripsi</TableColumn>
            <TableColumn>Aktif</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {
              data.data.map(layanan => (
                <TableRow key={layanan.id}>
                  <TableCell>{ layanan.nama }</TableCell>
                  <TableCell>{ IDRFormatter.format(layanan.harga_satuan) } / { layanan.label_satuan }</TableCell>
                  <TableCell>{ layanan.deskripsi }</TableCell>
                  <TableCell>{ layanan.is_active ? 'Active' : 'Inactive' }</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button 
                        color='warning'
                        variant='bordered'
                        size='sm'
                        onPress={() => {
                          setSelectedItem(layanan);
                          setModalForm({
                            nama: layanan.nama,
                            label_satuan: layanan.label_satuan ?? '',
                            harga_satuan: layanan.harga_satuan,
                            deskripsi: layanan.deskripsi,
                            is_active: layanan.is_active,
                          });
                          setOpenModalForm(true);
                        }}>
                        Edit
                      </Button>
                      <Button 
                        color='danger'
                        variant='bordered'
                        size='sm'
                        onPress={() => confirm('Delete item?') && deleteData(layanan)}>
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
        
        {/* FORM MODAL */}
        <Modal
          isOpen={open_modal_form}
          onOpenChange={setOpenModalForm}>
          <ModalContent>
            <ModalHeader>
              { selected_item ? 'Update Data' : 'Add New Data' }
            </ModalHeader>
            <ModalBody className='flex flex-col gap-2'>
              <Input
                value={modal_form.nama}
                onChange={e => setModalForm({ ...modal_form, nama: e.target.value })}
                placeholder='Nama'
                label='Nama'
                labelPlacement='outside-top' />
              <Input
                value={modal_form.label_satuan}
                onChange={e => setModalForm({ ...modal_form, label_satuan: e.target.value })}
                placeholder='Label Satuan'
                label='Label Satuan'
                labelPlacement='outside-top' />
              <Input
                type='number'
                value={String(modal_form.harga_satuan)}
                startContent={'Rp '}
                onChange={e => setModalForm({ ...modal_form, harga_satuan: e.target.valueAsNumber })}
                placeholder='Harga Satuan'
                label='Harga Satuan'
                labelPlacement='outside-top' />
              <Textarea
                value={modal_form.deskripsi}
                onChange={e => setModalForm({ ...modal_form, deskripsi: e.target.value })}
                placeholder='Deskripsi'
                label='Deskripsi'
                labelPlacement='outside-top' />
              <div className='flex items-center gap-0 mt-2'>
                <Checkbox
                  isSelected={modal_form.is_active}
                  onValueChange={value => setModalForm({ ...modal_form, is_active: value })} />
                <div>
                  Active?
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loading_submit_data}
                color="primary"
                onPress={submitData}>
                { selected_item ? 'Update' : 'Add' }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    );
  }
})
