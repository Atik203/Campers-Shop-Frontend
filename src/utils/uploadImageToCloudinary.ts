import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_COULDINARY_NAME,
  },
});

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_COULDINARY_UPLOAD_PRESET
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_COULDINARY_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();

  // Apply transformations
  const img = cld
    .image(data.public_id)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  return img.toURL();
};
