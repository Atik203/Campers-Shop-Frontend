import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>This is UpdateProduct component {id}</h1>
    </div>
  );
};

export default UpdateProduct;
