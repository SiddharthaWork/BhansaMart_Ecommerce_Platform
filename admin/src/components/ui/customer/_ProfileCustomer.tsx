import { Icon } from "@iconify/react/dist/iconify.js"


export const _ProfileCustomer = (
  {
    customerData
  }: {
    customerData: any
  }
  
) => {
  const profileinfo = [
    {
      id: customerData._id,
      title: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
    }
  ]
  return (
    <div className="w-full h-fit px-4 py-6 flex flex-col justify-start items-center bg-white rounded-lg shadow-sm">

      <div className="flex flex-col items-center h-[75%] w-full py-6 gap-4 border-b">
        <div className="relative">
        <div className="bg-black w-[15rem] h-[15rem] rounded-full overflow-hidden">
          <img src="https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995e13_66236537d4f46682e079b6ce_Casual%2520Portrait.webp" alt="" />
        </div>
        <div className="absolute bottom-2 right-3 w-[3rem] h-[3rem] bg-[#377CF6] rounded-full flex place-items-center justify-center">
          <Icon icon={"ic:outline-edit-calendar"} color="white" fontSize={24} />
        </div>
        </div>
        {profileinfo.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <h1 className="font-medium">{item.title}</h1>
            <p className="text-[#8695AA]">{item.email}</p>
            <p className="text-[#8695AA]">{item.phone}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start h-[25%] w-full px-2 py-4 gap-4">
        <div>
          <h1 className="text-base font-medium">Last Order</h1>
          <p className="text-[#8695AA]">7 days ago <span className="text-[#59D20D]">O-19670</span> </p>
        </div>

        <div>
          <h1 className="text-base font-medium">Registered on</h1>
          <p className="text-[#8695AA]">{customerData.joinDate}</p>
        </div>

      </div>

    </div>



  )
}


export const AccountDetails = (
  {
    customerData
  }: {
    customerData: any
  }
) => {
  return (
    <div className="w-full h-fit p-6 flex flex-col justify-start items-start bg-white rounded-lg shadow-sm gap-4">
      <h1 className="text-2xl font-bold">Account Details</h1>

      <div className="flex flex-col">
        <h1 className="text-base font-medium">Useremail</h1>
        <p className="text-base">{customerData.email}</p>
      </div>

      {/* <div className="flex flex-col">
        <h1 className="text-base font-medium flex items-center gap-2">Password <span><Icon icon="el:eye-close"/></span> </h1>
        <p className="text-base">*******</p>
      </div> */}
    </div>
  )
}

export const Address = (
  {
    customerData
  }: {
    customerData: any
  }
) => {
  return (
    <div className="w-full h-fit p-6 flex flex-col justify-start items-start bg-white rounded-lg shadow-sm gap-4">
      <div className="flex flex-row justify-between items-center w-full">
      <h1 className="text-2xl font-bold">Address</h1>
      <button className="text-[#2275FC] font-medium">New Address</button>
      </div>

      <div className="flex flex-col space-y-1 border-b py-4 w-full relative">
        <h1 className="text-sm font-thin">Shipping Address</h1>
        <h1 className="text-base font-medium">{customerData.address}</h1>
        <p className="text-base">Pune, Maharashtra, India<span className="ml-1 text-sm font-thin">Landmark: Behind Fishtall Lodge</span></p>
        <p className="text-base">9987454232, 9832121234</p>
        <Icon icon="mynaui:edit" width="24" height="24" className="absolute right-0" />
      </div>

      <div className="flex flex-col space-y-1 border-b py-4 w-full relative">
        <h1 className="text-sm font-thin">Billing Address</h1>
        <h1 className="text-base font-medium">Bina Shrestha</h1>
        <p className="text-base">Damak-5,Province 1, Jhapa<span className="ml-1 text-sm font-thin">Landmark: Behind Fishtall Lodge</span></p>
        <p className="text-base">9987454232, 9832121234</p>
        <Icon icon="mynaui:edit" width="24" height="24" className="absolute right-0" />
      </div>
    </div>
  )
}