import DefaultSettings from '@/components/admin/DefaultSettings';
import PlayersList from '@/components/admin/PlayersList';
import { useConfigData } from '@/store/configSlice';
import clsx from 'clsx';
import AddPlayer from './AddPlayer';

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
