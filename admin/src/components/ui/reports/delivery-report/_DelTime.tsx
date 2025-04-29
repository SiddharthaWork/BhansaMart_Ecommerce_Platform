import { Table } from '../../../shared';

const data = [
    {
      deliveryPerson: "Rickey Bush",
      id: "C487654",
      averageTimeTaken: "1h 20m",
      totalDeliveries: 50,
      lateDeliveries: 5,
      onTimePercentage: "90%",
      image:"https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",
      _id: "1",
    },
    {
      deliveryPerson: "Lauren Santos",
      id: "C287667",
      averageTimeTaken: "1h 20m",
      totalDeliveries: 50,
      lateDeliveries: 9,
      onTimePercentage: "66%",
      image:"https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",

      _id: "2",
    },
    {
      deliveryPerson: "Kara Marquez",
      id: "C687667",
      averageTimeTaken: "1h 20m",
      totalDeliveries: 50,
      lateDeliveries: 5,
      onTimePercentage: "58%",
      image:"https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",

      _id: "3",
    },
    {
      deliveryPerson: "Lucy Roman",
      id: "P187654",
      averageTimeTaken: "1h 20m",
      totalDeliveries: 50,
      lateDeliveries: 7,
      onTimePercentage: "72%",
      image:"https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",

      _id: "4",
    },
  ];
  
  const columns = [
    {
      key: "deliveryPerson",
      header: "Delivery Person",
      width: "250px",
      render: (_: any, person: any) => (
        <div className="flex items-center gap-2">
          <img
            src={person.image || "/api/placeholder/32/32"}
            className="w-8 h-8 rounded-full"
            alt="Person"
          />
          <section className="flex flex-col">
            <span className="text-black font-medium">{person.deliveryPerson}</span>
            <span className="text-gray-500 text-sm">ID: {person.id}</span>
          </section>
        </div>
      ),
    },
    {
      key: "averageTimeTaken",
      header: "Average Time Taken",
      width: "150px",
    },
    {
      key: "totalDeliveries",
      header: "Total Deliveries",
      width: "150px",
    },
    {
      key: "lateDeliveries",
      header: "Late Deliveries",
      width: "150px",
    },
    {
      key: "onTimePercentage",
      header: "On-Time Percentage",
      width: "150px",
    },
  ];
  
export const DelTime = () => {


  return (
    <div>
      <Table
        data={data}
        columns={columns}
        showAction={false}
      />
    </div>
  );
};
