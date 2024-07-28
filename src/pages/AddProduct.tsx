import { FormInput } from "@/components/form/FormInput";
import { FormWrapper } from "@/components/form/FormWrapper";
import MultiColorPicker, { TColor } from "@/components/ui/MultiColorPicker";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { reset } = useForm();
  const [CreateProduct] = useCreateProductMutation();
  const [colors, setColors] = useState<TColor[]>([]);

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
        <MultipleImageUploader
          images={selectedFiles}
          setImages={setSelectedFiles}
        />
      </FormWrapper>
    </div>
  );
};

export default AddProduct;
