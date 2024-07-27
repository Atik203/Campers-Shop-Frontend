import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";

interface FormWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  children,
}) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto"
      >
        {children}
        <div className="flex items-center justify-center text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
