import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from '@tanstack/react-query';
import { OsdsText } from '@ovhcloud/ods-components/react';
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming';
import { getListingIcebergV2 } from '@/api';

import TableContainer from '@/components/layout-helpers/Listing/TableContainer';
import Loading from '@/components/Loading/Loading';
import ErrorBanner from '@/components/Error/Error';

export default function Listing() {
  const { t } = useTranslation('key-management-service/dashboard');
  const [pageSize] = useState(10);
  const {
    data,
    fetchNextPage,
    isError,
    hasNextPage,
    isLoading,
    error,
    isFetching,
  }: any = useInfiniteQuery({
    initialPageParam: null,
    queryKey: [`servicesListingIceberg`],
    queryFn: ({ pageParam }) =>
      getListingIcebergV2({ pageSize, cursor: pageParam }),
    staleTime: Infinity,
    getNextPageParam: (lastPage) => lastPage.cursorNext as any,
  });

  const tableContainerRef: React.MutableRefObject<HTMLDivElement> = React.useRef<
    HTMLDivElement
  >(null);

  const flattenData = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page.data) ?? [],
    [data],
  );
  const totalFetched = flattenData.length;

  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched],
  );

  if (isError) {
    return <ErrorBanner error={error} />;
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (data?.length === 0) return <Navigate to="onboarding" />;

  return (
    <>
      <h2>key-management-service</h2>
      <div className="text-right pr-6 pb-6">
        <OsdsText color={ODS_THEME_COLOR_INTENT.text}>
          ({flattenData.length} {t('results')})
        </OsdsText>
      </div>
      <div>
        {flattenData.length && (
          <div
            onScroll={(e) => {
              if (hasNextPage) {
                fetchMoreOnBottomReached(e.target as HTMLDivElement);
              }
            }}
            ref={tableContainerRef}
            className={
              hasNextPage || flattenData.length > 10
                ? `container overflow-auto relative h-[400px]`
                : ``
            }
          >
            <TableContainer data={flattenData} hasNextPage={hasNextPage} />
          </div>
        )}
        {isFetching && (
          <div className="text-center pt-3">
            <OsdsText color={ODS_THEME_COLOR_INTENT.text}>
              {t('loading')}
            </OsdsText>
          </div>
        )}
      </div>
    </>
  );
}
