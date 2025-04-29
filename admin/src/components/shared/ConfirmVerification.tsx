import { Icon } from "@iconify/react/dist/iconify.js"
import { Modal } from ".."
import { useState } from "react"
import { useOutsideClick } from "@/hooks/UseOutsideClick"

const ConfirmVerification = (
    {confirmAction,button,title,des}:{confirmAction ?: boolean, button ?:boolean,title ?: string, des ?: string}
) => {
    const [confirm, setConfirm] = useState(confirmAction)
    const modalRef = useOutsideClick(() => setConfirm(false))
  return (
      <>
      {confirm && (
<Modal classname="w-[28%]" ref={modalRef}>
    <div className="w-full h-full flex flex-col gap-6 p-6 relative">
        <div className="flex justify-center  ">
            <img src="/confirm.svg" alt="" className="w-10 h-10 object-contain" />
            <Icon icon="mdi:close" width="18" height="18" className="absolute cursor-pointer right-4 top-2" 
            onClick={() => setConfirm(false)}
            />
        </div>
        
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-black/70">{title ?? 'Confirm Verification'}</h1>
            <h2 className=" text-center text-[#64748B]">{des ?? 'Are you sure you want to make this payment as verified? This action cannot be undone'}</h2>
        </div>
        {button ?? (
            
        <div className="flex gap-4 justify-center items-center">
            <button className="bg-[#B0B0B0] w-32 py-2.5 px-2 rounded flex justify-center text-white font-semibold gap-2">
                Cancel
            </button>
            <button className="bg-[#2275FC] w-32 py-2.5 px-2 rounded flex justify-center items-center text-white font-semibold gap-2">
                Confirm
                <Icon icon="mdi:tick" width="22" height="22" />
            </button>

        </div>
        )}


    </div>
    
</Modal>
)}
</>
  )
}

export default ConfirmVerification