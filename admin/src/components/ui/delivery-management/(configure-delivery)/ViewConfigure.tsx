// import { InputField } from '@/components/shared';
// import { Text } from '@/components/shared';

// const ViewConfigure = () => {
//     const deliveryPersonData = {
//         status: 'Success',
//         accountDetails: [
//             { label: 'Tranasaction Id', value: 'T-1202332' },
//             { label: 'Order Id', value: 'T-1202332' },
//             { label: 'Date & Time', value: '2025-02-12' },
//             { label: 'Payment Method', value: 'Cash', type: 'text' },
//         ],
//     };

//     return (
//         <div className='flex flex-col gap-4 py-2'>
//             <div className='px-8 py-4 '>
//              <h1 className='text-2xl font-semibold'>Transaction Details</h1>
//             </div>

//             <div className='py-2 px-8 bg-[#f6f6f6]'>
//                 <h1 className='text-base font-medium text-[#3b3b3b]'>AMOUNT</h1>
//             </div>
//             <div className='px-8 flex flex-col gap-2'>
//                 <h1 className='text-3xl font-bold'>$25.50</h1>
//             </div>

//             <div className='py-2 px-8 bg-[#f6f6f6]'>
//                 <h1 className='text-base font-medium text-[#3b3b3b]'>FROM</h1>
//             </div>
//             <div className='px-8 flex flex-col gap-2'>
//             <div className="flex place-items-center gap-2">
//                     <img
//                         src="https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995e13_66236537d4f46682e079b6ce_Casual%2520Portrait.webp"
//                         className="w-12 h-12 rounded-full"
//                         alt="Customer"
//                     />
//                     <section className="flex flex-col">
//                         <span className="text-fade-black text-base">Customer</span>
//                         <span className="text-lynch-400 text-base">ID: 1000</span>
//                     </section>
//                 </div>
//             </div>
//             <div className='py-2 px-8 bg-[#f6f6f6]'>
//                 <h1 className='text-base font-medium text-[#3b3b3b]'>DETAILS</h1>
//             </div>

//             <div className='px-8 flex flex-col gap-2'>
//                 {deliveryPersonData.accountDetails.map((field, index) => (
//                     <InputField
//                         key={index}
//                         type={field.type}
//                         defaultPadding={false}
//                         readonly={true}
//                         border={false}
//                         label={field.label}
//                         placeholder={field.value}
//                         inputClassName='outline-none border-b pb-3 font-semibold'
//                     />
//                 ))}
//                 <div className='flex flex-col gap-2'>
//                     <Text variant="grey-600" size="body-sm-lg">
//                         Status
//                     </Text>
//                     <button className='w-fit py-1 px-2 bg-green-100 text-green-500 rounded-md text-center text-sm'>
//                         {deliveryPersonData.status}
//                     </button>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ViewConfigure;