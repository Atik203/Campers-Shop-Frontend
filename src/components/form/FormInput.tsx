import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  description,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6 max-w-lg mx-auto">
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </Label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          {...register(name)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
