import { FormInput } from "@/components/form/FormInput";
import { FormWrapper } from "@/components/form/FormWrapper";

type FormData = {
  username: string;
};

const AddProduct = () => {
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <FormWrapper onSubmit={onSubmit}>
        <FormInput name="username" label="Username" placeholder="username" />
        <FormInput name="username" label="Username" placeholder="username" />
      </FormWrapper>
    </div>
  );
};

export default AddProduct;
