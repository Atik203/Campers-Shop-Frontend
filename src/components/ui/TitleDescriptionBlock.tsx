type BlockProps = {
  title: string;
  description: string;
};
import React from "react";

const TitleDescriptionBlock: React.FC<BlockProps> = ({
  title,
  description,
}) => {
  return (
    <div className="grid grid-cols-12 my-4 md:mb-12">
      <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center">
        <h2 className="text-3xl text-Primary leading-none md:text-[45px] font-bold mb-6">
          {title}
        </h2>
        <p className="text-lg w-11/12 md:w-10/12 mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default TitleDescriptionBlock;
