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
      <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
        <h2 className="text-2xl md:text-4xl text-black leading-none  font-bold mb-6">
          {title}
        </h2>
        <p className="text-base max-w-xl mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default TitleDescriptionBlock;
