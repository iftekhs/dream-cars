import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { cl } from '../../../../Helpers/Helpers';
import BtnLoader from '../../../Shared/BtnLoader/BtnLoader';
import Loader from '../../../Shared/Loader/Loader';
import SectionContent from '../../../Shared/SectionContent/SectionContent';

const AddProduct = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(cl('/categories'));
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setBtnLoading(true);

    const form = event.target;

    const name = form.name.value;
    const picture = form.picture.value;
    const resalePrice = form.resalePrice.value;
    const originalPrice = form.originalPrice.value;
    const condition = form.condition.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const description = form.description.value;
    const purchaseYear = form.purchaseYear.value;
    const yearOfUse = form.yearOfUse.value;
    const categoryId = form.categoryId.value;

    const product = {
      name,
      picture,
      resalePrice,
      originalPrice,
      condition,
      phone,
      location,
      description,
      purchaseYear,
      yearOfUse,
      categoryId,
    };

    console.log(product);

    fetch(cl('/products'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          toast.success('Product Created Sucessfully!');
          // setTimeout(() => {

          // }, 1000)
        } else {
          toast.error(data.message);
        }
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  return (
    <section className="py-4 px-2">
      <SectionContent>
        <h2 className="text-2xl font-semibold mb-5">Add Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 ">
              Product Picture Link
            </label>
            <input
              name="picture"
              type="text"
              id="picture"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resalePrice" className="block mb-2 text-sm font-medium text-gray-900 ">
              Product Resale Price
            </label>
            <input
              name="resalePrice"
              type="number"
              id="resalePrice"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="originalPrice"
              className="block mb-2 text-sm font-medium text-gray-900 ">
              Product Original Price
            </label>
            <input
              name="originalPrice"
              type="number"
              id="originalPrice"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900 ">
              Product Condition
            </label>
            <select
              name="condition"
              id="condition"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">
              Your Phone Number
            </label>
            <input
              name="phone"
              type="number"
              id="phone"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 ">
              Location
            </label>
            <input
              name="location"
              type="text"
              id="location"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="purchaseYear" className="block mb-2 text-sm font-medium text-gray-900 ">
              Year of purchase
            </label>
            <input
              name="purchaseYear"
              type="number"
              id="purchaseYear"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="yearOfUse" className="block mb-2 text-sm font-medium text-gray-900 ">
              Year of use
            </label>
            <input
              name="yearOfUse"
              type="number"
              id="yearOfUse"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900 ">
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              required>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-clp hover:text-dark">
              {btnLoading ? <BtnLoader></BtnLoader> : 'Create Product'}
            </button>
          </div>
        </form>
      </SectionContent>
    </section>
  );
};

export default AddProduct;
