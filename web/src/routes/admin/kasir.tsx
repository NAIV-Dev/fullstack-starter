import { AxiosClient } from '@/api-client/AxiosClient';
import { User } from '@/api-client/model/table/User';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { addToast, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

interface LoaderData {
  total: number
  data: User[]
}
interface ModalForm {
  username: string
  password: string
  nama: string
  is_active?: boolean
}
const limit = 2;
export const Route = createFileRoute('/admin/kasir')({
  async loader() {
    const res = await AxiosClient.adminGetKasir({
      headers: { authorization: UserSession.getToken() },
      query: { limit }
    });
    return res;
  },
  component() {
    const [offset, setOffset] = useState<number>(0);
    const [data, setData] = useState<LoaderData>(Route.useLoaderData());
    const [open_modal_form, setOpenModalForm] = useState<boolean>(false);
    const [selected_item, setSelectedItem] = useState<User>();
    const [modal_form, setModalForm] = useState<ModalForm>({
      username: '',
      password: '',
      nama: '',
      is_active: true
    });
    const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
    const [loading_submit_data, setLoadingSubmitData] = useState<boolean>(false);
    const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);

    async function getData() {
      try {
        setLoadingGetData(true);
        setData(await AxiosClient.adminGetKasir({
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
          await AxiosClient.adminUpdateKasirByID({
            headers: { authorization: UserSession.getToken() },
            path: { id: selected_item.id },
            body: modal_form
          });
        } else {
          await AxiosClient.adminCreateKasir({
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

    async function deleteData(item: User) {
      try {
        setLoadingDeleteData(true);
        await AxiosClient.adminDeleteKasirByID({
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
    }, [offset]);

    return (
      <Layout className='flex flex-col gap-4'>

        {/* TITLE */}
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Kasir
        </div>

        {/* ADD BUTTON */}
        <Button 
          className='lg:self-start'
          variant='bordered'
          color='primary'
          onPress={() => {
            setModalForm({
              username: '',
              password: '',
              nama: '',
              is_active: true
            });
            setOpenModalForm(true);
          }}>
          + Add Kasir
        </Button>

        {/* DATA TABLE */}
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Username</TableColumn>
            <TableColumn>Active?</TableColumn>
            <TableColumn>{''}</TableColumn>
          </TableHeader>
          <TableBody>
            {
              data.data.map(kasir => (
                <TableRow key={kasir.id}>
                  <TableCell>{ kasir.nama }</TableCell>
                  <TableCell>{ kasir.username }</TableCell>
                  <TableCell>{ kasir.is_active ? 'Active' : 'Inactive' }</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button 
                        color='warning'
                        variant='bordered'
                        size='sm'
                        onPress={() => {
                          setSelectedItem(kasir);
                          setModalForm({
                            username: kasir.username,
                            password: '',
                            nama: kasir.nama,
                            is_active: kasir.is_active
                          });
                          setOpenModalForm(true);
                        }}>
                        Edit
                      </Button>
                      <Button 
                        color='danger'
                        variant='bordered'
                        size='sm'
                        onPress={() => confirm('Delete item?') && deleteData(kasir)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <Pagination
          initialPage={(offset / limit) + 1}
          total={Math.ceil(data.total / limit)}
          onChange={page => setOffset((page - 1) * limit)} />
        
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
                value={modal_form.username}
                onChange={e => setModalForm({ ...modal_form, username: e.target.value })}
                placeholder='Username'
                label='Username'
                labelPlacement='outside-top' />
              <Input
                value={modal_form.password}
                onChange={e => setModalForm({ ...modal_form, password: e.target.value })}
                placeholder='Password'
                label='Password'
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
