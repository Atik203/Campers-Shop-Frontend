import { FormInput } from "@/components/form/FormInput";
import { FormWrapper } from "@/components/form/FormWrapper";
import { Label } from "@/components/ui/label";
import MultiColorPicker, { TColor } from "@/components/ui/MultiColorPicker";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import MultiSelect from "@/components/ui/MultiSelect";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { SIZES, TProduct } from "@/types/product.types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { reset } = useForm();
  const navigate = useNavigate();
  const [UpdateProduct] = useUpdateProductMutation();
  const [colors, setColors] = useState<TColor[]>([]);
  const { data, isFetching, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data;

  const onSubmit = async (data: Partial<TProduct>) => {
    const toastId = toast.loading("Submitting Data...");

    const urls = [...product.images];

    for (const file of selectedFiles) {
      try {
        const url = await uploadImageToCloudinary(file);
        urls.push(url);
      } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
        return;
      }
    }
    console.log(urls);
    const { stock, price, ...remainingData } = data;
    const productData = {
      ...remainingData,
      images: urls,
      stock: Number(stock),
      price: Number(price),
      sizes: selectedSizes,
      colors,
      _id: id,
    };

    try {
      const result = await UpdateProduct(productData).unwrap();
      if (result.success) {
        toast.success("Product Updated Successfully", { id: toastId });

        reset();
        setSelectedFiles([]);
        navigate(`/product-details/${id}`);
      } else {
        toast.error("Failed to update product", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to update product", { id: toastId });
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedSizes(product.sizes);
      setColors(product.colors);
    }
  }, [product, reset]);

  return (
    <div>
      {isFetching || isLoading ? (
        <div className="text-center text-semibold min-h-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <FormWrapper onSubmit={onSubmit}>
            <FormInput
              name="title"
              defaultValue={product?.title}
              label="Title"
              placeholder="Product Title"
            />

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
              defaultValue={product?.stock}
              placeholder="Product Stock Quantity"
            />
            <FormInput
              name="price"
              defaultValue={product?.price}
              label="Price"
              placeholder="Product Price"
            />
            <FormInput
              name="category"
              label="Category"
              defaultValue={product?.category}
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

            <FormInput
              name="brand"
              defaultValue={product?.brand}
              label="Brand"
              placeholder="Product Brand"
            />
            <FormInput
              name="description"
              label="Description"
              defaultValue={product?.description}
              placeholder="Product Description"
              type="textarea"
              rows={5}
            />
            <MultipleImageUploader
              images={selectedFiles}
              initialImageUrls={product?.images}
              setImages={setSelectedFiles}
            />
          </FormWrapper>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
