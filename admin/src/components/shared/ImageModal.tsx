import React from 'react';

interface ImageModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ selectedImage, onClose }) => {
  if (!selectedImage) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            @page { margin: 0; }
            body { display: flex; align-items: center; justify-content: center; margin: 0; }
            img { max-width: 100%; max-height: 100%; }
          </style>
        </head>
        <body>
          <img src="${selectedImage}" onload="window.print(); window.onafterprint = window.close();" />
        </body>
      </html>
    `);
    printWindow?.document.close();
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobURL;
      link.download = `image_${new Date().toISOString().slice(0, 10)}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-3 rounded-md shadow-lg max-w-lg w-full border-b-2 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center gap-2 my-1">
          {/* Print Button */}
          <button onClick={handlePrint} title="Print">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6669 6.82292V4.44792H6.33357V6.82292H5.54191V3.65625H13.4586V6.82292H12.6669ZM13.9454 9.59375C14.1698 9.59375 14.3579 9.51775 14.5099 9.36575C14.6619 9.21375 14.7376 9.02586 14.7371 8.80208C14.7366 8.57831 14.6609 8.39015 14.5099 8.23762C14.359 8.0851 14.1708 8.0091 13.9454 8.00962C13.7201 8.01015 13.5322 8.08615 13.3818 8.23762C13.2314 8.3891 13.1554 8.57725 13.1538 8.80208C13.1522 9.02692 13.2282 9.21481 13.3818 9.36575C13.5354 9.51669 13.7227 9.59269 13.9454 9.59375ZM12.6669 15.0436V11.451H6.33357V15.0436H12.6669ZM13.4586 15.8352H5.54191V12.6686H2.83203V8.40625C2.83203 7.95764 2.9843 7.5816 3.28882 7.27812C3.59335 6.97465 3.96886 6.82265 4.41536 6.82212H14.5851C15.0337 6.82212 15.4098 6.97412 15.7132 7.27812C16.0167 7.58212 16.1684 7.9579 16.1684 8.40546V12.6686H13.4586V15.8352ZM15.3768 11.8769V8.40625C15.3768 8.18194 15.301 7.99379 15.1496 7.84179C14.9981 7.68979 14.8099 7.61379 14.5851 7.61379H4.41536C4.19106 7.61379 4.00317 7.68979 3.8517 7.84179C3.70023 7.99379 3.62423 8.18194 3.6237 8.40625V11.8769H5.54191V10.6593H13.4586V11.8769H15.3768Z"
                fill="#454545"
              />
            </svg>
          </button>

          {/* Download Button */}
          <button onClick={handleDownload} title="Download">
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3477 16.077L8.80866 12.539L9.51666 11.819L11.8477 14.15V5.5H12.8477V14.15L15.1777 11.82L15.8867 12.539L12.3477 16.077ZM6.96366 19.5C6.50299 19.5 6.11866 19.346 5.81066 19.038C5.50266 18.73 5.34832 18.3453 5.34766 17.884V15.461H6.34766V17.884C6.34766 18.038 6.41166 18.1793 6.53966 18.308C6.66766 18.4367 6.80866 18.5007 6.96266 18.5H17.7327C17.886 18.5 18.027 18.436 18.1557 18.308C18.2843 18.18 18.3483 18.0387 18.3477 17.884V15.461H19.3477V17.884C19.3477 18.3447 19.1937 18.729 18.8857 19.037C18.5777 19.345 18.193 19.4993 17.7317 19.5H6.96366Z"
                fill="#0331fc"
              />
            </svg>
          </button>

          {/* Close Button */}
          <button onClick={onClose} title="Close">
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 2C6.65 2 2 6.65 2 12.5C2 18.35 6.65 23 12.5 23C18.35 23 23 18.35 23 12.5C23 6.65 18.35 2 12.5 2ZM16.55 17.75L12.5 13.7L8.45 17.75L7.25 16.55L11.3 12.5L7.25 8.45L8.45 7.25L12.5 11.3L16.55 7.25L17.75 8.45L13.7 12.5L17.75 16.55L16.55 17.75Z"
                fill="#FF0000"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[80vh] flex p-2 m-2">
          <img
            src={selectedImage}
            alt="Selected Document"
            className="w-full h-[80vh] rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
