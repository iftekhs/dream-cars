import React from 'react';
import { MdSearch } from 'react-icons/md';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import SectionHeading from '../Shared/SectionHeading/SectionHeading';
import Card from './Card/Card';

const Assurance = () => {
  const items = [
    {
      _id: 1,
      heading: '200+ Points Inspection',
      text: 'We make sure each part of the car is inspected properly so you get the best car',
      icon: <MdSearch></MdSearch>,
    },
    {
      _id: 2,
      heading: 'Car as good as new',
      text: 'If there is any fault, dent or scratch in car we make sure to fix it and deliver it to you.',
      icon: <HiOutlineSparkles></HiOutlineSparkles>,
    },
    {
      _id: 3,
      heading: '30 Days Money Back',
      text: 'If you dont like the car, we guarantee you get back your money, post buying the car.',
      icon: <MdOutlineAttachMoney></MdOutlineAttachMoney>,
    },
    {
      _id: 4,
      heading: '10 Months Warranty',
      text: 'We offer you comprehensive warranty to make your life peaceful.',
      icon: <AiOutlineSafetyCertificate></AiOutlineSafetyCertificate>,
    },
  ];

  return (
    <section className="px-2 pb-24">
      <div className="container mx-auto">
        <SectionHeading
          top="You focus on choosing the car we take care of everything else"
          main="What is assured for cars?"></SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <Card key={item._id} heading={item.heading} text={item.text} icon={item.icon}></Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Assurance;
