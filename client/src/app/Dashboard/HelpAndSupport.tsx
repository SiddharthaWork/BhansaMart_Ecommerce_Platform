import {
  // Accordion,
  // AccordionDetails,
  // AccordionSummary,
  Box,
  // Link,
  // List,
  // ListItem,
  // ListItemText,
  // Paper,
  // Typography,
} from "@mui/material";
// import { Mail, Phone, UserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
  answerList: string[];
}

const HelpAndSupport: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "How can I track my order?",
      answer:
        "Tracking your order is easy!",
      answerList: [
        'Go to "My Orders".',
        'Select your order, and tap "Track Order" to see live updates.',
      ]
    },
    {
      question: "What happens if an item I ordered is out of stock?",
      answer:
        "Don't worry!",
      answerList: [
        "If an item is unavailable, we'll notify you and offer a refund or replacement.",
        "Refunds are processed instantly to your payment method.",
      ],
    },
    {
      question: "Can I schedule a delivery?",
      answer:
        "No, you cannot!",
      answerList: [
        "Once the order is placed, the delivery time cannot be changed.",
        "Delivery timing also depends on the distance from the nearest branch.",
      ],
    },
    {
      question: "How do I apply a discount or promo code?",
      answer:
        "Using a promo code is simple:",
      answerList: [
        "Add items to your cart.",
        'Tap "Apply Promo Code" at checkout.',
        "Enter the code and enjoy your discount instantly!",
      ],
    },
    {
      question: "What payment options do you accept?",
      answer: "We accept:",
      answerList: ["Fone pay", "Cash on Delivery."],

    },
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: "0", marginTop: "3px", paddingX: 3, paddingTop: 3, paddingBottom: 6 }}>
      <h2 className="text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
        Help and support
      </h2>

      <p className="mt-5 mb-4 text-sm font-medium tracking-wide md:text-base lg:text-lg">
        Help & FAQs
      </p>

      {/* {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography>{`${index + 1}. ${faq.question}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Array.isArray(faq.answer) ? (
              <List dense>
                {faq.answer.map((line, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={line} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>{faq.answer}</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))} */}
      <div className="flex flex-col gap-4">
        {faqs.map((item, index) => (
          <div key={index}>
            <h2 className="text-base font-semibold tracking-wide">{index + 1}. {item.question}</h2>
            <p className="ml-4 text-sm tracking-wide">{item.answer}</p>
            {item.answerList.length > 0 && (
              <ul className="text-sm tracking-wide ml-9">
                {item.answerList.map((answer: string, idx: number) => (
                  <li key={idx}>{answer}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="lg:text-[16px] md:text-base text-sm font-medium">
          If your issue remains unresolved or you are unsatisfied with the
          resolution process, please feel free to contact our grievance officer
          for further assistance.
        </h2>

        <p className="mt-2 text-[15px] font-semibold">
          Grievance Officer
        </p>

        <div className="flex flex-col gap-1 mt-1">
          <div className="flex flex-row text-[15px] gap-2 font-semibold">
            {/* <UserRound className="mr-2" /> */}
            <p className="text-[15px]">Ram Bahadur</p>
          </div>
          <div>
            {/* <Phone className="mr-2" /> */}
            <div className="flex flex-row text-[15px] gap-2 font-semibold">
              <p className="text-[15px]">Contact:</p>
              <Link to="tel:9860454545" className="text-[#539818]">
                9860454545
              </Link>
            </div>
          </div>
          <div>
            {/* <Mail className="mr-2" /> */}
            <div className="flex flex-row flex-wrap text-[15px] gap-2 font-semibold">
              <p className="text-[15px]">Email:</p>
              <Link to="mailto:Damian_Davis98@hotmail.com" className="text-[#539818]">
                Damian_Davis98@hotmail.com
              </Link>
            </div>
          </div>
          <div>
            {/* <Phone className="mr-2" /> */}
            <div className="flex flex-row text-[15px] gap-2 font-semibold">
              <p className="text-[15px]">Customer support:</p>
              <div className="text-[#539818] flex flex-col sm:flex-row gap-1 sm:gap-3">
                <Link to="tel:9898989898">
                  9898989898
                </Link>
                <span className="hidden sm:flex">|</span>
                <Link to="tel:9898989898">
                  9898989898
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HelpAndSupport;
