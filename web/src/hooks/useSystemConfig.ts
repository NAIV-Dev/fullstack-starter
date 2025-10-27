import { AxiosClient } from "@/api-client/AxiosClient";
import { useEffect, useState } from "react";

export function useSystemConfig() {
  const [system_name, setSystemName] = useState<string>('');
  useEffect(() => {
    AxiosClient.getSettingByKey({headers: {}, path: { key: 'system_name' }}).then(item => setSystemName(item.value || '')).catch(() => {});
  }, []);

  return { system_name };
}
