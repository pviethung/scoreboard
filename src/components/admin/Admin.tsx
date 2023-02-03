import DefaultSettings from '@/components/admin/DefaultSettings';
import PlayersList from '@/components/admin/PlayersList';
import { useConfigData } from '@/store/configSlice';
import clsx from 'clsx';
import AddPlayer from './AddPlayer';
/*
- MC thong bao loai cau                 
- Doi dua ra diem cuoc                  
- Doi su dung vat pham                  
- Thu ky, nhap diem, update vat pham    V
- MC doc cau hoi                        
- Ky thuat bam gio - bam nhac/mo tieng
tic toc ?                               V
- MC verify dap an
- Cap nhat dap an -> tong ket diem      V


*/

const Admin = () => {
  const { appInitialized } = useConfigData();

  return (
    <div className="max-w-full">
      <h1 className={clsx(' text-center text-4xl uppercase')}>admin</h1>
      <div className="mt-20" />

      {!appInitialized && <DefaultSettings />}
      {appInitialized && (
        <>
          <AddPlayer />
          <PlayersList />
        </>
      )}
    </div>
  );
};
export default Admin;
