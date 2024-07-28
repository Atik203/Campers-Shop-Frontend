import { FormInput } from "@/components/form/FormInput";
import { FormWrapper } from "@/components/form/FormWrapper";
import { Label } from "@/components/ui/label";
import MultiColorPicker, { TColor } from "@/components/ui/MultiColorPicker";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { reset } = useForm();
  const [CreateProduct] = useCreateProductMutation();
  const [colors, setColors] = useState<TColor[]>([]);

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFiles([]);
      return;
    }

    setSelectedFiles(Array.from(e.target.files));
  };

  const onSubmit = async (data: Partial<TProduct>) => {
    const toastId = toast.loading("Submitting Data...");
    const urls = [];

    for (const file of selectedFiles) {
      try {
        const url = await uploadImageToCloudinary(file);
        urls.push(url);
      } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
        return;
      }
    }

    const { stock, price, ...remainingData } = data;
    const productData = {
      ...remainingData,
      images: urls,
      stock: Number(stock),
      price: Number(price),
    };

    try {
      const result = await CreateProduct(productData).unwrap();
      if (result.success) {
        toast.success("Product Added Successfully", { id: toastId });
        reset();
        setSelectedFiles([]);
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

        <MultiColorPicker colors={colors} setColors={setColors} />
        <div className="mt-4 mx-auto">
          <h3 className="text-lg font-medium text-center">Selected Colors</h3>
          <div className="mt-2 space-y-2">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center justify-center">
                <span
                  className="block w-8 h-8 mr-2 rounded"
                  style={{ backgroundColor: color.hex }}
                ></span>
                <span>
                  {color.name} ({color.hex})
                </span>
              </div>
            ))}
          </div>
        </div>

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
            Images
          </Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {previews.length > 0 ? (
                previews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="Selected"
                    className="mx-auto w-40 h-40 object-contain"
                  />
                ))
              ) : (
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="files"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload files</span>
                  <input
                    id="files"
                    name="files"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={onSelectFiles}
                  />
                </label>
                <p className="pl-1">
                  or drag and drop single or multiple images
                </p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AddProduct;
