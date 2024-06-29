import React from 'react';
import { useApp } from '../contexts/AppContext';
import atlasConfig from '../atlasConfig.json';

const { dataSourceName } = atlasConfig;

export function useCollection({
  cluster = dataSourceName,
  db,
  collection,
}: {
  cluster?: string;
  db: string;
  collection: string;
}) {
  const app = useApp();

  return React.useMemo(() => {
    const mdb = app?.currentUser?.mongoClient(cluster);
    return mdb?.db(db).collection(collection);
  }, [app.currentUser, cluster, db, collection]);
}
