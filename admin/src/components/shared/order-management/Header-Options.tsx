import { downloadPdf } from '@/components/shared/_table/pdfDownload';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Text } from '../Text';

interface headerOptionPropTypes {
  filterOptions?: string[];
  filterTitle: string;
  onFilterSelect?: () => {};
  secondButtonIcon?: string;
  secondButtonTitle?: string;
  onSecondButtonOnClick?: () => void;
  secondButtonBGColor?: string;
  canDownload?: boolean;
  canExportCSV?: boolean;
  tableData?: any;
  transactionTableColumn?: any;
  downloadPdfFileName?: string;
  showSecondButton?: boolean;
}

export const HeaderOptions = ({
  filterTitle,
  filterOptions,
  onFilterSelect,
  secondButtonIcon,
  secondButtonTitle,
  secondButtonBGColor,
  onSecondButtonOnClick,
  canDownload,
  canExportCSV,
  tableData,
  transactionTableColumn,
  showSecondButton = true,
  downloadPdfFileName = 'download.pdf',
}: headerOptionPropTypes) => {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  console.log('tableData', tableData);

  console.log('transactionTableColumn', transactionTableColumn);

  const filteredHeaders = transactionTableColumn?.map((h: any) => ({
    label: h.header,
    key: h.key,
  }));

  const handlePdfDownload = () => {
    downloadPdf({
      tableData,
      headers: filteredHeaders,
      fileName: downloadPdfFileName,
    });
  };

  const downloadOptions = [
    {
      label: 'Download PDF',
      value: 'pdf',
      onClick: handlePdfDownload,
    },
    {
      label: 'Download CSV',
      value: 'csv',
    },
  ];

  return (
    <section
      className="flex place-items-center justify-between  gap-6"
      id="filter-export"
    >
      <section className="flex gap-4 items-center">
        {/* EXPORT CSV */}
        {canExportCSV && (
          <button
            className="flex place-items-center gap-2 border border-grey-200 py-3 bg-white px-2 rounded "
            id="filter"
          >
            <Icon
              icon="material-symbols:upload-rounded"
              color="#B0B0B0"
              fontSize={25}
            />
            <Text variant="lynch-400" size="body-base-default">
              Import CSV
            </Text>
          </button>
        )}
        {/* EXPORT CSV */}
        {canDownload && (
          <div className="relative">
            <div
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              className="flex place-items-center gap-2 border border-grey-200 py-3 bg-white px-4 rounded cursor-pointer hover:bg-gray-50"
            >
              <Icon
                icon="material-symbols:download-rounded"
                color="#B0B0B0"
                fontSize={25}
              />
              <Text variant="lynch-400" size="body-base-default">
                Download
              </Text>
            </div>

            {isDownloadOpen && (
              <div className="absolute top-full left-0 mt-1 w-auto bg-white border border-grey-200 rounded shadow-lg z-10">
                <div
                  className="px-6 text-nowrap py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={() => {
                    setIsDownloadOpen(false);
                    handlePdfDownload();
                  }}
                >
                  Download PDF
                </div>
                <div
                  className="px-6 text-nowrap py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={() => {
                    setIsDownloadOpen(false);
                    handlePdfDownload();
                  }}
                >
                  <CSVLink
                    className=""
                    data={tableData}
                    headers={filteredHeaders}
                    filename="transaction.csv"
                  >
                    Export CSV
                  </CSVLink>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="flex gap-4 items-center ">
        {filterOptions && (
          <div
            className="flex place-items-center gap-2 border border-grey-200 bg-white py-3 px-2 rounded "
            id="filter"
          >
            <Text variant="lynch-400" size="body-base-default">
              {filterTitle}:
            </Text>
            <select
              name=""
              id=""
              className="outline-none text-base text-grey-800 bg-white"
            >
              <option value="">Select</option>
              {filterOptions?.map((filter, index) => (
                <option value={filter} key={index} onSelect={onFilterSelect}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        )}

        {showSecondButton && (
          <div
            className={`flex place-items-center gap-2 border border-primary-blue cursor-pointer py-3 ${
              secondButtonBGColor === 'primary-blue'
                ? 'bg-primary-blue'
                : 'bg-white'
            }  px-2 rounded`}
            id="export"
            onClick={onSecondButtonOnClick}
          >
            <Icon
              icon={secondButtonIcon ?? ''}
              color={
                secondButtonBGColor === 'primary-blue' ? 'white' : '#2275FC'
              }
            />
            <Text
              variant={
                secondButtonBGColor === 'primary-blue'
                  ? 'white'
                  : 'primary-blue'
              }
              size="body-base-default"
            >
              {secondButtonTitle}
            </Text>
          </div>
        )}
      </section>
    </section>
  );
};
