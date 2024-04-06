import "./Home.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import PackageCard from "../../components/Card/PackageCard";
import { useMutation } from "@tanstack/react-query";
import DevicePackagesAPI from "../../api/DevicePackage";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { Input, Skeleton } from "antd";
import { DevicePackageTypes } from "../../api/DevicePackage/type";
import { debounce } from "lodash";

const Home: React.FC = () => {
  const [packages, setPackages] = useState<DevicePackageTypes[]>([]);

  const {
    isPending: isDevicePackagesLoading,
    mutate: mutateAllDevicePackages,
    data: devicePackages,
  } = useMutation({
    mutationFn: DevicePackagesAPI.getAllDevicePackages,
    onError: (errorResponse) => {
      onHandleErrorAPIResponse(errorResponse);
    },
    onSuccess: (res) => {
      setPackages(res.data);
    },
  });

  useEffect(() => {
    mutateAllDevicePackages();
  }, []);

  const onSearchPackageName = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    if (devicePackages?.data) {
      const result = devicePackages.data.filter((item: DevicePackageTypes) =>
        item.name.toLowerCase().includes(keyword)
      );
      setPackages(result);
    }
  };

  if (isDevicePackagesLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="home-wrapper">
      <h5>Welcome back !</h5>
      <Input.Search
        style={{ marginBottom: "1rem" }}
        placeholder="Search..."
        onChange={debounce(onSearchPackageName, 500)}
      />

      {packages.length > 0 && (
        <PackageCard lstData={packages} key={devicePackages?.data} />
      )}
    </div>
  );
};

export default Home;
