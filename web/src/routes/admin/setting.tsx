import { AxiosClient } from '@/api-client/AxiosClient';
import { User } from '@/api-client/model/table/User';
import { ItemSetting } from '@/api-client/schema/ItemSetting';
import { Layout } from '@/components/Layout';
import { UserSession } from '@/user-session';
import { addToast, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin/setting')({
  async loader(): Promise<ItemSetting[]> {
    const res = await AxiosClient.getSetting({
      headers: { authorization: UserSession.getToken() }
    });
    return res;
  },
  component() {
    const loader_data: ItemSetting[] = Route.useLoaderData();
    const [loading, setLoading] = useState<boolean>(false);
    const [loading_update_password, setLoadingUpdatePassword] = useState<boolean>(false);
    const [system_name, setSystemName] = useState<string>(loader_data.find(item => item.key == 'system_name')?.value ?? '');
    const [old_password, setOldPassword] = useState<string>('');
    const [new_password, setNewPassword] = useState<string>('');
    const [retype_new_password, setRetypeNewPassword] = useState<string>('');

    async function saveSetting() {
      try {
        setLoading(true);
        await AxiosClient.createOrUpdateSetting({
          headers: { authorization: UserSession.getToken() },
          body: {
            data : [
              { key: 'system_name', value: system_name }
            ]
          }
        });
        addToast({ title: "Updated", color: 'default', description: "Setting successfully updated" });
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoading(false);
      }
    }

    async function updatePassword() {
      if (new_password !== retype_new_password) {
        addToast({ title: "Incorrect", color: 'warning', description: 'New password doesnt match' });
        return;
      }
      try {
        setLoadingUpdatePassword(true);
        await AxiosClient.adminUpdatePassword({
          headers: { authorization: UserSession.getToken() },
          body: {
            old_password,
            new_password
          }
        });
        setOldPassword('');
        setNewPassword('');
        setRetypeNewPassword('');
        addToast({ title: "Updated", color: 'default', description: "New password updated" });
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoadingUpdatePassword(false);
      }
    }

    return (
      <Layout className='flex flex-col gap-4'>
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Setting
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold'>
            General
          </div>
          <Input
            value={system_name}
            onChange={e => setSystemName(e.target.value)}
            placeholder='System Name'
            label='System Name'
            labelPlacement='outside-top' />
          <Button
            isLoading={loading}
            color='primary'
            className='self-start'
            onPress={saveSetting}>
            Save
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold'>
            Password
          </div>
          <Input
            type='password'
            value={old_password}
            onChange={e => setOldPassword(e.target.value)}
            placeholder='Old Password'
            label='Old Password'
            labelPlacement='outside-top' />
          <Input
            type='password'
            value={new_password}
            onChange={e => setNewPassword(e.target.value)}
            placeholder='New Password'
            label='New Password'
            labelPlacement='outside-top' />
          <Input
            type='password'
            value={retype_new_password}
            onChange={e => setRetypeNewPassword(e.target.value)}
            placeholder='Retype New Password'
            label='Retype New Password'
            labelPlacement='outside-top' />
          <Button
            isLoading={loading_update_password}
            color='primary'
            className='self-start'
            onPress={updatePassword}>
            Update Password
          </Button>
        </div>
      </Layout>
    );
  }
})
