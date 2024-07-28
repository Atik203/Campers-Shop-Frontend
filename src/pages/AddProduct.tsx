import { FormInput } from "@/components/form/FormInput";
import { FormWrapper } from "@/components/form/FormWrapper";
import { Label } from "@/components/ui/label";
import MultiColorPicker, { TColor } from "@/components/ui/MultiColorPicker";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import MultiSelect from "@/components/ui/MultiSelect";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { SIZES, TProduct } from "@/types/product.types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
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
      sizes: selectedSizes,
      colors,
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

        <div className="min-w-sm max-w-lg mx-auto">
          <Label htmlFor="sizes" className="block my-2 font-medium">
            Sizes
          </Label>
          <MultiSelect
            options={SIZES}
            selectedOptions={selectedSizes}
            setSelectedOptions={setSelectedSizes}
          />
        </div>
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

        <div className="flex items-center justify-between min-w-sm max-w-lg mx-auto">
          <MultiColorPicker colors={colors} setColors={setColors} />
          <div className="mt-2 space-y-2">
            <h3 className="font-medium">Selected Colors</h3>
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
