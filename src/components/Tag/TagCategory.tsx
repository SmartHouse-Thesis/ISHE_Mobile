import CheckableTag from "antd/es/tag/CheckableTag";
import React from "react";
import "./TagCategory.css";
import { DevicePackageTypes } from "../../api/DevicePackage/type";

interface Props {
  item: DevicePackageTypes;
}

const TagCategory: React.FC<Props> = ({ item }) => {
  return (
    <>
      <CheckableTag key={item.id} className={`category__tag `} checked>
        <img src={item.images[0].url} />
        {item.name}
      </CheckableTag>
    </>
  );
};

export default TagCategory;
