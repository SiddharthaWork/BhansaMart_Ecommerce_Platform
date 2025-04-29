import { Link } from "react-router-dom";
import { Text } from "./Text";

const categoryData = {
  category: "All Categories",
  categoryList: [
    {
      path: "",
      title: "Grocery",
    },
    {
      path: "",
      title: "Beauty & Personal",
    },
    {
      path: "",
      title: "Kids",
    },
    {
      path: "",
      title: "School, Office & Stationery",
    },
  ],
};

const usefulLinks = {
  category: "Useful Links",
  categoryList: [
    {
      path: "",
      title: "About",
    },
    {
      path: "",
      title: "Privacy",
    },
    {
      path: "",
      title: "Terms",
    },
    {
      path: "",
      title: "Blog",
    },
  ],
};

const categories = {
  title: "Categories",
  categoryList: [
    {
      path: "",
      title: "Vegetables & Fruits",
    },
    {
      path: "",
      title: "Bakery & Biscuits",
    },
    {
      path: "",
      title: "Dry Fruits, Masala & Oil",
    },
    {
      path: "",
      title: "Ice Creams & Frozen Desserts",
    },
    {
      path: "",
      title: "Beauty & Cosmetics",
    },
    {
      path: "",
      title: "Kids",
    },
    {
      path: "",
      title: "School, Office & Stationery",
    },
    {
      path: "",
      title: "Personal Care",
    },
    {
      path: "",
      title: "Dairy & Breakfast",
    },
    {
      path: "",
      title: "Instant & Frozen Food",
    },
    {
      path: "",
      title: "Sweet Tooth",
    },
    {
      path: "",
      title: "Cleaning Essentials",
    },
    {
      path: "",
      title: "Munchies",
    },
    {
      path: "",
      title: "Tea, Coffee & Health drinks",
    },
    {
      path: "",
      title: "Atta, Rice & Dal",
    },
    {
      path: "",
      title: "chicken, Meat & Fish",
    },
  ],
};

const contactDetails = {
  title: "Contact Us",
  whatsapp: {
    title: "WhatsApp us: ",
    number: "9865698965",
  },
  call: {
    title: "Call us: ",
    number: "9865698965",
  },
};

export const Footer = () => {
  return (
    <div className="flex flex-wrap px-6 py-12 md:px-14 lg:px-24 bg-fade-white gap-9" id="parent">
      <section className="flex flex-col gap-6" id="All-Categories">
        <Text size="body-md-lg" variant="fade-black">
          {categoryData.category}
        </Text>

        <div className="flex flex-col gap-2">
          {categoryData.categoryList.map((item, index) => (
            <Link to={item.path} key={index} className="text-sm md:text-base text-brown">
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 " id="useful-links">
        <Text size="body-md-lg" variant="fade-black">
          {usefulLinks.category}
        </Text>

        <div className="flex flex-col gap-2">
          {usefulLinks.categoryList.map((item, index) => (
            <Link to={item.path} key={index} className="text-sm md:text-base text-brown">
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 " id="categories">
        <div className="flex gap-3 place-items-center" id="title">
          <Text size="body-md-lg" variant="fade-black">
            {categories.title}
          </Text>

          <button className="text-sm font-normal md:text-base text-secondary">
            See all
          </button>
        </div>

        <div id="category" className="grid grid-cols-2 gap-2">
          {categories.categoryList.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="w-full text-sm md:text-base text-brown"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col flex-1 gap-5">
        <Text size="body-md-lg" variant="fade-black">
          {contactDetails.title}
        </Text>
        <div className="flex flex-col gap-3">
          <section className="flex gap-1 place-items-center">
            <Text size="body-md-mid" variant="brown">
              {contactDetails.whatsapp.title}
            </Text>
            <Text variant="fade-blue" size="body-md-default">
              {contactDetails.whatsapp.number}
            </Text>
          </section>

          <section className="flex gap-1 place-items-center">
            <Text size="body-md-mid" variant="brown">
              {contactDetails.call.title}
            </Text>
            <Text variant="fade-blue" size="body-md-default">
              {contactDetails.call.number}
            </Text>
          </section>
        </div>

        <Text size="body-base-mid" variant="brown">
          If you experience any issues such as bugs, glitches, missing
          functionality, delayed orders, billing inaccuracies, or any other
          problems on the Bhansa Mart website, please let us know immediately.
        </Text>

        <div className="flex flex-col gap-3">
          <Text variant="fade-black" size="body-md-lg">
            Download the app
          </Text>
          <img src="/googlePlay.png" alt="download" className="h-10 w-28" />
        </div>
      </section>
    </div>
  );
};
