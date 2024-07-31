import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import TitleDescriptionBlock from "./../TitleDescriptionBlock";

const faqs = [
  {
    question: "What materials are your tents made from?",
    answer:
      "Our tents are made from high-quality, durable materials such as ripstop nylon and polyester. They are designed to withstand harsh weather conditions and provide excellent protection and comfort during your camping trips.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive an email with a tracking number and a link to the courier's website. You can use this information to track your order's progress and estimated delivery date.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all unused items in their original packaging. If you are not satisfied with your purchase, please contact our customer service team to initiate a return and receive a refund or exchange.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to many countries. Shipping rates and delivery times vary depending on the destination. Please check our shipping policy page for more details on international shipping options and rates.",
  },
  {
    question: "Are your backpacks waterproof?",
    answer:
      "Our backpacks are made with water-resistant materials and feature waterproof zippers to protect your belongings from rain and moisture. However, they are not completely waterproof, and we recommend using additional waterproof covers for heavy rain conditions.",
  },
  {
    question: "How do I choose the right size for outdoor clothing?",
    answer:
      "We provide detailed size charts for all our outdoor clothing products. Please refer to these charts and measure yourself to find the right size. If you need further assistance, our customer service team is happy to help you choose the perfect fit.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods including credit/debit cards, PayPal, and other secure online payment options. All transactions are processed securely to ensure the safety of your personal information.",
  },
];

export default function FAQ() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-32 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <TitleDescriptionBlock
            title="Frequently Asked Questions"
            description="Here are some common questions and answers about our products, shipping, and more. If you have any other questions, feel free to contact our support team."
          />
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
