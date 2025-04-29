import { Modal } from '..'
import { Icon } from '@iconify/react/dist/iconify.js'
import { AreaField } from './AreaField'
import { useState } from 'react'
import { useOutsideClick } from '@/hooks/UseOutsideClick'

const RejectDialog = (
    {rejectAction,title,des} : {rejectAction?: boolean, title ?: string, des ?: string}
) => {
    const [reject, setReject] = useState(rejectAction)
    const modalRef = useOutsideClick(() => setReject(false))
    return (
        <>
        {reject && (
            
            <Modal classname="w-[32%]" ref={modalRef}>
                <div className="w-full h-full flex flex-col gap-6 p-6 px-10 relative">
                    <div className="flex justify-center  ">
                        <img src="/reject.svg" alt="" className="w-10 h-10 object-contain" />
                        <Icon icon="mdi:close" width="18" height="18" className="absolute cursor-pointer right-4 top-2"
                            onClick={() => setReject(false)}
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-semibold text-black/70">{title ?? "Reject Payment" }</h1>
                        <h2 className=" text-center text-[#64748B]">{des ?? 'Are you sure you want to reject this payment? This action cannot be undone'}</h2>
                    </div>

                    <div className='w-full h-full'>
                        <AreaField
                            label="Reason for Rejection"
                            name="reason"
                            placeholder="Describe Reason for rejection"
                        />

                    </div>

                    
                    <div className="flex gap-4 justify-center items-center">
                        <button className="bg-[#B0B0B0] w-32 py-2.5 px-2 rounded flex justify-center text-white font-semibold gap-2">
                            Cancel
                        </button>
                        <button className="bg-[#FF4D4D] py-2.5 px-4 rounded flex justify-center items-center text-white font-semibold gap-2">
                            Reject Payment
                        </button>

                    </div>


                </div>

            </Modal>
        )}
        </>
    )
}

export default RejectDialog