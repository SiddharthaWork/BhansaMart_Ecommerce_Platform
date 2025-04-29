import { InputField } from '@/components/shared';
import { Text } from '@/components/shared';

const ViewExpenses = () => {
    const deliveryPersonData = {
        generalDetails: [
            { label: 'Full Name', value: 'John Doe' },
            { label: 'Phone Number', value: '+977-9876514120' },
            { label: 'Email', value: 'Example@gmail.com' },
            { label: 'Address', value: '295 Example, Example City' },
            { label: 'Gender', value: 'Male' },
            { label: 'Vehicle Number', value: 'Ba-2-pa 7865' },
            { label: 'Start Date', value: '2024-09-12' },
        ],
        status: 'Success',
        accountDetails: [
            { label: 'Username', value: 'ExampleDeliveryapp@gmail.com' },
            { label: 'Password', value: '********', type: 'password' }
        ],
        documents: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCNBzhahQdo0Qo8D381s-1hpy7oPvX_DkTQA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCNBzhahQdo0Qo8D381s-1hpy7oPvX_DkTQA&s"
        ]
    };

    return (
        <div className='flex flex-col gap-4 py-2'>
            <div className='px-8 py-4 '>
             <h1 className='text-2xl font-semibold'>Delivery Person</h1>
            </div>

            <div className='py-2 px-8 bg-[#f6f6f6]'>
                <h1 className='text-base font-medium text-[#3b3b3b]'>General Details</h1>
            </div>
            <div className='px-8 flex flex-col gap-2'>
                {deliveryPersonData.generalDetails.map((field, index) => (
                    <InputField
                        key={index}
                        defaultPadding={false}
                        readonly={true}
                        border={false}
                        label={field.label}
                        placeholder={field.value}
                        inputClassName='outline-none border-b pb-3 font-semibold'
                    />
                ))}
                <div className='flex flex-col gap-2'>
                    <Text variant="grey-600" size="body-sm-lg">
                        Status
                    </Text>
                    <button className='w-fit py-1 px-2 bg-green-100 text-green-500 rounded-md text-center text-sm'>
                        {deliveryPersonData.status}
                    </button>
                </div>
            </div>

            <div className='py-2 px-8 bg-[#f6f6f6]'>
                <h1 className='text-base font-medium text-[#3b3b3b]'>Account Details</h1>
            </div>
            <div className='px-8 flex flex-col gap-2'>
                {deliveryPersonData.accountDetails.map((field, index) => (
                    <InputField
                        key={index}
                        type={field.type}
                        defaultPadding={false}
                        readonly={true}
                        border={false}
                        label={field.label}
                        placeholder={field.value}
                        inputClassName='outline-none border-b pb-3 font-semibold'
                    />
                ))}
            </div>

            <div className='flex flex-col gap-2'>
                <div className='py-2 px-8 bg-[#f6f6f6]'>
                    <h1 className='text-base font-medium text-[#3b3b3b]'>Document</h1>
                </div>
                <div className='flex flex-row gap-4 px-8 py-4'>
                    {deliveryPersonData.documents.map((doc, index) => (
                        <img
                            key={index}
                            src={doc}
                            alt={`document-${index + 1}`}
                            className='w-40 h-24 rounded-lg object-cover'
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewExpenses;