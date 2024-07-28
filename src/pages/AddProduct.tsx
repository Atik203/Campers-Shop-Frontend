import { FormInput } from "@/components/form/FormInput";
import { FormWrapper } from "@/components/form/FormWrapper";
import { Label } from "@/components/ui/label";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const { reset } = useForm();
  const [CreateProduct] = useCreateProductMutation();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (data: Partial<TProduct>) => {
    let url;
    const toastId = toast.loading("Submitting Data...");
    if (selectedFile) {
      try {
        url = await uploadImageToCloudinary(selectedFile);
      } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
        return;
      }
    }
    const { stock, price, ...remainingData } = data;
    const productData = {
      ...remainingData,
      image: url,
      stock: Number(stock),
      price: Number(price),
    };

    try {
      const result = await CreateProduct(productData).unwrap();
      if (result.success) {
        toast.success("Product Added Successfully", { id: toastId });
        reset();
      } else {
        toast.error("Failed to add product", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to add product", { id: toastId });
    }
  };

  return (
    <div>
      <FormWrapper onSubmit={onSubmit}>
        <FormInput name="title" label="Title" placeholder="Product Title" />
        <FormInput name="size" label="Size" placeholder="Product Size" />
        <FormInput
          name="stock"
          label="Quantity"
          placeholder="Product Stock Quantity"
        />
        <FormInput name="price" label="Price" placeholder="Product Price" />
        <FormInput
          name="category"
          label="Category"
          placeholder="Product Category"
        />
        <FormInput name="color" label="Color" placeholder="Product Color" />
        <FormInput name="brand" label="Brand" placeholder="Product Brand" />
        <FormInput
          name="description"
          label="Description"
          placeholder="Product Description"
          type="textarea"
          rows={5}
        />
        <div className="max-w-lg mx-auto">
          <Label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Image
          </Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Selected"
                  className="mx-auto w-40 h-40 object-contain"
                />
              ) : (
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="sr-only"
                    onChange={onSelectFile}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AddProduct;
