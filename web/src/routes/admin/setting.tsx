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
    const [system_name, setSystemName] = useState<string>(loader_data.find(item => item.key == 'system_name')?.value ?? '');

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

    return (
      <Layout className='flex flex-col gap-4'>
        <div className={`
          text-3xl font-bold text-center
          lg:text-left lg:text-4xl 
        `}>
          Setting
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
      </Layout>
    );
  }
})
