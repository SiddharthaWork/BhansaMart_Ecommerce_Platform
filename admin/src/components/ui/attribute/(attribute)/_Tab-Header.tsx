interface _tabHeaderPropTypes {
  selectedTabs: string;
  setSelectedTabs: React.Dispatch<React.SetStateAction<string>>;
}

export const _TabHeader = ({
  selectedTabs,
  setSelectedTabs,
}: _tabHeaderPropTypes) => {
  const tabData = [
    {
      id: 1,
      title: 'Brands',
      value: 'brands',
    },
    {
      id: 2,
      title: 'Category',
      value: 'category',
    },
    {
      id: 3,
      title: 'Individual',
      value: 'individual',
    },
  ];
  return (
    <div className="flex place-items-center border border-grey-200 gap-6">
      {tabData.map((tab) => (
        <section
          className={`flex justify-between w-full py-4 px-3 ${selectedTabs === tab.value ? 'bg-dashboard-bg border-b border-primary-blue' : ''}`}
          key={tab.id}
        >
          <button
            className="text-sm text-grey-800"
            onClick={() => setSelectedTabs(tab.value)}
            key={tab.id}
          >
            {tab.title}
          </button>
        </section>
      ))}
    </div>
  );
};
