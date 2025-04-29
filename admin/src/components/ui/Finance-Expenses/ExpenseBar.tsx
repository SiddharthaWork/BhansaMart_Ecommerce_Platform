import { HeaderOptions, Modal } from '@/components/shared'
import { FilterOptions } from '@/constants/Filter-Options'
import { useOutsideClick } from '@/hooks/UseOutsideClick';
import React, { useState } from 'react'
import { AddExpenses } from './_AddExpenses';

export const ExpenseBar = () => {
    const [_setpoints, _setaddpoints] = useState(false);
    const [_removepoints, _setremovepoints] = useState(false);
     const _assignRef = useOutsideClick(() => _setaddpoints(false));
    const _removeRef = useOutsideClick(() => _setremovepoints(false));
  return (
    <div>
         <HeaderOptions
                filterOptions={FilterOptions}
                filterTitle="Sort By"
                secondButtonIcon="ic:baseline-plus"
                secondButtonTitle="Add Expenses"
                secondButtonBGColor="primary-blue"
                onSecondButtonOnClick={() => _setaddpoints(true)}
                canDownload
                canExportCSV
            />
            {_setpoints &&
            ( <Modal ref={_assignRef} classname="w-[30%]" >
                <AddExpenses onclose={() => _setaddpoints(false)}/>
            </Modal>
        )}
          {_removepoints && (
        <Modal ref={_removeRef}>
          <div></div>
        </Modal>
      )}
    </div>
  )
}
