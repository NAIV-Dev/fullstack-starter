import { AxiosClient } from '@/api-client/AxiosClient';
import { JenisPengeluaran } from '@/api-client/model/table/JenisPengeluaran';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { IDRFormatter } from '@/utility';
import { addToast, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

interface LoaderData {
  total: number
  data: JenisPengeluaran[]
}
interface ModalForm {
  label: string
  deskripsi?: string
}
const initial_limit = 10;
export const Route = createFileRoute('/admin/jenis-pengeluaran')({
  async loader() {
    const res = await AxiosClient.adminGetJenisPengeluaran({
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
    const [selected_item, setSelectedItem] = useState<JenisPengeluaran>();
    const [modal_form, setModalForm] = useState<ModalForm>({
      label: '',
      deskripsi: '',
    });
    const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
    const [loading_submit_data, setLoadingSubmitData] = useState<boolean>(false);
    const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);

    async function getData() {
      try {
        setLoadingGetData(true);
        setData(await AxiosClient.adminGetJenisPengeluaran({
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
          await AxiosClient.adminUpdateJenisPengeluaranByID({
            headers: { authorization: UserSession.getToken() },
            path: { id: selected_item.id },
            body: modal_form
          });
        } else {
          await AxiosClient.adminCreateJenisPengeluaran({
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

    async function deleteData(item: JenisPengeluaran) {
      try {
        setLoadingDeleteData(true);
        await AxiosClient.adminDeleteJenisPengeluaranByID({
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
          Jenis Pengeluaran
        </div>

        {/* ADD BUTTON */}
        <Button 
          className='lg:self-start'
          variant='bordered'
          color='primary'
          onPress={() => {
            setSelectedItem(undefined);
            setModalForm({
              label: '',
              deskripsi: '',
            });
            setOpenModalForm(true);
          }}>
          + Add Jenis Pengeluaran
        </Button>

        {/* DATA TABLE */}
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>JenisPengeluaran</TableColumn>
            <TableColumn>Deskripsi</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {
              data.data.map(jenis_pengeluaran => (
                <TableRow key={jenis_pengeluaran.id}>
                  <TableCell>{ jenis_pengeluaran.label }</TableCell>
                  <TableCell>{ jenis_pengeluaran.deskripsi }</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button 
                        color='warning'
                        variant='bordered'
                        size='sm'
                        onPress={() => {
                          setSelectedItem(jenis_pengeluaran);
                          setModalForm({
                            label: jenis_pengeluaran.label,
                            deskripsi: jenis_pengeluaran.deskripsi,
                          });
                          setOpenModalForm(true);
                        }}>
                        Edit
                      </Button>
                      <Button 
                        color='danger'
                        variant='bordered'
                        size='sm'
                        onPress={() => confirm('Delete item?') && deleteData(jenis_pengeluaran)}>
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
                value={modal_form.label}
                onChange={e => setModalForm({ ...modal_form, label: e.target.value })}
                placeholder='Nama'
                label='Nama'
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
                { selected_item ? 'Update' : 'Add' }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    );
  }
})
